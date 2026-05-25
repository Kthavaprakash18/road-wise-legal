import { Link } from "@tanstack/react-router";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/rules", label: "Rules" },
  { to: "/fines", label: "Fines" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/documents", label: "Documents" },
  { to: "/emergency", label: "Emergency" },
  { to: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 blur-md bg-primary/40 -z-10" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Drive<span className="text-gradient">Legal</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-md text-sm text-primary bg-secondary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/assistant"
          className="hidden md:inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-shadow"
        >
          Ask AI
        </Link>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border px-6 py-4 space-y-1 bg-surface">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
