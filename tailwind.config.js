export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)", // Corrected property name
        active: "var(--color-active)",
        title: "var(--color-title)", // Changed property name to lowercase
        text: "var(--color-text)",
        darkButton: "var(--color-darkButton)",
        button: "var(--color-button)",
        buttonText: "var(--color-buttonText)",
      },
      height: {
        screenHeight: "calc(100vh - 6rem)",
      },
    },
  },
  plugins: [require("daisyui")],
};
