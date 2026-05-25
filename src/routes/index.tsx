import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin, Calculator, Bot, FileCheck, Siren, BarChart3,
  ArrowRight, Sparkles, ShieldAlert,
} from "lucide-react";
import heroImg from "@/assets/hero-road.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "DriveLegal — Smart Traffic Law & Fine Awareness" },
      { name: "description", content: "Location-aware traffic rules, AI legal assistant, fine calculator, document checks and SOS tools — all in one road safety platform." },
    ],
  }),
});

const features = [
  { to: "/rules", icon: MapPin, title: "Location-Aware Rules", desc: "Live state-wise speed limits, helmet, seatbelt and lane laws." },
  { to: "/fines", icon: Calculator, title: "Fine Calculator", desc: "Instant penalty estimates compared across all Indian states." },
  { to: "/assistant", icon: Bot, title: "AI Legal Assistant", desc: "Ask any traffic-law question. Powered by Lovable AI." },
  { to: "/documents", icon: FileCheck, title: "Document Checker", desc: "Validate DL, RC, Insurance and PUC expiry in one click." },
  { to: "/emergency", icon: Siren, title: "Emergency & SOS", desc: "Locate hospitals, police stations & share live SOS alerts." },
  { to: "/dashboard", icon: BarChart3, title: "Safety Dashboard", desc: "Insights into violations, hotspots and driver behavior." },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered Indian traffic law platform
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-[1.05]">
              Know the Law <br />
              <span className="text-gradient">Before You Break It.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              DriveLegal turns the Motor Vehicles Act into a live, location-aware
              guide. Real-time rules, fine calculators, document checks, and an
              AI assistant that speaks your language.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:translate-y-[-1px] transition-transform"
              >
                Ask the AI Assistant <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/fines"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                Check Fines
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "28+", v: "States covered" },
                { k: "200+", v: "Rules indexed" },
                { k: "24/7", v: "AI guidance" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-3xl font-bold text-gradient">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden border border-border glass">
              <img
                src={heroImg}
                alt="Glowing futuristic highway with holographic legal symbols"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 max-w-[220px] shadow-xl">
              <div className="flex items-center gap-2 text-warning">
                <ShieldAlert className="h-4 w-4" />
                <span className="text-xs font-semibold">Live alert</span>
              </div>
              <p className="mt-2 text-sm">Speed zone 50 km/h ahead — school nearby.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Everything a driver needs</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Six modules engineered to prevent violations — not just process them after the fact.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:translate-y-[-2px] transition-all"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-colors" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-10 md:p-14">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              Smart driving begins with <span className="text-gradient">legal awareness.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you're commuting in Chennai or road-tripping through Maharashtra,
              DriveLegal keeps you informed, compliant, and safe — in real time.
            </p>
            <Link
              to="/rules"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:shadow-[var(--shadow-amber)] transition-shadow"
            >
              Explore your state's rules <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
