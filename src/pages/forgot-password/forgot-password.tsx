import { FC, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '../../services/hooks/useForm';

export const ForgotPassword: FC = () => {
  const { values, handleChange, setValues } = useForm({
    email: '',
    errorText: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({ ...values, errorText: '' });
    forgotPasswordApi({ email: values.email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setValues({ ...values, errorText: err }));
  };

  return (
    <ForgotPasswordUI
      errorText={values.errorText}
      email={values.email}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
