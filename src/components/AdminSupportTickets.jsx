import {
  Container,
  Text,
  Group,
  createStyles,
  Table,
  ActionIcon,
} from '@mantine/core';
import { IconSquareCheck, IconTrashX } from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import PaginationButtons from './PaginationButtons';
import {
  changePage,
  deleteTicket,
  fetchAllTickets,
  setSupportTicket,
} from '../features/support/supportSlice';
import EditSupportTicket from './EditSupportTicket';

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
  },

  inner: {
    maxWidth: 1200,
  },

  title: {
    color: 'var(--prussian-blue-500)',
    fontSize: '1.3rem',
    paddingTop: 5,
    marginBottom: '2rem',
  },
}));

const AdminSupportTickets = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const {
    isFetchingSupportTickets,
    supportTickets,
    totalSupportTicketPages,
    page,
  } = useSelector((state) => state.support);

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Tickets</Text>
      </Container>

      <EditSupportTicket />

      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          {isFetchingSupportTickets ? (
            <Loading />
          ) : (
            <Table highlightOnHover captionSide="bottom">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket.user.username}</td>
                    <td>{ticket.user.email}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.message.substring(0, 50) + '...'}</td>
                    <td>
                      <Group position="center">
                        <ActionIcon
                          onClick={() => {
                            dispatch(setSupportTicket(ticket));
                          }}
                          color="blue"
                          radius="md"
                        >
                          <IconSquareCheck />
                        </ActionIcon>

                        <ActionIcon
                          onClick={() => {
                            dispatch(deleteTicket(ticket._id));
                          }}
                          color="red"
                          radius="md"
                        >
                          <IconTrashX />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <PaginationButtons
            changePage={changePage}
            totalPages={totalSupportTicketPages}
            page={page}
            isLoading={isFetchingSupportTickets}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default AdminSupportTickets;
