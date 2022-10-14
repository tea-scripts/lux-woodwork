import { Button, createStyles, Divider, Card } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../utils/helpers';
import { toggleSignInModal } from '../features/users/userSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing.xl * 2,
    display: 'flex',
    justifyContent: 'center',

    article: {
      padding: theme.spacing.md,
      borderRadius: theme.radius.sm,
      marginBottom: theme.spacing.md,
    },

    'h4, h5, p': {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      fontFamily: theme.fontFamily,
    },

    p: {
      textTransform: 'capitalize',
      fontSize: theme.fontSizes.sm,
    },

    h5: {
      fontSize: theme.fontSizes.md,
      fontWeight: 600,
    },

    h4: {
      marginTop: theme.spacing.md,
      fontSize: theme.fontSizes.lg,
      fontWeight: 600,
    },

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      justifyContent: 'flex-end',
    },
  },

  checkOutBtn: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 700,
    textTransform: 'capitalize',
  },
}));

const CartTotals = () => {
  const { classes } = useStyles();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { shipping_fee, total_amount } = useSelector((state) => state.cart);

  return (
    <div className={classes.wrapper}>
      <div>
        <Card shadow="md" mb={20}>
          <article>
            <h5>
              subtotal : <span>{formatPrice(total_amount)}</span>
            </h5>
            <p>
              shipping fee : <span>{formatPrice(shipping_fee)}</span>
            </p>
            <Divider />
            <h4>
              order total :{' '}
              <span>{formatPrice(total_amount + shipping_fee)}</span>
            </h4>
          </article>
        </Card>

        {user.isVerified ? (
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkOutBtn}
          >
            proceed to checkout
          </Button>
        ) : (
          <Button onClick={() => dispatch(toggleSignInModal())}>Sign In</Button>
        )}
      </div>
    </div>
  );
};
export default CartTotals;
