const themeOptions = {
  light: {
    mode: "light",

    // Nav Colors
    navItemTextColor: "rgba(32, 51, 84, 1)",
    navItemBackgroundColor: "",
    selectedNavTextColor: "#fff",
    selectedNavBackgroundColor: "rgba(32, 51, 84, 1)",

    primary: "rgba(32, 51, 84, 1)",
    colorOnPrimary: "#fff",

    secondary: "rgba(32, 51, 84, 1)",
    colorOnSecondary: "rgba(32, 51, 84, 1)",

    background: "#A7BFFF",
    surface: "rgba(108, 144, 238, 1)",

    // Text Colors
    titleText: "rgba(32, 51, 84, 1)",
    subTitleText: "rgba(32, 51, 84, 1)",
    bodyText: "rgba(32, 51, 84, 1)",
    textDisabled: "#999999",
    helperText: "rgba(32, 51, 84, 0.65)",

    disabled: "#cccccc",
    errorColor: "red",
    warning: "#f57c00",
    info: "#2196F3",
    success: "#4caf50",
  },
  dark: {
    mode: "dark",

    navItemTextColor: "#fff",
    navItemBackgroundColor: "",
    selectedNavTextColor: "#fff",
    selectedNavBackgroundColor: "rgba(170, 137, 242, 1)",

    primary: "rgba(170, 137, 242, 1)",
    colorOnPrimary: "#ffffff",

    secondary: "#fff",
    colorOnSecondary: "#000",

    background: "rgb(28, 27, 36)",
    surface: "rgba(72, 71, 73, 1)",

    // Text Colors
    titleText: "rgba(170, 137, 242, 1)",
    subTitleText: "#fff",
    bodyText: "#fff",
    textDisabled: "#666666",
    helperText: "rgba(255, 255, 255, 0.4)",

    disabled: "#444444",
    errorColor: "red",
    warning: "#f57c00",
    info: "#2196F3",
    success: "#4caf50",
  },
};

const keys1 = Object.keys(themeOptions.dark);
const keys2 = Object.keys(themeOptions.light);

const missingInObj1 = keys2.filter((k) => !(k in themeOptions.dark));
const missingInObj2 = keys1.filter((k) => !(k in themeOptions.light));

if (missingInObj2.length > 0) {
  throw new Error("❌ Keys missing in light theme:", missingInObj2);
}
if (missingInObj1.length > 0) {
  throw new Error("❌ Keys missing in dark theme:", missingInObj1);
}

export { themeOptions };
