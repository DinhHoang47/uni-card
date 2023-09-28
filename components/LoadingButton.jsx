export default function LoadingButton({ color, text, loading, handler }) {
  return (
    <button
      onClick={() => {
        handler();
      }}
      disabled={loading}
      className={`bg-${color}-600 w-full h-10 rounded inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow text-white transition ease-in-out duration-150`}
    >
      {loading && (
        <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
      )}
      {text}
    </button>
  );
}
