export default function AmberButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-amber-400 text-slate-700 font-semibold rounded-md px-4"
    >
      {children}
    </button>
  );
}
