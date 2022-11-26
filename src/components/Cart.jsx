import {
  Box,
  Button,
  createStyles,
  Drawer,
  Group,
  Stack,
  Title,
} from '@mantine/core';
import { IoTrashSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  decrease,
  increase,
  openCart,
  removeItem,
} from '../features/cart/cartSlice';
import { toggleSignInModal } from '../features/users/userSlice';
import { formatPrice } from '../utils/helpers';
import AmountButtons from './AmountButtons';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: ' 200px auto auto',
    gridTemplateRows: '75px',
    gap: '3rem 1rem',
    justifyItems: 'center',
    marginBottom: '3rem',
    alignItems: 'center',
  },

  title: {
    gridTemplateRows: '75px',
    display: 'grid',
    gridTemplateColumns: '75px 125px',
    alignItems: 'center',
    textAlign: 'left',
    justifyContent: 'space-between',

    img: {
      width: '100%',
      height: '100%',
      display: 'block',
      borderRadius: '5px',
      objectFit: 'cover',
    },
  },

  h5: {
    fontSize: theme.fontSizes.xs,
    fontFamily: theme.fontFamily,
    marginBottom: 0,
  },

  name: {
    fontWeight: 600,
    fontSize: theme.fontSizes.xs,
    fontFamily: theme.fontFamily,
    marginBottom: 0,
    marginLeft: '.5rem',
  },

  subTotal: {
    display: 'none',
  },

  smallPrice: {
    display: 'block',
    fontSize: theme.fontSizes.xs,
    fontFamily: theme.fontFamily,
    marginBottom: 0,
    marginLeft: '.5rem',
  },

  price: {
    display: 'none',
  },

  removeButton: {
    background: theme.colors.red[5],
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: 0,
    width: '1.5rem !important',
    height: '1.5rem !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSizes.lg,
  },

  total: {
    fontFamily: 'Trispace',
    textAlign: 'center',
    marginBottom: '1rem',
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const { isCartOpen, cartItems } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.users);

  return (
    <Drawer
      opened={isCartOpen}
      onClose={() => dispatch(openCart())}
      title="Your Bag"
      padding="xl"
      size="xl"
      position="right"
    >
      <Box sx={{ height: '100%', display: 'grid' }}>
        <div>
          {cartItems && cartItems.length === 0 ? (
            <Title order={4}>Your cart is empty</Title>
          ) : (
            cartItems &&
            cartItems.map((item) => {
              const { _id, name, price, images, quantity } = item;
              return (
                <div className={classes.wrapper} key={_id}>
                  {/* First Column */}
                  <div className={classes.title}>
                    <img src={images[0]} alt={name} />
                    <div>
                      <h5 className={classes.name}>{name}</h5>
                      <h5 className={classes.smallPrice}>
                        {formatPrice(price)}
                      </h5>
                    </div>
                  </div>

                  {/* Second Column */}
                  <AmountButtons
                    id={_id}
                    quantity={quantity}
                    increase={increase}
                    decrease={decrease}
                  />

                  {/* Third Column */}
                  <Button
                    onClick={() => dispatch(removeItem(_id))}
                    className={classes.removeButton}
                    icon={<IoTrashSharp />}
                  >
                    <IoTrashSharp />
                  </Button>
                </div>
              );
            })
          )}
        </div>
        <Stack position="center" align="stretch">
          <Group position="center">
            <Title className={classes.total} order={3}>
              Total :{' '}
            </Title>
            <Title className={classes.total} order={3}>
              {formatPrice(
                cartItems.reduce((acc, curr) => {
                  return acc + curr.price * curr.quantity;
                }, 0)
              )}
            </Title>
          </Group>
          <div
            style={{
              margin: '0 auto',
              display: 'grid',
              rowGap: '1rem',
              width: '100%',
            }}
          >
            {user && user.isVerified ? (
              <Button
                component={Link}
                to="/cart"
                className={classes.checkOutBtn}
                fullWidth
                title="Check Out"
                onClick={() => dispatch(openCart())}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  dispatch(openCart());
                  dispatch(toggleSignInModal());
                }}
              >
                Buy Now
              </Button>
            )}
          </div>
        </Stack>
      </Box>
    </Drawer>
  );
};
export default Cart;
