import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import customFetch from '../utils/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(
  'pk_test_51LRc6LBAIWKWcynMHdBKSiZntfJClNSeJUUVM1O2FcfwFCX4mT3vonWIKUuLrUQ4DNvygu0SUul0v29LSuhEYXcy00heGe6bVQ'
);

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const {
    cartItems,
    tax,
    shipping_fee: shippingFee,
  } = useSelector((state) => state.cart);

  const createPaymentIntent = async () => {
    try {
      const { data } = await customFetch.post('/orders', {
        cartItems,
        tax,
        shippingFee,
      });
      setClientSecret(data.clientSecret);
      console.log('create payment intent', data.clientSecret);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default StripeCheckout;
