// client/src/app/providers/UIProvider.jsx
import { createContext, useCallback, useContext, useState } from "react";

/**
 * UIContext gives you:
 * - showToast(message, variant)
 * - showSuccess(message)
 * - showError(message)
 * - loading (bool)
 * - startLoading() / stopLoading()
 */
const UIContext = createContext(null);

// Simple internal Toast component (no external imports needed)
const Toast = ({ toast, onClose }) => {
  const base =
    "flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg text-sm border";

  const variantClasses =
    toast.variant === "error"
      ? "bg-red-900/80 border-red-500 text-red-50"
      : toast.variant === "success"
      ? "bg-emerald-900/80 border-emerald-500 text-emerald-50"
      : "bg-slate-800/90 border-slate-500 text-slate-50";

  return (
    <div className={`${base} ${variantClasses}`}>
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-xs uppercase tracking-wide opacity-75 hover:opacity-100"
      >
        Close
      </button>
    </div>
  );
};

export const UIProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(
    () => setLoadingCount((c) => c + 1),
    []
  );
  const stopLoading = useCallback(
    () => setLoadingCount((c) => Math.max(0, c - 1)),
    []
  );

  const showToast = useCallback((message, variant = "info", timeout = 3500) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, variant };

    setToasts((prev) => [...prev, toast]);

    if (timeout) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, timeout);
    }
  }, []);

  const showSuccess = useCallback(
    (message, timeout) => showToast(message, "success", timeout),
    [showToast]
  );

  const showError = useCallback(
    (message, timeout) => showToast(message, "error", timeout),
    [showToast]
  );

  const value = {
    // toast helpers
    showToast,
    showSuccess,
    showError,
    // loading overlay helpers
    loading: loadingCount > 0,
    startLoading,
    stopLoading
  };

  return (
    <UIContext.Provider value={value}>
      {children}

      {/* Loading overlay */}
      {loadingCount > 0 && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 pointer-events-none">
          <div className="pointer-events-auto rounded-xl bg-black/80 px-4 py-3 text-sm text-slate-100 border border-slate-700">
            Loading…
          </div>
        </div>
      )}

      {/* Toast stack (bottom-right) */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              toast={toast}
              onClose={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            />
          </div>
        ))}
      </div>
    </UIContext.Provider>
  );
};

// Hook for components to use UI helpers
export const useUI = () => {
  const ctx = useContext(UIContext);
  if (ctx === null) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return ctx;
};

// Default export so main.jsx can `import UIProvider from "./app/providers/UIProvider.jsx"`
export default UIProvider;
