import React, { useMemo } from 'react'
import { AdaptableCard, DataTable } from 'components/shared'
import DrawerEditorOrder from './DrawerEditorOrder'


const OrderTable = (props) => {

    const { dataOrderList, dataProductList, loading, idCustomer } = props

    const columns = useMemo(() => [
        {
            Header: 'Mã đơn hàng',
            accessor: 'code',
        },
        {
            Header: 'Sản phẩm',
            accessor: 'products',
        },
        {
            Header: 'ID - Key Active',
            accessor: 'active',
        },
        {
            Header: 'Tổng giá bán',
            accessor: 'total_price',
        },
        {
            Header: 'Ngày bán',
            accessor: 'pay_date',
        }
    ], [])
    return (
        <AdaptableCard className="mb-4 py-4" divider>
            <div className="flex justify-between items-center mb-3">
                <h5>Danh sách đơn hàng</h5>

                <DrawerEditorOrder
                    idCustomer={idCustomer}
                    products={dataProductList}
                    loading={loading}
                />
            </div>
            <DataTable
                isPaginate={false}
                columns={columns}
                data={dataOrderList}
                loading={loading}
            />
        </AdaptableCard>
    )
}

export default OrderTable