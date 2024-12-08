import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ordersFeedsSelector,
  getFeeds
} from '../../services/slices/feeds/feedsSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const orders = useSelector(ordersFeedsSelector);
  const dispatch = useDispatch<AppDispatch>();

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  } else {
    return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
  }
};
