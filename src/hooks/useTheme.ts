import { useContext } from "react";
import ThemeContext, { type Theme } from "../context/ThemeContext";

export function useTheme(): {
    theme: Theme;
    setTheme: (t: Theme) => void;
} {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
}
