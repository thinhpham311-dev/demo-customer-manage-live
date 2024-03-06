import React from 'react';
import { Button, Input } from 'components/ui'
import { HiOutlineTrash } from 'react-icons/hi'
import {
    AdaptableCard,
    // RichTextEditor
} from 'components/shared'
const DynamicFormField = (props) => {
    const { inputFields, setInputFields } = props

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }

    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    return (
        <AdaptableCard className="mb-4">
            {
                inputFields.map(inputField => (<div key={inputField.id}>
                    <AdaptableCard className="mb-4" divider>
                        <div key={inputField.id} className="grid xl:grid-cols-12 lg:grid-cols-10 gap-4">
                            <div className="xl:col-span-4 lg:col-span-3">
                                <label htmlFor="id_client">ID</label>
                                <Input
                                    name="id_client"
                                    id="id_client"
                                    value={inputField.id_client}
                                    onChange={event => handleChangeInput(inputField.id, event)}
                                />
                            </div>
                            <div className="xl:col-span-7 lg:col-span-6">
                                <label htmlFor="active">Key active</label>
                                <Input
                                    name="active"
                                    id="active"
                                    value={inputField.active}
                                    onChange={event => handleChangeInput(inputField.id, event)}
                                />
                            </div>
                            <div className="xl:col-span-1 lg:col-span-1 flex items-end gap-4">
                                <Button className="w-full" variant="twoTone" icon={<HiOutlineTrash />} disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                                    Xoá
                                </Button>
                            </div>
                        </div>
                    </AdaptableCard>
                </div>
                ))
            }
        </AdaptableCard>
    );
}

export default DynamicFormField;