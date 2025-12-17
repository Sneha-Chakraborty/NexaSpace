// client/src/components/common/Loader.jsx

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-slate-300 text-sm">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
