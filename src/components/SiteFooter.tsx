import { Shield } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-display font-semibold">DriveLegal</span>
          <span className="text-sm text-muted-foreground ml-2">
            Know the Law Before You Break It.
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} DriveLegal · Smart Traffic Law & Fine Awareness
        </p>
      </div>
    </footer>
  );
}
