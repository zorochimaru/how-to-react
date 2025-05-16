import { useActionState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { HowToButton, ThemeToggler } from '../components';
import { useAuthStore } from '../stores';

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
type LoginFormValues = z.infer<typeof LoginSchema>;

async function loginAction(_prevState: { error?: string }, formData: FormData) {
  const data = Object.fromEntries(formData) as LoginFormValues;

  const parsed = LoginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  await new Promise((res) => setTimeout(res, 1000));

  localStorage.setItem('accessToken', 'token');
  localStorage.setItem('refreshToken', 'refreshToken');
  return { success: true, token: 'token', refreshToken: 'refreshToken' };
}

export const Login = () => {
  const navigate = useNavigate();

  const [state, formAction, pending] = useActionState(loginAction, {
    error: '',
  });

  const { setTokens } = useAuthStore((state) => state);

  useEffect(() => {
    if (state.success && state.token && state.refreshToken) {
      setTokens(state.token, state.refreshToken);
      navigate('/', { replace: true });
    }
  }, [state, navigate, setTokens]);

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <div className="flex flex-col gap-3 w-100">
        <div className="w-full flex justify-between items-center gap-4 mb-2">
          <HowToButton>
            <div>
              <h2 className="text-2xl font-bold mb-4">What's this about ?</h2>
              <p className="text-lg">
                This is my personal project to learn and teach how to React.
              </p>
              <p className="text-lg">Use different techniques and tools to improve your skills.</p>
            </div>
          </HowToButton>
          <h1 className="text-3xl flex items-center justify-center gap-4 text-center flex-1">
            <span>How To React</span>
            <img
              src="logo.svg"
              style={{ maxHeight: '30px' }}
              className="animate-spin-slow"
              alt=""
            />
          </h1>

          <ThemeToggler />
        </div>
        <form action={formAction} className="flex flex-col gap-3">
          <input
            name="email"
            type="text"
            placeholder="test@htr.com"
            className="border p-2 rounded appearance-none autofill:bg-yellow-200"
          />
          <input
            name="password"
            type="password"
            placeholder="howtoreact"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            disabled={pending}
            className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            {pending ? 'Loading...' : 'Login'}
          </button>
          {state?.error && <p className="text-red-500">{state.error}</p>}
        </form>
      </div>
    </div>
  );
};
