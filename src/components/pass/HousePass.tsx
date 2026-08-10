import { Sun, Palm, Waves, GoanHouse, Scooter, Bird, Boat } from "./GoaArt";
import studioLogo from "@/assets/studio-241pm.png";

export type PassData = {
  name: string;
  designation: string;
  passType: string;
  idNumber: string;
  organization: string;
  handle: string;
  photo: string | null;
  builderClass?: string;
  stack?: string;
};

function seeded(seed: string) {
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

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return ["", ""];
  if (parts.length === 1) return [parts[0], ""];
  return [parts[0], parts.slice(1).join(" ")];
}

export const CARD_W = 1600;
export const CARD_H = 850;

/* ── Geometric zigzag pattern strip ── */
function PatternStrip() {
  const colors = ["var(--sun)", "var(--pink)", "var(--goa)", "var(--ink)"];
  const segW = 18;
  const count = Math.ceil(CARD_W / segW);
  return (
    <svg viewBox={`0 0 ${CARD_W} 22`} style={{ width: "100%", height: 22, display: "block" }} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const c = colors[i % colors.length];
        const x = i * segW;
        return (
          <g key={i}>
            <polygon points={`${x},22 ${x + segW / 2},0 ${x + segW},22`} fill={c} opacity={0.75} />
            <polygon points={`${x},0 ${x + segW / 2},22 ${x + segW},0`} fill={c} opacity={0.35} />
          </g>
        );
      })}
    </svg>
  );
}

/* ── QR Code (larger) ── */
function QRCode({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect width="100" height="100" fill="var(--cream)" rx="3" />
      <rect x="2" y="2" width="28" height="28" fill="var(--ink)" rx="3" />
      <rect x="6" y="6" width="20" height="20" fill="var(--cream)" rx="2" />
      <rect x="9" y="9" width="14" height="14" fill="var(--ink)" rx="1" />
      <rect x="70" y="2" width="28" height="28" fill="var(--ink)" rx="3" />
      <rect x="74" y="6" width="20" height="20" fill="var(--cream)" rx="2" />
      <rect x="77" y="9" width="14" height="14" fill="var(--ink)" rx="1" />
      <rect x="2" y="70" width="28" height="28" fill="var(--ink)" rx="3" />
      <rect x="6" y="74" width="20" height="20" fill="var(--cream)" rx="2" />
      <rect x="9" y="77" width="14" height="14" fill="var(--ink)" rx="1" />
      {[34,39,44,49,54,59,64].map(x =>
        [34,39,44,49,54,59,64].map(y => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="var(--ink)" opacity={((x * 7 + y * 13) % 3) > 0 ? 1 : 0} />
        ))
      )}
      {[34,39,44,49,54].map(x =>
        [2,7,12,17,22,27].map(y => (
          <rect key={`t${x}-${y}`} x={x} y={y} width="3.5" height="3.5" fill="var(--ink)" opacity={((x + y) % 5) > 1 ? 1 : 0} />
        ))
      )}
      {[2,7,12,17,22,27].map(x =>
        [34,39,44,49,54].map(y => (
          <rect key={`l${x}-${y}`} x={x} y={y} width="3.5" height="3.5" fill="var(--ink)" opacity={((x * 3 + y) % 4) > 0 ? 1 : 0} />
        ))
      )}
    </svg>
  );
}

