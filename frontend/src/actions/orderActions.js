import axios from 'axios'
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, FETCH_USER_ORDERS_FAIL, FETCH_USER_ORDERS_REQUEST, FETCH_USER_ORDERS_SUCCESS } from '../reducer/orderReducer'

export const createOrder = (newOrder) => async (dispatch) => {
    try{
        dispatch(CREATE_ORDER_REQUEST())

        const config = {"headers": {"Content-Type": "application/json"}}
        const { data } = await axios.post("/api/v1/order/new", newOrder, config)

        dispatch(CREATE_ORDER_SUCCESS(data.newOrder))
    } catch(e){
        dispatch(CREATE_ORDER_FAIL(e.response.data.message))
    }
}

export const getCurrUserOrders = () => async (dispatch) => {
    try{
        dispatch(FETCH_USER_ORDERS_REQUEST())

        const { data } = await axios.get(`/api/v1/orders/me`)

        dispatch(FETCH_USER_ORDERS_SUCCESS(data.orders))
    }
    catch(error){
        dispatch(FETCH_USER_ORDERS_FAIL(error.response.data.message))
    }
}