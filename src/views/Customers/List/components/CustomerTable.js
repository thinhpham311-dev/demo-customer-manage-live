import React, { useEffect, useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import { setSortedColumn, setSelectedCustomer } from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
// import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerDeleteConfirmation from './CustomerDeleteConfirmation'
// import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

const inventoryStatusColor = {
	0: { label: 'In Stock', dotClass: 'bg-emerald-500', textClass: 'text-emerald-500' },
	1: { label: 'Limited', dotClass: 'bg-amber-500', textClass: 'text-amber-500' },
	2: { label: 'Out of Stock', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

const ActionColumn = ({ row }) => {

	const dispatch = useDispatch()
	// const { textTheme } = useThemeClass()
	// const navigate = useNavigate()

	// const onEdit = () => {
	// 	navigate(`/app/customers/edit/${row.id}`)
	// }

	const onDelete = () => {
		dispatch(toggleDeleteConfirmation(true))
		dispatch(setSelectedCustomer(row.id))
	}

	return (
		<div className="flex justify-end text-lg">
			{/* <span className={`cursor-pointer p-2 hover:${textTheme}`} onClick={onEdit}>
				<HiOutlinePencil />
			</span> */}
			<span className="cursor-pointer p-2 hover:text-red-500" onClick={onDelete}>
				<HiOutlineTrash />
			</span>
		</div>
	)
}

const CustomerColumn = ({ row }) => {

	const avatar = row.img ? <Avatar src={row.img} /> : <Avatar icon={<FiPackage />} />

	return (
		<div className="flex items-center">
			{avatar}
			<span className={`ml-2 rtl:mr-2 font-semibold`}>
				{row.name}
			</span>
		</div>
	)
}

const CustomerTable = () => {

	const dispatch = useDispatch()
	const { pageIndex, pageSize, sort, query, total } = useSelector((state) => state.customerListSlice.data.tableData)
	const filterData = useSelector((state) => state.customerListSlice.data.filterData)
	const loading = useSelector((state) => state.customerListSlice.data.loading)
	const data = useSelector((state) => state.customerListSlice.data.customerList)

	console.log(data)

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageIndex, pageSize, sort])

	const tableData = useMemo(() =>
		({ pageIndex, pageSize, sort, query, total }),
		[pageIndex, pageSize, sort, query, total])

	const fetchData = () => {
		dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData }))
	}

	const columns = useMemo(() => [
		{
			Header: 'Name',
			accessor: 'name',
			sortable: true,
			Cell: props => {
				const row = props.row.original
				return <CustomerColumn row={row} />
			},
		},
		{
			Header: 'Category',
			accessor: 'category',
			sortable: true,
			Cell: props => {
				const row = props.row.original
				return (
					<span className="capitalize">{row.category}</span>
				)
			},
		},
		{
			Header: 'Quantity',
			accessor: 'stock',
			sortable: true,
		},
		{
			Header: 'Status',
			accessor: 'status',
			sortable: true,
			Cell: props => {
				const { status } = props.row.original
				return (
					<div className="flex items-center gap-2">
						<Badge className={inventoryStatusColor[status].dotClass} />
						<span className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}>
							{inventoryStatusColor[status].label}
						</span>
					</div>
				)
			},
		},
		{
			Header: 'Price',
			accessor: 'price',
			sortable: true,
			Cell: props => {
				const { price } = props.row.original
				return (
					<span>${price}</span>
				)
			},
		},
		{
			Header: '',
			id: 'action',
			accessor: (row) => row,
			Cell: props => <ActionColumn row={props.row.original} />
		},
	], [])

	const onPaginationChange = page => {
		const newTableData = cloneDeep(tableData)
		newTableData.pageIndex = page
		dispatch(setTableData(newTableData))
	}

	const onSelectChange = value => {
		const newTableData = cloneDeep(tableData)
		newTableData.pageSize = Number(value)
		newTableData.pageIndex = 1
		dispatch(setTableData(newTableData))
	}

	const onSort = (sort, sortingColumn) => {
		const newTableData = cloneDeep(tableData)
		newTableData.sort = sort
		dispatch(setTableData(newTableData))
		dispatch(setSortedColumn(sortingColumn))
	}

	return (
		<>
			<DataTable
				columns={columns}
				data={data}
				skeletonAvatarColumns={[0]}
				skeletonAvatarProps={{ className: 'rounded-md' }}
				loading={loading}
				pagingData={tableData}
				onPaginationChange={onPaginationChange}
				onSelectChange={onSelectChange}
				onSort={onSort}
			/>
			<CustomerDeleteConfirmation />
		</>
	)
}

export default CustomerTable