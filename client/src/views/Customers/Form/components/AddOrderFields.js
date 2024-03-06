
import {
    useMemo,
    useState
} from 'react'
import {
    Input, Button, FormItem,
    Select, DatePicker,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import CreatableSelect from 'react-select/creatable'
import NumberFormat from 'react-number-format'
import { AiOutlineSave } from 'react-icons/ai'
import { HiPlusCircle } from 'react-icons/hi'
import DynamicFormField from './DynamicFormField'
import cloneDeep from 'lodash/cloneDeep'
// import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';

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

// const validationSchema = Yup.object().shape({
//     products: Yup.string().required('Tên khách hàng không được để trống'),
// })

const AddOrderFields = (props) => {

    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), id_client: '', active: '' },
    ]);
    const [payDate, setPayDate] = useState(null)
    const { onDrawerClose,
        dataProducts,
        initialData, customerId, onFormSubmit } = props


    const onHandleDrawerClose = () => {
        onDrawerClose()
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), id_client: '', active: '' }])
    }

    const handleDatePickerChange = (date) => {
        setPayDate(date)
    }


    const arrProducts = useMemo(() => dataProducts.map(item => {
        return {
            label: item.name,
            value: item.name
        };
    }), [dataProducts]);

    return (
        <div>
            <Formik
                initialValues={{
                    ...initialData,
                    products: initialData?.products ? initialData.products.split().map(value => ({ label: value, value })) : [],
                    active: initialData?.active ? initialData.map(value => ({ label: value, value })) : []
                }}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.products = formData.products.map(product => product.value).toString()
                    formData.active = inputFields.map(active => {
                        return `${active.id_client}-${active.active}`
                    }).toString()
                    formData.pay_date = payDate.toString()
                    formData.customerId = Number(customerId)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form className="relative">
                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 sticky left-0 top-0 bg-white py-[1.5rem]">
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
                                <Field name="products" hidden></Field>
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
                        <div className="grid grid-cols-1 gap-3">
                            <DynamicFormField inputFields={inputFields} setInputFields={setInputFields} />
                        </div>
                        <div className=" fixed left-0 bottom-0 bg-white w-full p-5 flex items-center gap-3 justify-end z-0 ">
                            <Button
                                size="sm"
                                onClick={() => { onHandleDrawerClose() }}
                                type="button"
                            >
                                Đóng
                            </Button>

                            <Button type="submit" size="sm" loading={isSubmitting} variant="solid" icon={<AiOutlineSave />}>Lưu</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

AddOrderFields.defaultProps = {
    type: 'edit',
    initialData: {
        products: '',
        pay_date: '',
        active: '',
        total_price: 0
    }
}

export default AddOrderFields

