import {
  ActionIcon,
  Badge,
  Container,
  createStyles,
  Group,
  Paper,
  Table,
  Text,
} from '@mantine/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { IconArchive, IconSquareCheck, IconTrashX } from '@tabler/icons';
import {
  changePage,
  deleteOrder,
  fetchAllOrders,
  setOrderValues,
  togggleActionConfirmModal,
  toggleOrderView,
  unarchiveOrder,
} from '../features/orders/orderSlice';
import ViewOrderModal from './ViewOrderModal';
import PaginationButtons from './PaginationButtons';
import { useEffect } from 'react';
import Loading from './Loading';
import { useState } from 'react';
import ActionConfirmationModal from './ActionConfirmationModal';

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

const AdminArchivedOrders = () => {
  const { classes } = useStyles();
  const [itemId, setItemId] = useState(null);
  const { orders, totalPages, page, isLoading, actionConfirmModal } =
    useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const rows =
    orders &&
    orders
      .filter((order) => order.isArchived === true && order.isDeleted === false)
      .map((order) => {
        const { _id, user, status, createdAt } = order;
        return (
          <tr key={_id}>
            <td>{_id}</td>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              {status === 'paid' ? (
                <Badge color="green">Paid</Badge>
              ) : status === 'cancelled' ? (
                <Badge color="red">Cancelled</Badge>
              ) : (
                <Badge color="yellow">Pending</Badge>
              )}
            </td>
            <td>
              {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_MED)}
            </td>
            <td>
              <Group spacing={5}>
                <ActionIcon
                  color="green"
                  onClick={() => {
                    dispatch(toggleOrderView());
                    dispatch(setOrderValues(order));
                  }}
                >
                  <IconSquareCheck size={15} />
                </ActionIcon>

                <ActionIcon
                  color="red"
                  onClick={() => {
                    dispatch(deleteOrder(_id));
                    setItemId(_id);
                  }}
                >
                  <IconTrashX size={15} />
                </ActionIcon>
              </Group>
            </td>
            <td>
              <ActionIcon
                onClick={() => {
                  dispatch(togggleActionConfirmModal());
                  setItemId(_id);
                }}
              >
                <IconArchive size={15} />
              </ActionIcon>
            </td>
          </tr>
        );
      });

  useEffect(() => {
    dispatch(fetchAllOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Container className={classes.container} fluid>
      <Paper sx={{ width: '100%' }}>
        <Container className={classes.inner} fluid>
          <Text className={classes.title}>Archived Orders</Text>
        </Container>

        <ViewOrderModal />
        <ActionConfirmationModal
          onOk={unarchiveOrder}
          onCancel={togggleActionConfirmModal}
          visible={actionConfirmModal}
          _id={itemId}
        />

        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Loading />
          </div>
        ) : (
          <Table highlightOnHover striped captionSide="bottom">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
                <th>Unarchive</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7}>No orders found</td>
                </tr>
              ) : (
                rows
              )}
            </tbody>
          </Table>
        )}
        {totalPages > 1 && (
          <PaginationButtons
            changePage={changePage}
            totalPages={
              orders.filter((order) => order.status === 'archived').length + 1
            }
            page={page}
            isLoading={isLoading}
          />
        )}
      </Paper>
    </Container>
  );
};

export default AdminArchivedOrders;
