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
  fetchAllUserAddresses,
  updateAddress as updateAddressAction,
} from "../features/address/addressSlice";
import addressData from "../utils/addresses";

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

  console.log(updateAddress);

  const [regionsList, setRegionsList] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  const handleAddressChange = (e) => {
    if (e.target.name === "region") {
      setUpdateAddress({
        ...updateAddress,
        [e.target.name]: e.target.value,
        province: "",
        city: "",
        barangay: "",
      });
    } else if (e.target.name === "province") {
      setUpdateAddress({
        ...updateAddress,
        [e.target.name]: e.target.value,
        city: "",
        barangay: "",
      });
    } else if (e.target.name === "city") {
      setUpdateAddress({
        ...updateAddress,
        [e.target.name]: e.target.value,
        barangay: "",
      });
    } else {
      setUpdateAddress({
        ...updateAddress,
        [e.target.name]: e.target.value,
      });
    }
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

    dispatch(updateAddressAction(updateAddress));
    dispatch(fetchAllUserAddresses());

    setOpened(false);
  };

  useEffect(() => {
    const regions = addressData.map(({ region_name }) => region_name);
    setRegionsList(regions);
  }, [updateAddress]);

  useEffect(() => {
    const provinces = addressData
      .filter((region) => region.region_name === updateAddress.region)
      .flatMap((region) =>
        region.province_list.map((province) => province.province_name)
      );
    setProvincesList(provinces);
  }, [updateAddress]);

  useEffect(() => {
    const cities = addressData
      .filter((region) => region.region_name === updateAddress.region)
      .flatMap((region) =>
        region.province_list
          .filter(
            (province) => province.province_name === updateAddress.province
          )
          .flatMap((province) =>
            province.city_list.map((city) => city.city_name)
          )
      );
    setCityList(cities);
  }, [updateAddress]);

  useEffect(() => {
    const barangays = addressData
      .filter((region) => region.region_name === updateAddress.region)
      .flatMap((region) =>
        region.province_list
          .filter(
            (province) => province.province_name === updateAddress.province
          )
          .flatMap((province) =>
            province.city_list
              .filter((city) => city.city_name === updateAddress.city)
              .flatMap((city) => city.barangay_list)
          )
      );
    setBarangayList(barangays);
  }, [updateAddress]);

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
              value={updateAddress.region}
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
              value={updateAddress.province}
              size="sm"
              disabled={!updateAddress.region}
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={cityList ? ["", ...cityList] : []}
              onChange={handleAddressChange}
              placeholder="Select City / Municipality"
              name="city"
              value={updateAddress.city}
              label="City / Municipality"
              size="sm"
              disabled={!updateAddress.province}
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <NativeSelect
              data={barangayList ? ["", ...barangayList] : []}
              onChange={handleAddressChange}
              placeholder="Select Barangay"
              name="barangay"
              value={updateAddress.barangay}
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
