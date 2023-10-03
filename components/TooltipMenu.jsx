import { useEffect } from "react";

export default function TooltipMenu({ setIsOpen, children }) {
  useEffect(() => {
    const closeThis = () => {
      setIsOpen(false);
    };
    window.addEventListener("click", closeThis, false);
    return () => window.removeEventListener("click", closeThis);
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute top-full translate-y-2 right-0 p-1 bg-white border rounded"
    >
      {children}
    </div>
  );
}
