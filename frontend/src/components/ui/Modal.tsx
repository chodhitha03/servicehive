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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
          <h2 className="font-display text-xl font-semibold tracking-tight text-gray-900 dark:text-white dark:text-black">{title}</h2>
          <button
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black transition-colors"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
        {footer ? <div className="mt-8 flex justify-end gap-3">{footer}</div> : null}
      </div>
    </div>
  );
};