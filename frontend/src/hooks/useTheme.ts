import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

export function useTheme() {
    const theme = useContext(themeContext);

    if (theme === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return theme;
}
