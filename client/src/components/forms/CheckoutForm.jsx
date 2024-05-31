import React from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from 'react';
import './checkoutForm.css'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast, { } from "react-hot-toast";

const CheckoutForm = ({ bookingInfo, setShowModal }) => {
    const { user } = useAuth()
    const [errorMessage, setErrorMessage] = useState(null);
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        async function getClientSecret() {
            try {
                if (bookingInfo?.price < 1) return
                const { data } = await axiosSecure.post('/create-payment-intent', { price: bookingInfo?.price })
                console.log(data.clientSecret);
                setClientSecret(data.clientSecret)
            } catch (err) {
                console.log(err);
            }
        }
        getClientSecret()
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        console.log('Hello');
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement)
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            setErrorMessage(error.message)
            console.log(error);
            return;
        } else {
            // console.log('paymentMethod:', paymentMethod);
            setErrorMessage('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        })

        if (confirmError) {
            setErrorMessage(confirmError.message)
            return
        }
        if (paymentIntent.status === 'succeeded') {
            toast.success('Payment succeeded')
            setShowModal(false)
            const paymentInfo = {
                ...bookingInfo,
                guest: {
                    name: user?.displayName,
                    email: user.email,
                    image: user?.photoURL,
                },
                transactionId: paymentIntent.id,
                date: new Date(),
                roomId: bookingInfo._id
            }
            delete paymentInfo._id
            try {
                const res = await axiosSecure.post('/bookings', paymentInfo)
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    }
    // console.log(bookingInfo);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        disabled={!stripe || !clientSecret}
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:bg-blue-600 active:scale-95 disabled:bg-slate-500 disabled:active:scale-100"
                    >
                        Book
                    </button>
                    <button
                        type='button'
                        onClick={() =>
                            setShowModal(false)}
                        className="bg-rose-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:bg-rose-600 active:scale-95"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;