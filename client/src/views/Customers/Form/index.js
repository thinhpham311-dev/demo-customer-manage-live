import React, { forwardRef, useState, useMemo } from 'react'
import {
	FormContainer, Button,
} from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './components/BasicInformationFields'
import OrderTable from './components/OrderTable'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import isEmpty from 'lodash/isEmpty'

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Tên khách hàng không được để trống'),
	email: Yup.string().required('Email không được để trống').email("Email không đúng định dạng"),
})

const DeleteCustomerButton = ({ onDelete }) => {

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

const CustomerForm = forwardRef((props, ref) => {

	const { type, initialData, onFormSubmit, onDiscard, onDelete,
		dataOrderList, loadingOrder, dataProductList, loadingProduct
	} = props

	// const _sum = useMemo(() => dataOrderList?.map((item) => item.total_price)?.reduce(
	// 	(accumulator, currentValue) => accumulator + currentValue, initialData.total_order
	// ), [dataOrderList, initialData.total_order])


	return (
		<>
			<Formik
				innerRef={ref}
				initialValues={{
					...initialData,
					// total_order: type === "edit" && _sum > 0 ? _sum : 0
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					const formData = cloneDeep(values)
					onFormSubmit?.(formData, setSubmitting)
				}}
			>
				{({ values, touched, errors, isSubmitting }) => (
					<Form className="h-full">
						<FormContainer className="h-full flex flex-col justify-between">

							<BasicInformationFields type={type} touched={touched} errors={errors} values={values} />

							{type === 'edit' && <OrderTable dataOrderList={dataOrderList} loading={loadingOrder}
								dataProductList={dataProductList} loadingProduct={loadingProduct}
							/>}
							<StickyFooter
								className="-mx-8 px-8 flex items-center justify-between  py-4"
								stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
							>
								<div>
									{type === 'edit' && <DeleteCustomerButton onDelete={onDelete} />}
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

CustomerForm.defaultProps = {
	type: 'edit',
	initialData: {
		name: '',
		email: '',
		total_order: 0
	}
}

export default CustomerForm