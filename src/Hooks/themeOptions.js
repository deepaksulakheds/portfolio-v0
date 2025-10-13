const themeOptions = {
  dark: {
    // Mode
    mode: "dark",

    // Navbar
    navbarBackground: "rgba(72, 71, 73, 1)",
    navbarListItem: "rgba(255, 255, 255, 1)",
    navbarSelectedItem: "rgba(255, 255, 255, 1)",

    // Background
    themeBackground: "rgb(34, 32, 36)",
    bodyBackground: "rgba(72, 71, 73, 1)",
    cardBackground: "rgba(255, 255, 255, 0.1)",
    containerShadowColor: "rgba(255, 255, 255, 1)",

    // Theme
    themeColor: "rgb(102, 104, 237)",
    dullThemeColor: "rgba(21, 101, 192, 0.4)",
    borderColor: "rgba(21, 101, 192, 0.2)",
    themeIcons: "#fff",

    // Opposite Theme
    oppositeTheme: "#fff",
    dullOppositeTheme: "rgba(255,255,255, 0.5)",
    oppositeText: "#fff",

    // No theme
    noThemeColor: "#fff",
    noThemeBackground: "rgba(255,255,255, 0.5)",

    // Text Colors
    titleText: "#fff",
    subTitleText: "#ffffffde",
    bodyText: "#fff",

    // Info Colors
    successColor: "green",
    errorColor: "red",
    infoColor: "#2196F3",
    disabledColor: "rgba(255, 0, 0, 0.7)",
    blackText: "#000",

    // Common Colors
    white: "#fff",
    lightWhite: "rgba(255,255,255,0.6)",
    black: "#000",
    lightBlack: "rgba(0,0,0,0.6)",

    // Trash Colors
    trashText: "#7f808dff",
    trashBackground: "rgba(103, 109, 118, 0.3)",
  },
  light: {
    // Mode
    mode: "light",

    // Navbar
    navbarBackground: "rgba(108, 144, 238, 1)",
    navbarListItem: "rgba(36, 36, 36, 1)",
    navbarSelectedItem: "rgba(255, 255, 255, 1)",

    // Background
    themeBackground: "#A7BFFF",
    bodyBackground: "rgba(108, 144, 238, 0.5)",
    cardBackground: "rgba(108, 144, 238, 0.5)",
    containerShadowColor: "rgba(0, 0, 0, 1)",

    // Theme
    themeColor: "#203354",
    dullThemeColor: "rgba(108, 144, 238, 0.5)",
    borderColor: "rgba(0, 0, 0, 0.3)",
    themeIcons: "#203354",

    // Opposite Theme
    oppositeTheme: "#203354",
    dullOppositeTheme: "rgba(32, 51, 84, 0.6)",
    oppositeText: "#000",

    // No theme
    noThemeColor: "#fff",
    noThemeBackground: "rgba(255,255,255, 0.5)",

    // Text Colors
    titleText: "#203354",
    subTitleText: "#222222",
    bodyText: "#000",

    // Info Colors
    successColor: "green",
    errorColor: "red",
    infoColor: "#2196F3",
    disabledColor: "rgba(255, 0, 0, 0.7)",
    blackText: "#000",

    // Common Colors
    white: "#fff",
    lightWhite: "rgba(255,255,255,0.6)",
    black: "#000",
    lightBlack: "rgba(0,0,0,0.6)",

    // Trash Colors
    trashText: "#2e2e2e",
    trashBackground: "rgba(0, 0, 0, 0.2)",
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
