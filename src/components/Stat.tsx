"use client";

type StatProps = {
  value: string;
  label: string;
};

// Compact stat block for key metrics.
export default function Stat({ value, label }: StatProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 text-black shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-2 text-sm text-black/60">{label}</div>
    </div>
  );
}
