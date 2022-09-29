import { Button, createStyles } from '@mantine/core';
import AmountButtons from './AmountButtons';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { IoTrashSharp } from 'react-icons/io5';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: ' 200px auto auto',
    gridTemplateRows: '75px',
    gap: '3rem 1rem',
    justifyItems: 'center',
    marginBottom: '3rem',
    alignItems: 'center',

    [`@media (min-width: 776px)`]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
      gridTemplateRows: '75px',
      alignItems: 'center',

      img: {
        height: '100%',
      },
    },
  },

  title: {
    gridTemplateRows: '75px',
    display: 'grid',
    gridTemplateColumns: '75px 125px',
    alignItems: 'center',
    textAlign: 'left',
    gap: '1rem',

    img: {
      width: '100%',
      height: '100%',
      display: 'block',
      objectFit: 'cover',
    },

    h5: {
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily,
      marginBottom: 0,
    },

    [`@media (min-width: 776px)`]: {
      height: '100%',
      gridTemplateColumns: '100px 200px',
      alignItems: 'center',
      gap: '1rem',
      textAlign: 'left',
    },
  },

  name: {
    fontWeight: 600,
    fontFamily: theme.fontFamily,
  },

  subTotal: {
    display: 'none',

    [`@media (min-width: 776px)`]: {
      display: 'block',
      marginBottom: 0,
      fontWeight: 400,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily,
    },
  },

  smallPrice: {
    display: 'block',
    fontFamily: theme.fontFamily,

    [`@media (min-width: 776px)`]: {
      display: 'none',
    },
  },

  price: {
    display: 'none',

    [`@media (min-width: 776px)`]: {
      display: 'block',
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily,
      fontWeight: 400,
      marginBottom: 0,
    },
  },

  amountButtons: {
    width: '75px',

    button: {
      width: '1rem',
      height: '0.5rem',
      fontSize: theme.fontSizes.xs,
    },

    h2: {
      fontSize: theme.fontSizes.sm,
    },

    [`@media (min-width: 776px)`]: {
      width: '100px',

      button: {
        width: '1.5rem',
        height: '1rem',
        fontSize: theme.fontSizes.sm,
      },

      h2: {
        fontSize: theme.fontSizes.md,
      },
    },
  },

  removeButton: {
    background: theme.colors.red[5],
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: 0,
    width: '2rem !important',
    height: '2rem !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSizes.xl * 2,
  },
}));

const CartItem = ({ id, name, image, quantity, price }) => {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      {/* First Column */}
      <div className={classes.title}>
        <img src={image} alt={name} />
        <div>
          <h5 className={classes.name}>{name}</h5>
          <h5 className={classes.smallPrice}>${price}</h5>
        </div>
      </div>

      {/* Second Column */}
      <h5 className={classes.price}>${price}</h5>

      {/* Third Column */}
      <AmountButtons
        id={id}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
      />

      {/* Fourth Column */}
      <h5 className={classes.subTotal}>${price * quantity}</h5>

      {/* Fifth Column */}
      <Button
        onClick={() => dispatch(removeItem(id))}
        className={classes.removeButton}
        icon={<IoTrashSharp />}
      >
        <IoTrashSharp />
      </Button>
    </div>
  );
};
export default CartItem;
