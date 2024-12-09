import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  updateUser,
  userDataSelector
} from '../../services/slices/user/userSlice';
import { useForm } from '../../services/hooks/useForm';

export const Profile: FC = () => {
  const user = useSelector(userDataSelector);
  const dispatch = useDispatch();

  const { values, handleChange, handleCancel } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    errorText: '',
    isChanged: false
  });

  const handleSubmit = (e: SyntheticEvent) => {
    dispatch(updateUser(values));
    e.preventDefault();
  };

  return (
    <ProfileUI
      formValue={{
        name: values.name,
        email: values.email,
        password: values.password
      }}
      isFormChanged={values.isChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
