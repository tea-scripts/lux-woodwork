import {
  Button,
  Grid,
  Group,
  TextInput,
  Modal,
  NativeSelect,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createAddress,
  fetchAllUserAddresses,
} from "../features/address/addressSlice";
import addressData from "../utils/addresses";

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

  const [regionsList, setRegionsList] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  const handleAddressChange = (e) => {
    if (e.target.name === "region") {
      setUserAddress({
        ...userAddress,
        [e.target.name]: e.target.value,
        province: "",
        city: "",
        barangay: "",
      });
    } else if (e.target.name === "province") {
      setUserAddress({
        ...userAddress,
        [e.target.name]: e.target.value,
        city: "",
        barangay: "",
      });
    } else if (e.target.name === "city") {
      setUserAddress({
        ...userAddress,
        [e.target.name]: e.target.value,
        barangay: "",
      });
    } else {
      setUserAddress({
        ...userAddress,
        [e.target.name]: e.target.value,
      });
    }
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

    dispatch(createAddress(userAddress));
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
    const regions = addressData.map(({ region_name }) => region_name);
    setRegionsList(regions);
  }, [userAddress]);

  useEffect(() => {
    const provinces = addressData
      .filter((region) => region.region_name === userAddress.region)
      .flatMap((region) =>
        region.province_list.map((province) => province.province_name)
      );
    setProvincesList(provinces);
  }, [userAddress]);

  useEffect(() => {
    const cities = addressData
      .filter((region) => region.region_name === userAddress.region)
      .flatMap((region) =>
        region.province_list
          .filter((province) => province.province_name === userAddress.province)
          .flatMap((province) =>
            province.city_list.map((city) => city.city_name)
          )
      );
    setCityList(cities);
  }, [userAddress]);

  useEffect(() => {
    const barangays = addressData
      .filter((region) => region.region_name === userAddress.region)
      .flatMap((region) =>
        region.province_list
          .filter((province) => province.province_name === userAddress.province)
          .flatMap((province) =>
            province.city_list
              .filter((city) => city.city_name === userAddress.city)
              .flatMap((city) => city.barangay_list)
          )
      );
    setBarangayList(barangays);
  }, [userAddress]);

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
              data={["", ...regionsList]}
              placeholder="Select Region"
              name="region"
              label="Region"
              size="sm"
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={provincesList ? ["", ...provincesList] : []}
              onChange={handleAddressChange}
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
              data={cityList ? ["", ...cityList] : []}
              onChange={handleAddressChange}
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
              data={barangayList ? ["", ...barangayList] : []}
              onChange={handleAddressChange}
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
