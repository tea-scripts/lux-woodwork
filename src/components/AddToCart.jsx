import { createStyles, Button } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const useStyles = createStyles((theme) => ({
  buttonContainer: {
    marginTop: theme.spacing.xl,

    a: {
      fontSize: theme.fontSizes.md,
    },
  },
}));

const AddToCart = ({ product }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [quantity] = useState(1);
  const { _id } = product;

  /*
  Will add quantity buttons later
  */

  return (
    <div className={classes.buttonContainer}>
      <Button
        type="button"
        onClick={() => dispatch(addToCart({ _id, quantity, ...product }))}
      >
        Add to cart
      </Button>
    </div>
  );
};
export default AddToCart;