/* ── House Builder circular stamp ── */
function HouseStamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
      <circle cx="55" cy="55" r="52" fill="none" stroke="var(--pink)" strokeWidth="3" />
      <circle cx="55" cy="55" r="46" fill="none" stroke="var(--pink)" strokeWidth="1.5" />
      <path d="M55 32 C50 42 48 48 50 58" stroke="var(--pink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M50 40 C42 36 38 38 36 44 C40 42 44 42 50 44 Z" fill="var(--pink)" />
      <path d="M50 40 C58 36 62 38 64 44 C60 42 56 42 50 44 Z" fill="var(--pink)" />
      <path d="M50 40 C48 34 50 28 54 24 C52 30 52 36 52 42 Z" fill="var(--pink)" />
      <path id="stampTop" d="M16,55 a39,39 0 0,1 78,0" fill="none" />
      <text style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", fill: "var(--pink)" }}>
        <textPath href="#stampTop" startOffset="50%" textAnchor="middle">HOUSE</textPath>
      </text>
      <path id="stampBot" d="M14,62 a41,41 0 0,0 82,0" fill="none" />
      <text style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", fill: "var(--pink)" }}>
        <textPath href="#stampBot" startOffset="50%" textAnchor="middle">GOA BUILDER</textPath>
      </text>
    </svg>
  );
}

