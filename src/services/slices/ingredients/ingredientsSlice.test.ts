import { getIngredients, TIngredientsState } from './ingredientsSlice';
import ingredientsReducer from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    loading: true,
    error: null
  };

  it('Ingredients Failing', () => {
    const testError = new Error('Test Error');
    const testState: TIngredientsState = {
        ingredients: [],
        loading: false,
        error: { 
            message: testError.message
        }
    };

    const actualState = ingredientsReducer(
        {
            ...initialState,
            loading: true
        }, 
        getIngredients.rejected(testError, '')
    )

    expect(actualState).toMatchObject(testState)
  })

  it('Ingredients Pending', () => {
    const testState = {
        ingredients: [],
        loading: true,
        error: null
    };

    const actualState = ingredientsReducer(
        {
            ...initialState,
            loading: false,
            error: new Error('Test Error')
        }, 
        getIngredients.pending('')
    )

    expect(actualState).toEqual(testState)
  })

  it('Ingredients Fullfilled', () => {
    const testData = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Тестовое мясо 1',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Тестовое мясо 2',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Тестовое мясо 3',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Тестовая булка',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0944',
        name: 'Тестовый соус',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        __v: 0
      }
    ];

    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.fulfilled(testData, '')
    );
    expect(actualState).toEqual({
      ingredients: testData,
      error: null,
      loading: false
    });
  });
});
