import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ open, title, onClose, children, footer }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-ink-900">{title}</h2>
          <button
            className="text-sm text-ink-500 hover:text-ink-900"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </div>
  );
};