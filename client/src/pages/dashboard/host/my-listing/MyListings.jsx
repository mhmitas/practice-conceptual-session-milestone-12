import { Helmet } from 'react-helmet-async'
import useAuth from '../../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import RoomDataRow from '../../../../components/table-rows/RoomsListRow'
import askConfirm from '../../../../components/modals/askConfirm'

const MyListings = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: rooms = [], isPending, refetch } = useQuery({
        queryKey: ['my-listings', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/rooms/${user?.email}`)
            // console.log(data);
            return data
        }
    })
    if (isPending) {
        return <h3>Loading...</h3>
    }

    async function handleDelete(id) {
        const ask = await askConfirm(<span>
            <span className='text-2xl inline-block'>Are you sure? You want to delete this room.</span><br />
            <span className='text-rose-600 mt-1 inline-block'>You cannot revert it!</span>
        </span>)
        if (!ask) { return }
        try {
            const result = await axiosSecure.delete(`/room/${id}`)
            refetch()
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Helmet>
                <title>My Listings</title>
            </Helmet>

            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal overflow-x-auto'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Location
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            From
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            To
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Delete
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Room row data */}
                                    {
                                        rooms.map(room => <RoomDataRow
                                            room={room}
                                            key={room._id}
                                            handleDelete={handleDelete}
                                        />)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyListings