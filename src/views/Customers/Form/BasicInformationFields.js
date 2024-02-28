import React from 'react'
import {
	AdaptableCard,
	// RichTextEditor
} from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import CreatableSelect from 'react-select/creatable'

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
		<AdaptableCard className="mb-4" divider>

			<FormItem
				label="Name"
				invalid={errors.name && touched.name}
				errorMessage={errors.name}
			>
				<Field
					type="text"
					autoComplete="off"
					name="name"
					placeholder="Name"
					component={Input}
				/>
			</FormItem>
			<FormItem
				label="Zalo"
				invalid={errors.zalo && touched.zalo}
				errorMessage={errors.zalo}
			>
				<Field
					type="text"
					autoComplete="off"
					name="zalo"
					placeholder="Zalo"
					component={Input}
				/>
			</FormItem>
			<FormItem
				label="Product"
				invalid={errors.product && touched.product}
				errorMessage={errors.product}
			>
				<Field
					type="text"
					autoComplete="off"
					name="product"
					placeholder="Product"
					component={Input}
				/>
			</FormItem>
			<FormItem
				label="Active"
				invalid={errors.active && touched.active}
				errorMessage={errors.active}
			>
				<Field name="active">
					{({ field, form }) => (
						<Select
							componentAs={CreatableSelect}
							isMulti
							field={field}
							form={form}
							onChange={option => form.setFieldValue(field.name, option)}
						/>
					)}
				</Field>
			</FormItem>
			<FormItem
				label="Order"
				invalid={errors.order && touched.order}
				errorMessage={errors.order}
			>
				<Field
					type="text"
					autoComplete="off"
					name="order"
					placeholder="Order"
					component={Input}
				/>
			</FormItem>
		</AdaptableCard>
	)
}

export default BasicInformationFields