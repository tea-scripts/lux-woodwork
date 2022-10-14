import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
};

export default CheckoutForm;
