import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser, userDataSelector } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const user = useSelector(userDataSelector);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    isChanged: false
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    }));
  }, [user]);

  const handleSubmit = (e: SyntheticEvent) => {
    dispatch(updateUser(formValue));
    e.preventDefault();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      isChanged: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    if (
      user?.name !== formValue.name ||
      user?.email !== formValue?.email ||
      !!formValue.password
    ) {
      setFormValue((prevState) => ({
        ...prevState,
        isChanged: true
      }));
    }
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={formValue.isChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
