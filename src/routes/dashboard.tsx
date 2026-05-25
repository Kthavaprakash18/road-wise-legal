import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, TrendingUp, MapPinned, AlertTriangle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Safety Analytics Dashboard — DriveLegal" },
      { name: "description", content: "Insights into common violations, accident-prone zones and driver behavior trends across India." },
    ],
  }),
});

const violationData = [
  { name: "No Helmet", count: 1240 },
  { name: "Overspeed", count: 980 },
  { name: "Signal Jump", count: 760 },
  { name: "Mobile Use", count: 540 },
  { name: "No Seatbelt", count: 420 },
  { name: "Drunk Drive", count: 180 },
];

const behaviorData = [
  { name: "Safe", value: 62 },
  { name: "Moderate", value: 26 },
  { name: "Risky", value: 12 },
];
const COLORS = ["oklch(0.78 0.16 155)", "oklch(0.82 0.17 75)", "oklch(0.66 0.24 25)"];

const hotspots = [
  { city: "Mumbai", area: "Western Express Hwy", incidents: 412 },
  { city: "Bengaluru", area: "Outer Ring Road", incidents: 367 },
  { city: "Chennai", area: "GST Road", incidents: 294 },
  { city: "Delhi", area: "Ring Road", incidents: 388 },
  { city: "Hyderabad", area: "PVNR Expressway", incidents: 251 },
];

function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-primary">
        <BarChart3 className="h-4 w-4" /> Safety Analytics
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">
        Road safety <span className="text-gradient">in numbers</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Aggregated trends across DriveLegal users and partner RTOs. (Demo data)
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Reports this month", value: "12,420", icon: TrendingUp, tone: "text-primary" },
          { label: "Hotspots tracked", value: "186", icon: MapPinned, tone: "text-accent" },
          { label: "Lives saved (est.)", value: "342", icon: AlertTriangle, tone: "text-success" },
          { label: "Avg. response time", value: "6m 12s", icon: BarChart3, tone: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.tone}`} />
            </div>
            <div className="mt-3 font-display text-3xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">Most common violations</h3>
          <p className="text-xs text-muted-foreground">Last 30 days · all states</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={violationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 260)" />
                <XAxis dataKey="name" stroke="oklch(0.72 0.025 250)" fontSize={12} />
                <YAxis stroke="oklch(0.72 0.025 250)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.21 0.035 260)",
                    border: "1px solid oklch(0.32 0.04 260)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="count" fill="oklch(0.78 0.18 220)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">Driver behavior</h3>
          <p className="text-xs text-muted-foreground">Risk distribution</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={behaviorData} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={4}>
                  {behaviorData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Legend />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.21 0.035 260)",
                    border: "1px solid oklch(0.32 0.04 260)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h3 className="font-semibold">Accident-prone hotspots</h3>
        <div className="mt-4 divide-y divide-border">
          {hotspots.map((h, i) => (
            <div key={h.area} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-warning/15 text-warning flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <div className="font-medium">{h.area}</div>
                  <div className="text-xs text-muted-foreground">{h.city}</div>
                </div>
              </div>
              <div className="font-mono text-sm text-warning">{h.incidents} incidents</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
