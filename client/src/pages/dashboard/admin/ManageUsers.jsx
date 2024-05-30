import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import UserDataRow from '../../../components/table-rows/UsersTableRow'
import Heading from '../../../components/Shared/Heading'

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['manage-users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
                <Heading title={'Manage Users'} center={true} />
                {/* <button onClick={() => setShowModal(true)} className='bg-blue-500 p-4'>modal</button> */}
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Status
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* User data table row */}
                                    {
                                        users.map(user => <UserDataRow user={user} key={user._id} refetch={refetch} />)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Helmet>
                <title>Manage Users</title>
            </Helmet>
        </>
    )
}

export default ManageUsers