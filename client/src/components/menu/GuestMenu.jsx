import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import askConfirm from '../modals/askConfirm'

const GuestMenu = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    async function handleBecomeHost() {
        const userInfo = {
            email: user?.email,
            status: 'requested',
        }
        const ask = await askConfirm(<span className='text-2xl'>Do you want to send requests to become a host ?</span>)
        if (!ask) return
        const res = await axiosSecure.put('/user', userInfo)
        console.log(res);
    }
    return (
        <>
            <MenuItem
                icon={BsFingerprint}
                label='My Bookings'
                address='my-bookings'
            />

            <div className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
                <GrUserAdmin className='w-5 h-5' />

                <button onClick={handleBecomeHost} className='mx-4 font-medium'>Become A Host</button>
            </div>
        </>
    )
}

export default GuestMenu