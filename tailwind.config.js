module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        game_blue: "rgba(34, 53, 71, 1)",
        button_blue: "rgba(21, 101, 157, 1)",
      },
    },
  },
  plugins: [],
};
