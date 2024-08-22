import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAccountSettingData } from 'services/AuthService'


export const getProfileUser = createAsyncThunk('auth/user/getProfileUser', async (data) => {
    const response = await apiGetAccountSettingData(data)
    return response.data
})

export const initialState = {
    authority: '',
    userInfo: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'auth/user',
    initialState,
    reducers: {
        setUser: (_, action) => action.payload,
        userLoggedOut: () => initialState,
    },
    extraReducers: {
        [getProfileUser.fulfilled]: (state, action) => {
            state.userInfo = action.payload
            state.loading = false
        },
        [getProfileUser.pending]: (state) => {
            state.loading = true
        },
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer