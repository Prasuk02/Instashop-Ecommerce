import { createSlice } from "@reduxjs/toolkit";

export const newOrderReducer = createSlice({
    name: 'newOrder',
    initialState: {
        order: {}
    },
    reducers: {
        CREATE_ORDER_REQUEST: (state, action) => {
            state.loading = true
        },

        CREATE_ORDER_SUCCESS: (state, action) => {
            state.loading = false
            state.order = action.payload
        },

        CREATE_ORDER_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }
})

export const myOrdersReducer = createSlice({
    name: 'myOrders',
    initialState: {
        myOrders: []
    },
    reducers: {
        FETCH_USER_ORDERS_REQUEST: (state, action) => {
            state.loading = true
        },

        FETCH_USER_ORDERS_SUCCESS: (state, action) => {
            state.loading = false
            state.myOrders = action.payload
        },

        FETCH_USER_ORDERS_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} = newOrderReducer.actions
export const {FETCH_USER_ORDERS_FAIL, FETCH_USER_ORDERS_REQUEST, FETCH_USER_ORDERS_SUCCESS} = myOrdersReducer.actions