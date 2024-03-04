import React from 'react'
import { AdaptableCard } from 'components/shared'
import Table from 'components/ui/Table'
import DialogEditor from './DialogEditor'

const { Tr, Th, Td, THead, TBody } = Table


const ProductsList = props => {

    const { values } = props

    return (
        <AdaptableCard className="mb-4 py-4" divider>
            <div className="flex justify-between items-center mb-3">
                <h5>Danh sách đơn hàng</h5>
                <DialogEditor />
            </div>
            <Table>
                <THead>
                    <Tr>
                        <Th>Mã đơn hàng</Th>
                        <Th>Sản phẩm</Th>
                        <Th>Giá</Th>
                        <Th>Ngày mua</Th>
                        <Th>Ngày lập</Th>
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>Alfreds Futterkiste</Td>
                        <Td>Maria Anders</Td>
                        <Td>Germany</Td>
                    </Tr>
                    <Tr>
                        <Td>Centro comercial Moctezuma</Td>
                        <Td>Francisco Chang</Td>
                        <Td>Mexico</Td>
                    </Tr>
                    <Tr>
                        <Td>Ernst Handel</Td>
                        <Td>Roland Mendel</Td>
                        <Td>Austria</Td>
                    </Tr>
                </TBody>
            </Table>
        </AdaptableCard>
    )
}

export default ProductsList