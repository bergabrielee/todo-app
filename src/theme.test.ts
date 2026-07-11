import { describe, expect, it, vi } from "vitest";
import { applyTheme, getInitialTheme, persistTheme, toggleTheme } from "./theme";

function createFakeStorage(initial: Record<string, string> = {}): Storage {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
    clear: () => data.clear(),
    key: () => null,
    get length() {
      return data.size;
    },
  } as Storage;
}

describe("getInitialTheme", () => {
  it("returns the stored theme when present", () => {
    const storage = createFakeStorage({ theme: "dark" });
    expect(getInitialTheme(storage, false)).toBe("dark");
  });

  it("falls back to the system preference when nothing is stored", () => {
    const storage = createFakeStorage();
    expect(getInitialTheme(storage, true)).toBe("dark");
    expect(getInitialTheme(storage, false)).toBe("light");
  });
});

describe("toggleTheme", () => {
  it("switches between light and dark", () => {
    expect(toggleTheme("light")).toBe("dark");
    expect(toggleTheme("dark")).toBe("light");
  });
});

describe("persistTheme", () => {
  it("writes the theme to storage", () => {
    const storage = createFakeStorage();
    const setItem = vi.spyOn(storage, "setItem");
    persistTheme(storage, "dark");
    expect(setItem).toHaveBeenCalledWith("theme", "dark");
  });
});

describe("applyTheme", () => {
  it("sets the data-theme attribute on the given element", () => {
    const root = document.createElement("html");
    applyTheme(root, "dark");
    expect(root.getAttribute("data-theme")).toBe("dark");
    applyTheme(root, "light");
    expect(root.getAttribute("data-theme")).toBe("light");
  });
});
