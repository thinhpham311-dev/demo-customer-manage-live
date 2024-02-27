import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import SalesDashboardHeader from './components/CustomersDashboardHeader'
import SalesDashboardBody from './components/CustomersDashboardBody'

injectReducer('customerDashboard', reducer)

const SalesDashboard = () => {
	return (
		<div className="flex flex-col gap-4 h-full">
			<SalesDashboardHeader />
			<SalesDashboardBody />
		</div>
	)
}

export default SalesDashboard