import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { useForm } from '../../services/hooks/useForm';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm({
    password: '',
    token: '',
    errorText: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({ ...values, errorText: '' });
    resetPasswordApi({ password: values.password, token: values.token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setValues({ ...values, errorText: err }));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={values.errorText}
      password={values.password}
      token={values.token}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
