import React, { useMemo } from 'react'
import {
	AdaptableCard
} from 'components/shared'
import {
	FormItem, Select, DatePicker
} from 'components/ui'
import { Field } from 'formik'
import CreatableSelect from 'react-select/creatable'


const BasicInformationFields = props => {

	const { touched, errors, payDate, setPayDate, values, dataProductList, dataCustomerList } = props

	const handleDatePickerChange = (date) => {
		setPayDate(date)
	}

	const arrProducts = useMemo(() => dataProductList.map(item => {
		return {
			label: item.name,
			value: item.price
		};
	}), [dataProductList]);

	const arrCustomers = useMemo(() => dataCustomerList.map(item => {
		return {
			label: item.name,
			value: `${item.id}-${item.email}`
		};
	}), [dataCustomerList]);

	return (
		<AdaptableCard className="mb-4" divider>
			<h5 className="mb-3">Thông tin đơn hàng</h5>
			<div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4  bg-white py-[1.5rem]">
				<div className="col-span-1">
					<FormItem
						label="Sản phẩm"
						invalid={errors.products && touched.products}
						errorMessage={errors.products}
					>
						<Field name="products">
							{({ field, form }) => (
								<Select
									componentAs={CreatableSelect}
									isMulti
									field={field}
									placeholder="Chọn sản phẩm"
									form={form}
									options={arrProducts}
									value={values.products}
									onChange={option => form.setFieldValue(field.name, option)}
								/>
							)}
						</Field>
					</FormItem>
				</div>
				<div className="col-span-1">
					<FormItem
						label="Khách hàng"
						invalid={errors.customer && touched.customer}
						errorMessage={errors.customer}
					>
						<Field name="customer">
							{({ field, form }) => (
								<Select

									field={field}
									placeholder="Chọn khách hàng"
									options={arrCustomers}
									onChange={option => form.setFieldValue(field.name, option)}
								/>
							)}
						</Field>
					</FormItem>
				</div>
				<div className="col-span-1">
					<FormItem label="Ngày bán"
						invalid={errors.pay_date && touched.pay_date}
						errorMessage={errors.pay_date}
					>
						<DatePicker
							className="!z-50"
							value={payDate}
							placeholder="Nhập ngày bán"
							onChange={handleDatePickerChange}
						/>
					</FormItem>
				</div>
			</div>
		</AdaptableCard>
	)
}

export default BasicInformationFields