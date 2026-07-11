import { applyTheme, getInitialTheme, persistTheme, toggleTheme, type Theme } from "./theme";

let theme: Theme;

export function initThemeToggle(): void {
  const button = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  const root = document.documentElement;
  if (!button) {
    return;
  }

  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme = getInitialTheme(window.localStorage, prefersDark);
  applyTheme(root, theme);
  updateToggleLabel(button);

  button.addEventListener("click", () => {
    theme = toggleTheme(theme);
    applyTheme(root, theme);
    persistTheme(window.localStorage, theme);
    updateToggleLabel(button);
  });
}

function updateToggleLabel(button: HTMLButtonElement): void {
  button.textContent = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

document.addEventListener("DOMContentLoaded", initThemeToggle);
