import { Button, createStyles, Divider, Card } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const { shipping_fee, total_amount } = useSelector((state) => state.cart);

  return (
    <div className={classes.wrapper}>
      <div>
        <Card shadow="md" mb={20}>
          <article>
            <h5>
              subtotal : <span>${total_amount}</span>
            </h5>
            <p>
              shipping fee : <span>${shipping_fee}</span>
            </p>
            <Divider />
            <h4>
              order total : <span>${total_amount + shipping_fee}</span>
            </h4>
          </article>
        </Card>

        {isAuthenticated ? (
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkOutBtn}
          >
            proceed to checkout
          </Button>
        ) : (
          <Button onClick={() => loginWithPopup()}>Sign In</Button>
        )}
      </div>
    </div>
  );
};
export default CartTotals;
