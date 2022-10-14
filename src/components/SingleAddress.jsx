import {
  Group,
  Text,
  Paper,
  ActionIcon,
  Badge,
  createStyles,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "../features/address/addressSlice";
import EditAddressModal from "./EditAddressModal";

const useStyles = createStyles((theme) => ({
  addressItem: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",

    "@media (min-width: 1080px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  },

  btn: {
    marginTop: "1rem",

    "@media (min-width: 1080px)": {
      marginTop: 0,
    },
  },
}));

const SingleAddress = ({ address }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.users);
  const [opened, setOpened] = useState(false);

  const {
    _id: addressId,
    street,
    city,
    defaultAddress,
    province,
    region,
    barangay,
    zip,
  } = address;

  return (
    <Paper className={classes.addressItem} key={addressId} withBorder>
      <EditAddressModal
        opened={opened}
        setOpened={setOpened}
        address={address}
      />

      <div>
        {defaultAddress && <Badge color="dark"> Default</Badge>}

        <Group>
          {`${user?.first_name || ""} ${user?.last_name || ""}`} {" | "}
          {`${user?.phone && "(63+)"} ${user?.phone || ""}`}
        </Group>
        <Text sx={{ maxWidth: 400, color: "var(--gray)" }}>
          {street}, {barangay}, {city}, {province}, {region}, {zip}
        </Text>
      </div>
      <div style={{ display: "flex" }}>
        <Group mb={10} position="right"></Group>
        <Group className={classes.btn}>
          <ActionIcon color="orange" onClick={() => setOpened(true)}>
            <IconEdit size={18} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => dispatch(deleteAddress(addressId))}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </div>
    </Paper>
  );
};

export default SingleAddress;
