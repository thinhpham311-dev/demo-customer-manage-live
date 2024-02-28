
import { createServer } from 'miragejs'
import appConfig from 'configs/app.config'
import { notificationListData, searchQueryPoolData } from './data/commonData'
import { usersData, userDetailData } from './data/usersData'
import { productsData, ordersData, orderDetailsData, salesDashboardData } from './data/salesData'
import { signInUserData } from './data/authData'

import {
    commonFakeApi,
    salesFakeApi,
    authFakeApi,
} from './fakeApi'

const { apiPrefix } = appConfig

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                notificationListData,
                searchQueryPoolData,
                usersData,
                userDetailData,
                productsData,
                ordersData,
                orderDetailsData,
                signInUserData,
                salesDashboardData,
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough(request => {
                let isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()

            commonFakeApi(this, apiPrefix)
            salesFakeApi(this, apiPrefix)
            authFakeApi(this, apiPrefix)
        },
    })
}