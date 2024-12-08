import { SyntheticEvent, useState } from 'react';

export const useForm = <TForm>(inputValues: TForm) => {
  const [values, setValues] = useState(inputValues);
  const [inititalValueState, setInitialValueState] = useState(inputValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInitialValueState({ ...inititalValueState, isChanged: false });
    if (!value) {
      let errorMessage = '';
      switch (name) {
        case 'name':
          errorMessage = 'Введите Имя';
          break;
        case 'password':
          errorMessage = 'Введите Пароль';
          break;
        case 'email':
          errorMessage = 'Введите E-mail';
          break;
        case 'token':
          errorMessage = 'Введите Код';
          break;
      }
      setValues({
        ...values,
        [name]: value,
        errorText: errorMessage
      });
    } else {
      setValues({ ...values, [name]: value, isChanged: true });
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({ ...inititalValueState, isChanged: false });
    setInitialValueState({ ...inititalValueState, isChanged: false });
  };

  return { values, handleChange, setValues, handleCancel };
};
