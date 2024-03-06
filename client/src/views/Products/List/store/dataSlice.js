import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetProductList,
    // apiDeleteCustomer
} from 'services/ProductsService'

export const getProducts = createAsyncThunk('productListSlice/product/getProducts', async (data) => {
    const response = await apiGetProductList(data)
    return response.data
})

// export const deleteCustomer = async (data) => {
//     const response = await apiDeleteCustomer(data)
//     return response.data
// }

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: ''
    }
}


const dataCustomerSlice = createSlice({
    name: 'productListSlice/product',
    initialState: {
        loading: false,
        productList: [],
        tableData: initialTableData,

    },
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.productList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getProducts.pending]: (state) => {
            state.loading = true
        },
    }
})

export const { updateProductList, setTableData, setFilterData, setSortedColumn } = dataCustomerSlice.actions

export default dataCustomerSlice.reducer
