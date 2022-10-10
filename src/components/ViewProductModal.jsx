import { Button, Modal } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleProductView,
  setProductValues,
} from '../features/products/productsSlice';
import { createStyles } from '@mantine/core';
import Loading from './Loading';
import { formatPrice } from '../utils/helpers';

const useStyles = createStyles((theme) => ({
  image: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: theme.radius.md,
    },
  },

  wrapper: {
    h3: {
      marginTop: 10,
    },

    p: {
      textTransform: 'capitalize',
      marginBottom: theme.spacing.xs,
    },
  },
}));

const ViewProductModal = () => {
  const { classes } = useStyles();
  const {
    isViewing,
    name,
    price,
    inventory,
    category,
    featured,
    freeShipping,
    description,
    isLoading,
    displayProduct,
    image,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  return (
    <Modal
      opened={isViewing}
      onClose={() => {
        dispatch(toggleProductView());
        dispatch(setProductValues({}));
      }}
      centered
      size="lg"
      title={'Product Details'}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.image}>
            <img src={image} alt={name} />
          </div>
          <div>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>
              <strong>Price: </strong>
              {formatPrice(price)}
            </p>

            <p>
              <strong>Inventory: </strong>
              {inventory}
            </p>

            <p>
              <strong>Category: </strong>
              {category}
            </p>

            <p>
              <strong>Featured: </strong>
              {featured ? 'Yes' : 'No'}
            </p>

            <p>
              <strong>Free Shipping: </strong>
              {freeShipping ? 'Yes' : 'No'}
            </p>

            <p>
              <strong>Published? </strong>
              {displayProduct ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      )}

      <Button
        color="red"
        onClick={() => {
          dispatch(toggleProductView());
          dispatch(setProductValues({}));
        }}
      >
        Close
      </Button>
    </Modal>
  );
};
export default ViewProductModal;
