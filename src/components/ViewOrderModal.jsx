import { Modal, SimpleGrid, Text, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles } from '@mantine/core';
import Loading from './Loading';
import { formatPrice } from '../utils/helpers';
import { toggleOrderView } from '../features/orders/orderSlice';
import { DateTime } from 'luxon';

const useStyles = createStyles((theme) => ({
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 200,
    display: 'block',
    objectFit: 'cover',
    borderRadius: theme.radius.md,
  },
}));

const ViewOrderModal = () => {
  const { classes } = useStyles();
  const {
    isViewing,
    isLoading,
    orderItems,
    orderId,
    status,
    user,
    total,
    createdAt,
    shipping,
    tax,
  } = useSelector((store) => store.orders);
  const dispatch = useDispatch();

  return (
    <Modal
      opened={isViewing}
      onClose={() => {
        dispatch(toggleOrderView());
      }}
      title={`Order ID: ${orderId}`}
      size="lg"
      centered
    >
      {isLoading ? (
        <Loading />
      ) : (
        <SimpleGrid columns={2} spacing="md">
          <Title order={4}></Title>
          <Text>
            Order Date:{' '}
            {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_MED)}
          </Text>
          <Text sx={{ textTransform: 'capitalize' }}>
            Order Status: {status}
          </Text>
          <Text sx={{ textTransform: 'capitalize' }}>
            Customer : {user.first_name} {user.last_name}
          </Text>
          <Text>Shipping : {formatPrice(shipping)}</Text>
          <Text>Total : {formatPrice(total)}</Text>

          {orderItems.map((orderItem) => {
            const { name, quantity, price, image, _id } = orderItem;
            return (
              <SimpleGrid cols={2} spacing="md" key={_id}>
                <img src={image} alt={name} className={classes.image} />
                <div>
                  <Text align="left">
                    {name} x {quantity} = {formatPrice(price * quantity)}
                  </Text>
                  <Text sx={{ textTransform: 'capitalize' }}>
                    subtotal: {formatPrice(price * quantity)}
                  </Text>
                  <Text sx={{ textTransform: 'capitalize' }}>
                    tax: {formatPrice(tax)}
                  </Text>
                </div>
              </SimpleGrid>
            );
          })}
        </SimpleGrid>
      )}
    </Modal>
  );
};
export default ViewOrderModal;
