import {
  ActionIcon,
  Badge,
  Button,
  Container,
  createStyles,
  Group,
  Input,
  Paper,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import {
  IconArchive,
  IconSearch,
  IconSquareCheck,
  IconTrashX,
} from '@tabler/icons';
import {
  archiveOrder,
  changePage,
  deleteOrder,
  fetchOrder,
  handleChange,
  resetOrder,
  setOrderValues,
  togggleActionConfirmModal,
  toggleOrderView,
} from '../features/orders/orderSlice';
import ViewOrderModal from './ViewOrderModal';
import { useEffect } from 'react';
import Loading from './Loading';
import { useState } from 'react';
import ActionConfirmationModal from './ActionConfirmationModal';
import { toast } from 'react-toastify';

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

  images: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    width: '85px',
    height: '75px',
    gap: '.5rem',

    img: {
      width: '100%',
      height: '100%',
      display: 'block',
      borderRadius: '5px',
      objectFit: 'cover',
    },
  },
}));

const AdminViewOrder = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);
  const { isFetchingOrder, actionConfirmModal, order_id, order } = useSelector(
    (state) => state.orders
  );

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(changePage(1));

    if (order_id.length < 24) {
      toast.error('Invalid order id');
      return;
    }

    dispatch(fetchOrder(order_id));
  };

  useEffect(() => {
    if (order_id === '' || order_id.length < 24) {
      dispatch(resetOrder());
    }
  }, [dispatch, order_id]);

  return (
    <Paper sx={{ width: '100%', padding: '0 1rem' }}>
      <Group>
        <Text
          sx={{
            fontSize: '1.3rem',
            color: 'var(--prussian-blue-500)',
            paddingTop: 5,
            marginBottom: '2rem',
          }}
        >
          Find an Order
        </Text>
      </Group>

      <ViewOrderModal />
      <ActionConfirmationModal
        onOk={archiveOrder}
        onCancel={togggleActionConfirmModal}
        visible={actionConfirmModal}
        _id={itemId}
      />

      <form>
        <Group mb={10} align="flex-start">
          <TextInput
            placeholder="Search by Order Id"
            name="order_id"
            value={order_id}
            onChange={handleInput}
            description="Please provide all 24 characters of the order id"
            inputWrapperOrder={['input', 'description']}
          />

          <Button
            onClick={handleSearch}
            sx={{
              marginLeft: '.1rem',
              color: 'var(--white)',
            }}
          >
            <IconSearch size={16} />
          </Button>
        </Group>
      </form>

      {isFetchingOrder ? (
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
            </tr>
          </thead>
          <tbody>
            {order_id.length === 24 && order.hasOwnProperty('_id') ? (
              <tr>
                <td>{order._id}</td>
                <td>
                  {order?.user?.first_name} {order?.user?.last_name}
                </td>
                <td>{order?.user?.email}</td>
                <td>{order?.user?.phone}</td>
                <td>
                  {order?.status === 'paid' ? (
                    <Badge color="green">Paid</Badge>
                  ) : order?.status === 'cancelled' ? (
                    <Badge color="red">Cancelled</Badge>
                  ) : (
                    <Badge color="yellow">Pending</Badge>
                  )}
                </td>
                <td>
                  {DateTime.fromISO(order?.createdAt).toLocaleString(
                    DateTime.DATE_MED
                  )}
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
                      onClick={() => dispatch(deleteOrder(order._id))}
                    >
                      <IconTrashX size={15} />
                    </ActionIcon>

                    <ActionIcon
                      onClick={() => {
                        dispatch(togggleActionConfirmModal());
                        setItemId(order._id);
                      }}
                    >
                      <IconArchive size={15} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>
                  No order found! Try searching
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Paper>
  );
};

export default AdminViewOrder;
