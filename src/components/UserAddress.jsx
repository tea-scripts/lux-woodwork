import { Button, Group, Stack, Text, Divider, Pagination } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllUserAddresses } from "../features/address/addressSlice";
import Loading from "./Loading";
import AddAddressModal from "./AddAddressModal";
import SingleAddress from "./SingleAddress";

const UserAddress = () => {
  const dispatch = useDispatch();
  const { userAddresses, isLoading, pages } = useSelector(
    (state) => state.address
  );
  const [opened, setOpened] = useState(false);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    if (isLoading === false) {
      dispatch(fetchAllUserAddresses(activePage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          sx={{
            color: "var(--prussian-blue-500)",
            fontSize: "1.1rem",
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

      {pages > 1 && (
        <Group position="right" mt={32}>
          <Pagination page={activePage} onChange={setPage} total={pages} />
        </Group>
      )}
    </>
  );
};

export default UserAddress;
