import { Link, useNavigate } from "react-router";
import { ThemeToggler } from "./ThemeToggler";

export const Header = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }

  return (
    <header className="p-4 flex border-b-gray-300 border-b-1 bg-gray-200 dark:bg-gray-800 text-2xl font-bold sticky top-0">
      <ThemeToggler />

      <Link to="/" className="flex flex-1 gap-4 justify-center items-center">
        <h1 className="text-gray-900 dark:text-white">How To React</h1>
        <img src="logo.svg" style={{ maxHeight: "50px" }} alt="" />
      </Link>

      <button
        className="p-2 text-lg cursor-pointer rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        onClick={logout}
      >
        Logout
      </button>
    </header>
  );
};
