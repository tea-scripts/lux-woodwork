import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Modal,
  NativeSelect,
  Paper,
  ActionIcon,
  Badge,
  createStyles,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from '../features/users/userSlice';

const useStyles = createStyles((theme) => ({
  addressItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',

    '@media (min-width: 1080px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  },

  btn: {
    marginTop: '1rem',

    '@media (min-width: 1080px)': {
      marginTop: 0,
    },
  },
}));

const UserAddress = () => {
  const dispatch = useDispatch();
  const { user, address, isLoading } = useSelector((state) => state.users);
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [userAddress, setUserAddress] = useState({
    userId: user?._id,
    name: `${user?.first_name || ''} ${user?.last_name || ''}`,
    phone: user?.phone || '',
    city: address?.city || '',
    state: address?.state || '',
    zip: address?.zip || '',
    province: address?.province || '',
    region: address?.region || '',
    barangay: address?.barangay || '',
  });

  const handleAddressChange = (e) => {
    setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();

    dispatch(createAddress(userAddress));

    setOpened(false);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <Text sx={{ color: '#C0C0C0', fontSize: '1.1rem' }} mb={10}>
          My Addresses
        </Text>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="New Address"
          size="lg"
          centered
        >
          <form onSubmit={handleCreateAddress}>
            <Grid>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  placeholder="Enter Name"
                  name="name"
                  value={userAddress.name}
                  onChange={handleAddressChange}
                  label="Full Name"
                  size="md"
                  readOnly
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <TextInput
                  placeholder="Enter Phone Number"
                  label="Phone Number"
                  name="phone"
                  value={userAddress.phone}
                  onChange={handleAddressChange}
                  size="md"
                  readOnly
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <NativeSelect
                  value={userAddress.region}
                  onChange={handleAddressChange}
                  data={[]}
                  placeholder="Select Region"
                  name="region"
                  label="Region"
                  size="sm"
                />
              </Grid.Col>

              <Grid.Col xs={12} sm={6}>
                <NativeSelect
                  data={[]}
                  onChange={handleAddressChange}
                  placeholder="Select Province"
                  label="Province"
                  name="province"
                  value={userAddress.province}
                  size="sm"
                  disabled
                />
              </Grid.Col>

              <Grid.Col xs={12} sm={6}>
                <NativeSelect
                  data={[]}
                  onChange={handleAddressChange}
                  placeholder="Select City"
                  name="city"
                  value={userAddress.city}
                  label="City"
                  size="sm"
                  disabled
                />
              </Grid.Col>

              <Grid.Col xs={12} sm={6}>
                <NativeSelect
                  data={[]}
                  onChange={handleAddressChange}
                  placeholder="Select Barangay"
                  name="barangay"
                  value={userAddress.barangay}
                  label="Barangay"
                  size="sm"
                  disabled
                />
              </Grid.Col>

              <Grid.Col xs={12} sm={6}>
                <TextInput
                  onChange={handleAddressChange}
                  placeholder="Enter Postal Code"
                  name="zip"
                  value={userAddress.zip}
                  label="Postal Code"
                  size="sm"
                />
              </Grid.Col>

              <Grid.Col xs={12} sm={6}>
                <TextInput
                  placeholder="Enter Street Name, Building, House No"
                  label="Street Name, Building, House No."
                  size="sm"
                  name="street"
                  value={userAddress.street}
                  onChange={handleAddressChange}
                />
              </Grid.Col>
            </Grid>
            <Group mt={20} position="right">
              <Button loading={isLoading} type="submit">
                Add New Address
              </Button>
            </Group>
          </form>
        </Modal>
        <Group position="right">
          <Button onClick={() => setOpened(true)}>Add New Address</Button>
        </Group>
      </div>
      <Stack>
        <Paper className={classes.addressItem} withBorder>
          <div>
            <Badge color="dark">Default</Badge>

            <Group>Patrick Santos | (63+)9328762312</Group>
            <Text sx={{ maxWidth: 400, color: 'var(--gray)' }}>
              5/F B And L Building 116 Legaspi Street Legaspi Village 1200,
              Makati City, Metro Manila, 1200
            </Text>
          </div>
          <div style={{ display: 'flex' }}>
            <Group mb={10} position="right"></Group>
            <Group className={classes.btn}>
              <ActionIcon color="orange">
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          </div>
        </Paper>
        <Paper className={classes.addressItem} withBorder>
          <div>
            <Group>Patrick Santos | (63+)9328762312</Group>
            <Text sx={{ maxWidth: 400, color: 'var(--gray)' }}>
              5/F B And L Building 116 Legaspi Street Legaspi Village 1200,
              Makati City, Metro Manila, 1200
            </Text>
          </div>
          <div style={{ display: 'flex' }}>
            <Group mb={10} position="right"></Group>
            <Group className={classes.btn}>
              <ActionIcon color="orange">
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size={18} />
              </ActionIcon>
              <Button variant="subtle">Select as default</Button>
            </Group>
          </div>
        </Paper>
        <Paper className={classes.addressItem} withBorder>
          <div>
            <Group>Patrick Santos | (63+)9328762312</Group>
            <Text sx={{ maxWidth: 400, color: 'var(--gray)' }}>
              5/F B And L Building 116 Legaspi Street Legaspi Village 1200,
              Makati City, Metro Manila, 1200
            </Text>
          </div>
          <div style={{ display: 'flex' }}>
            <Group mb={10} position="right"></Group>
            <Group className={classes.btn}>
              <ActionIcon color="orange">
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size={18} />
              </ActionIcon>
              <Button variant="subtle">Select as default</Button>
            </Group>
          </div>
        </Paper>
      </Stack>
    </>
  );
};

export default UserAddress;
