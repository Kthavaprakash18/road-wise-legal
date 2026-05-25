import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileCheck, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/documents")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Document Validity Checker — DriveLegal" },
      { name: "description", content: "Check the validity of your Driving License, RC, Insurance and Pollution Certificate. Get expiry alerts before they cost you a fine." },
    ],
  }),
});

type DocKey = "dl" | "rc" | "insurance" | "puc";
const docs: { key: DocKey; label: string; help: string }[] = [
  { key: "dl", label: "Driving License", help: "Renew up to 1 year before/after expiry without test." },
  { key: "rc", label: "RC Book", help: "Vehicle registration is valid for 15 years (private)." },
  { key: "insurance", label: "Insurance", help: "Mandatory third-party cover under MV Act §146." },
  { key: "puc", label: "Pollution Certificate (PUC)", help: "Required at all times. Renew every 6 months." },
];

function statusFor(date: string) {
  if (!date) return null;
  const d = new Date(date);
  const now = new Date();
  const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { kind: "expired" as const, days: -diff };
  if (diff <= 30) return { kind: "soon" as const, days: diff };
  return { kind: "ok" as const, days: diff };
}

function DocsPage() {
  const [dates, setDates] = useState<Record<DocKey, string>>({
    dl: "", rc: "", insurance: "", puc: "",
  });

  const summary = useMemo(() => {
    return docs.map((d) => ({ ...d, status: statusFor(dates[d.key]) }));
  }, [dates]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-primary">
        <FileCheck className="h-4 w-4" /> Document Verification
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">
        Are your <span className="text-gradient">documents valid?</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Enter expiry dates and we'll flag anything that's expired or expiring in the next 30 days.
        Carrying an invalid PUC alone can cost up to ₹10,000.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {summary.map((d) => {
          const s = d.status;
          const tone =
            !s ? "border-border" :
            s.kind === "expired" ? "border-destructive/60 bg-destructive/10" :
            s.kind === "soon" ? "border-warning/60 bg-warning/10" :
            "border-success/60 bg-success/10";
          return (
            <div key={d.key} className={`rounded-2xl border p-6 transition-colors ${tone}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{d.label}</h3>
                {s?.kind === "expired" && <AlertCircle className="h-5 w-5 text-destructive" />}
                {s?.kind === "soon" && <AlertCircle className="h-5 w-5 text-warning" />}
                {s?.kind === "ok" && <CheckCircle2 className="h-5 w-5 text-success" />}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{d.help}</p>
              <label className="mt-4 block text-xs uppercase tracking-wide text-muted-foreground">
                Expiry date
              </label>
              <div className="mt-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={dates[d.key]}
                  onChange={(e) => setDates({ ...dates, [d.key]: e.target.value })}
                  className="flex-1 bg-input border border-border rounded-md px-3 py-2 text-sm"
                />
              </div>
              {s && (
                <p className={`mt-3 text-sm font-medium ${
                  s.kind === "expired" ? "text-destructive" :
                  s.kind === "soon" ? "text-warning" : "text-success"
                }`}>
                  {s.kind === "expired" && `Expired ${s.days} day${s.days === 1 ? "" : "s"} ago — renew immediately.`}
                  {s.kind === "soon" && `Expires in ${s.days} day${s.days === 1 ? "" : "s"} — renew soon.`}
                  {s.kind === "ok" && `Valid for ${s.days} more days.`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
