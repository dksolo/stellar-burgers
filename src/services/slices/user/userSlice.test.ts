import { registerUser, loginUser, logout, checkUserAuth, TUserState } from './userSlice';
import userReducer from './userSlice';


describe('User Slice Tests', () => {
    const initialState: TUserState = {
        isAuthChecked: false,
        user: null
    };


})