import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';
import {
  getOrderSelector,
  getOrderByNumber
} from '../../services/slices/orderSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const orderData = useSelector(getOrderSelector);
  const ingredients = useSelector(ingredientsSelector);
  const params = useParams();
  const dispatch = useDispatch();

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    if (typeof params.number === 'string') {
      dispatch(getOrderByNumber(+params.number));
    }
  }, []);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
