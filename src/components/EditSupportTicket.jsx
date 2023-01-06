import { Button, Group, Modal, Text, Box, Divider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelSupportTicket,
  resetSupportTicket,
  resolveSupportTicket,
} from '../features/support/supportSlice';

const EditSupportTicket = () => {
  const dispatch = useDispatch();
  const {
    status,
    isUpdatingSupportTicket,
    viewSupportTicket,
    supportTicketId,
    user,
    subject,
    message,
  } = useSelector((state) => state.support);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resolveSupportTicket(supportTicketId));

    setTimeout(() => {
      dispatch(resetSupportTicket());
    }, 1500);
  };

  const handleCloseTicket = (e) => {
    e.preventDefault();

    dispatch(cancelSupportTicket(supportTicketId));

    setTimeout(() => {
      dispatch(resetSupportTicket());
    }, 1500);
  };

  return (
    <Modal
      opened={viewSupportTicket}
      onClose={() => dispatch(resetSupportTicket())}
      title="View Contact Us Form"
      centered
      size={'lg'}
    >
      <Box py={10}>
        <Group>
          <Text>Customer:</Text>
          <Text>{user.username}</Text>
        </Group>

        <Divider my="sm" />

        <Group>
          <Text>Email:</Text>
          <Text>{user.email}</Text>
        </Group>

        <Divider my="sm" />

        <Group>
          <Text>Subject:</Text>
          <Text transform="capitalize">{subject}</Text>
        </Group>

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
            loading={isUpdatingSupportTicket}
          >
            {status === 'cancelled' ? 'Canceled' : 'Close Ticket'}
          </Button>

          <Button
            onClick={handleSubmit}
            variant="outline"
            color="green"
            disabled={status === 'resolved' || status === 'cancelled'}
            loading={isUpdatingSupportTicket}
          >
            {status === 'resolved' ? 'Ticket Resolved' : 'Resolve Ticket'}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};
export default EditSupportTicket;
