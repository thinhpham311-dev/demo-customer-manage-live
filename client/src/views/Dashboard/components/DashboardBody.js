import React, { useEffect } from 'react'
import { Loading } from 'components/shared'
import Statistic from './Statistic'
import DashboardReport from './DashboardReport'
// import CustomersByCategories from './CustomersByCategories'
// import LatestOrder from './LatestOrder'
// import TopProduct from './TopProduct'
import { getDashboardData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

const DashboardBody = () => {

	const dispatch = useDispatch()

	const {
		statisticData,
		dashboardReportData,
	} = useSelector((state) => state.dashboard.data.dashboardData)
	const loading = useSelector((state) => state.dashboard.data.loading)

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchData = () => {
		setTimeout(() => {
			dispatch(getDashboardData({ startDate: dayjs().subtract(4, 'week').toDate(), endDate: new Date() }))
		})
	}

	return (
		<Loading loading={loading}>
			<Statistic data={statisticData} />
			<DashboardReport data={dashboardReportData} />
		</Loading>
	)
}

export default DashboardBody