/* ── Clock icon (replaces 2:41 PM) ── */
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" style={{ color: "var(--ink)" }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="12" x2="12" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="12" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PassFront({ data }: { data: PassData }) {
  const rand = seeded(data.name + data.designation);
  const [first, last] = splitName(data.name || "");
  const photoTilt = rand(-0.8, 0.8);

  return (
    <div
      className="paper-grain relative overflow-hidden"
      style={{ width: CARD_W, height: CARD_H, background: "var(--cream)", color: "var(--ink)", borderRadius: 16 }}
    >
      {/* subtle registration offset */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--pink)", opacity: 0.018, transform: "translate(1px, 0.5px)", borderRadius: 16 }} />

      {/* ===== HEADER — 175px ===== */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: 175, background: "var(--goa)", borderRadius: "16px 16px 0 0" }}>
        {/* decorative palms in header bg */}
        <Palm className="absolute left-[52%] -top-6 w-[100px] opacity-12" style={{ color: "var(--cream)" }} />
        <Palm className="absolute left-[60%] -top-6 w-[85px] opacity-8" style={{ color: "var(--cream)" }} flip />
        <Palm className="absolute left-[68%] -top-6 w-[90px] opacity-10" style={{ color: "var(--cream)" }} />
        <Bird className="absolute left-[340px] top-[14px] w-[30px] opacity-22" style={{ color: "var(--cream)" }} />
        <Bird className="absolute left-[520px] top-[6px] w-[24px] opacity-16" style={{ color: "var(--cream)" }} />
        <Bird className="absolute left-[860px] top-[18px] w-[20px] opacity-12" style={{ color: "var(--cream)" }} />

        <div className="absolute inset-0 flex items-center px-12">
          {/* Logo — HACKER HOUSE गोवा — single horizontal unit */}
          <div className="relative" style={{ flex: "0 0 auto" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 94, color: "var(--sun)", lineHeight: 0.92, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
              HACKER HOUSE
            </div>
            <div className="absolute" style={{ bottom: 0, right: -28, fontFamily: "var(--font-editorial)", fontSize: 54, fontWeight: 900, color: "var(--pink)", fontStyle: "italic", transform: "rotate(-5deg)", lineHeight: 1, WebkitTextStroke: "2px var(--sun)", paintOrder: "stroke fill" }}>
              गोवा
            </div>
          </div>

          {/* GOA '26 + IDENTIFICATION */}
          <div className="ml-auto text-right flex-shrink-0">
            <div className="flex items-center gap-4 justify-end">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 54, color: "var(--cream)", lineHeight: 0.9 }}>
                GOA '26
              </div>
              <Sun className="w-[54px] opacity-90" />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.35em", color: "var(--cream)", opacity: 0.55, marginTop: 8 }}>
              IDENTIFICATION
            </div>
          </div>
        </div>
      </div>

      {/* pattern strip — 22px */}
      <div className="absolute left-0 right-0" style={{ top: 175 }}>
        <PatternStrip />
      </div>

      {/* ===== IDENTITY AREA ===== */}
      <div className="absolute left-0 right-0" style={{ top: 197, bottom: 155 }}>
        {/* --- Photo (left, 31% = ~480px) --- */}
        <div className="absolute" style={{ left: 44, top: 28, transform: `rotate(${photoTilt}deg)` }}>
          {/* yellow offset */}
          <div className="absolute" style={{ inset: 0, background: "var(--sun)", transform: "translate(-6px, -6px)", opacity: 0.4 }} />
          {/* pink offset */}
          <div className="absolute" style={{ inset: 0, background: "var(--pink)", transform: "translate(10px, 8px)", opacity: 0.35 }} />
          {/* cream outer frame */}
          <div className="relative" style={{ width: 380, height: 440, background: "var(--cream)", border: "4px solid var(--ink)", padding: 10 }}>
            {/* green inner border */}
            <div className="relative overflow-hidden" style={{ width: 360, height: 420, border: "2px solid var(--goa)", background: "var(--cream-dim)" }}>
              {data.photo ? (
                <img src={data.photo} alt={data.name || "Pass holder"} className="h-full w-full object-cover" style={{ filter: "contrast(1.05) saturate(0.93)" }} />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--ink)", opacity: 0.4 }}>
                  NO PHOTO<br />ON FILE
                </div>
              )}
              {/* very subtle halftone overlay — 8% */}
              <div className="pointer-events-none absolute inset-0 halftone" style={{ opacity: 0.08 }} />
            </div>
          </div>
          {/* palm overlapping photo corner */}
          <Palm className="absolute -left-10 -bottom-4 w-[110px]" style={{ color: "var(--goa)", opacity: 0.18 }} />
          {/* house stamp */}
          <HouseStamp className="absolute -left-8 bottom-[-30px] w-[120px]" />
        </div>

        {/* --- Information (right, 42% = ~650px) --- */}
        <div className="absolute" style={{ left: 540, top: 24, right: 260 }}>
          {/* NAME — top-aligned with photo */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.35em", color: "var(--pink)", marginBottom: 6 }}>
              NAME
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 80, lineHeight: 0.9, color: "var(--ink)" }}>
              {first || "YOUR"}
            </div>
            {last ? (
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 80, lineHeight: 0.9, color: "var(--goa)", paddingLeft: 16 }}>
                {last}
              </div>
            ) : (
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 80, lineHeight: 0.9, color: "var(--goa)", paddingLeft: 16 }}>
                NAME
              </div>
            )}
          </div>

          {/* DECORATIVE DIVIDER — stronger */}
          <div className="mt-5 relative" style={{ height: 18 }}>
            <svg viewBox="0 0 700 18" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="9" x2="700" y2="9" stroke="var(--ink)" strokeWidth="2" strokeDasharray="14 6 4 6" opacity="0.3" />
              <circle cx="350" cy="9" r="4" fill="var(--sun)" />
              <circle cx="180" cy="9" r="2.5" fill="var(--pink)" opacity="0.6" />
              <circle cx="520" cy="9" r="2.5" fill="var(--pink)" opacity="0.6" />
            </svg>
          </div>

          {/* DESIGNATION */}
          <div className="mt-3">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: "0.3em", color: "var(--pink)", marginBottom: 5 }}>DESIGNATION</div>
            <div className="inline-block px-8 py-[9px]" style={{ background: "var(--pink)", color: "var(--cream)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", transform: `rotate(${rand(-0.4, 0.4)}deg)` }}>
              {(data.designation || "BUILDER").toUpperCase()}
            </div>
          </div>

          {/* PASS TYPE + TEAM on same line */}
          <div className="mt-4 flex items-center gap-6" style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>
            <div>
              <span style={{ color: "var(--pink)", letterSpacing: "0.2em", fontSize: 16 }}>PASS TYPE </span>
              <span style={{ fontWeight: 700, fontSize: 26 }}>{(data.passType || "HOUSE PASS").toUpperCase()}</span>
            </div>
            {data.organization && (
              <div>
                <span style={{ color: "var(--pink)", letterSpacing: "0.2em", fontSize: 14 }}>TEAM </span>
                <span style={{ fontWeight: 700, fontSize: 22 }}>{data.organization.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* ID NO block */}
          <div className="mt-4 inline-flex items-center gap-3">
            <div className="px-7 py-[8px]" style={{ background: "var(--sun)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18, letterSpacing: "0.15em", color: "var(--ink)" }}>
              ID NO.
            </div>
            <div className="px-7 py-[8px]" style={{ border: "3px solid var(--ink)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 32, letterSpacing: "0.08em", color: "var(--ink)" }}>
              {data.idNumber || "HH26-0427"}
            </div>
          </div>

          {/* VALID TILL */}
          <div className="mt-3 inline-flex items-center gap-3 ml-3">
            <div className="px-6 py-[7px]" style={{ background: "var(--sun)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, letterSpacing: "0.15em", color: "var(--ink)" }}>
              VALID TILL
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 30, color: "var(--ink)" }}>
              28.07.26
            </div>
          </div>
        </div>

        {/* --- QR Code (right, 16% = ~220px) --- */}
        <div className="absolute" style={{ right: 44, top: 24 }}>
          <QRCode className="w-[110px] h-[110px]" />
          <div className="text-center mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--ink)", opacity: 0.55, lineHeight: 1.5 }}>
            SCAN<br />TO VERIFY
          </div>
          <div className="text-center mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.15em", color: "var(--pink)", fontWeight: 700 }}>
            HH26
          </div>
        </div>
      </div>

      {/* studio logo — bottom right */}
      <div className="absolute" style={{ right: 44, bottom: 250 }}>
        <img src={studioLogo} alt="2:41 PM Studio" className="h-[76px]" />
      </div>

      {/* ===== GOA ILLUSTRATION FOOTER — 155px ===== */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 155, background: "var(--goa)", borderRadius: "0 0 16px 16px" }}>
        {/* sun — larger */}
        <Sun className="absolute left-[47%] -top-[22px] w-[85px]" />
        {/* birds */}
        <Bird className="absolute left-[8%] top-[8px] w-[26px]" style={{ color: "var(--cream)" }} />
        <Bird className="absolute left-[28%] top-[14px] w-[20px]" style={{ color: "var(--cream)" }} />
        <Bird className="absolute left-[73%] top-[6px] w-[22px]" style={{ color: "var(--cream)" }} />
        <Bird className="absolute left-[85%] top-[16px] w-[16px]" style={{ color: "var(--cream)" }} />

        {/* palms — larger, layered */}
        <Palm className="absolute -left-3 top-[4px] w-[78px]" style={{ color: "var(--cream)" }} />
        <Palm className="absolute left-[10%] top-[10px] w-[62px]" style={{ color: "var(--cream)" }} />
        <Palm className="absolute -right-3 top-[4px] w-[78px]" style={{ color: "var(--cream)" }} flip />
        <Palm className="absolute right-[10%] top-[10px] w-[62px]" style={{ color: "var(--cream)" }} flip />

        {/* goan house — larger, more detail */}
        <GoanHouse className="absolute left-[30%] top-[16px] w-[78px]" />

        {/* scooter + boat */}
        <Scooter className="absolute right-[12%] bottom-[16px] w-[70px]" style={{ color: "var(--cream)" }} />
        <Boat className="absolute left-[14%] bottom-[18px] w-[56px]" style={{ color: "var(--cream)" }} />

        {/* waves — larger */}
        <Waves className="absolute bottom-[18px] left-0 w-full h-[18px]" style={{ color: "var(--cream)" }} />

        {/* bottom statement */}
        <div className="absolute bottom-[3px] left-0 right-0 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "var(--cream)", opacity: 0.8 }}>
          ✦ 4 DAYS. ONE RHYTHM. EVERYTHING INTENTIONAL. ✦
        </div>
      </div>

      {/* card border */}
      <div className="absolute inset-0 pointer-events-none" style={{ border: "3px solid var(--ink)", borderRadius: 16, opacity: 0.12 }} />
    </div>
  );
}

