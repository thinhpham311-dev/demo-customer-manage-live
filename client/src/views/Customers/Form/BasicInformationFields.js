import React from 'react'
import {
	AdaptableCard,
	// RichTextEditor
} from 'components/shared'
import { Input, FormItem } from 'components/ui'
// import CreatableSelect from 'react-select/creatable'
import NumberFormat from 'react-number-format'
import { Field } from 'formik'

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
	const { touched, errors } = props

	return (
		<AdaptableCard className="mb-4" divider>
			<h5 className="mb-3">Thông tin khách hàng</h5>
			<div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
				<div className="col-span-1">

					<FormItem
						label="Tên khách hàng"
						invalid={errors.name && touched.name}
						errorMessage={errors.name}
					>
						<Field
							type="text"
							autoComplete="off"
							name="name"
							placeholder="Nhập tên khách hàng"
							component={Input}
						/>
					</FormItem>
				</div>
				<div className="col-span-1">

					<FormItem
						label="Sản phẩm"
						invalid={errors.products && touched.products}
						errorMessage={errors.products}
					>
						<Field
							type="text"
							autoComplete="off"
							name="products"
							placeholder="Nhập sản phẩm"
							component={Input}
						/>
					</FormItem>
				</div>
				<div className="col-span-1">

					<FormItem
						label="Email"
						invalid={errors.email && touched.email}
						errorMessage={errors.email}
					>
						<Field
							type="text"
							autoComplete="off"
							name="email"
							placeholder="Nhập email"
							component={Input}
						/>
					</FormItem>
				</div>
				<div className="col-span-1">

					<FormItem
						label="ID"
						invalid={errors.id_client && touched.id_client}
						errorMessage={errors.id_client}
					>
						<Field
							type="text"
							autoComplete="off"
							name="id_client"
							placeholder="Nhập ID"
							component={Input}
						/>
					</FormItem>
				</div>
				<div className="col-span-1">

					<FormItem
						label="Key Active"
					>
						<Field
							type="text"
							autoComplete="off"
							name="active"
							placeholder="Nhập key active"
							component={Input}
						/>
					</FormItem>
				</div>
				<div className="col-span-1">

					<FormItem
						label="Đơn hàng"
						invalid={errors.total_order && touched.total_order}
						errorMessage={errors.total_order}
					>
						<Field name="total_order">
							{({ field, form }) => {
								return (
									<NumberFormatInput
										form={form}
										field={field}
										placeholder="Nhập tổng đơn hàng"
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