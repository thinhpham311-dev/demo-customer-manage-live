import { Field, FieldArray, getIn } from 'formik'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { HiMinus } from 'react-icons/hi'
import { IoIosAddCircleOutline } from "react-icons/io";

const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name)
    const touch = getIn(form.touched, name)
    return {
        errorMessage: error || '',
        invalid: typeof touch === 'undefined' ? false : error && touch,
    }
}

const DynamicFormField = ({ active }) => {
    return (

        <FormContainer layout="inline" >
            <div className="w-full">

                <FieldArray name="active">
                    {({ form, remove, push }) => (
                        <div>
                            {active && active.length > 0
                                ? active.map((_, index) => {
                                    const id_clientFeedBack =
                                        fieldFeedback(
                                            form,
                                            `active[${index}].id_client`
                                        )
                                    const activeFeedBack =
                                        fieldFeedback(
                                            form,
                                            `active[${index}].active`
                                        )

                                    const pcCheckFeedBack =
                                        fieldFeedback(
                                            form,
                                            `active[${index}].pccheck`
                                        )
                                    const key_typeFeedBack =
                                        fieldFeedback(
                                            form,
                                            `active[${index}].key_type`
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
                                                    name={`active[${index}].id_client`}
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
                                                    name={`active[${index}].active`}
                                                    type="text"
                                                    component={
                                                        Input
                                                    }
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="PC check"
                                                invalid={
                                                    pcCheckFeedBack.invalid
                                                }
                                                errorMessage={
                                                    pcCheckFeedBack.errorMessage
                                                }
                                            >
                                                <Field
                                                    invalid={
                                                        pcCheckFeedBack.invalid
                                                    }
                                                    placeholder="Nhập PC check"
                                                    name={`active[${index}].pccheck`}
                                                    type="text"
                                                    component={
                                                        Input
                                                    }
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="Loại Key"
                                                invalid={
                                                    key_typeFeedBack.invalid
                                                }
                                                errorMessage={
                                                    key_typeFeedBack.errorMessage
                                                }
                                            >
                                                <Field
                                                    invalid={
                                                        key_typeFeedBack.invalid
                                                    }
                                                    placeholder="Chọn loại key active"
                                                    name={`active[${index}].key_type`}
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
                                            pccheck: '',
                                            key_type: '',
                                        })
                                    }}
                                >
                                    Thêm Key Active
                                </Button>

                            </div>
                        </div>
                    )}
                </FieldArray>
            </div>
        </FormContainer>
    )
}

export default DynamicFormField

