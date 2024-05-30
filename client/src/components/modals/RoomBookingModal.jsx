import React from 'react';
import { format } from 'date-fns'

const RoomBookingModal = ({ bookingInfo, setShowModal, modalHandler }) => {
    return (
        <div>
            <div
                className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-15 z-50"

            >
                <div className="bg-white text-slate-950 rounded-lg shadow-lg p-6 max-w-md w-full">
                    <div className='mb-6'>
                        <h3 className='text-xl'>Review Info Before Reserve</h3>
                        <div className='mt-2'>
                            <p className='text-sm text-gray-700'>
                                Room: {bookingInfo.title}
                            </p>
                        </div>
                        <div className='mt-2'>
                            <p className='text-sm text-gray-700'>
                                Location: {bookingInfo.location}
                            </p>
                        </div>
                        <div className='mt-2'>
                            <p className='text-sm text-gray-700'>
                                {/* Guest: {bookingInfo.guest.name} */}
                            </p>
                        </div>
                        <div className='mt-2'>
                            <p className='text-sm text-gray-700'>
                                From: {format(new Date(bookingInfo.from), 'PP')} - To:{' '}
                                {format(new Date(bookingInfo.to), 'PP')}
                            </p>
                        </div>

                        <div className='mt-2'>
                            <p className='text-sm text-gray-700'>
                                Price: $ {bookingInfo.price}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-8">
                        <button onClick={modalHandler} className="bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:bg-blue-600 active:scale-95" >
                            Book
                        </button>
                        <button onClick={() => setShowModal(false)} className="bg-rose-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:bg-rose-600 active:scale-95" >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomBookingModal;