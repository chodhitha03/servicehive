import { Button } from "../ui/Button";
import { useAuth } from "../../store/auth";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white/70 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
          Lead Management
        </p>
        <h2 className="font-display text-2xl text-ink-900">Smart Leads</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-ink-900">{user?.name}</p>
          <p className="text-xs text-ink-500">{user?.role}</p>
        </div>
        <Button variant="ghost" onClick={() => void logout()}>
          Sign out
        </Button>
      </div>
    </header>
  );
};