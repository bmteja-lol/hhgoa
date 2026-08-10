import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { PassFront, PassBack, CARD_W, CARD_H, type PassData } from "@/components/pass/HousePass";
import { Palm, Waves, Sun } from "@/components/pass/GoaArt";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hacker House Goa '26 — House Pass Generator" },
      { name: "description", content: "Make your collectible Hacker House Goa '26 house pass: screen-print tropical graphics, your photo, name and role." },
      { property: "og:title", content: "Hacker House Goa '26 — House Pass Generator" },
      { property: "og:description", content: "Generate your Goa hacker-house pass. Tropical screen-print, not a corporate badge." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ROLES: Record<string, string[]> = {
  Participants: [
    "Hacker", "Participant", "Builder", "Developer", "Engineer", "Student", "Maker", "Creator",
    "Researcher", "Designer", "Founder", "Entrepreneur", "Open Source Contributor", "AI Engineer",
    "ML Engineer", "Security Researcher", "Web3 Builder", "Blockchain Developer", "Product Builder",
  ],
  "Organizers / Ops": [
    "Organizer", "Core Team", "Event Lead", "Program Lead", "Community Lead", "Operations",
    "Operations Lead", "Event Operations", "Volunteer", "Coordinator", "Registration",
    "Hospitality", "Logistics", "Production", "Stage Manager", "Event Manager",
  ],
  "Technical Team": [
    "Engineering", "Tech Team", "Technical Lead", "Infrastructure", "DevOps", "Platform Engineer",
    "Security", "Security Team", "IT Support", "Web Team", "Systems Engineer",
  ],
  "Mentors / Judges": [
    "Mentor", "Technical Mentor", "Industry Mentor", "Judge", "Technical Judge", "Jury",
    "Reviewer", "Advisor", "Expert", "Speaker", "Workshop Facilitator",
  ],
  "Community / Ecosystem": [
    "Community", "Community Builder", "Developer Advocate", "Open Source", "Open Source Maintainer",
    "Ecosystem", "Ecosystem Partner", "Community Partner", "Ambassador", "Campus Ambassador",
    "Fellow", "Resident", "Hacker House Resident",
  ],
  "Media / Creative": [
    "Photographer", "Videographer", "Content", "Content Creator", "Media", "Media Team",
    "Creative", "Creative Team", "Social Media", "Communications", "Press",
  ],
  "Sponsors / Partners": [
    "Sponsor", "Partner", "Technology Partner", "Media Partner", "Startup Partner", "Investor", "Guest",
  ],
};

const PASS_TYPES = ["House Pass", "Builder Pass", "Mentor Pass", "Judge Pass", "Crew Pass", "Speaker Pass", "Guest Pass", "Media Pass", "Partner Pass"];

const BUILDER_CLASSES = [
  "The Architect", "The Alchemist", "The Navigator", "The Catalyst", "The Sentinel",
  "The Visionary", "The Weaver", "The Harmonizer", "The Provocateur", "The Luminary",
  "The Trailblazer", "The Synthesizer", "The Guardian", "The Oracle", "The Pioneer",
  "The Strategist", "The Sculptor", "The Amplifier", "The Cipher", "The Beacon",
];

const STACKS = [
  "Full Stack", "Frontend", "Backend", "AI/ML", "DevOps", "Web3", "Systems",
  "Mobile", "Security", "Data", "Cloud", "Embedded", "Game Dev", "Infra",
];

function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (min: number, max: number) => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h ^= h >>> 13;
    return min + (Math.abs(h) % 1000) / 1000 * (max - min);
  };
}

function generateBuilderClass(name: string, designation: string) {
  const rand = seededRandom(name + designation);
  const cls = BUILDER_CLASSES[Math.floor(rand(0, BUILDER_CLASSES.length))];
  const stack = STACKS[Math.floor(rand(0, STACKS.length))];
  return { cls, stack };
}

function Field({ step, label, children }: { step: string; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.24em", color: "var(--sun)" }}>
        {step} — {label}
      </span>
      {children}
    </label>
  );
}

