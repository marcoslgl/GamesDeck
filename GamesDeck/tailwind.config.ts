import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        bg: "var(--color-bg)",
        bgSecondary: "var(--color-bg-secondary)",
        bgTertiary: "var(--color-bg-tertiary)",
        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",
        secondary: "var(--color-text-secondary)",
        main: "var(--color-text-main)",
        accent: "var(--color-accent)",
        "dark-deep": "var(--color-bg)",
      },
    },
  },
};
