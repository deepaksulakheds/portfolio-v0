const themeOptions = {
  light: {
    mode: "light",

    // Nav Colors
    navItemTextColor: "#444a51",
    navItemBackgroundColor: "",
    selectedNavTextColor: "rgba(32, 51, 84, 1)",
    selectedNavBackgroundColor: "rgba(32, 51, 84, 1)",

    primary: "rgba(32, 51, 84, 1)",
    lightPrimary: "rgba(32, 51, 84, 0.5)",
    colorOnPrimary: "#fff",

    secondary: "rgba(32, 51, 84, 1)",
    lightSecondary: "rgba(32, 51, 84, 0.5)",
    colorOnSecondary: "rgba(32, 51, 84, 1)",

    background: "#fff",
    surface: "rgb(219, 219, 219)",

    // Text Colors
    titleText: "rgba(32, 51, 84, 1)",
    subTitleText: "rgba(32, 51, 84, 1)",
    bodyText: "rgba(32, 51, 84, 1)",
    textDisabled: "#999999",
    helperText: "rgba(32, 51, 84, 0.65)",

    disabledBackground: "rgba(0, 0, 0, 0.2)",
    disabled: "#2e2e2e",
    errorColor: "red",
    warning: "#f57c00",
    info: "#2196F3",
    success: "#4caf50",
  },
  dark: {
    mode: "dark",

    navItemTextColor: "#fff",
    navItemBackgroundColor: "",
    selectedNavTextColor: "rgba(170, 137, 242, 1)",
    selectedNavBackgroundColor: "rgba(170, 137, 242, 1)",

    primary: "rgba(170, 137, 242, 1)",
    lightPrimary: "rgba(170, 137, 242, 0.5)",
    colorOnPrimary: "#ffffff",

    secondary: "#fff",
    lightSecondary: "rgba(255, 255, 255, 0.5)",
    colorOnSecondary: "#000",

    background: "rgb(28, 27, 36)",
    surface: "rgba(50, 49, 54, 1)",

    // Text Colors
    titleText: "rgba(170, 137, 242, 1)",
    subTitleText: "#fff",
    bodyText: "#fff",
    textDisabled: "#666666",
    helperText: "rgba(255, 255, 255, 0.4)",

    disabled: "#7f808dff",
    disabledBackground: "rgba(103, 109, 118, 0.3)",
    errorColor: "red",
    warning: "#f57c00",
    info: "#2196F3",
    success: "#4caf50",

    // Trash Colors
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
