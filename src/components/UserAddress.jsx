import { Button, Group, Stack, Text, Divider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllUserAddresses } from '../features/address/addressSlice';
import Loading from './Loading';
import AddAddressModal from './AddAddressModal';
import SingleAddress from './SingleAddress';

const UserAddress = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.users);
  const { userAddresses } = useSelector((state) => state.address);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (isLoading === false) {
      dispatch(fetchAllUserAddresses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          sx={{
            color: 'var(--prussian-blue-500)',
            fontSize: '1.1rem',
            fontWeight: 500,
          }}
        >
          My Addresses
        </Text>

        <AddAddressModal opened={opened} setOpened={setOpened} />

        <Group position="right">
          <Button
            onClick={() => {
              setOpened(true);
            }}
          >
            Add New Address
          </Button>
        </Group>
      </div>
      <Divider mt={16} mb={32} />

      <Stack>
        {isLoading && <Loading />}

        {userAddresses &&
          userAddresses.map((address) => {
            return <SingleAddress key={address._id} address={address} />;
          })}
      </Stack>
    </>
  );
};

export default UserAddress;
