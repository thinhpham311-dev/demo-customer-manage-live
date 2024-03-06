import ApiService from "./ApiService"

export async function apiGetOrderList(data) {
    return ApiService.fetchData({
        url: '/orders/list',
        method: 'post',
        data
    })
}

export async function apiGetOrderListByCustomerId(data) {
    return ApiService.fetchData({
        url: '/orders/listByCustomerId',
        method: 'post',
        data: {
            ...data,
            id: data.id
        }
    })
}

export async function apiCreateOrder(data) {
    return ApiService.fetchData({
        url: '/orders/create',
        method: 'post',
        data
    })
}