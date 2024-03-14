import React, { useMemo } from 'react'
import {
	Card,
	// Button
} from 'components/ui'
import { Chart } from 'components/shared'
import moment from 'moment'

const DashboardReport = ({ className, data = {} }) => {
	const dates = useMemo(() => data.categories?.map((item) => moment(item?.toString()).format(process.env.REACT_APP_DAY_FORMAT_MOMENT)), [data.categories])
	return (
		<Card className={className}>
			<div className="flex items-center justify-between">
				<h4>Báo cáo thống kê</h4>
			</div>
			<Chart
				series={data.series}
				xAxis={dates}
				height="500px"
				customOptions={{ legend: { show: false } }}
			/>
		</Card>
	)
}

export default DashboardReport