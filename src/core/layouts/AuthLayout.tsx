import axios from "axios";
import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Footer, Header } from "../components";
import { useAuthStore } from "../stores";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const AuthLayout = () => {
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore(
    (state) => state
  );

  const navigate = useNavigate();

  const fetchTokens = useCallback(async () => {
    if (!refreshToken) {
      return;
    }
    try {
      const response = await axios.post<TokenResponse>("/auth/refresh", {
        refreshToken,
      });
      setTokens(response.data.accessToken, response.data.refreshToken);
    } catch (error) {
      console.error("Failed to refresh token", error);
      clearTokens();
    }
  }, [refreshToken, setTokens, clearTokens]);

  useEffect(() => {
    if (accessToken) {
      return;
    } else if (refreshToken) {
      fetchTokens();
    }

    if (!accessToken && !refreshToken) {
      navigate("/login");
    }
  }, [accessToken, refreshToken, fetchTokens, navigate]);

  return (
    <div className="flex flex-col h-svh">
      <Header />

      <main className="flex-1 dark:bg-gray-700 dark:text-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
