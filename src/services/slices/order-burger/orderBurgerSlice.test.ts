import { orderBurger, TNewOrderState } from './orderBurgerSlice';
import orderBurgerReducer from './orderBurgerSlice';

describe('Order Burger Slice Tests', () => {
  const initialState: TNewOrderState = {
    order: null,
    name: '',
    orderRequest: false,
    error: null
  };

  it('Order Burger Failing', () => {
    const testError = new Error('Test Error');
    const testState: TNewOrderState = {
      order: null,
      name: '',
      orderRequest: false,
      error: {
        message: testError.message
      }
    };

    const actualState = orderBurgerReducer(
      {
        ...initialState
      },
      orderBurger.rejected(testError, '', [])
    );

    expect(actualState).toMatchObject(testState);
  });

  it('Order Burger Pending', () => {
    const testState: TNewOrderState = {
      name: '',
      order: null,
      orderRequest: true,
      error: null
    };

    const actualState = orderBurgerReducer(
      {
        ...initialState,
        error: new Error('Test Error')
      },
      orderBurger.pending('', [])
    );

    expect(actualState).toEqual(testState);
  });

  it('Order Burger Success', () => {
    const testState = {
      name: 'Флюоресцентный люминесцентный метеоритный бургер',
      orderRequest: false,
      order: {
        _id: '675e9133750864001d371564',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный метеоритный бургер',
        createdAt: '2024-12-15T08:20:03.594Z',
        updatedAt: '2024-12-15T08:20:04.528Z',
        number: 1
      },
      error: null
    };

    const actualState = orderBurgerReducer(
      {
        ...initialState,
        error: new Error('Test Error')
      },
      orderBurger.fulfilled(
        { order: testState.order, name: testState.name, success: true },
        '',
        []
      )
    );

    expect(actualState).toEqual(testState);
  });
});
