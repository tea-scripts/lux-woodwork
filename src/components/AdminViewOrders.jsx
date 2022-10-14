import { ActionIcon, Badge, Group, Paper, Table, Text } from '@mantine/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { IconSquareCheck, IconTrashX } from '@tabler/icons';
import { deleteOrder } from '../features/orders/orderSlice';

const AdminOrders = () => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const rows = orders.map((order) => {
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
          ) : (
            <Badge color="yellow">Pending</Badge>
          )}
        </td>
        <td>{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_MED)}</td>
        <td>
          <Group spacing={5}>
            <ActionIcon color="green" onClick={() => {}}>
              <IconSquareCheck size={15} />
            </ActionIcon>

            <ActionIcon color="red" onClick={() => dispatch(deleteOrder(_id))}>
              <IconTrashX size={15} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <Paper sx={{ width: '100%', padding: '1rem' }}>
      <Group>
        <Text sx={{ fontSize: '2rem', fontWeight: 500 }}>All Orders</Text>
      </Group>
      <Table highlightOnHover striped>
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
          {rows.length === 0 ? (
            <tr>
              <td colSpan={7}>No orders found</td>
            </tr>
          ) : (
            rows
          )}
        </tbody>
      </Table>
    </Paper>
  );
};

export default AdminOrders;
