import PropTypes from 'prop-types'
import UpdateUserRoleModal from '../modals/UpdateUserRoleModal'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
const UserDataRow = ({ user, refetch }) => {
    const [showModal, setShowModal] = useState(false)
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (userInfo) => {
            const { data } = await axiosSecure.patch(`/user/update-role/${user?.email}`, userInfo)
            console.log(data);
            return data
        }
    })

    async function modalHandler(select) {
        setShowModal(false)
        const userInfo = {
            role: select,
            status: 'verified',
        }
        try {
            const res = await mutateAsync(userInfo)
            refetch()
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {user?.status ? (
                    <p
                        className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
                            } whitespace-no-wrap`}
                    >
                        {user.status}
                    </p>
                ) : (
                    <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
                )}
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <button onClick={() => setShowModal(true)} className='relative'>Update Role</button>
                </span>
                {/* Update User Modal */}
                {showModal && <UpdateUserRoleModal modalHandler={modalHandler} setShowModal={setShowModal} role={user.role} />}
            </td>
        </tr >
    )
}

UserDataRow.propTypes = {
    user: PropTypes.object,
    refetch: PropTypes.func,
}

export default UserDataRow