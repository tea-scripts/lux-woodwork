import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Divider,
  Grid,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Transition,
} from '@mantine/core';
import { toast } from 'react-toastify';
import { updatePassword, updateUser } from '../features/users/userSlice';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [editDetails, setEditDetails] = useState(false);
  const { user, isLoading } = useSelector((state) => state.users);
  const [userPassword, setUserPassword] = useState({
    userId: user?._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [userDetails, setUserDetails] = useState({
    userId: user?._id,
    username: user?.username || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const { username, first_name, last_name, email, phone } = userDetails;
    if (!username || !first_name || !last_name || !email || !phone) {
      toast('please fill in all fields');
      return;
    }

    dispatch(updateUser(userDetails));
    setEditDetails(false);
  };

  const handleUpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword, userId } = userPassword;
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning('please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('passwords do not match');
      return;
    }

    dispatch(updatePassword({ oldPassword, newPassword, userId }));

    setUserPassword({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <section
      style={{
        maxWidth: '1200px',
        padding: '0 20px',
      }}
    >
      <form onSubmit={handleUpdateProfile}>
        <Text
          sx={{
            color: 'var(--prussian-blue-500)',
            fontSize: '1.1rem',
            fontWeight: 500,
          }}
        >
          My Personal Details
        </Text>

        <Divider mt={16} mb={32} />

        <Grid>
          <Grid.Col xs={6}>
            <TextInput
              placeholder="Enter your first name"
              label="First Name"
              name="first_name"
              value={userDetails.first_name}
              onChange={handleChange}
              disabled={!editDetails}
            />
          </Grid.Col>
          <Grid.Col xs={6}>
            <TextInput
              placeholder="Enter your last name"
              label="Last Name"
              name="last_name"
              value={userDetails.last_name}
              onChange={handleChange}
              disabled={!editDetails}
            />
          </Grid.Col>

          <Grid.Col xs={6}>
            <TextInput
              placeholder="Enter your phone number"
              label="Phone Number"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              disabled={!editDetails}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" sx={{ marginTop: '1.5rem' }}>
          <Button
            type="button"
            onClick={() => setEditDetails((prevState) => !prevState)}
            variant={editDetails ? 'subtle' : 'filled'}
            loading={isLoading}
          >
            {editDetails ? 'Cancel' : 'Update Profile'}
          </Button>
          {editDetails && <Button type="submit">Update</Button>}
        </Group>

        <Text
          sx={{
            color: 'var(--prussian-blue-500)',
            fontSize: '1.1rem',
            fontWeight: 500,
          }}
          mt={32}
        >
          My Account Details
        </Text>

        <Divider mt={16} mb={32} />

        <Grid>
          <Grid.Col xs={12} sm={6}>
            <TextInput label="Username" value={userDetails.username} disabled />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <TextInput
              placeholder="Enter your email address"
              label="Email Address"
              name="email"
              value={userDetails.email}
              type="email"
              disabled
            />
          </Grid.Col>
        </Grid>
      </form>

      <Text
        sx={{
          color: 'var(--prussian-blue-500)',
          fontSize: '1.1rem',
          fontWeight: 500,
        }}
        mt={32}
      >
        Update Password
      </Text>

      <Divider mt={16} mb={30} />

      <form onSubmit={handleUpdatePasswordSubmit}>
        <Grid>
          <Grid.Col xs={12} sm={4}>
            <PasswordInput
              placeholder="Enter current password"
              label="Current Password"
              mb={5}
              withAsterisk
              radius="sm"
              name="oldPassword"
              value={userPassword.oldPassword}
              onChange={handleChange}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <PasswordInput
              placeholder="Enter new password"
              label="New Password"
              mb={5}
              withAsterisk
              radius="sm"
              name="newPassword"
              value={userPassword.newPassword}
              onChange={handleChange}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <PasswordInput
              placeholder="Confirm new password"
              label="Confirm Password"
              mb={5}
              withAsterisk
              radius="sm"
              name="confirmPassword"
              value={userPassword.confirmPassword}
              onChange={handleChange}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" sx={{ marginTop: '1.5rem' }}>
          <Transition
            mounted={userPassword.newPassword}
            transition="fade"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Button
                type="submit"
                style={styles}
                variant="filled"
                loading={isLoading}
              >
                Update Password
              </Button>
            )}
          </Transition>
        </Group>
      </form>
    </section>
  );
};

export default AdminProfile;
