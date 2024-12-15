import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  TConstructorState
} from './burgerConstructorSlice';
import constructorReducer from './burgerConstructorSlice';

describe('Constructor Slice', () => {
  const initialState: TConstructorState = {
    bun: null,
    ingredients: [
      {
        id: '1',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '2',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        id: '3',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      }
    ]
  };

  it('Add Bun', () => {
    const actualState = constructorReducer(
      initialState,
      addIngredient({
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      })
    );
    expect(actualState.bun).toEqual({
      id: expect.any(String),
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    });
  });

  it('Add Main', () => {
    const actualState = constructorReducer(
      initialState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'НЕ Тестовая булка',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      })
    );
    expect(actualState.ingredients).toEqual([
      {
        id: '1',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '2',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        id: '3',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      },
      {
        id: expect.any(String),
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'НЕ Тестовая булка',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      }
    ]);
  });

  it('Remove Ingredient', () => {
    const actualState = constructorReducer(
      initialState,
      removeIngredient({
        id: '3',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      })
    );
    expect(actualState.ingredients).toEqual([
      {
        id: '1',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '2',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      }
    ]);
  });

  it('Clear Constructor', () => {
    const actualState = constructorReducer(initialState, clearConstructor());
    expect(actualState).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('Move Ingredient Up', () => {
    const movingIngredient = {
      direction: 'UP',
      id: '2',
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Тестовое мясо 2',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    };
    const actualState = constructorReducer(
      initialState,
      moveIngredient(movingIngredient)
    );
    expect(actualState.ingredients).toEqual([
      {
        id: '2',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        id: '1',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '3',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      }
    ]);
  });

  it('Move Ingredient Up', () => {
    const movingIngredient = {
      direction: 'DOWN',
      id: '2',
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Тестовое мясо 2',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    };
    const actualState = constructorReducer(
      initialState,
      moveIngredient(movingIngredient)
    );
    expect(actualState.ingredients).toEqual([
      {
        id: '1',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '3',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      },
      {
        id: '2',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      }
    ]);
  });
});
