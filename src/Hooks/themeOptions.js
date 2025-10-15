const themeOptions = {
  light: {
    mode: "light",

    // Nav Colors
    navItemTextColor: "#203354",
    navItemBackgroundColor: "",
    selectedNavTextColor: "#fff",
    selectedNavBackgroundColor: "#203354",

    primary: "#203354",
    colorOnPrimary: "#fff",

    secondary: "#fff",
    colorOnSecondary: "#203354",

    background: "#A7BFFF",
    surface: "rgba(108, 144, 238, 1)",

    // Text Colors
    titleText: "#203354",
    subTitleText: "#203354",
    bodyText: "#203354",
    textDisabled: "#999999",
    helperText: "#999999",

    disabled: "#cccccc",
    error: "#b00020",
    warning: "#f57c00",
    info: "#2196f3",
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

    background: "rgb(34, 32, 36)",
    surface: "rgba(72, 71, 73, 1)",

    // Text Colors
    titleText: "#fff",
    subTitleText: "#fff",
    bodyText: "#fff",
    textDisabled: "#666666",
    helperText: "#999999",

    disabled: "#444444",
    error: "#cf6679",
    warning: "#f57c00",
    info: "#2196f3",
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
