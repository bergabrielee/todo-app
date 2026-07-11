export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function getInitialTheme(
  storage: Pick<Storage, "getItem">,
  prefersDark: boolean
): Theme {
  const stored = storage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return prefersDark ? "dark" : "light";
}

export function toggleTheme(current: Theme): Theme {
  return current === "dark" ? "light" : "dark";
}

export function persistTheme(storage: Pick<Storage, "setItem">, theme: Theme): void {
  storage.setItem(STORAGE_KEY, theme);
}

export function applyTheme(root: HTMLElement, theme: Theme): void {
  root.setAttribute("data-theme", theme);
}
