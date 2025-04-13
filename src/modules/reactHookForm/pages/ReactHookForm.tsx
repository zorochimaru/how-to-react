import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './validationSchema';

type FormType = z.infer<typeof formSchema>;

export const ReactHookForm = () => {
  const [result, setResult] = useState<FormType | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    setInProgress(true);
    setTimeout(() => {
      setInProgress(false);
      setResult(data);
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json();

      reset({
        email: data.email,
        username: data.username,
      });
    };

    fetchData();
  }, [reset]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <div className="flex h-full justify-center gap-6 items-start">
      <div className="flex flex-col h-full w-full justify-center gap-10 items-center">
        <div className="flex gap-10">
          <a
            href="https://github.com/zorochimaru/how-to-react/blob/main/src/modules/reactHookForm/pages/ReactHookForm.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Form component {'</>'}
          </a>
          <a
            href="https://github.com/zorochimaru/how-to-react/blob/main/src/modules/reactHookForm/pages/validationSchema.ts"
            target="_blank"
            className="flex items-center gap-3"
            rel="noopener noreferrer"
          >
            <img src="images/zod.svg" width={30} alt="" /> <span>Zod Schema {'</>'}</span>
          </a>
        </div>

        <h1 className="text-2xl">Form with Zod validation</h1>

        <div className="flex  gap-10 items-start">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 h-full justify-center items-center"
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              {...register('email')}
              disabled={inProgress}
              className="border-2 p-2 rounded outline-none disabled:cursor-not-allowed disabled:opacity-80"
            />
            <strong>{errors.email?.message}</strong>

            {/* include validation with required or other standard HTML validation rules */}
            <input
              {...register('username')}
              disabled={inProgress}
              className="border-2 p-2 rounded outline-none disabled:cursor-not-allowed disabled:opacity-80"
            />
            {/* errors will return when field validation fails  */}
            <strong>{errors.username?.message}</strong>

            <input
              type="submit"
              disabled={inProgress}
              className="p-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70 rounded cursor-pointer bg-blue-500 "
            />
          </form>
          {result && (
            <div className="flex flex-col gap-3 justify-center items-center">
              <h2 className="text-2xl">Result state</h2>
              <p>Email: {result.email}</p>
              <p>Username: {result.username}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
