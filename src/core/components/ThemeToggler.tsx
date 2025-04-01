import { useTheme } from "../hooks";

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded cursor-pointer bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
    >
      {theme === "dark" ? "🌙" : "🌞"}
    </button>
  );
};
