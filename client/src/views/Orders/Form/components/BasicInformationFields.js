import React, { useMemo } from 'react'
import {
	AdaptableCard,
	// RichTextEditor
} from 'components/shared'
import { Input, FormItem, Select, DatePicker } from 'components/ui'
import { Field } from 'formik'
import CreatableSelect from 'react-select/creatable'
import NumberFormat from 'react-number-format'

const PriceInput = props => {
	return <Input {...props} value={props.field.value} prefix="VND" />
}

const NumberFormatInput = ({ onValueChange, ...rest }) => {
	return (
		<NumberFormat
			customInput={Input}
			type="text"
			onValueChange={onValueChange}
			autoComplete="off"
			{...rest}
		/>
	)
}

const BasicInformationFields = props => {

	const { touched, errors, payDate, setPayDate, values, dataProductList, dataCustomerList } = props

	const handleDatePickerChange = (date) => {
		setPayDate(date)
	}

	const arrProducts = useMemo(() => dataProductList.map(item => {
		return {
			label: item.name,
			value: item.name
		};
	}), [dataProductList]);

	const arrCustomers = useMemo(() => dataCustomerList.map(item => {
		return {
			label: item.name,
			value: item.id
		};
	}), [dataCustomerList]);

	return (
		<AdaptableCard className="mb-4" divider>
			<h5 className="mb-3">Thông tin đơn hàng</h5>

			<div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 sticky left-0 top-0 bg-white py-[1.5rem]">
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
						invalid={errors.customerId && touched.customerId}
						errorMessage={errors.customerId}
					>
						<Field name="customerId">
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
							value={payDate}
							placeholder="Nhập ngày bán"
							onChange={handleDatePickerChange}
						/>
					</FormItem>
				</div>
				<div className="col-span-1">
					<FormItem
						label="Tổng giá bán"
						invalid={errors.total_price && touched.total_price}
						errorMessage={errors.total_price}
					>
						<Field name="total_price">
							{({ field, form }) => {
								return (
									<NumberFormatInput
										form={form}
										field={field}
										placeholder="Nhập giá bán"
										customInput={PriceInput}
										onValueChange={e => {
											form.setFieldValue(field.name, e.value)
										}}
									/>
								)
							}}
						</Field>
					</FormItem>
				</div>
			</div>

		</AdaptableCard>
	)
}

export default BasicInformationFields