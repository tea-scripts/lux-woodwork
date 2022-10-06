import { Button, Grid, Group, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../features/users/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [editDetails, setEditDetails] = useState(false);
  const { user, isLoading } = useSelector((state) => state.users);
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

  return (
    <>
      <form onSubmit={handleUpdateProfile}>
        <Text sx={{ color: '#C0C0C0', fontSize: '1.1rem' }} mb={32}>
          My Personal Details
        </Text>

        <Grid>
          <Grid.Col xs={12} sm={4}>
            <TextInput
              label="Username"
              size="md"
              value={userDetails.username}
              onChange={() => {}}
              disabled
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <TextInput
              placeholder="Enter your first name"
              label="First Name"
              name="first_name"
              value={userDetails.first_name}
              onChange={handleChange}
              size="md"
              disabled={!editDetails}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <TextInput
              placeholder="Enter your last name"
              label="Last Name"
              name="last_name"
              value={userDetails.last_name}
              onChange={handleChange}
              size="md"
              disabled={!editDetails}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={8}>
            <TextInput
              placeholder="Enter your email address"
              label="Email Address"
              name="email"
              value={userDetails.email}
              type="email"
              onChange={() => {}}
              size="md"
              disabled
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <TextInput
              placeholder="Enter your phone number"
              label="Phone Number"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              size="md"
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
            {editDetails ? 'Cancel' : 'Edit Profile'}
          </Button>
          {editDetails && <Button type="submit">Update</Button>}
        </Group>
      </form>
    </>
  );
};

export default UserProfile;
