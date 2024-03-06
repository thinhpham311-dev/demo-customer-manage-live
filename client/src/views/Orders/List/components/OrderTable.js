import React, { useEffect, useMemo } from 'react'
// import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
// import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'
// import { FiPackage } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, setTableData } from '../store/dataSlice'
import {
	setSortedColumn,
	//  setSelectedCustomer 
} from '../store/stateSlice'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
// import useThemeClass from 'utils/hooks/useThemeClass'
// // import CustomerDeleteConfirmation from './CustomerDeleteConfirmation'
// import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'


// const ActionColumn = ({ row }) => {

// 	const dispatch = useDispatch()
// 	const { textTheme } = useThemeClass()
// 	const navigate = useNavigate()

// 	const onEdit = () => {
// 		navigate(`/app/orders/edit/${row.id}`)
// 	}

// 	const onDelete = () => {
// 		dispatch(toggleDeleteConfirmation(true))
// 		dispatch(setSelectedCustomer(row.id))
// 	}

// 	return (
// 		<div className="flex justify-end text-lg">
// 			<span className={`cursor-pointer p-2 hover:${textTheme}`} onClick={onEdit}>
// 				<HiOutlinePencil />
// 			</span>
// 			<span className="cursor-pointer p-2 hover:text-red-500" onClick={onDelete}>
// 				<HiOutlineTrash />
// 			</span>
// 		</div>
// 	)
// }


const OrderTable = () => {

	const dispatch = useDispatch()
	const { pageIndex, pageSize, sort, query, total } = useSelector((state) => state.orderListSlice.data.tableData)
	const loading = useSelector((state) => state.orderListSlice.data.loading)
	const data = useSelector((state) => state.orderListSlice.data.orderList)

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageIndex, pageSize, sort])

	const tableData = useMemo(() =>
		({ pageIndex, pageSize, sort, query, total }),
		[pageIndex, pageSize, sort, query, total])

	const fetchData = () => {
		dispatch(getOrders({ pageIndex, pageSize, sort, query }))
	}

	const columns = useMemo(() => [
		{
			Header: 'Mã đơn hàng',
			accessor: 'code',
			sortable: true,
		},
		{
			Header: 'Sản phẩm',
			accessor: 'products',
			sortable: true,
		},
		{
			Header: 'ID - Key active',
			accessor: 'active',
		},

		{
			Header: 'Tên khách hàng',
			accessor: 'customerId',
			sortable: true,
		},
		{
			Header: 'Tổng giá bán',
			accessor: 'total_price',
		},
		// {
		// 	Header: '',
		// 	id: 'action',
		// 	accessor: (row) => row,
		// 	Cell: props => {
		// 		return <ActionColumn row={props.row.original} />
		// 	}
		// },
	], [])

	const onPaginationChange = page => {
		if (tableData) {
			const newTableData = cloneDeep(tableData)
			newTableData.pageIndex = page
			dispatch(setTableData(newTableData))
		}
	}

	const onSelectChange = value => {
		if (tableData) {
			const newTableData = cloneDeep(tableData)
			newTableData.pageSize = Number(value)
			newTableData.pageIndex = 1
			dispatch(setTableData(newTableData))
		}
	}

	const onSort = (sort, sortingColumn) => {
		if (tableData) {
			const newTableData = cloneDeep(tableData)
			newTableData.sort = sort
			dispatch(setTableData(newTableData))
			dispatch(setSortedColumn(sortingColumn))
		}
	}

	return (
		<>
			<DataTable
				columns={columns}
				data={data}
				skeletonAvatarColumns={[0]}
				skeletonAvatarProps={{ className: 'rounded-md' }}
				loading={loading}
				isPaginate={true}
				pagingData={tableData}
				onPaginationChange={onPaginationChange}
				onSelectChange={onSelectChange}
				onSort={onSort}
			/>
			{/* <CustomerDeleteConfirmation /> */}
		</>
	)
}

export default OrderTable