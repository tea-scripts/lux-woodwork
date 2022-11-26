import { Button, Container, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import { createStyles } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import emptyCartImage from '../assets/empty-cart.svg';
import CartContent from '../components/CartContent';
import { useEffect } from 'react';
import { fetchAllUserAddresses } from '../features/address/addressSlice';
import { toast } from 'react-toastify';

const useStyles = createStyles((theme) => ({
  wrapper: {
    margin: ' 0 auto',
    padding: '0 1rem',
    minHeight: 'calc(100vh - (60px + 140px))',
    height: '100%',

    '& main': {
      '& h2': {
        fontSize: 28,
        fontWeight: 600,
        fontFamily: theme.fontFamily,
        margin: '0 0 1rem',
        padding: '1rem',
        textAlign: 'center',
        color: 'hsla(205, 100%, 13%, 1)',
      },
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

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);
  const { defaultAddress } = useSelector((state) => state.address);
  const { classes } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.isVerified) {
      dispatch(fetchAllUserAddresses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (cartItems.length === 0) {
    return (
      <Container size={1200} className={classes.empty}>
        <SimpleGrid spacing={20}>
          <h2>Your cart is empty</h2>
          <Button component={Link} to="/products" mb={50}>
            Fill It
          </Button>
          <img src={emptyCartImage} alt="empty cart illustration" />
        </SimpleGrid>
      </Container>
    );
  }

  if (!defaultAddress && user) {
    toast.warning('Please add an address to continue');
  }

  return (
    <section className={classes.wrapper}>
      <main>
        <h2>Your Bag</h2>
        <CartContent />
      </main>
    </section>
  );
};

export default Cart;
