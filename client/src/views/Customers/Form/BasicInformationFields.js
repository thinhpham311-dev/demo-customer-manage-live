import React from 'react'
import {
	AdaptableCard,
	// RichTextEditor
} from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'


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
				label="ID"
				invalid={errors.email && touched.email}
				errorMessage={errors.email}
			>
				<Field
					type="text"
					autoComplete="off"
					name="id_client"
					placeholder="Nhập ID"
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
				invalid={errors.total_order && touched.total_order}
				errorMessage={errors.total_order}
			>
				<Field
					type="number"
					min="0"
					autoComplete="off"
					name="total_order"
					placeholder="Nhập đơn hàng"
					component={Input}
				/>
			</FormItem>
		</AdaptableCard>
	)
}

export default BasicInformationFields