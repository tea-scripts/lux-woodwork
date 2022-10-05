import { Button, Grid, Group, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/profile/profileSlice";

const UserProfile = () => {
  const [editDetails, setEditDetails] = useState(false);
  const dispatch = useDispatch();
  const { username, email, firstName, lastName, phoneNumber } = useSelector(
    (state) => state.profile
  );
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [phoneNumberInput, setPhoneNumberInput] = useState(phoneNumber);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        firstName: firstNameInput,
        lastName: lastNameInput,
        phoneNumber: phoneNumberInput,
      })
    );
    setEditDetails(false);
  };

  return (
    <>
      <form onSubmit={handleUpdateProfile}>
        <Text sx={{ color: "#C0C0C0", fontSize: "1.1rem" }} mb={32}>
          My Personal Details
        </Text>

        <Grid>
          <Grid.Col xs={12} sm={4}>
            <TextInput
              label="Username"
              size="md"
              value={username}
              onChange={() => {}}
              disabled
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <TextInput
              placeholder="Enter your first name"
              label="First Name"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.currentTarget.value)}
              size="md"
              disabled={!editDetails}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <TextInput
              placeholder="Enter your last name"
              label="Last Name"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.currentTarget.value)}
              size="md"
              disabled={!editDetails}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={8}>
            <TextInput
              placeholder="Enter your email address"
              label="Email Address"
              value={email}
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
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.currentTarget.value)}
              size="md"
              disabled={!editDetails}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" sx={{ marginTop: "1.5rem" }}>
          <Button
            type="button"
            onClick={() => setEditDetails((prevState) => !prevState)}
            variant={editDetails ? "subtle" : "filled"}
          >
            {editDetails ? "Cancel" : "Edit Profile"}
          </Button>
          {editDetails && <Button type="submit">Update</Button>}
        </Group>
      </form>
    </>
  );
};

export default UserProfile;
