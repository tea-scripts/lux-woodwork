import {
  Container,
  Text,
  Group,
  createStyles,
  Table,
  ActionIcon,
  Input,
} from '@mantine/core';
import {
  IconSquareCheck,
  IconEdit,
  IconTrashX,
  IconSearch,
  IconArchive,
} from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  archiveProduct,
  changePage,
  deleteProduct,
  fetchAllProducts,
  handleChange,
  setProductValues,
  togggleActionConfirmModal,
  toggleDeleteProduct,
  toggleProductEdit,
  toggleProductView,
} from '../features/products/productsSlice';
import { formatPrice } from '../utils/helpers';
import Loading from './Loading';
import ViewProductModal from './ViewProductModal';
import EditProductModal from './EditProductModal';
import PaginationButtons from './PaginationButtons';
import ActionConfirmationModal from './ActionConfirmationModal';
import { useState } from 'react';
import { setSupportTicket } from '../features/support/supportSlice';

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
  const { isFetchingSupportTickets, supportTickets } = useSelector(
    (state) => state.support
  );

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Tickets</Text>
      </Container>
      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          {isFetchingSupportTickets ? (
            <Loading />
          ) : (
            <Table highlightOnHover captionSide="bottom">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Support Type</th>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket.name}</td>
                    <td>{ticket.email}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.supportType}</td>
                    <td>{ticket.orderId}</td>
                    <td>{ticket.product}</td>
                    <td>
                      <Group position="center">
                        <ActionIcon
                          onClick={() => {
                            dispatch(setSupportTicket(ticket));
                          }}
                          color="blue"
                          variant="outline"
                          radius="md"
                        >
                          <IconSquareCheck />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default AdminSupportTickets;
