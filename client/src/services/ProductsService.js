import ApiService from "./ApiService"

export async function apiGetCustomerList(data) {
    return ApiService.fetchData({
        url: '/products/list',
        method: 'post',
        data
    })
}