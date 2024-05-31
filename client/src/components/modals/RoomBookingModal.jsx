import React from 'react';
import { format } from 'date-fns'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../forms/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const RoomBookingModal = ({ bookingInfo, setShowModal }) => {
    // console.log(bookingInfo);

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
                                Host: {bookingInfo.host?.name}
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
                    {/* checkout form */}
                    <Elements stripe={stripePromise}>
                        <CheckoutForm setShowModal={setShowModal} bookingInfo={bookingInfo} />
                    </Elements>

                </div>
            </div>
        </div>
    );
};

export default RoomBookingModal;