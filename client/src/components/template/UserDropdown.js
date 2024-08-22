import React, { useEffect } from 'react'
import { Avatar, Dropdown, Skeleton } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import {
	HiOutlineLogout
} from 'react-icons/hi'
import reducer from '../../store'
import { injectReducer } from '../../store/index'
import { getProfileUser } from 'store/auth/userSlice'


injectReducer('userSlice', reducer)

export const UserDropdown = ({ className }) => {
	const dispatch = useDispatch()
	const { id, authority } = useSelector((state) => state.auth.user)
	const user = useSelector((state) => state.auth.user?.userInfo)
	const loading = useSelector((state) => state.auth.user.loading)
	const { signOut } = useAuth()

	const fetchData = () => {
		setTimeout(() => {
			dispatch(getProfileUser({ id }))
		})
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, dispatch])


	const UserAvatar = (
		<div className={classNames(className, 'flex items-center gap-2')}>
			<Avatar size={32} shape="circle" src={user?.avatar} />
			<div className="hidden md:block">
				<div className="text-xs capitalize">{authority || 'guest'}</div>
				<div className="font-bold">{user?.username}</div>
			</div>
		</div>
	)

	return (
		<div>
			{
				loading ?
					<div className="flex flex-auto items-center gap-2 md:w-[150px]  ml-3">
						<div>
							<Skeleton variant="circle" height={35} width={35} />
						</div>
						<div className="hidden md:flex flex-col gap-4 w-full ">
							<Skeleton height={10} width="60%" />
							<Skeleton height={10} />
						</div>
					</div>
					:
					<Dropdown menuStyle={{ minWidth: 240 }} renderTitle={UserAvatar} placement="bottom-end">
						{/* <Dropdown.Item variant="header">
					<div className="py-2 px-3 flex items-center gap-2">
						<Avatar shape="circle" src={avatar} />
						<div>
							<div className="font-bold text-gray-900 dark:text-gray-100">{userName}</div>
							<div className="text-xs">{email}</div>
						</div>
					</div>
				</Dropdown.Item>
				<Dropdown.Item variant="divider" />
				{dropdownItemList.map(item => (
					<Dropdown.Item eventKey={item.label} key={item.label} className="mb-1">
						<Link className="flex gap-2 items-center" to={item.path}>
							<span className="text-xl opacity-50">{item.icon}</span>
							<span>{item.label}</span>
						</Link>
					</Dropdown.Item>
				))}
				<Dropdown.Item variant="divider" /> */}
						<Dropdown.Item onClick={signOut} eventKey="Đăng xuất" className="gap-2">
							<span className="text-xl opacity-50">
								<HiOutlineLogout />
							</span>
							<span>Đăng xuất</span>
						</Dropdown.Item>
					</Dropdown>
			}
		</div>
	)
}

export default withHeaderItem(UserDropdown)
