import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const ReactHookForm = () => {
  const [result, setResult] = useState<Inputs>({ example: '', exampleRequired: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setResult(data);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="flex h-full justify-center gap-10 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full justify-center items-center"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <input
          defaultValue="test"
          {...register('example')}
          className="border-2 p-2 rounded outline-none"
        />

        {/* include validation with required or other standard HTML validation rules */}
        <input
          {...register('exampleRequired', { required: true })}
          className="border-2 p-2 rounded outline-none"
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" className="p-2 rounded cursor-pointer bg-blue-500 " />
      </form>

      {result && (
        <div className="flex flex-col gap-3 h-full justify-center items-center">
          <p>
            <span>Example: </span>
            {result.example}
          </p>
          <p>
            <span>ExampleRequired: </span>
            {result.exampleRequired}
          </p>
        </div>
      )}
    </div>
  );
};
