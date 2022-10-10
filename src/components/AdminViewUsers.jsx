import { Group, Paper, Table, Text } from '@mantine/core';
import { IconDiscountCheck, IconRefreshAlert } from '@tabler/icons';
import React from 'react';
import { useSelector } from 'react-redux';

const AdminViewUsers = () => {
  const { users } = useSelector((state) => state.users);
  const rows = users.map((user, index) => {
    const { first_name, last_name, email, phone, _id, isVerified } = user;
    return (
      <tr key={_id}>
        <td>{index + 1}</td>
        <td>
          {first_name} {last_name}
        </td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
          {isVerified ? (
            <Group spacing="5px" align="center">
              <span>Verified</span>
              <span style={{ color: '#40c057', marginBottom: '-.2rem' }}>
                <IconDiscountCheck />
              </span>
            </Group>
          ) : (
            <Group spacing="5px" align="center">
              <span>Pending</span>
              <span style={{ color: '#fada24', marginBottom: '-.2rem' }}>
                <IconRefreshAlert />
              </span>
            </Group>
          )}
        </td>
      </tr>
    );
  });

  return (
    <Paper sx={{ width: '100%', padding: '1rem' }}>
      <Group>
        <Text sx={{ fontSize: '2rem', fontWeight: 500 }}>All Users</Text>
      </Group>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Verification</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
};

export default AdminViewUsers;
