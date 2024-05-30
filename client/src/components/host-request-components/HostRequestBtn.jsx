import React from 'react';
import useAuth from '../../hooks/useAuth';
import askConfirm from '../modals/askConfirm';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const HostRequestBtn = () => {
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
            <div className='hidden md:block'>
                {user && (
                    <button
                        onClick={handleBecomeHost}
                        disabled={!user}
                        className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                    >
                        Host your home
                    </button>
                )}
            </div>
        </>
    );
};

export default HostRequestBtn;