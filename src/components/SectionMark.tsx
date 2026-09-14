import { Reveal } from "./Reveal";

/** Small chapter label: number + running title, sitting on a hairline. */
export function SectionMark({ number, title, tone = "dark", className }: { number: string; title: string; tone?: "dark" | "light"; className?: string }) {
  const color = tone === "dark" ? "text-brown/80" : "text-sand/80";
  const rule = tone === "dark" ? "bg-ink/15" : "bg-ivory/20";
  return (
    <Reveal className={`flex items-center gap-4 ${className ?? ""}`} y={12}>
      <span className={`eyebrow ${color}`}>{number}</span>
      <span className={`h-px w-10 ${rule}`} />
      <span className={`eyebrow ${color}`}>{title}</span>
    </Reveal>
  );
}
