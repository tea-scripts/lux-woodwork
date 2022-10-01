import {
  Button,
  Container,
  createStyles,
  Notification,
  SimpleGrid,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import emptyCartImage from '../assets/empty-cart-alternate.svg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 'calc(100vh - (60px + 140px))',
    width: '90vw',
    margin: '2rem auto',
    maxWidth: 1200,

    h1: {
      textAlign: 'center',
    },
  },

  empty: {
    minHeight: 'calc(100vh - (60px + 140px))',
    margin: ' 0 auto',
    maxWidth: 1200,
    padding: '2rem',

    '& h2': {
      fontSize: 32,
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 0,
      height: 50,
      fontFamily: theme.fontFamily,
    },

    img: {
      width: '100%',
      maxWidth: 400,
      margin: '0 auto',
    },

    a: {
      width: '5rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: theme.fontFamily,
      letterSpacing: 1,
    },

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: '100%',
    },
  },
}));

const CheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <h1>Checkout Page</h1>
      {cartItems.length === 0 ? (
        <Container size={1200} className={classes.empty}>
          <SimpleGrid spacing={20}>
            <h2>Your cart is empty</h2>
            <Button component={Link} to="/products" mb={50}>
              Fill It
            </Button>
            <img src={emptyCartImage} alt="empty cart illustration" />
          </SimpleGrid>
        </Container>
      ) : (
        <Container size={1200}>
          <Notification
            loading
            title="Payment Gateway Coming Soon"
            disallowClose
          >
            Please wait until we integrate a payment gateway to process your
            orders, you cannot close this notification yet as it is still
            loading 😁
          </Notification>
        </Container>
      )}
    </div>
  );
};

export default CheckoutPage;
