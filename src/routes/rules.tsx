import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Gauge, Shield, AlertTriangle } from "lucide-react";
import { STATES, SPEED_LIMITS, STATE_RULES, type StateCode } from "@/lib/traffic-data";

export const Route = createFileRoute("/rules")({
  component: RulesPage,
  head: () => ({
    meta: [
      { title: "State-wise Traffic Rules — DriveLegal" },
      { name: "description", content: "Browse helmet, seatbelt, speed and lane rules for every Indian state. Updated, location-aware, and easy to compare." },
    ],
  }),
});

function RulesPage() {
  const [state, setState] = useState<StateCode>("TN");
  const stateData = STATES.find((s) => s.code === state)!;
  const limits = SPEED_LIMITS[state];
  const rules = STATE_RULES[state];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-primary">
        <MapPin className="h-4 w-4" /> Location-Aware Rules
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">Traffic rules in <span className="text-gradient">{stateData.name}</span></h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Select your state to see updated speed limits, helmet & seatbelt requirements,
        and locally enforced regulations.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {STATES.map((s) => (
          <button
            key={s.code}
            onClick={() => setState(s.code)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              state === s.code
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {[
          { label: "City limit", value: limits.city, sub: "Within city/town roads" },
          { label: "Highway", value: limits.highway, sub: "State / National highways" },
          { label: "Expressway", value: limits.expressway, sub: "Access-controlled expressways" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Gauge className="h-4 w-4 text-primary" /> {s.label}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold font-display text-gradient">{s.value}</span>
              <span className="text-muted-foreground">km/h</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-success font-semibold">
            <Shield className="h-4 w-4" /> Mandatory safety equipment
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><span className="text-success">✓</span> ISI-marked helmet for rider & pillion (two-wheelers).</li>
            <li className="flex gap-2"><span className="text-success">✓</span> Seatbelts for driver and all passengers.</li>
            <li className="flex gap-2"><span className="text-success">✓</span> Valid PUC certificate at all times.</li>
            <li className="flex gap-2"><span className="text-success">✓</span> Reflective tapes on heavy vehicles.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-warning font-semibold">
            <AlertTriangle className="h-4 w-4" /> State-specific notes
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {rules.map((r, i) => (
              <li key={i} className="flex gap-2 text-muted-foreground">
                <span className="text-warning mt-0.5">•</span> {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
