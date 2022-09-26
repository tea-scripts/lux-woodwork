import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: 'calc(100vh - 5rem - 15.6rem)',
    display: 'grid',
    placeItems: 'center',
    width: '90vw',
    margin: ' 0 auto',
    maxWidth: 1200,
  },
}));

const Cart = () => {
  const { classes } = useStyles();

  return (
    <section className={classes.wrapper}>
      Your cart is Empty hehe
      <Button>
        <Link to="/products">Fill it up!</Link>
      </Button>
    </section>
  );
};

export default Cart;
