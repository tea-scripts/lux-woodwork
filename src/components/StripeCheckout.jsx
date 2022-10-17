import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";
import customFetch from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Card, Container, Notification, Title } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons";
import { fetchOrder, updateOrder } from "../features/orders/orderSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { user } = useSelector((state) => state.users);
  const { defaultAddress } = useSelector((state) => state.address);
  const {
    cartItems,
    tax,
    shipping_fee: shippingFee,
    total_amount,
  } = useSelector((state) => state.cart);

  const location = useLocation();

  const { id } = useParams();
  const { order } = useSelector((state) => state.orders);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [orderId, setOrderId] = useState(null);

  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const createPaymentIntent = async () => {
    try {
      const { data } = await customFetch.post("/orders", {
        cartItems,
        tax,
        shippingFee,
        defaultAddress,
      });
      setClientSecret(data.order.clientSecret);
      console.log(data.order.clientSecret);
      setOrderId(data.order._id);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (id && location.pathname.startsWith("/update-order")) {
      dispatch(fetchOrder(id));
    } else {
      createPaymentIntent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(
      order && id ? order.clientSecret : clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },

        receipt_email: user.email,
        shipping: {
          name: user.first_name,
          address: {
            line1: defaultAddress.street,
            city: defaultAddress.city,
            state: defaultAddress.state,
            postal_code: defaultAddress.zip,
            country: "PH",
          },
        },
      }
    );

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        dispatch(
          updateOrder({
            orderId: order && id ? order._id : orderId,
            paymentIntentId: order
              ? order.paymentIntentId
              : payload.paymentIntent.id,
          })
        );

        navigate("/");
      }, 3000);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <Notification
        color="yellow"
        icon={<IconAlertCircle size={18} />}
        disallowClose
        title="Notice"
        sx={{
          marginBottom: "1rem",
          maxWidth: "50vw",

          "@media (max-width: 600px)": {
            maxWidth: "890vw",
          },
        }}
      >
        Do not refresh this page
      </Notification>
      {succeeded ? (
        <Notification
          icon={<IconCheck size={18} />}
          type="success"
          title="Notification"
          color={succeeded ? "green" : "red"}
          disallowClose
        >
          Payment successful. Redirecting to home page...
        </Notification>
      ) : (
        <Card
          shadow={"md"}
          paddind="3rem"
          sx={{
            maxWidth: "50vw",

            "@media (max-width: 600px)": {
              maxWidth: "890vw",
            },
          }}
        >
          <h4>Hello, {user && user.first_name + " " + user.last_name}</h4>
          <p>Your total is {formatPrice(shippingFee + total_amount)}</p>
          <p>Test Card Number : 4242 4242 4242 4242</p>
          <p>3D Secure Auth Test Card : 4000 0000 0000 3220</p>
          <p>Insufficient Funds Test Card : 4000 0000 0000 9995</p>
        </Card>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay Now"
            )}
          </span>
        </button>
        {/* shoe any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Container
      size={1200}
      my={64}
      sx={{ minHeight: "calc(100vh - (60px + 140px))" }}
    >
      <Title weight={500} align="center" order={1} mb={20}>
        Checkout Page
      </Title>

      <Wrapper>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.section`
  margin: 0 auto;
  form {
    width: 50vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
    margin-top: 30px;
    background: #ffffff;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default StripeCheckout;
