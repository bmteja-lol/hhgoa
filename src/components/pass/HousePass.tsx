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
};

/** Deterministic pseudo-random so a given name always prints the same imperfections. */
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

export const CARD_W = 640;
export const CARD_H = 800;

export function PassFront({ data }: { data: PassData }) {
  const rand = seeded(data.name + data.designation);
  const [first, last] = splitName(data.name || "");
  const tilt = rand(-1.6, 1.6);

  return (
    <div
      className="paper-grain relative overflow-hidden"
      style={{ width: CARD_W, height: CARD_H, background: "var(--goa)", color: "var(--cream)" }}
    >
      {/* deckled cream border */}
      <div
        className="absolute inset-[14px] border-[3px]"
        style={{ borderColor: "var(--cream)", opacity: 0.55 }}
      />

      {/* ---- masthead ---- */}
      <div className="absolute left-[38px] top-[34px]">
        <div
          className="leading-[0.78] tracking-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 96 }}
        >
          HACKER
        </div>
        <div
          className="leading-[0.78] pl-[86px] tracking-tight flex items-baseline gap-4"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 96,
          }}
        >
          <span style={{ color: "var(--sun)" }}>HOUSE</span>
          <span style={{ color: "var(--pink)" }}>GOA'26</span>
        </div>
      </div>
      {/* studio mark */}
      <img
        src={studioLogo}
        alt="2:41 PM Studio"
        className="absolute right-[28px] top-[22px] w-[104px]"
        style={{ transform: `rotate(${rand(-3, 3)}deg)` }}
      />

      {/* ---- horizon scene ---- */}
      <Sun className="absolute left-[300px] top-[176px] w-[190px]" />
      <Bird className="absolute left-[210px] top-[196px] w-[46px]" />
      <Bird className="absolute left-[470px] top-[168px] w-[34px]" />
      <Waves className="absolute left-0 top-[300px] w-full h-[34px] opacity-70" />
      <Boat className="absolute left-[52px] top-[266px] w-[70px]" />
      <GoanHouse className="absolute right-[26px] top-[250px] w-[124px]" />

      {/* ---- photo, off-axis ---- */}
      <div
        className="absolute left-[64px] top-[298px]"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div
          className="absolute -inset-[6px]"
          style={{ background: "var(--pink)", transform: "translate(6px, 6px)" }}
        />
        <div
          className="absolute -inset-[6px]"
          style={{ background: "var(--sun)", transform: "translate(-5px, -4px)" }}
        />
        <div
          className="relative p-[10px]"
          style={{ background: "var(--cream)", border: "3px solid var(--ink)" }}
        >
          <div
            className="relative overflow-hidden"
            style={{ width: 244, height: 288, background: "var(--cream-dim)" }}
          >
            {data.photo ? (
              <img
                src={data.photo}
                alt={data.name || "Pass holder"}
                className="h-full w-full object-cover"
                style={{ filter: "contrast(1.08) saturate(0.92)" }}
              />
            ) : (
              <div
                className="halftone flex h-full w-full items-center justify-center text-center"
                style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink)" }}
              >
                NO PHOTO
                <br />
                ON FILE
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0 halftone"
              style={{ opacity: 0.14 }}
            />
          </div>
        </div>
      </div>

      {/* palm crossing the photo — elements don't respect containers */}
      <Palm className="absolute left-[-8px] top-[300px] w-[132px]" />
      <Palm className="absolute right-[-16px] top-[352px] w-[136px]" flip />

      {/* ---- identity ---- */}
      <div className="absolute left-[64px] top-[618px] w-[430px]">
        <div
          className="leading-[0.82] uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 66,
            color: "var(--cream)",
          }}
        >
          {first}
        </div>
        {last && (
          <div
            className="leading-[0.82] uppercase pl-[54px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 66,
              color: "var(--sun)",
            }}
          >
            {last}
          </div>
        )}
      </div>

      {/* designation on a yellow strip, crossing the edge */}
      <div
        className="absolute left-[-8px] top-[730px] px-6 py-[6px]"
        style={{
          background: "var(--pink)",
          color: "var(--cream)",
          transform: `rotate(${rand(-1.2, 0.6)}deg)`,
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.22em",
        }}
      >
        {(data.designation || "").toUpperCase()}
      </div>

      <div
        className="absolute right-[30px] bottom-[26px] text-right"
        style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.14em" }}
      >
        <div
          className="mb-2 inline-block px-[10px] py-[3px]"
          style={{
            background: "var(--sun)",
            color: "var(--ink)",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "0.12em",
            transform: `rotate(${rand(-1.4, 1.4)}deg)`,
          }}
        >
          #FrameInGoa
        </div>
        <div style={{ color: "var(--sun)" }}>{(data.passType || "HOUSE PASS").toUpperCase()}</div>
        <div style={{ opacity: 0.85 }}>{data.idNumber || "HH26-0042"}</div>
      </div>

      <Scooter className="absolute left-[254px] bottom-[12px] w-[92px] opacity-90" />

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
      style={{ width: CARD_W, height: CARD_H, background: "var(--cream)", color: "var(--ink)" }}
    >
      <div className="absolute inset-[14px] border-[3px]" style={{ borderColor: "var(--ink)", opacity: 0.35 }} />

      <div className="absolute left-[46px] top-[44px]">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.3em" }}>
          HACKER HOUSE · GOA · INDIA
        </div>
        <div
          className="mt-3 leading-[0.9]"
          style={{ fontFamily: "var(--font-editorial)", fontSize: 52 }}
        >
          4 Days. One Rhythm.
          <br />
          Everything Intentional.
        </div>
      </div>

      <Sun className="absolute right-[34px] top-[36px] w-[110px] opacity-90" />
      <Waves className="absolute left-0 top-[210px] w-full h-[28px]" />

      <div className="absolute left-[46px] top-[262px] w-[400px]">
        <div
          className="mb-4 inline-block px-3 py-1"
          style={{
            background: "var(--goa)",
            color: "var(--cream)",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: "0.28em",
            transform: `rotate(${rand(-1, 1)}deg)`,
          }}
        >
          HOUSE RULES
        </div>
        {RULES.map((r, i) => (
          <div key={r} className="flex gap-4 py-[7px]" style={{ borderTop: "2px solid var(--ink)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--pink)" }}>
              0{i + 1}
            </span>
            <span
              className="uppercase leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28 }}
            >
              {r}
            </span>
          </div>
        ))}
      </div>

      <Palm className="absolute right-[10px] top-[280px] w-[150px]" />
      <GoanHouse className="absolute right-[130px] bottom-[172px] w-[96px]" />

      <div
        className="absolute left-[46px] bottom-[44px]"
        style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.9 }}
      >
        <div style={{ color: "var(--pink)" }}>{(data.passType || "HOUSE PASS").toUpperCase()}</div>
        <div>{data.idNumber || "HH26-0042"}</div>
        {data.organization && <div>{data.organization.toUpperCase()}</div>}
        {data.handle && <div style={{ color: "var(--goa)" }}>{data.handle}</div>}
      </div>

      <div
        className="absolute right-[44px] bottom-[164px] px-[10px] py-[4px]"
        style={{
          background: "var(--pink)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.14em",
          transform: `rotate(${rand(-1.5, 1.5)}deg)`,
        }}
      >
        #FrameInGoa
      </div>

      {/* studio mark on a printed green plaque */}
      <div
        className="absolute left-[42px] bottom-[176px] px-4 py-3"
        style={{ background: "var(--goa)", transform: `rotate(${rand(-2, 2)}deg)` }}
      >
        <img src={studioLogo} alt="2:41 PM Studio" className="w-[124px]" />
      </div>

      <div
        className="absolute right-[44px] bottom-[44px] halftone"
        style={{ width: 108, height: 108, border: "3px solid var(--ink)" }}
      />

      <Scooter className="absolute left-[300px] bottom-[46px] w-[96px]" />
    </div>
  );
}
