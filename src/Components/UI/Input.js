import React from 'react';

const Input = ({
  register,
  errors,
  name,
  rules,
  placeholder,
  className,
  ...props
}) => {
  return (
    <div>
      {props?.label && <p>{props?.label}</p>}

      <input
        className={`border border-[#C2C9D1]  px-4 py-[10px]  rounded-lg mb-2 ${
          className ? className : ''
        }`}
        type={'text'}
        placeholder={placeholder}
        {...register(name, {
          required: 'This field is required',
          ...rules,
        })}
      />

      {errors?.[name]?.message && (
        <p className='text-sm text-red-500'> {errors?.[name]?.message}</p>
      )}
    </div>
  );
};

export default Input;
