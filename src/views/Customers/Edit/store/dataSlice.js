import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCustomerList, apiPutCustomer, apiDeleteCustomer } from 'services/SalesService'

export const getCustomer = createAsyncThunk('customerEdit/data/getCustomer', async (data) => {
    const response = await apiGetCustomerList(data)
    return response.data
})

export const updateCustomer = async (data) => {
    const response = await apiPutCustomer(data)
    return response.data
}

export const deleteCustomer = async (data) => {
    const response = await apiDeleteCustomer(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'customerEdit/data',
    initialState: {
        loading: false,
        productData: [],

    },
    reducers: {
    },
    extraReducers: {
        [getCustomer.fulfilled]: (state, action) => {
            state.productData = action.payload
            state.loading = false
        },
        [getCustomer.pending]: (state) => {
            state.loading = true
        },
    }
})

export default dataSlice.reducer
