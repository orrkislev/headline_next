/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: "blue",
      },
      screens: {
        'xs': '600px',    // Mobile (600px+)
        'sm': '915px',    // Tablet (915px+)
        'md': '1024px',   // HD Ready (1024px+)
        'lg': '1366px',   // HD (1366px+)
        'xl': '1600px',   // HD+ (1600px+)
        'fhd': '1920px',  // Full HD (1920px+)
        'qhd': '2560px'   // 2K/QHD (2560px+)
      }
    },
  },
};
