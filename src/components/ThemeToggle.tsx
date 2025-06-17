import React from "react";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Toggle theme">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
};

export default ThemeToggle;
