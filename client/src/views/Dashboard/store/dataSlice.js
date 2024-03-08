import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDashboardData } from 'services/CustomersService'

export const getDashboardData = createAsyncThunk('dashboard/data/getDashboardData', async () => {
    const response = await apiGetDashboardData()
    return response.data
})


const dataSlice = createSlice({
    name: 'dashboard/data',
    initialState: {
        loading: true,
        dashboardData: {},
    },
    reducers: {
    },
    extraReducers: {
        [getDashboardData.fulfilled]: (state, action) => {
            state.dashboardData = action.payload
            state.loading = false
        },
        [getDashboardData.pending]: (state) => {
            state.loading = true
        }
    }
})

export default dataSlice.reducer
