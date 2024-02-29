import React from 'react'
import { Card } from 'components/ui'
import NumberFormat from 'react-number-format'
import { GrowShrinkTag } from 'components/shared'
import { useSelector } from 'react-redux'
// import dayjs from 'dayjs'

const StatisticCard = ({ data = {}, label, valuePrefix, date }) => {
	return (
		<Card>
			<h6 className="font-semibold mb-4 text-sm">{label}</h6>
			<div className="flex justify-between items-center">
				<div>
					<h3 className="font-bold">
						<NumberFormat
							displayType="text"
							value={data.value}
							thousandSeparator
							prefix={valuePrefix}
						/>
					</h3>
					{/* <p>vs. 3 months prior to <span className="font-semibold">{dayjs(date).format('DD MMM')}</span></p> */}
				</div>
				<GrowShrinkTag value={data.growShrink} suffix="%" />
			</div>
		</Card>
	)
}

const Statistic = ({ data = {} }) => {

	const startDate = useSelector((state) => state.customerDashboard.state.startDate)

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<StatisticCard
				data={data.revenue}
				valuePrefix="$"
				label="Doanh thu"
				tagSuffix="%"
				date={startDate}
			/>
			<StatisticCard
				data={data.orders}
				label="Đơn hàng"
				tagSuffix="%"
				date={startDate}
			/>
			<StatisticCard
				data={data.purchases}
				valuePrefix="$"
				label="Mua hàng"
				tagSuffix="%"
				date={startDate}
			/>
		</div>
	)
}

export default Statistic