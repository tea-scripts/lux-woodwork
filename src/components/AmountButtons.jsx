import { createStyles } from '@mantine/core';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';

const useStyles = createStyles((theme) => ({
  amountButons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    alignItems: 'center',
    justifyItems: 'center',
    width: '75px',

    [`@media (min-width: 776px)`]: {
      width: '140px',
    },
  },

  heading: {
    margin: '0 !important',
    fontSize: '1rem !important',
    padding: theme.spacing.xs,

    [`@media (min-width: 678px)`]: {
      fontSize: '1.5rem !important',
    },
  },

  toggleBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '0.5rem',
    padding: '1rem 0',
    fontSize: theme.fontSizes.xs,

    [`@media (min-width: 776px)`]: {
      width: '1.5rem',
      height: '1rem',
      fontSize: theme.fontSizes.md,
    },
  },
}));

const AmountButtons = ({ id, increase, decrease, quantity }) => {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  return (
    <div className={classes.amountButons}>
      <button
        type="button"
        onClick={() => {
          if (quantity === 1) {
            dispatch(removeItem(id));
            return;
          }
          dispatch(decrease({ id }));
        }}
        className={classes.toggleBtn}
      >
        <FaMinus />
      </button>

      <h2 className={classes.heading}>{quantity}</h2>

      <button
        className={classes.toggleBtn}
        type="button"
        onClick={() => dispatch(increase({ id }))}
      >
        <FaPlus />
      </button>
    </div>
  );
};
export default AmountButtons;
