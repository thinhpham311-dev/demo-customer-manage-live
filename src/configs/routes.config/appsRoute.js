import React from 'react'
import { APP_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsRoute = [

    {
        key: 'appsCustomers.customerdashboard',
        path: `${APP_PREFIX_PATH}/customers/dashboard`,
        component: React.lazy(() => import('views/Customers/Dashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsCustomers.customerList',
        path: `${APP_PREFIX_PATH}/customers/list`,
        component: React.lazy(() => import('views/Customers/List')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsCustomers.customerNew',
        path: `${APP_PREFIX_PATH}/customers/new`,
        component: React.lazy(() => import('views/Customers/New')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Add New Customer',
        }
    },
    {
        key: 'appsSales.productEdit',
        path: `${APP_PREFIX_PATH}/customers/edit/:customerId`,
        component: React.lazy(() => import('views/Customers/Edit')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Edit Customer',
        }
    },
]

export default appsRoute