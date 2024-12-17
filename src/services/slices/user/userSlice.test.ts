import {
  registerUser,
  loginUser,
  logout,
  TUserState,
  authChecked,
  setUser,
  updateUser
} from './userSlice';
import userReducer from './userSlice';

describe('User Slice Tests', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    user: null
  };

  it('User Auth Success', () => {
    const { isAuthChecked } = userReducer(initialState, authChecked());
    expect(isAuthChecked).toBe(true);
  });

  it('User Set Success', () => {
    const testUser = {
      name: 'test',
      email: 'test@test.com'
    };

    const actualState = userReducer(initialState, setUser(testUser));
    expect(actualState.user).toEqual(testUser);
  });

  it('User Register Success', () => {
    const testUser = {
      name: 'test',
      email: 'test@test.com'
    };

    const testRegData = {
      name: 'test',
      email: 'test@test.com',
      password: 'testestest'
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      registerUser.fulfilled(testUser, '', testRegData)
    );

    expect(actualState.user).toEqual(testUser);
  });

  it('User Login Success', () => {
    const testUser = {
      name: 'test',
      email: 'test@test.com'
    };

    const testRegData = {
      name: 'test',
      email: 'test@test.com',
      password: 'testestest'
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      loginUser.fulfilled(testUser, '', testRegData)
    );

    expect(actualState.user).toEqual(testUser);
  });

  it('User Update Success', () => {
    const testUser = {
      name: 'test',
      email: 'test@test.com'
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      updateUser.fulfilled({ user: testUser, success: true }, '', testUser)
    );

    expect(actualState.user).toEqual(testUser);
  });

  it('User Logout Success', () => {
    const testUser = {
      name: 'test',
      email: 'test@test.com'
    };

    const actualState = userReducer(
      {
        ...initialState
      },
      { type: 'user/logout/fulfilled' }
    );

    expect(actualState.user).toBe(null);
  });
});
