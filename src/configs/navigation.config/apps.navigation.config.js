import { APP_PREFIX_PATH } from 'constants/route.constant'
import { NAV_ITEM_TYPE_ITEM } from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsNavigationConfig = [

	{
		key: 'appsCustomers.customerdashboard',
		path: `${APP_PREFIX_PATH}/dashboard`,
		title: 'Dashboard',
		translateKey: 'nav.appsCustomers.dashboard',
		icon: 'chart',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, USER],
		subMenu: []
	},
	{
		key: 'appsCustomers.customerList',
		path: `${APP_PREFIX_PATH}/list`,
		title: 'Customers List',
		translateKey: 'nav.appsCustomers.customerList',
		icon: 'users',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, USER],
		subMenu: []
	},
	{
		key: 'appsCustomers.customerNew',
		path: `${APP_PREFIX_PATH}/new`,
		title: 'New Customer',
		translateKey: 'nav.appsCustomers.customerNew',
		icon: 'add',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, USER],
		subMenu: []
	},


]

export default appsNavigationConfig