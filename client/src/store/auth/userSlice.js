import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetUser } from 'services/UserService'

export const getProfileUser = createAsyncThunk('userSlice/data/getProfileUser', async () => {
    const response = await apiGetUser()
    return response.data
})

export const initialState = {
    userData: null
}

export const userSlice = createSlice({
    name: 'userSlice/data',
    initialState,
    reducers: {},
    extraReducers: {
        [getProfileUser.fulfilled]: (state, action) => {
            state.userData = action.payload
            state.loading = false
        },
        [getProfileUser.pending]: (state) => {
            state.loading = true
        },
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer