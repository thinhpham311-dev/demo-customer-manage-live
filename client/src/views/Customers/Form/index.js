import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, hooks } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
// import PricingFields from './PricingFields'
// import OrganizationFields from './OrganizationFields'
// import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Product Name Required'),
	price: Yup.number().required('Price Required'),
	stock: Yup.number().required('SKU Required'),
	category: Yup.string().required('Category Required'),
})

const DeleteProductButton = ({ onDelete }) => {

	const [dialogOpen, setDialogOpen] = useState(false)

	const onConfirmDialogOpen = () => {
		setDialogOpen(true)
	}

	const onConfirmDialogClose = () => {
		setDialogOpen(false)
	}

	const handleConfirm = () => {
		onDelete?.(setDialogOpen)
	}

	return (
		<>
			<Button
				className="text-red-600"
				variant="plain"
				size="sm"
				icon={<HiOutlineTrash />}
				type="button"
				onClick={onConfirmDialogOpen}
			>
				Xoá
			</Button>
			<ConfirmDialog
				isOpen={dialogOpen}
				onClose={onConfirmDialogClose}
				onRequestClose={onConfirmDialogClose}
				type="danger"
				title="Cảnh báo"
				onCancel={onConfirmDialogClose}
				onConfirm={handleConfirm}
				confirmButtonColor="red-600"
			>
				<p>
					Bạn có chắc xoá sản phẩm này không?
				</p>
			</ConfirmDialog>
		</>
	)
}

const ProductForm = forwardRef((props, ref) => {

	const { type, initialData, onFormSubmit, onDiscard, onDelete } = props

	const newId = useUniqueId('product-')

	return (
		<>
			<Formik
				innerRef={ref}
				initialValues={{
					...initialData,
					tags: initialData?.tags ? initialData.tags.map(value => ({ label: value, value })) : []
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					const formData = cloneDeep(values)
					formData.tags = formData.tags.map(tag => tag.value)
					if (type === 'new') {
						formData.id = newId
						if (formData.imgList.length > 0) {
							formData.img = formData.imgList[0].img
						}
					}
					onFormSubmit?.(formData, setSubmitting)
				}}
			>
				{({ values, touched, errors, isSubmitting }) => (
					<Form className="h-full">
						<FormContainer className="h-full flex flex-col justify-between">
							<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
								<div className="lg:col-span-2">
									<BasicInformationFields touched={touched} errors={errors} values={values} />
									{/* <PricingFields touched={touched} errors={errors} values={values} /> */}
									{/* <OrganizationFields touched={touched} errors={errors} values={values} /> */}
								</div>

								{/* <div className="lg:col-span-1">
									<ProductImages touched={touched} errors={errors} values={values} />
								</div> */}
							</div>
							<StickyFooter
								className="-mx-8 px-8 flex items-center justify-between  py-4"
								stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
							>
								<div>
									{type === 'edit' && <DeleteProductButton onDelete={onDelete} />}
								</div>
								<div className="md:flex items-center">
									<Button
										size="sm"
										className="ltr:mr-3 rtl:ml-3"
										onClick={() => onDiscard?.()}
										type="button"
									>
										Quay lại
									</Button>
									<Button
										size="sm"
										variant="solid"
										loading={isSubmitting}
										icon={<AiOutlineSave />}
										type="submit"
									>
										Lưu
									</Button>
								</div>
							</StickyFooter>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</>
	)
})

ProductForm.defaultProps = {
	type: 'edit',
	initialData: {
		id: '',
		name: '',
		productCode: '',
		img: '',
		imgList: [],
		category: '',
		price: 0,
		stock: 0,
		status: 0,
		costPerItem: 0,
		bulkDiscountPrice: 0,
		taxRate: 6,
		tags: [],
		brand: '',
		vendor: '',
		description: '',
	}
}

export default ProductForm