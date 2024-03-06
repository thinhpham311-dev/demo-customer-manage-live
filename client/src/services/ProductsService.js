import ApiService from "./ApiService"

export async function apiGetProductList(data) {
    return ApiService.fetchData({
        url: '/products/list',
        method: 'post',
        data
    })
}

export async function apiCreateProduct(data) {
    return ApiService.fetchData({
        url: '/products/create',
        method: 'post',
        data
    })
}