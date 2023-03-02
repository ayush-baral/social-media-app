import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useForm } from 'react-hook-form';
import Input from '../Components/UI/Input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, data?.email, data?.password)
      .then((userCredential) => {
        toast.success('SignIn successful', { duration: 3000 });
        const user = userCredential.user;
        reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(`SignIn failed !! ${errorMessage}`, { duration: 3000 });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='flex flex-col justify-center items-center pt-10'>
      <div>
        <h2 className='text-2xl font-bold mb-10'>SIGN IN</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-4'
        >
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
            disabled={loading}
          >
            {!loading ? 'SignIn' : 'Signing up...'}
          </button>
        </form>

        <p className='mt-4'>
          Not a user?{' '}
          <span
            className='underline cursor-pointer'
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
