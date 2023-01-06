import {
  Container,
  Text,
  Group,
  createStyles,
  Table,
  ActionIcon,
} from '@mantine/core';
import { IconSquareCheck, IconTrash } from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import PaginationButtons from './PaginationButtons';
import {
  changeContactUsFormPage,
  deleteContactForm,
  fetchAllContactUsForms,
  setContactUsForm,
} from '../features/support/supportSlice';
import EditContactForm from './EditContactForm';

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

const AdminContactUs = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const {
    isFetchingContactUsForms,
    contactUsForms,
    totalContactUsFormPages,
    contactUsFormPage,
  } = useSelector((state) => state.support);

  useEffect(() => {
    dispatch(fetchAllContactUsForms());
  }, [dispatch]);

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Contact Us Form</Text>
      </Container>

      <EditContactForm />

      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          {isFetchingContactUsForms ? (
            <Loading />
          ) : (
            <Table highlightOnHover captionSide="bottom">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contactUsForms.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket.name}</td>
                    <td>{ticket.email}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.support_type ? ticket.support_type : 'N/A'}</td>
                    <td>{ticket.order_id ? ticket.order_id._id : 'N/A'}</td>
                    <td>
                      {ticket.product_name ? ticket.product_name.name : 'N/A'}
                    </td>
                    <td>
                      <Group position="center">
                        <ActionIcon
                          onClick={() => dispatch(setContactUsForm(ticket))}
                          color="blue"
                          radius="md"
                        >
                          <IconSquareCheck />
                        </ActionIcon>

                        <ActionIcon
                          onClick={() =>
                            dispatch(deleteContactForm(ticket._id))
                          }
                          color="red"
                          radius="md"
                        >
                          <IconTrash />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {totalContactUsFormPages > 1 && (
            <PaginationButtons
              changePage={changeContactUsFormPage}
              totalPages={totalContactUsFormPages}
              page={contactUsFormPage}
              isLoading={isFetchingContactUsForms}
            />
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default AdminContactUs;
