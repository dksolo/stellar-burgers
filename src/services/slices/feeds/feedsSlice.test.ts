import { getFeeds, TFeedsState } from './feedsSlice';
import feedsReducer from './feedsSlice';

describe('Feeds Slice', () => {
  const initialState: TFeedsState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null,
    success: true
  };

  it('Feeds Pending', () => {
    const testState = {
      orders: [],
      total: 0,
      totalToday: 0,
      loading: true,
      success: false,
      error: null
    };

    const actualState = feedsReducer(
      {
        ...initialState,
        loading: false,
        error: new Error('Test Error')
      },
      getFeeds.pending('')
    );

    expect(actualState).toEqual(testState);
  });

  it('Feeds Failing', () => {
    const testError = new Error('Test Error');
    const testState: TFeedsState = {
      orders: [],
      total: 0,
      totalToday: 0,
      success: false,
      loading: false,
      error: {
        message: testError.message
      }
    };

    const actualState = feedsReducer(
      {
        ...initialState,
        loading: true
      },
      getFeeds.rejected(testError, '')
    );

    expect(actualState).toMatchObject(testState);
  });

  it('Feeds Fullfilled', () => {
    const testData = {
      success: true,
      orders: [
        {
          _id: '675d7b16750864001d371369',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2024-12-14T12:33:26.873Z',
          updatedAt: '2024-12-14T12:33:27.646Z',
          number: 62804
        },
        {
          _id: '675d783b750864001d371365',
          ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-12-14T12:21:15.011Z',
          updatedAt: '2024-12-14T12:21:15.929Z',
          number: 62803
        },
        {
          _id: '675d76c9750864001d371363',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e'
          ],
          status: 'done',
          name: 'Краторный люминесцентный бургер',
          createdAt: '2024-12-14T12:15:05.067Z',
          updatedAt: '2024-12-14T12:15:05.887Z',
          number: 62802
        }
      ],
      total: 3,
      totalToday: 3,
      error: null,
      loading: false
    };

    const actualState = feedsReducer(
      {
        ...initialState,
        loading: true
      },
      getFeeds.fulfilled(testData, '')
    );
    expect(actualState).toEqual(testData);
  });
});
