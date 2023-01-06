import {
  Button,
  Grid,
  Group,
  TextInput,
  Modal,
  NativeSelect,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createAddress,
  fetchAllUserAddresses,
} from "../features/address/addressSlice";
import phAddress from "../utils/phAddress.json";

const AddAddressModal = ({ opened, setOpened }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.users);
  const { address } = useSelector((state) => state.address);
  const [userAddress, setUserAddress] = useState({
    userId: user?._id,
    name: `${user?.first_name || ""} ${user?.last_name || ""}`,
    phone: user?.phone || "",
    city: address?.city || "",
    street: address?.street || "",
    zip: address?.zip || "",
    province: address?.province || "",
    region: address?.region || "",
    barangay: address?.barangay || "",
  });

  const list = useMemo(
    () =>
      Object.keys(phAddress)
        .map((key) => phAddress[key])
        .map((region) => region),
    []
  );

  const filteredRegion = useMemo(() => {
    if (phAddress) {
      return Object.keys(phAddress)
        .map((key) => phAddress[key])
        .map((region) => region)
        .filter((region) => region.region_name === userAddress.region)[0];
    }
  }, [userAddress.region]);

  const filteredProvince = useMemo(() => {
    if (filteredRegion) {
      return filteredRegion.province_list[userAddress.province];
    }
  }, [userAddress.province, filteredRegion]);

  const filteredCity = useMemo(() => {
    if (filteredProvince) {
      return filteredProvince.municipality_list[userAddress.city];
    }
  }, [userAddress.city, filteredProvince]);

  const regionNames = useMemo(() => {
    return list.map((region) => region.region_name);
  }, [list]);

  const provinceNames = useMemo(() => {
    if (filteredRegion) {
      const provinces = filteredRegion.province_list;
      return Object.keys(provinces);
    }
    return "";
  }, [filteredRegion]);

  const cityNames = useMemo(() => {
    if (filteredProvince) {
      const cities = filteredProvince.municipality_list;
      return Object.keys(cities);
    }
    return "";
  }, [filteredProvince]);

  const barangayNames = useMemo(() => {
    if (filteredCity) {
      const barangays = filteredCity.barangay_list;
      return barangays;
    }
    return "";
  }, [filteredCity]);

  const handleAddressChange = (e) => {
    setUserAddress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();

    if (
      !userAddress.street ||
      !userAddress.city ||
      !userAddress.province ||
      !userAddress.region ||
      !userAddress.barangay ||
      !userAddress.zip
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    dispatch(
      createAddress({
        ...userAddress,
        street: userAddress.street.toUpperCase(),
      })
    );
    dispatch(fetchAllUserAddresses());

    setOpened(false);
    setUserAddress({
      userId: user?._id,
      name: `${user?.first_name || ""} ${user?.last_name || ""}`,
      phone: user?.phone || "",
      city: "",
      street: "",
      zip: "",
      province: "",
      region: "",
      barangay: "",
    });
  };

  useEffect(() => {
    if (isLoading === false) {
      setUserAddress({
        userId: user?._id,
        name: `${user?.first_name || ""} ${user?.last_name || ""}`,
        phone: user?.phone || "",
        city: "",
        street: "",
        zip: "",
        province: "",
        region: "",
        barangay: "",
      });
      setOpened(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Modal
      id="1"
      opened={opened}
      onClose={() => setOpened(false)}
      title="New Address"
      size="lg"
      centered
    >
      {!user.first_name && !user.phone && (
        <Alert icon={<IconAlertCircle size={16} />} mb={"md"} color="blue">
          Please update your profile first before adding an address
        </Alert>
      )}
      <form onSubmit={handleCreateAddress}>
        <Grid>
          <Grid.Col xs={12} sm={6}>
            <TextInput
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
              data={["---Select Region---", ...regionNames]}
              value={userAddress.region}
              onChange={(e) =>
                setUserAddress({
                  ...userAddress,
                  region: e.currentTarget.value,
                })
              }
              placeholder="Select Region"
              name="region"
              label="Region"
              size="sm"
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={["---Select Province---", ...provinceNames]}
              onChange={(e) =>
                setUserAddress({
                  ...userAddress,
                  province: e.currentTarget.value,
                })
              }
              placeholder="Select Province"
              label="Province"
              name="province"
              value={userAddress.province}
              size="sm"
              disabled={!userAddress.region}
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={["---Select City---", ...cityNames]}
              onChange={(e) =>
                setUserAddress({
                  ...userAddress,
                  city: e.currentTarget.value,
                })
              }
              placeholder="Select City / Municipality"
              name="city"
              value={userAddress.city}
              label="City / Municipality"
              size="sm"
              disabled={!userAddress.province}
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={["---Select Barangay---", ...barangayNames]}
              onChange={(e) =>
                setUserAddress({
                  ...userAddress,
                  barangay: e.currentTarget.value,
                })
              }
              placeholder="Select Barangay"
              name="barangay"
              value={userAddress.barangay}
              label="Barangay"
              size="sm"
              disabled={!userAddress.city}
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
          <Button variant="subtle" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            loading={isLoading}
            type="submit"
            sx={{
              "@media (max-width: 600px)": {
                width: "100%",
              },
            }}
          >
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddAddressModal;
