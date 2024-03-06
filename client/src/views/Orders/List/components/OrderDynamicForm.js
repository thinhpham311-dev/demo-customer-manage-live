
import { useMemo } from 'react'
import { Field, FieldArray, Form, Formik, getIn } from 'formik'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { HiMinus } from 'react-icons/hi'
import { updateOrder } from '../store/dataSlice'
import * as Yup from 'yup'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import { IoIosAddCircleOutline } from "react-icons/io";


const validationSchema = Yup.object({
    activeList: Yup.array().of(
        Yup.object().shape({
            id_client: Yup.string().required('ID không được để trống'),
            active: Yup.string().required('Active không được để trống')
        })
    ),
})

const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name)
    const touch = getIn(form.touched, name)
    return {
        errorMessage: error || '',
        invalid: typeof touch === 'undefined' ? false : error && touch,
    }
}

const OrderDynamicForm = ({ activeStringList, row }) => {
    const navigate = useNavigate()
    const activeArrList = useMemo(() => activeStringList.map(element => { return { id_client: element.slice(0, element.search("-")), active: element.slice(element.search("-") + 1) } }), [activeStringList])

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await updateOrder({
            ...row,
            active: values.active
        })
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification title={'Đã thêm thành cộng'} type="success" duration={2500}>
                    Đã thêm đơn hàng thành công
                </Notification>
                , {
                    placement: 'top-center'
                }
            )
            navigate(0)
        }

    }

    return (
        <div className="p-5">
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    activeList: activeArrList
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.active = formData.activeList?.map(active => {
                        return `${active.id_client}-${active.active}`
                    }).toString()
                    handleFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ touched, errors, values, isSubmitting }) => {
                    const activeList = values.activeList
                    return (
                        <Form>
                            <FormContainer layout="inline" >
                                <div className="w-full">

                                    <FieldArray name="activeList">
                                        {({ form, remove, push }) => (
                                            <div>
                                                {activeList && activeList.length > 0
                                                    ? activeList.map((_, index) => {
                                                        const id_clientFeedBack =
                                                            fieldFeedback(
                                                                form,
                                                                `activeList[${index}].id_client`
                                                            )
                                                        const activeFeedBack =
                                                            fieldFeedback(
                                                                form,
                                                                `activeList[${index}].active`
                                                            )

                                                        return (
                                                            <div key={index}>
                                                                <FormItem
                                                                    label="ID"
                                                                    invalid={
                                                                        id_clientFeedBack.invalid
                                                                    }
                                                                    errorMessage={
                                                                        id_clientFeedBack.errorMessage
                                                                    }
                                                                >
                                                                    <Field
                                                                        invalid={
                                                                            id_clientFeedBack.invalid
                                                                        }
                                                                        placeholder="Nhập ID"
                                                                        name={`activeList[${index}].id_client`}
                                                                        type="text"
                                                                        component={
                                                                            Input
                                                                        }
                                                                    />
                                                                </FormItem>
                                                                <FormItem
                                                                    label="Key Active"
                                                                    invalid={
                                                                        activeFeedBack.invalid
                                                                    }
                                                                    errorMessage={
                                                                        activeFeedBack.errorMessage
                                                                    }
                                                                >
                                                                    <Field
                                                                        invalid={
                                                                            activeFeedBack.invalid
                                                                        }
                                                                        placeholder="Nhập Key active"
                                                                        name={`activeList[${index}].active`}
                                                                        type="text"
                                                                        component={
                                                                            Input
                                                                        }
                                                                    />
                                                                </FormItem>
                                                                <Button
                                                                    shape="circle"
                                                                    size="sm"
                                                                    type="button"
                                                                    icon={
                                                                        <HiMinus />
                                                                    }
                                                                    onClick={() =>
                                                                        remove(
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                    : null}
                                                <div className="w-full sticky bottom-0 left-0 bg-white p-5 flex items-center gap-3">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        icon={<IoIosAddCircleOutline />}
                                                        onClick={() => {
                                                            push({
                                                                id_client: '',
                                                                active: '',
                                                            })
                                                        }}
                                                    >
                                                        Thêm Key Active
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        variant="solid"
                                                        size="sm"
                                                        icon={<AiOutlineSave />}
                                                        loading={isSubmitting}
                                                    >
                                                        Lưu
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default OrderDynamicForm

