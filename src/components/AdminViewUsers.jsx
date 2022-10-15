import { Container, Text, Group, createStyles, Table } from '@mantine/core';
import { IconDiscountCheck, IconRefreshAlert } from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/userSlice';
import Loading from './Loading';

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

const AdminViewUsers = () => {
  const { classes } = useStyles();
  const { users, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

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
              <span
                style={{
                  color: '#40c057',
                  marginBottom: '-.2rem',
                  marginLeft: 5,
                }}
              >
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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>All Users</Text>
      </Container>
      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Verification</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default AdminViewUsers;
