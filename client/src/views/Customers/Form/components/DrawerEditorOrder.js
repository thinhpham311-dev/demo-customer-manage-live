
import { useState } from 'react'
import { Drawer, Button, toast, Notification } from 'components/ui'
import AddOrderFields from './AddOrderFields'
import {
    // HiDownload,
    HiPlusCircle
} from 'react-icons/hi'
import { useParams, useNavigate } from 'react-router-dom'
import { apiCreateOrder } from 'services/OrdersService'

const DrawerEditorOrder = (props) => {
    let { customerId } = useParams();
    const [horizontalOpen, setHorizontalOpen] = useState(false)
    const { products, loading } = props

    const navigate = useNavigate()


    const addOrder = async (data) => {
        const response = await apiCreateOrder(data)
        return response.data
    }

    const onHorizontalOpen = () => {
        setHorizontalOpen(true)
    }

    const onDrawerClose = () => {
        setHorizontalOpen(false)
    }


    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addOrder(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification title={'Đã thêm thành công'} type="success" duration={2500}>
                    Đã thêm sản phẩm thành công
                </Notification>
                , {
                    placement: 'top-center'
                }
            )
            navigate(0)
        }

    }

    return (
        <div>
            <Button variant="solid" size="sm" type="button" loading={loading} icon={<HiPlusCircle />} onClick={() => onHorizontalOpen()}>
                Thêm
            </Button>
            <Drawer
                title="Tạo đơn hàng"
                isOpen={horizontalOpen}
                placement="bottom"
                height={900}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <AddOrderFields onFormSubmit={handleFormSubmit} customerId={customerId} onDrawerClose={onDrawerClose} dataProducts={products} />
            </Drawer>
        </div>
    )
}

export default DrawerEditorOrder

