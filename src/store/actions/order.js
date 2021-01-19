import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purcharseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerSuccess());
        axios.post('/orders', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.id, orderData));
        })
        .catch(error => {
            console.log('przypal');
            dispatch(purchaseBurgerFail(error));
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START 
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders')
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push(res.data[key]);
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error));
        })
    };
};