import { getOrderByNumber, TOrderState } from './orderSlice';
import orderReducer from './orderSlice';

describe('Order Slice Tests', () => {
  const initialState: TOrderState = {
    order: null,
    error: null
  };

  it('Order Failing', () => {
    const testError = new Error('Test Error');
    const testState: TOrderState = {
      order: null,
      error: {
        message: testError.message
      }
    };

    const actualState = orderReducer(
      {
        ...initialState
      },
      getOrderByNumber.rejected(testError, '', 1)
    );

    expect(actualState).toMatchObject(testState);
  });

  it('Order Pending', () => {
    const testState = {
      order: null,
      error: null
    };

    const actualState = orderReducer(
      {
        ...initialState,
        error: new Error('Test Error')
      },
      getOrderByNumber.pending('', 1)
    );

    expect(actualState).toEqual(testState);
  });

  it('Order Success', () => {
    const testData = {
      _id: '675e9133750864001d371564',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: '6742dd79b27b06001c3ea354',
      status: 'done',
      name: 'Флюоресцентный люминесцентный метеоритный бургер',
      createdAt: '2024-12-15T08:20:03.594Z',
      updatedAt: '2024-12-15T08:20:04.528Z',
      number: 1,
      __v: 0
    };

    const actualState = orderReducer(
      {
        ...initialState
      },
      getOrderByNumber.fulfilled({ orders: [testData], success: true }, '', 1)
    );
    expect(actualState).toEqual({
      order: testData,
      error: null
    });
  });
});
