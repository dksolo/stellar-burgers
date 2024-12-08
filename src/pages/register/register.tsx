import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../services/slices/user/userSlice';
import { useDispatch } from '../../services/store';
import { useForm } from '../../services/hooks/useForm';

export const Register: FC = () => {
  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: '',
    errorText: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password
      })
    );
  };

  return (
    <RegisterUI
      errorText={values.errorText}
      email={values.email}
      userName={values.name}
      password={values.password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
