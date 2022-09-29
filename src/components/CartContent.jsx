import CartHeadingColumns from './CartHeadingColumns';
import CartItem from './CartItem';
import { Button, createStyles, Divider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import CartTotals from './CartTotals';
import { IoMdTrash } from 'react-icons/io';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: 1200,
    margin: '0 auto',

    'a, button': {
      textTransform: 'capitalize',
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
      letterSpacing: 0.5,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: 'all 0.2s ease',
      width: '100%',
      cursor: 'pointer',
      height: 40,

      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        width: 'auto',
      },
    },
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: theme.spacing.md,
    marginTop: '2rem',
    width: '100%',
  },
}));

const CartContent = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <CartHeadingColumns />
      {cartItems.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <Divider />
      <div className={classes.linkContainer}>
        <Button
          component={Link}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'hsla(354, 65%, 51%, 1)' }}
          to="/products"
          leftIcon={<BsFillArrowLeftCircleFill />}
        >
          continue shopping
        </Button>
        <Button onClick={() => dispatch(clearCart())} rightIcon={<IoMdTrash />}>
          clear shopping cart
        </Button>
      </div>
      <CartTotals />
    </div>
  );
};
export default CartContent;
