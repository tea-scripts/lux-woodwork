import {
  Button,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser } from '../features/users/userSlice';

const initialState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const AdminAddUsers = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.users);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = values;
    if (!username || !password || !email) {
      toast.warning('Please provide all credentials');
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.warning('Passwords do not match');
      return;
    }

    dispatch(registerUser({ username, email, password }));

    setValues(initialState);
  };

  return (
    <Paper sx={{ width: '100%', padding: '1rem', minHeight: 600 }}>
      <Group mb={20}>
        <Text sx={{ fontSize: '2rem', fontWeight: 500 }}>Create New User</Text>
      </Group>
      <Grid>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter username"
            label="Username"
            size="md"
            withAsterisk
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter email"
            label="Email"
            size="md"
            withAsterisk
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <PasswordInput
            placeholder="Enter password"
            label="Password"
            size="md"
            withAsterisk
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <PasswordInput
            placeholder="Enter password again"
            label="Confirm Password"
            size="md"
            withAsterisk
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </Grid.Col>

        <Grid.Col xs={12}>
          <Group position="right">
            <Button loading={isLoading} onClick={handleSubmit}>
              Create User
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default AdminAddUsers;
