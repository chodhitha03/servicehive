export const FullPageLoader = () => (
  <div className="min-h-screen grid place-items-center">
    <div className="flex items-center gap-3 rounded-md bg-white dark:bg-[#0a0a0a] px-6 py-4 shadow-soft">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
      <span className="text-sm text-ink-700">Loading workspace...</span>
    </div>
  </div>
);