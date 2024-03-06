import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'productListSlice/state',
    initialState: {
        deleteConfirmation: false,
        selectedCustomer: '',
        sortedColumn: () => { },
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedCustomer = action.payload
        },
    },
})

export const {
    toggleDeleteConfirmation,
    setSortedColumn,
    setSelectedProduct
} = stateSlice.actions

export default stateSlice.reducer
