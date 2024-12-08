import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/user/userSlice';
import { useForm } from '../../services/hooks/useForm';

export const Login: FC = () => {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
    errorText: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  return (
    <LoginUI
      errorText={values.errorText}
      email={values.email}
      handleChange={handleChange}
      password={values.password}
      handleSubmit={handleSubmit}
    />
  );
};
