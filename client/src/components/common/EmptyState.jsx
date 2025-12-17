// client/src/components/common/EmptyState.jsx

const EmptyState = ({
  title = "Nothing here yet",
  description = "There is no content to display right now.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-10 text-center">
      <h2 className="text-sm font-semibold tracking-[0.2em] text-slate-200 uppercase">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-md text-xs text-slate-400">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-full border border-sky-500 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-200 hover:bg-sky-500/20"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
