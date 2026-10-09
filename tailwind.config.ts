import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F4F6F8",
        teal: {
          DEFAULT: "#16324F",
          hover: "#10263D"
        },
        sage: "#DCE4EA",
        coral: "#C58A4A",
        ink: "#1F2933",
        muted: "#E8EDF1",
        secondary: "#5B6770",
        success: "#2F6B52",
        warning: "#956C19",
        danger: "#9B3A3A"
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "Arial", "sans-serif"],
        body: ["Inter", "Noto Sans Malayalam", "Arial", "sans-serif"]
      },
      boxShadow: {
        hard: "4px 4px 0 #7B8794",
        "hard-sm": "2px 2px 0 #7B8794"
      },
      borderRadius: {
        panel: "8px"
      }
    }
  },
  plugins: []
};

export default config;
