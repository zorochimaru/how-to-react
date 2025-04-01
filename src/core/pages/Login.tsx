import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { ThemeToggler } from "../components";
import { useAuthStore } from "../stores";

const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

async function loginAction(_prevState: { error?: string }, formData: FormData) {
  const data = Object.fromEntries(formData) as LoginFormValues;

  const parsed = LoginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await new Promise((res) => setTimeout(res, 1000));

  if (data.email !== "test@htr.com" || data.password !== "howtoreact") {
    return { error: "Invalid email or password" };
  }

  localStorage.setItem("accessToken", "token");
  localStorage.setItem("refreshToken", "refreshToken");
  return { success: true, token: "token", refreshToken: "refreshToken" };
}

export const Login = () => {
  const navigate = useNavigate();

  const [state, formAction, pending] = useActionState(loginAction, {
    error: "",
  });

  const { setTokens } = useAuthStore((state) => state);

  useEffect(() => {
    if (state.success && state.token && state.refreshToken) {
      setTokens(state.token, state.refreshToken);
      navigate("/", { replace: true });
    }
  }, [state, navigate, setTokens]);

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <form action={formAction} className="flex flex-col gap-3 w-80">
        <div className="relative mb-2">
          <h1 className="text-3xl flex items-center gap-4 text-center flex-1">
            <span>How To React</span>
            <img src="logo.svg" style={{ maxHeight: "30px" }} alt="" />
          </h1>
          <div className="absolute top-[50%] translate-y-[-50%] right-0">
            <ThemeToggler />
          </div>
        </div>
        <input
          name="email"
          type="text"
          placeholder="test@htr.com"
          required
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="howtoreact"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
        >
          {pending ? "Loading..." : "Submit"}
        </button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </div>
  );
};
