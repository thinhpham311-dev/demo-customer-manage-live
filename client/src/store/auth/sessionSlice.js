import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        accessToken: '',
        refreshToken: '',
        signedIn: false,
    },
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.accessToken = ''
            state.refreshToken = ''
        },
        setToken: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        }
    },
})

export const { onSignInSuccess, onSignOutSuccess, setToken } = sessionSlice.actions

export default sessionSlice.reducer