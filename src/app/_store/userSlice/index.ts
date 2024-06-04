import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserState {
    user: {
        token: string
    },
    userLoginLoading: boolean,
    userLoginError: string
}

export interface UserLogin {
    email: string,
    password: string
}

const initialState: UserState = {
    user: {
        token: localStorage.getItem('token') || '',
    },
    userLoginLoading: false,
    userLoginError: '',
};

// User login
export const userLogin = createAsyncThunk<any, UserLogin>('user/login', async (user: UserLogin) => {
        const response = await axios.post('https://api-dev.kamion.co/api/v2/admin/login', {
            email: user.email,
            password: user.password
        });

        return response.data;
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout: (state) => {
            state.user.token = '';

            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state, action) => {
                state.userLoginLoading = true;
                state.userLoginError = '';
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                if(action.payload.error_code !== 0) {
                    state.userLoginLoading = false;
                    state.userLoginError = action.payload.message;
                    return;
                }
                state.user.token = action.payload.data.token;

                localStorage.setItem('token', action.payload.data.token);

                state.userLoginLoading = false;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.userLoginError = action.error.code || 'Faild to login!'
                state.userLoginLoading = false;
            });
    }
})

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;