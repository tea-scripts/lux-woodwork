import {
  Button,
  Group,
  Modal,
  Select,
  Text,
  Box,
  Divider,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelContactForm,
  handleChange,
  resetContactUsForm,
  resolveContactUsForm,
} from '../features/support/supportSlice';

const EditContactForm = () => {
  const dispatch = useDispatch();
  const {
    viewContactUsForm,
    name,
    email,
    subject,
    message,
    order_id,
    support_type,
    status,
    product,
    isUpdatingContactUsForm,
    contactFormId,
  } = useSelector((state) => state.support);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resolveContactUsForm({ status, _id: contactFormId }));

    dispatch(resetContactUsForm());
  };

  const handleCloseTicket = (e) => {
    e.preventDefault();

    dispatch(cancelContactForm(contactFormId));

    dispatch(resetContactUsForm());
  };

  return (
    <Modal
      opened={viewContactUsForm}
      onClose={() => dispatch(resetContactUsForm())}
      title="View Contact Us Form"
      centered
      size={'lg'}
    >
      <Box py={10}>
        <Group>
          <Text>Name:</Text>
          <Text>{name}</Text>
        </Group>

        <Divider my="sm" />

        <Group>
          <Text>Email:</Text>
          <Text>{email}</Text>
        </Group>

        <Divider my="sm" />

        <Group>
          <Text>Subject:</Text>
          <Text transform="capitalize">{subject}</Text>
        </Group>

        {subject !== 'general' && <Divider my="sm" />}

        {support_type && (
          <>
            <Group>
              <Text>Support Type:</Text>
              <Text transform="capitalize">{support_type}</Text>
            </Group>

            {support_type !== 'account' && <Divider my="sm" />}
          </>
        )}

        {order_id && (
          <Group>
            <Text>Order ID:</Text>
            <Text>{order_id._id}</Text>
          </Group>
        )}

        {subject === 'product-availability' && (
          <Group>
            <Text>Product:</Text>
            <Text>{product.name}</Text>
          </Group>
        )}

        <Divider my="sm" />

        <Group>
          <Text>Message:</Text>
          <Text>{message}</Text>
        </Group>

        <Divider my="sm" />

        <Group>
          <Text>Status:</Text>
          <Text
            transform="capitalize"
            color={
              status === 'pending'
                ? 'yellow'
                : status === 'resolved'
                ? 'green'
                : 'red'
            }
          >
            {status}
          </Text>
        </Group>

        <Divider my="sm" />

        <Group>
          <Text>
            <b>Actions:</b>
          </Text>

          <Button
            onClick={handleCloseTicket}
            variant="outline"
            color={status === 'cancelled' ? 'green' : 'red'}
            disabled={status === 'cancelled' || status === 'resolved'}
          >
            {status === 'cancelled' ? 'Canceled' : 'Close Ticket'}
          </Button>

          <Button
            onClick={handleSubmit}
            variant="outline"
            color="green"
            disabled={status === 'resolved' || status === 'cancelled'}
          >
            {status === 'resolved' ? 'Ticket Resolved' : 'Resolve Ticket'}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};
export default EditContactForm;
