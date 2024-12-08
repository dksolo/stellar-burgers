import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  ordersSelector
} from '../../services/slices/orders/ordersSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
