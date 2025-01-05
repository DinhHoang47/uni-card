/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        allura: ["Allura", "cursive"],
      },
      colors: {
        "primary-orange": "#FF5722",
        "bg-primary": "#eff6ff",
        "outline-primary": "#d1d5db",
        "button-primary": "#2563eb",
        "button-secondary": "#fbbf24",
        "text-primary": "#334155",
        "text-secondary": "#9ca3af",
        "hover-primary": "#93c5fd",
        "focus-primary": "#93c5fd",
        "text-secondary": "#9CA3AF",
        "primary-light-bg": "#EFF6FF",
        "transparent-04": "rgba(0, 0, 0, 0.4)",
        "transparent-gray-05": "rgba(214, 210, 210, 0.5)",
        "transparent-gray-05-2": "rgba(86, 92, 105, 0.5)",
        "transparent-gray-06": "rgba(86, 92, 105, 0.6)",
        "transparent-white-05": "rgba(255, 255, 255, 0.5)",
        "transparent-white-07": "rgba(255, 255, 255, 0.7)",
        "transparent-blue-06": "rgba(115, 161, 230, 0.6)",
      },
      keyframes: {
        bounceLeft: {
          from: { transform: `translateX(0)` },
          to: { transform: `translateX(100%)` },
        },
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
};
