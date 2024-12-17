import { getOrders, TOrdersState } from './ordersSlice';
import ordersReducer from './ordersSlice';

describe('Orders Slice Tests', () => {
  const initialState: TOrdersState = {
    orders: [],
    error: null
  };

  it('Orders Failing', () => {
    const testError = new Error('Test Error');
    const testState: TOrdersState = {
      orders: [],
      error: {
        message: testError.message
      }
    };

    const actualState = ordersReducer(
      {
        ...initialState
      },
      getOrders.rejected(testError, '')
    );

    expect(actualState).toMatchObject(testState);
  });

  it('Orders Pending', () => {
    const testState: TOrdersState = {
      orders: [],
      error: null
    };

    const actualState = ordersReducer(
      {
        ...initialState,
        error: new Error('Test Error')
      },
      getOrders.pending('')
    );

    expect(actualState).toEqual(testState);
  });

  it('Orders Success', () => {
    const testState = {
      orders: [
        {
          _id: '675ea210750864001d371593',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-12-15T09:32:00.896Z',
          updatedAt: '2024-12-15T09:32:01.653Z',
          number: 62844
        },
        {
          _id: '675ea1c2750864001d371591',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0940'
          ],
          status: 'done',
          name: 'Флюоресцентный space люминесцентный био-марсианский метеоритный бургер',
          createdAt: '2024-12-15T09:30:42.593Z',
          updatedAt: '2024-12-15T09:30:43.554Z',
          number: 62843
        },
        {
          _id: '675e9b7f750864001d37157d',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2024-12-15T09:03:59.490Z',
          updatedAt: '2024-12-15T09:04:00.235Z',
          number: 62842
        }
      ],
      error: null
    };

    const actualState = ordersReducer(
      {
        ...initialState,
        error: new Error('Test Error')
      },
      getOrders.fulfilled(testState.orders, '')
    );

    expect(actualState).toEqual(testState);
  });
});
