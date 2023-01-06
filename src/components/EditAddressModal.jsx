import {
  Button,
  Grid,
  Group,
  TextInput,
  Modal,
  NativeSelect,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchAllUserAddresses,
  updateAddress as updateAddressAction,
} from "../features/address/addressSlice";
import phAddress from "../utils/phAddress.json";

const EditAddressModal = ({ opened, setOpened, address }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.users);
  const [updateAddress, setUpdateAddress] = useState({
    _id: address._id,
    street: address.street,
    city: address.city,
    province: address.province,
    region: address.region,
    barangay: address.barangay,
    zip: address.zip,
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
        .filter((region) => region.region_name === updateAddress.region)[0];
    }
  }, [updateAddress.region]);

  const filteredProvince = useMemo(() => {
    if (filteredRegion) {
      return filteredRegion.province_list[updateAddress.province];
    }
  }, [updateAddress.province, filteredRegion]);

  const filteredCity = useMemo(() => {
    if (filteredProvince) {
      return filteredProvince.municipality_list[updateAddress.city];
    }
  }, [updateAddress.city, filteredProvince]);

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
    setUpdateAddress({
      ...updateAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();

    if (
      !updateAddress.street ||
      !updateAddress.city ||
      !updateAddress.province ||
      !updateAddress.region ||
      !updateAddress.barangay ||
      !updateAddress.zip
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    dispatch(
      updateAddressAction({
        ...updateAddress,
        street: updateAddress.street.toUpperCase(),
      })
    );
    dispatch(fetchAllUserAddresses());

    setOpened(false);
  };

  return (
    <Modal
      id={address._id}
      opened={opened}
      onClose={() => setOpened(false)}
      title="New Address"
      size="lg"
      centered
    >
      <form onSubmit={handleUpdateAddress}>
        <Grid>
          <Grid.Col xs={12} sm={6}>
            <TextInput
              placeholder="Enter Name"
              name="name"
              value={`${user?.first_name || ""} ${user?.last_name || ""}`}
              onChange={() => {}}
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
              value={`${user?.phone && "(63+)"} ${user?.phone || ""}`}
              onChange={() => {}}
              size="md"
              readOnly
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={["---Select Region---", ...regionNames]}
              onChange={(e) =>
                setUpdateAddress({
                  ...updateAddress,
                  region: e.currentTarget.value,
                })
              }
              value={updateAddress.region}
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
                setUpdateAddress({
                  ...updateAddress,
                  province: e.currentTarget.value,
                })
              }
              value={updateAddress.province}
              placeholder="Select Province"
              label="Province"
              name="province"
              size="sm"
              disabled={!updateAddress.region}
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={["---Select City---", ...cityNames]}
              onChange={(e) =>
                setUpdateAddress({
                  ...updateAddress,
                  city: e.currentTarget.value,
                })
              }
              value={updateAddress.city}
              placeholder="Select City / Municipality"
              name="city"
              label="City / Municipality"
              size="sm"
              disabled={!updateAddress.province}
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={["---Select Barangay---", ...barangayNames]}
              onChange={(e) =>
                setUpdateAddress({
                  ...updateAddress,
                  barangay: e.currentTarget.value,
                })
              }
              value={updateAddress.barangay}
              placeholder="Select Barangay"
              name="barangay"
              label="Barangay"
              size="sm"
              disabled={!updateAddress.city}
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <TextInput
              onChange={handleAddressChange}
              placeholder="Enter Postal Code"
              name="zip"
              value={updateAddress.zip}
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
              value={updateAddress.street}
              onChange={handleAddressChange}
            />
          </Grid.Col>
        </Grid>
        <Group mt={20} position="right">
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

export default EditAddressModal;
