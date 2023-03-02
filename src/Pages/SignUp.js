import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useForm } from 'react-hook-form';
import Input from '../Components/UI/Input';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log('data', data);

  return (
    <div className='flex justify-center items-center pt-10'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input
          label={'Email'}
          name='email'
          register={register}
          errors={errors}
          rules={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }}
        />
        <Input
          label={'Password'}
          name='password'
          register={register}
          errors={errors}
        />
        <button
          type='submit'
          className='py-[10px] px-[18px] rounded-lg disabled:cursor-not-allowed bg-lime-400'
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
