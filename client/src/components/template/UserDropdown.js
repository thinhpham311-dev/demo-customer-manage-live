import React, { useEffect } from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import {
	HiOutlineLogout
} from 'react-icons/hi'
import { getProfileUser } from '../../store/auth/userSlice'
import reducer from '../../store'
import { injectReducer } from '../../store/index'


injectReducer('userSlice', reducer)

export const UserDropdown = ({ className }) => {
	const dispatch = useDispatch()

	const fetchData = () => {
		dispatch(getProfileUser())
	}

	const { username, avatar, authority } = useSelector((state) => state.auth.user.userData)
	const { signedIn } = useSelector((state) => state.auth.session)

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signedIn])

	const { signOut } = useAuth()

	const UserAvatar = (
		<div className={classNames(className, 'flex items-center gap-2')}>
			<Avatar size={32} shape="circle" src={avatar} />
			<div className="hidden md:block">
				<div className="text-xs capitalize">{authority[0] || 'guest'}</div>
				<div className="font-bold">{username}</div>
			</div>
		</div>
	)

	return (
		<div>
			<Dropdown menuStyle={{ minWidth: 240 }} renderTitle={signedIn && UserAvatar} placement="bottom-end">
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
		</div>
	)
}

export default withHeaderItem(UserDropdown)
