import { FC, useMemo, useEffect, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  constructorSelector
} from '../../services/slices/constructorSlice';
import {
  orderBurger,
  orderBurgerSelector,
  orderBurgerRequestSelector,
  closeOrderState
} from '../../services/slices/orderBurgerSlice';
import { useNavigate } from 'react-router-dom';
import { userDataSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(constructorSelector);
  const orderRequest = useSelector(orderBurgerRequestSelector);
  const orderModalData = useSelector(orderBurgerSelector).order;
  const user = useSelector(userDataSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const orderItems = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id)
    ];
    dispatch(orderBurger(orderItems));
    dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    dispatch(closeOrderState());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
