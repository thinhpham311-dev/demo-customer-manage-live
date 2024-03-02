import ApiService from "./ApiService"

export async function apiGetCustomerDashboardData(data) {
    return ApiService.fetchData({
        url: '/sales/dashboard',
        method: 'post',
        data
    })
}

export async function apiGetCustomerList(data) {
    return ApiService.fetchData({
        url: '/api/customers',
        method: 'post',
        data
    })
}

export async function apiDeleteCustomer(data) {
    return ApiService.fetchData({
        url: `/api/customer/${data.id}`,
        method: 'delete',
    })
}

export async function apiGetCustomer(data) {
    return ApiService.fetchData({
        url: `/api/customer/${data.id}`,
        method: 'get',
    })
}

export async function apiPutCustomer(data) {
    return ApiService.fetchData({
        url: `/api/customer/${data.id}`,
        method: 'put',
        data
    })
}

export async function apiCreateCustomer(data) {
    return ApiService.fetchData({
        url: '/api/customer/create',
        method: 'post',
        data
    })
}
