import {
  Button,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
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

  button: {
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },

  text: {
    color: 'var(--prussian-blue-500)',
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
      size={1200}
      title={'Product Details'}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <SimpleGrid
          breakpoints={[
            { minWidth: 'xs', cols: 1 },
            { minWidth: 'sm', cols: 2 },
          ]}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <Image radius="md" src={image} alt="Random unsplash image" />
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            <Title className={classes.text} order={3} mb={15}>
              {name}
            </Title>
            <Text className={classes.text} mb={15}>
              {description}
            </Text>
            <SimpleGrid cols={2}>
              <div>
                <Text className={classes.text} weight={500} mb={5}>
                  Price
                </Text>
                <Text className={classes.text} weight={500} mb={5}>
                  Inventory
                </Text>
                <Text className={classes.text} weight={500} mb={5}>
                  Category
                </Text>
                <Text className={classes.text} weight={500} mb={5}>
                  Featured
                </Text>
                <Text className={classes.text} weight={500} mb={5}>
                  Free Shipping
                </Text>
                <Text className={classes.text} weight={500} mb={5}>
                  Published
                </Text>
              </div>
              <div>
                <Text className={classes.text} mb={5}>
                  {formatPrice(price)}
                </Text>
                <Text className={classes.text} mb={5}>
                  {inventory}
                </Text>
                <Text className={classes.text} mb={5}>
                  {category}
                </Text>
                <Text className={classes.text} mb={5}>
                  {featured ? 'Yes' : 'No'}
                </Text>
                <Text className={classes.text} mb={5}>
                  {freeShipping ? 'Yes' : 'No'}
                </Text>
                <Text className={classes.text} mb={5}>
                  {' '}
                  {displayProduct ? 'Yes' : 'No'}
                </Text>
              </div>
            </SimpleGrid>
          </div>
        </SimpleGrid>
      )}

      <Group position="right">
        <Button
          color="red"
          onClick={() => {
            dispatch(toggleProductView());
            dispatch(setProductValues({}));
          }}
          className={classes.button}
          mt={15}
        >
          Close
        </Button>
      </Group>
    </Modal>
  );
};
export default ViewProductModal;
