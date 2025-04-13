import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './validationSchema';

type FormType = z.infer<typeof formSchema>;

export const ReactHookForm = () => {
  const [result, setResult] = useState<FormType>({ email: '', username: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    setResult(data);
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
    <div className="flex h-full justify-center gap-10 items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full justify-center items-center"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register('email')} className="border-2 p-2 rounded outline-none" />
        <strong>{errors.email?.message}</strong>

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register('username')} className="border-2 p-2 rounded outline-none" />
        {/* errors will return when field validation fails  */}
        <strong>{errors.username?.message}</strong>

        <input type="submit" className="p-2 rounded cursor-pointer bg-blue-500 " />
      </form>

      {result && (
        <div className="flex flex-col gap-3 h-full justify-center items-center">
          <p>
            <span>Email: </span>
            {result.email}
          </p>
          <p>
            <span>Username: </span>
            {result.username}
          </p>
        </div>
      )}
    </div>
  );
};
