import React, { forwardRef, useState } from 'react'
import {
	FormContainer, Button,
} from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './components/BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';
import DynamicFormField from './components/DynamicFormField'
import { HiPlusCircle } from 'react-icons/hi'

// const validationSchema = Yup.object().shape({
// 	name: Yup.string().required('Tên khách hàng không được để trống'),
// })

const DeleteOrderButton = ({ onDelete }) => {

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
					Bạn có chắc xoá đơn hàng này không?
				</p>
			</ConfirmDialog>
		</>
	)
}

const OrderForm = forwardRef((props, ref) => {
	const [inputFields, setInputFields] = useState([
		{ id: uuidv4(), id_client: '', active: '' },
	]);
	const [payDate, setPayDate] = useState(null)




	const handleAddFields = () => {
		setInputFields([...inputFields, { id: uuidv4(), id_client: '', active: '' }])
	}

	const { type, initialData, onFormSubmit, onDiscard, onDelete } = props
	return (
		<>
			<Formik
				innerRef={ref}
				initialValues={{
					...initialData,
					products: initialData?.products ? initialData.products.split().map(value => ({ label: value, value })) : [],
					active: initialData?.active ? initialData.map(value => ({ label: value, value })) : []
				}}
				// validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					const formData = cloneDeep(values)
					formData.customerId = formData.customerId.value
					formData.code = uuidv4()
					formData.products = formData.products.map(product => product.value).toString()
					formData.active = inputFields.map(active => {
						return `${active.id_client}-${active.active}`
					}).toString()
					formData.pay_date = payDate.toString()
					onFormSubmit?.(formData, setSubmitting)
				}}
			>
				{({ values, touched, errors, isSubmitting }) => (
					<Form className="h-full">
						<FormContainer className="h-full flex flex-col justify-between">
							<div>
								<BasicInformationFields setPayDate={setPayDate} values={values} touched={touched} errors={errors} {...props} />

								<div className="flex items-center gap-10">
									<h5>Danh sách ID - Key active</h5>

									<Button
										type="button"
										size="sm"
										variant="twoTone"
										icon={<HiPlusCircle />}
										onClick={handleAddFields}
									>
										Thêm
									</Button>
								</div>
								<div className="grid grid-cols-1">
									<DynamicFormField inputFields={inputFields} setInputFields={setInputFields} />
								</div>
							</div>
							<StickyFooter
								className="-mx-8 px-8 flex items-center justify-between  py-4"
								stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
							>
								<div>
									{type === 'edit' && <DeleteOrderButton onDelete={onDelete} />}
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

OrderForm.defaultProps = {
	type: 'edit',
	initialData: {
		code: '',
		products: '',
		pay_date: '',
		total_price: 0
	}
}

export default OrderForm