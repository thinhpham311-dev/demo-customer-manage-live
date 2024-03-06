import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetProductList
    // , apiPutProduct, apiDeleteProduct 
} from 'services/ProductsService'

export const getProduct = createAsyncThunk('productEdit/data/getProduct', async (data) => {
    const response = await apiGetProductList(data)
    return response.data
})

// export const updateCustomer = async (data) => {
//     const response = await apiPutProduct(data)
//     return response.data
// }

// export const deleteCustomer = async (data) => {
//     const response = await apiDeleteProduct(data)
//     return response.data
// }

const dataSlice = createSlice({
    name: 'productEdit/data',
    initialState: {
        loading: false,
        productData: [],
    },
    reducers: {
    },
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => {
            state.productData = action.payload
            state.loading = false
        },
        [getProduct.pending]: (state) => {
            state.loading = true
        },
    }
})

export default dataSlice.reducer
