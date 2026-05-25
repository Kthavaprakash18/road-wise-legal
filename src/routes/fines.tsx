import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, IndianRupee, Scale } from "lucide-react";
import { STATES, VIOLATIONS, type StateCode } from "@/lib/traffic-data";

export const Route = createFileRoute("/fines")({
  component: FinesPage,
  head: () => ({
    meta: [
      { title: "Fine & Penalty Calculator — DriveLegal" },
      { name: "description", content: "Calculate and compare traffic-violation fines across all Indian states. Updated penalties under the Motor Vehicles Act." },
    ],
  }),
});

function FinesPage() {
  const [state, setState] = useState<StateCode>("TN");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const total = selected.reduce((sum, id) => {
    const v = VIOLATIONS.find((v) => v.id === id);
    return sum + (v?.fines[state] ?? 0);
  }, 0);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-primary">
        <Calculator className="h-4 w-4" /> Fine Calculator
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">
        Compare <span className="text-gradient">penalties</span> across India
      </h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Pick your state, tap the violations, and see the total cost — plus the legal
        consequence for each offence.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">State:</span>
        <select
          value={state}
          onChange={(e) => setState(e.target.value as StateCode)}
          className="rounded-md bg-input border border-border px-3 py-2 text-sm"
        >
          {STATES.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {VIOLATIONS.map((v) => {
            const fine = v.fines[state] ?? 0;
            const checked = selected.includes(v.id);
            return (
              <button
                key={v.id}
                onClick={() => toggle(v.id)}
                className={`text-left rounded-2xl border p-5 transition-all ${
                  checked
                    ? "border-primary bg-primary/10 shadow-[var(--shadow-glow)]"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{v.label}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{v.description}</p>
                  </div>
                  <div className="flex items-center text-warning font-display font-bold">
                    <IndianRupee className="h-4 w-4" />{fine.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Scale className="h-3.5 w-3.5" /> {v.consequence}
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-6 h-fit lg:sticky lg:top-24">
          <div className="text-sm text-muted-foreground">Estimated total fine</div>
          <div className="mt-2 flex items-baseline gap-1">
            <IndianRupee className="h-7 w-7 text-warning" />
            <span className="text-5xl font-bold font-display text-gradient">
              {total.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {selected.length} violation{selected.length === 1 ? "" : "s"} selected
          </div>

          <hr className="my-5 border-border" />

          <div className="space-y-2 max-h-60 overflow-auto">
            {selected.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Tap violations on the left to build your estimate.
              </p>
            )}
            {selected.map((id) => {
              const v = VIOLATIONS.find((x) => x.id === id)!;
              return (
                <div key={id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate pr-2">{v.label}</span>
                  <span className="font-mono">₹{(v.fines[state] ?? 0).toLocaleString("en-IN")}</span>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-[11px] text-muted-foreground">
            Indicative figures based on the MV (Amendment) Act, 2019 and state notifications.
            Always verify with your local RTO.
          </p>
        </div>
      </div>
    </div>
  );
}
