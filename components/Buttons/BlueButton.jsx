export default function BlueButton({ children, ...props }) {
  return (
    <button {...props} className="bg-blue-700 text-white rounded-md px-4">
      {children}
    </button>
  );
}
