import CartHeadingColumns from './CartHeadingColumns';
import CartItem from './CartItem';
import { Button, createStyles, Divider, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import CartTotals from './CartTotals';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import SelectAddress from './SelectAddress';
import { IconTrashX } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: 1200,
    margin: '0 auto',
    marginBottom: '3rem',
  },

  linkBtn: {
    textTransform: 'capitalize',
    fontSize: theme.fontSizes.sm,
    fontWeight: 400,
    letterSpacing: 0.5,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    height: 40,
  },

  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    gap: '1rem',
    width: '100%',
  },
}));

const CartContent = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { classes } = useStyles();

  return (
    <section className={classes.wrapper}>
      <CartHeadingColumns />
      {cartItems.map((item) => {
        return <CartItem key={item._id} {...item} />;
      })}
      <Divider />
      <div className={classes.linkContainer}>
        <Button
          component={Link}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'hsla(354, 65%, 51%, 1)' }}
          to="/products"
          leftIcon={<BsFillArrowLeftCircleFill />}
          className={classes.linkBtn}
        >
          our store
        </Button>
        <Button
          className={classes.linkBtn}
          onClick={() => dispatch(clearCart())}
          rightIcon={<IconTrashX />}
        >
          clear cart
        </Button>
      </div>
      <Group
        position="apart"
        sx={(theme) => ({
          '@media (max-width: 810px)': {
            margin: '0 auto',
            justifyContent: 'center',
          },
        })}
      >
        {user && user.isVerified && <SelectAddress />}
        <CartTotals />
      </Group>
    </section>
  );
};
export default CartContent;
