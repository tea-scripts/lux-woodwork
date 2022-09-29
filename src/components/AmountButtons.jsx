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
    width: '140px',

    h2: {
      margin: '0 !important',
    },

    button: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1.5rem',
      height: '1rem',
      padding: '1rem 0',
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
        className="amount-btn"
      >
        <FaMinus />
      </button>
      <h2 className="amount">{quantity}</h2>
      <button
        type="button"
        onClick={() => dispatch(increase({ id }))}
        className="amount-btn"
      >
        <FaPlus />
      </button>
    </div>
  );
};
export default AmountButtons;
