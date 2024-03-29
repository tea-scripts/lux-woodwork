import {
  Avatar,
  Badge,
  Box,
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
  uploadProofOfDelivery,
} from '../features/orders/orderSlice';
import { DateTime } from 'luxon';
import ActionConfirmationModal from './ActionConfirmationModal';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { IconUpload } from '@tabler/icons';

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
    proofOfDelivery,
  } = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleProofOfDelivery = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    if (image) {
      dispatch(uploadProofOfDelivery(formData));
    }
  };

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
                      {formatPrice(item.priceWithVAT)}
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
            size={17}
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
            Shipping Fee
          </Text>
          <Text align="right" size={16} sx={{ color: 'var(--gray)' }}>
            {formatPrice(shipping)}
          </Text>
        </Container>

        <Container
          mb={5}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Text weight={500} size={17} sx={{ color: 'var(--gray)' }}>
            Total (VAT Inclusive)
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

        <Divider my={20} />

        {isShipped && (
          <Container
            mb={10}
            // sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Text
              size={20}
              weight={500}
              sx={{ color: 'var(--prussian-blue-500)' }}
              mb={16}
            >
              Proof of Delivery
            </Text>

            <Image
              width={200}
              height={250}
              sx={{ border: '1px solid #C0C0C0', borderRadius: '5px' }}
              src={proofOfDelivery ? proofOfDelivery : null}
              alt="With default placeholder"
              withPlaceholder
            />

            {isDelivered === false && !proofOfDelivery && (
              <Text size={12} color="red">
                Upload proof to verify the delivery
              </Text>
            )}
          </Container>
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
            <Group>
              <Button
                onClick={handleClick}
                leftIcon={<IconUpload />}
                variant="outline"
                disabled={isLoading}
              >
                Upload Proof
              </Button>
              <input
                type="file"
                name="image"
                style={{
                  display: 'none',
                }}
                height={15}
                onChange={handleProofOfDelivery}
                ref={hiddenFileInput}
              />
              <Button
                variant="filled"
                onClick={() =>
                  dispatch(deliverOrder({ orderId, proofOfDelivery }))
                }
                loading={isLoading}
                disabled={!proofOfDelivery}
              >
                Deliver Order
              </Button>
            </Group>
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
