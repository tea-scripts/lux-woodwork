import { Button, createStyles } from '@mantine/core';
import AmountButtons from './AmountButtons';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { IoTrashSharp } from 'react-icons/io5';
import { formatPrice } from '../utils/helpers';

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
    justifyContent: 'space-between',

    img: {
      width: '100%',
      height: '100%',
      display: 'block',
      borderRadius: '5px',
      objectFit: 'cover',
    },

    [`@media (min-width: 776px)`]: {
      height: '100%',
      gridTemplateColumns: '100px 200px',
      alignItems: 'center',
      gap: '1rem',
      textAlign: 'left',
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

    [`@media (min-width: 776px)`]: {
      fontSize: theme.fontSizes.sm,
    },
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
    fontSize: theme.fontSizes.xs,
    fontFamily: theme.fontFamily,
    marginBottom: 0,
    marginLeft: '.5rem',

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
    fontSize: theme.fontSizes.xl,
  },
}));

const CartItem = ({ _id, name, image, quantity, price }) => {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      {/* First Column */}
      <div className={classes.title}>
        <img src={image} alt={name} />
        <div>
          <h5 className={classes.name}>{name}</h5>
          <h5 className={classes.smallPrice}>{formatPrice(price)}</h5>
        </div>
      </div>

      {/* Second Column */}
      <h5 className={classes.price}>{formatPrice(price)}</h5>

      {/* Third Column */}
      <AmountButtons
        id={_id}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
      />

      {/* Fourth Column */}
      <h5 className={classes.subTotal}>{formatPrice(price * quantity)}</h5>

      {/* Fifth Column */}
      <Button
        onClick={() => dispatch(removeItem(_id))}
        className={classes.removeButton}
        icon={<IoTrashSharp />}
      >
        <IoTrashSharp />
      </Button>
    </div>
  );
};
export default CartItem;