const inputCls = "w-full border-2 border-cream/70 bg-goa-deep px-4 py-3 text-cream outline-none placeholder:text-cream/35 focus:border-sun";

function Index() {
  const [data, setData] = useState<PassData>({
    name: "",
    designation: "",
    passType: "",
    idNumber: `HH26-${String(Math.floor(1000 + Math.random() * 9000))}`,
    organization: "",
    handle: "",
    photo: null,
  });
  const [side, setSide] = useState<"front" | "back">("front");
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const builderInfo = useMemo(() => generateBuilderClass(data.name, data.designation), [data.name, data.designation]);

  const dataWithBuilder = useMemo(() => ({
    ...data,
    builderClass: builderInfo.cls ?? "",
    stack: builderInfo.stack ?? "",
  }), [data, builderInfo]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale((el.clientWidth * 0.95) / CARD_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const set = <K extends keyof PassData>(k: K, v: PassData[K]) => setData((d) => ({ ...d, [k]: v }));

  const onPhoto = async (file?: File) => {
    if (!file) return;
    let f = file;
    const isHeic = /image\/hei[cf]/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);
    if (isHeic) {
      setBusy(true);
      try {
        const heic2any = (await import("heic2any")).default;
        const out = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
        const blob = Array.isArray(out) ? out[0] : out;
        f = new File([blob as Blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
      } catch {} finally { setBusy(false); }
    }
    const reader = new FileReader();
    reader.onload = () => set("photo", String(reader.result));
    reader.readAsDataURL(f);
  };

  const download = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.href = url;
      a.download = `hacker-house-goa-${(data.name || "pass").toLowerCase().replace(/\s+/g, "-")}-${side}.png`;
      a.click();
    } finally { setBusy(false); }
  };

  const shareToX = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const text = encodeURIComponent(`My Hacker House Goa '26 pass 🏠🌴\n\n${builderInfo.cls} · ${builderInfo.stack}\n${data.idNumber}\n\n#FrameInGoa #HackerHouseGoa`);
      window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
    } finally { setBusy(false); }
  };

  return (
    <main className="paper-grain min-h-screen bg-goa text-cream">
      {/* masthead */}
      <header className="relative overflow-hidden border-b-4 border-cream/60 px-6 pb-8 pt-6 md:px-12">
        <Sun className="pointer-events-none absolute -right-6 -top-10 w-48 opacity-90" />
        <Palm className="pointer-events-none absolute -left-6 top-12 w-24 opacity-40" />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.34em" }}>THE HOUSE REGISTRATION DESK</p>
        <h1 className="mt-2 leading-[0.8]" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
          <span className="block text-[14vw] md:text-[88px]">HACKER</span>
          <span className="block pl-[8vw] text-[14vw] text-sun md:pl-20 md:text-[88px]">HOUSE</span>
        </h1>
        <p className="mt-1" style={{ fontFamily: "var(--font-editorial)", fontSize: 28, color: "var(--pink)" }}>Goa '26 — make your house pass</p>
        <Waves className="mt-3 h-5 w-full opacity-60" />
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-8 md:px-8 lg:grid-cols-[minmax(0,380px)_1fr]">
        {/* form — 40% */}
        <section className="space-y-5">
          <Field step="01" label="YOUR NAME">
            <input className={inputCls} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, letterSpacing: "0.02em" }} value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="YOUR NAME" />
          </Field>
          <Field step="02" label="DESIGNATION">
            <select className={inputCls} style={{ fontFamily: "var(--font-mono)", fontSize: 14 }} value={data.designation} onChange={(e) => set("designation", e.target.value)}>
              {Object.entries(ROLES).map(([group, roles]) => (
                <optgroup key={group} label={group}>{roles.map((r) => <option key={r} value={r}>{r}</option>)}</optgroup>
              ))}
            </select>
          </Field>
          <Field step="03" label="YOUR PHOTO">
            <div className="relative flex h-40 cursor-pointer items-center justify-center border-2 border-dashed border-cream/60 bg-goa-deep" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onPhoto(e.dataTransfer.files?.[0]); }}>
              <input type="file" accept="image/*,.heic,.heif,image/heic,image/heif" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => onPhoto(e.target.files?.[0])} />
              {data.photo ? (
                <img src={data.photo} alt="Your upload" className="h-full w-full object-cover" />
              ) : (
                <span className="px-4 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em" }}>
                  DROP PHOTO HERE<br /><span style={{ fontSize: 10, letterSpacing: "0.16em", opacity: 0.6 }}>JPG · PNG · WEBP · HEIC</span>
                </span>
              )}
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field step="04" label="PASS TYPE">
              <select className={inputCls} style={{ fontFamily: "var(--font-mono)", fontSize: 14 }} value={data.passType} onChange={(e) => set("passType", e.target.value)}>
                <option value="">SELECT PASS</option>
                {PASS_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field step="05" label="TEAM NAME">
              <input className={inputCls} style={{ fontFamily: "var(--font-mono)", fontSize: 14 }} value={data.organization} onChange={(e) => set("organization", e.target.value)} placeholder="YOUR TEAM" />
            </Field>
          </div>
          <Field step="06" label="HANDLE">
            <input className={inputCls} style={{ fontFamily: "var(--font-mono)", fontSize: 14 }} value={data.handle} onChange={(e) => set("handle", e.target.value)} placeholder="@YOURHANDLE" />
          </Field>
          {data.name && data.designation && (
            <div className="border border-cream/20 px-4 py-3" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em" }}>
              <span style={{ color: "var(--sun)" }}>BUILDER CLASS </span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{builderInfo.cls}</span>
              <span style={{ color: "var(--cream)", opacity: 0.5 }}> · </span>
              <span style={{ color: "var(--pink)" }}>{builderInfo.stack}</span>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={download} disabled={busy} className="flex-1 border-[3px] border-ink bg-pink px-6 py-4 text-cream transition-transform hover:-translate-y-[2px] disabled:opacity-60" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "0.06em", boxShadow: "6px 6px 0 var(--sun)" }}>
              {busy ? "PRINTING…" : "DOWNLOAD ↓"}
            </button>
            <button onClick={shareToX} disabled={busy} className="flex-1 border-[3px] border-cream/60 bg-goa-deep px-6 py-4 text-cream transition-transform hover:-translate-y-[2px] disabled:opacity-60" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "0.06em", boxShadow: "6px 6px 0 var(--sun)" }}>
              {busy ? "SHARING…" : "SHARE TO X ✦"}
            </button>
          </div>
        </section>

        {/* preview — 60%, card fills 95% of width */}
        <section className="flex flex-col items-center">
          <div className="mb-4 flex items-center gap-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.28em" }}>
            <span className="text-sun">✦ HOUSE PASS ✦</span>
            {(["front", "back"] as const).map((s) => (
              <button key={s} onClick={() => setSide(s)} className="border-2 px-3 py-1 uppercase" style={{ borderColor: side === s ? "var(--sun)" : "var(--cream)", background: side === s ? "var(--sun)" : "transparent", color: side === s ? "var(--ink)" : "var(--cream)" }}>
                {s}
              </button>
            ))}
          </div>

          <div className="paper-grain w-full border-[3px] border-cream/50 p-3 md:p-4" style={{ background: "var(--goa-deep)" }}>
            <div ref={frameRef} style={{ width: "100%", aspectRatio: `${CARD_W} / ${CARD_H}`, position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: CARD_W, height: CARD_H, transformOrigin: "top left", transform: `scale(${scale})` }}>
                <div ref={cardRef}>
                  {side === "front" ? <PassFront data={dataWithBuilder} /> : <PassBack data={dataWithBuilder} />}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-[520px] text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 11, opacity: 0.7 }}>
            Every pass prints with its own small imperfections — seeded from your name.
          </p>
        </section>
      </div>
    </main>
  );
}