const RULES = [
  "BUILD SOMETHING.",
  "TALK TO STRANGERS.",
  "BREAK THINGS SAFELY.",
  "SHARE WHAT YOU LEARN.",
  "LEAVE WITH MORE THAN YOU ARRIVED WITH.",
];

export function PassBack({ data }: { data: PassData }) {
  const rand = seeded(data.name + "back");
  return (
    <div
      className="paper-grain relative overflow-hidden"
      style={{ width: CARD_W, height: CARD_H, background: "var(--goa)", color: "var(--cream)", borderRadius: 16 }}
    >
      {/* cream header strip */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 95, background: "var(--cream)", borderBottom: "3px solid var(--ink)", borderRadius: "16px 16px 0 0" }}>
        <div className="flex items-center justify-between h-full px-12">
          <div className="relative">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 38, color: "var(--ink)", lineHeight: 0.85 }}>
              HACKER HOUSE
            </div>
            <div className="absolute" style={{ bottom: -3, right: -12, fontFamily: "var(--font-editorial)", fontSize: 20, color: "var(--pink)", fontStyle: "italic" }}>
              गोवा
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-editorial)", fontSize: 28, color: "var(--pink)", fontStyle: "italic" }}>
            4 Days. One Rhythm.
          </div>
        </div>
      </div>

      {/* body */}
      <div className="absolute left-12 right-12" style={{ top: 112, bottom: 140 }}>
        <div className="mt-3 mb-4 inline-block px-5 py-[6px]" style={{ background: "var(--sun)", color: "var(--ink)", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.28em", fontWeight: 700 }}>
          HOUSE RULES
        </div>
        {RULES.map((r, i) => (
          <div key={r} className="flex gap-6 py-[8px]" style={{ borderTop: "2px solid rgba(255,245,214,0.18)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--sun)", minWidth: 32 }}>0{i + 1}</span>
            <span className="uppercase" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, lineHeight: 1.1 }}>{r}</span>
          </div>
        ))}

        <div className="mt-6 flex flex-wrap gap-x-12 gap-y-2" style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>
          <div><span style={{ color: "var(--sun)", letterSpacing: "0.15em", fontSize: 11 }}>PASS </span><span>{(data.passType || "HOUSE PASS").toUpperCase()}</span></div>
          <div><span style={{ color: "var(--sun)", letterSpacing: "0.15em", fontSize: 11 }}>ID </span><span>{data.idNumber || "HH26-0427"}</span></div>
          {data.organization && <div><span style={{ color: "var(--sun)", letterSpacing: "0.15em", fontSize: 11 }}>TEAM </span><span>{data.organization.toUpperCase()}</span></div>}
        </div>
      </div>

      {/* decorative */}
      <Sun className="absolute right-[36px] top-[108px] w-[68px] opacity-50" />
      <Palm className="absolute -right-3 bottom-[130px] w-[85px] opacity-25" />
      <GoanHouse className="absolute left-[50%] bottom-[130px] w-[58px] opacity-25" />

      <div className="absolute px-4 py-[6px]" style={{ right: 44, bottom: 92, background: "var(--pink)", color: "var(--cream)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", transform: `rotate(${rand(-1.5, 1.5)}deg)` }}>
        #FrameInGoa
      </div>

      <div className="absolute px-4 py-3" style={{ left: 44, bottom: 92, background: "var(--cream)", transform: `rotate(${rand(-2, 2)}deg)` }}>
        <img src={studioLogo} alt="2:41 PM Studio" className="h-[24px]" />
      </div>

      {/* bottom statement */}
      <div className="absolute bottom-0 left-0 right-0 text-center" style={{ height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.25em", color: "var(--cream)", opacity: 0.55 }}>
        THIS CARD CONFIRMS THAT THIS HUMAN BELONGS TO THE HOUSE.
      </div>

      {/* card border */}
      <div className="absolute inset-0 pointer-events-none" style={{ border: "3px solid var(--cream)", borderRadius: 16, opacity: 0.12 }} />
    </div>
  );
}
