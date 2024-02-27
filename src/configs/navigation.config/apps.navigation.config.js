import { APP_PREFIX_PATH } from 'constants/route.constant'
import { NAV_ITEM_TYPE_ITEM } from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsNavigationConfig = [

	{
		key: 'appsCustomers.customerdashboard',
		path: `${APP_PREFIX_PATH}/customers/dashboard`,
		title: 'Dashboard',
		translateKey: 'nav.appsCustomers.dashboard',
		icon: '',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, USER],
		subMenu: []
	},
	{
		key: 'appsCustomers.customerList',
		path: `${APP_PREFIX_PATH}/customers/list`,
		title: 'Customers List',
		translateKey: 'nav.appsCustomers.customerList',
		icon: 'list',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, USER],
		subMenu: []
	},
	{
		key: 'appsCustomers.customerNew',
		path: `${APP_PREFIX_PATH}/customers/new`,
		title: 'New Customer',
		translateKey: 'nav.appsCustomers.customerNew',
		icon: 'add',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [ADMIN, USER],
		subMenu: []
	},


]

export default appsNavigationConfig