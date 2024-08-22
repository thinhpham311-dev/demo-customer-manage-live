import axios from 'axios'
import appConfig from 'configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
import store from '../store'
import { apiSignOut } from './AuthService'
import { onSignOutSuccess, onSignInSuccess } from '../store/auth/sessionSlice'

const unauthorizedCode = [400, 401, 500]

const host_API = process.env.REACT_APP_API_KEY

const baseUrl = `${host_API}${appConfig.apiPrefix}${appConfig.apiVersion}`

const BaseService = axios.create({
    baseURL: baseUrl,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true
})

BaseService.interceptors.request.use(async config => {

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)
    const accessToken = persistData?.auth?.session?.accessToken

    if (accessToken) {
        config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
    }

    return config
}, error => {
    return Promise.reject(error)
})

BaseService.interceptors.response.use(
    response => response,
    async error => {
        const { response, config } = error
        const handleUnauthorizedError = async () => {
            await Promise.all([
                store.dispatch(onSignOutSuccess()),
                apiSignOut(),
                localStorage.clear()
            ]);
        };
        if (response && response.status === 401) {
            try {
                const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
                const persistData = deepParseJson(rawPersistData)
                const refresh_token = persistData?.auth?.session?.refreshToken
                if (refresh_token) {
                    try {
                        const result = await axios.post(`${baseUrl}/auth/refreshToken`, {
                            refreshToken: refresh_token
                        })

                        const { accessToken, refreshToken } = result.data;
                        store.dispatch(onSignInSuccess({ accessToken, refreshToken }));
                        config.headers['Authorization'] = `${TOKEN_TYPE}${accessToken}`;

                        // Retry the original request with the new access token
                        return axios.request(config);
                    } catch (refreshError) {
                        if (refreshError.response && unauthorizedCode.includes(refreshError.response.status)) {
                            // If refresh token is expired or invalid, sign the user out
                            await handleUnauthorizedError();
                        }
                        return Promise.reject(refreshError);
                    }
                } else {
                    // No refresh token available, sign the user out
                    await handleUnauthorizedError();
                }
            }
            catch (err) {
                if (err.response && unauthorizedCode.includes(err.response.status)) {
                    await handleUnauthorizedError();
                }

                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)

export default BaseService