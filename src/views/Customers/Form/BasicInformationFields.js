import React from 'react'
import {
	AdaptableCard,
	// RichTextEditor
} from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

export const categories = [
	{ label: 'Bags', value: 'bags' },
	{ label: 'Cloths', value: 'cloths' },
	{ label: 'Devices', value: 'devices' },
	{ label: 'Shoes', value: 'shoes' },
	{ label: 'Watches', value: 'watches' }
]

const BasicInformationFields = props => {

	const { touched, errors } = props

	return (
		<AdaptableCard className="mb-4" >

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
			<FormItem
				label="Sản phẩm"
				invalid={errors.product && touched.product}
				errorMessage={errors.product}
			>
				<Field
					type="text"
					autoComplete="off"
					name="product"
					placeholder="Nhập sản phẩm"
					component={Input}
				/>
			</FormItem>
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
			<FormItem
				label="Key Active"
				invalid={errors.active && touched.active}
				errorMessage={errors.active}
			>
				<Field
					type="text"
					autoComplete="off"
					name="active"
					placeholder="Nhập key active"
					component={Input}
				/>
			</FormItem>
			<FormItem
				label="Đơn hàng"
				invalid={errors.order && touched.order}
				errorMessage={errors.order}
			>
				<Field
					type="text"
					autoComplete="off"
					name="order"
					placeholder="Nhập đơn hàng"
					component={Input}
				/>
			</FormItem>
		</AdaptableCard>
	)
}

export default BasicInformationFields