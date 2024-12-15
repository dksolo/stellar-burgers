import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

describe('Root Reducer Test', () => {
  const store = configureStore({
    reducer: rootReducer
  });

  it('Root Reducer Test', () => {
    const testAction = { type: 'UNKNOWN_ACTION' };
    store.dispatch(testAction);
    expect(store.getState()).toEqual(rootReducer(undefined, testAction));
  });
});