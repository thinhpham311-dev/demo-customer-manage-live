import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: '/auth/sign-in',
        method: 'post',
        data
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/auth/sign-up',
        method: 'post',
        data
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/auth/sign-out',
        method: 'post',
        // data
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data
    })
}
