import {
  Group,
  Text,
  Paper,
  ActionIcon,
  Badge,
  createStyles,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconMapPin, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  selectDefaultAddress,
} from "../features/address/addressSlice";
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

  defaultAddress: {
    borderColor: "#40c057",
  },

  btn: {
    marginTop: "1rem",

    "@media (min-width: 1080px)": {
      marginTop: 0,
    },
  },
}));

const SingleAddress = ({ address }) => {
  const { classes, cx } = useStyles();
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
    <Paper
      className={cx(classes.addressItem, {
        [classes.defaultAddress]: defaultAddress,
      })}
      key={addressId}
      shadow="xs"
      withBorder
    >
      <EditAddressModal
        opened={opened}
        setOpened={setOpened}
        address={address}
      />

      <div>
        {defaultAddress && (
          <Badge color="green" variant="filled">
            Default Address
          </Badge>
        )}

        <Text sx={{ maxWidth: 550 }}>
          {street}, {barangay}, {city}, {province}, {region}, {zip}
        </Text>
      </div>
      <div style={{ display: "flex" }}>
        <Group mb={10} position="right"></Group>
        <Group className={classes.btn}>
          {!address.defaultAddress && (
            <Tooltip
              label="Set as Default"
              color="blue"
              position="bottom"
              withArrow
            >
              <ActionIcon
                color="blue"
                onClick={() => dispatch(selectDefaultAddress(addressId))}
              >
                <IconMapPin size={18} />
              </ActionIcon>
            </Tooltip>
          )}
          <Tooltip label="Edit" color="orange" position="bottom" withArrow>
            <ActionIcon color="orange" onClick={() => setOpened(true)}>
              <IconEdit size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete" color="red" position="bottom" withArrow>
            <ActionIcon
              color="red"
              onClick={() => dispatch(deleteAddress(addressId))}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </div>
    </Paper>
  );
};

export default SingleAddress;
