import {
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles } from '@mantine/core';
import Loading from './Loading';
import { formatPrice } from '../utils/helpers';
import {
  cancelOrder,
  deliverOrder,
  shipOrder,
  togggleActionConfirmModal,
  toggleOrderView,
} from '../features/orders/orderSlice';
import { DateTime } from 'luxon';
import ActionConfirmationModal from './ActionConfirmationModal';
import { Link, useNavigate } from 'react-router-dom';

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
    shippingAddress,
    tax,
    subtotal,
    expiryDate,
    isShipped,
    isDelivered,
  } = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Modal
      opened={isViewing}
      onClose={() => {
        dispatch(toggleOrderView());
      }}
      size="xl"
      centered
    >
      {/* {isLoading ? (
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
      )} */}

      <Container>
        <Text
          sx={{
            color: 'var(--prussian-blue-500)',
            fontSize: '1.1rem',
            fontWeight: 500,
          }}
        >
          Order Details
        </Text>

        <Divider my={16} />

        <Text mb={20} weight={500} color="gray">
          Order ID: {orderId}
        </Text>

        <Text mb={20} color="gray">
          Order Created:
          {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_MED)}
        </Text>

        <Text mb={20} weight={500} color="gray">
          Status:{' '}
          <Badge
            radius="xs"
            color={
              status === 'paid'
                ? 'green'
                : status === 'pending'
                ? 'yellow'
                : 'red'
            }
            variant="filled"
          >
            {status === 'paid'
              ? 'Paid'
              : status === 'pending'
              ? 'Pending'
              : 'Cancelled'}
          </Badge>
        </Text>

        <Divider my={20} />

        {orderItems?.map((item) => {
          return (
            <Grid key={item._id} p="sm">
              <Grid.Col
                xs={12}
                sm={5}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Paper
                  className={classes.imageContainer}
                  component={Link}
                  to={`/products/${item.product}`}
                >
                  <Image radius="md" src={item.image} alt="order item" />
                </Paper>
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <Container
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text align="center">{item.name}</Text>
                  <div>
                    <Text weight={500} sx={{ color: 'var(--hunter-green)' }}>
                      {formatPrice(item.price)}
                    </Text>
                    <Text align="right" sx={{ color: '#C0C0C0' }}>
                      Qty: {item.quantity}
                    </Text>
                  </div>
                </Container>
              </Grid.Col>
            </Grid>
          );
        })}

        <Divider my={20} />

        <ActionConfirmationModal />

        <Container
          mb={10}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Text
            size={20}
            weight={500}
            sx={{ color: 'var(--prussian-blue-500)' }}
          >
            Delivery Address
          </Text>
        </Container>

        <Container mb={5}>
          <Text sx={{ color: 'var(--gray)', maxWidth: '380px' }}>
            {shippingAddress?.street}, {shippingAddress?.barangay},{' '}
            {shippingAddress?.city}, {shippingAddress?.province},{' '}
            {shippingAddress?.region}, {shippingAddress?.zip}
          </Text>
        </Container>

        <Divider my={20} />

        <Container
          mb={10}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Text
            size={20}
            weight={500}
            sx={{ color: 'var(--prussian-blue-500)' }}
          >
            Order Summary
          </Text>
        </Container>

        <Container
          mb={5}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Text weight={500} size={18} sx={{ color: 'var(--gray)' }}>
            Subtotal
          </Text>
          <Text
            weight={500}
            align="right"
            size={18}
            sx={{ color: 'var(--gray)' }}
          >
            {formatPrice(subtotal)}
          </Text>
        </Container>

        <Container
          mb={5}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Text size={16} sx={{ color: 'var(--gray)' }}>
            Shipping Free
          </Text>
          <Text align="right" size={16} sx={{ color: 'var(--gray)' }}>
            {formatPrice(shipping)}
          </Text>
        </Container>

        <Container
          mb={5}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Text size={16} sx={{ color: 'var(--gray)' }}>
            VAT
          </Text>
          <Text align="right" size={16} sx={{ color: 'var(--gray)' }}>
            {formatPrice(tax)}
          </Text>
        </Container>

        <Container
          mb={5}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Text weight={500} size={18} sx={{ color: 'var(--gray)' }}>
            Total
          </Text>
          <Text
            weight={500}
            align="right"
            size={22}
            sx={{ color: 'var(--hunter-green)' }}
          >
            {formatPrice(total)}
          </Text>
        </Container>

        {status === 'pending' && (
          <Group position="right" mt={20}>
            <Button
              variant="subtle"
              onClick={() => {
                dispatch(cancelOrder(orderId));
                dispatch(toggleOrderView());
              }}
            >
              Cancel Order
            </Button>
            <Button onClick={() => navigate(`/update-order/${orderId}`)}>
              Pay Now
            </Button>
          </Group>
        )}

        <Group position="right" mt={15}>
          {status === 'paid' && isShipped === false && (
            <Button
              variant="filled"
              onClick={() => dispatch(shipOrder(orderId))}
              loading={isLoading}
            >
              Ship Order
            </Button>
          )}

          {isShipped && isDelivered === false && (
            <Button
              variant="filled"
              onClick={() => dispatch(deliverOrder(orderId))}
              loading={isLoading}
            >
              Deliver Order
            </Button>
          )}

          {isDelivered && (
            <Button variant="filled" color="green" disabled>
              Order Delivered
            </Button>
          )}

          {status === 'cancelled' && (
            <Button variant="subtle" disabled>
              Order Canceled
            </Button>
          )}
        </Group>
      </Container>
    </Modal>
  );
};
export default ViewOrderModal;
