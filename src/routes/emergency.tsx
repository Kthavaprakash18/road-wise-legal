import { createFileRoute } from "@tanstack/react-router";
import { Siren, Phone, MapPin, Heart, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/emergency")({
  component: EmergencyPage,
  head: () => ({
    meta: [
      { title: "Emergency & SOS — DriveLegal" },
      { name: "description", content: "One-tap SOS, accident reporting, and quick-dial for police, ambulance, and highway helpline." },
    ],
  }),
});

const contacts = [
  { label: "Police", number: "100", icon: Shield, tone: "primary" },
  { label: "Ambulance", number: "108", icon: Heart, tone: "destructive" },
  { label: "Highway Helpline", number: "1033", icon: AlertTriangle, tone: "warning" },
  { label: "Women Helpline", number: "1091", icon: Phone, tone: "accent" },
];

function EmergencyPage() {
  const [coords, setCoords] = useState<string>("");
  const [sosActive, setSosActive] = useState(false);

  const triggerSos = () => {
    setSosActive(true);
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setCoords(`${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`),
        () => setCoords("Unable to fetch location — please enable GPS."),
      );
    }
    setTimeout(() => setSosActive(false), 5000);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-destructive">
        <Siren className="h-4 w-4" /> Emergency & Safety
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">
        Help is one <span className="text-gradient">tap away</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Use the SOS button to broadcast your location, or tap a service below to dial directly.
      </p>

      <div className="mt-10 rounded-3xl border border-destructive/40 bg-gradient-to-br from-destructive/15 to-warning/10 p-8 md:p-12 text-center relative overflow-hidden">
        {sosActive && (
          <div className="absolute inset-0 bg-destructive/20 animate-pulse" />
        )}
        <div className="relative">
          <button
            onClick={triggerSos}
            className="relative inline-flex h-36 w-36 items-center justify-center rounded-full bg-destructive text-destructive-foreground font-display text-3xl font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            <span className="absolute inset-0 rounded-full bg-destructive animate-ping opacity-30" />
            SOS
          </button>
          <p className="mt-6 text-sm text-muted-foreground">
            Tap to share your live location with emergency contacts.
          </p>
          {coords && (
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-mono bg-card border border-border px-3 py-1.5 rounded-full">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {coords}
            </p>
          )}
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-bold">Quick dial</h2>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={`tel:${c.number}`}
            className="rounded-2xl border border-border bg-card p-5 hover:border-primary/60 transition-colors group"
          >
            <c.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <div className="mt-4 text-sm text-muted-foreground">{c.label}</div>
            <div className="font-display text-3xl font-bold text-gradient">{c.number}</div>
          </a>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold">Accident-response checklist</h2>
      <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal pl-5">
        <li>Move to a safe spot. Switch on hazard lights.</li>
        <li>Dial 108 (ambulance) for any injury, however minor.</li>
        <li>Photograph the scene, vehicle position, and number plates.</li>
        <li>Exchange license, RC and insurance details with the other party.</li>
        <li>File an FIR within 24 hours at the nearest police station.</li>
        <li>Report the incident to your insurer immediately to claim cover.</li>
      </ol>
    </div>
  );
}
