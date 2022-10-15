import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Grid, Group, Text, TextInput } from "@mantine/core";
import { toast } from "react-toastify";
import { updateUser } from "../features/users/userSlice";
import { useEffect } from "react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [editDetails, setEditDetails] = useState(false);
  const { user, isLoading } = useSelector((state) => state.users);
  const [userDetails, setUserDetails] = useState({
    userId: user?._id,
    username: user?.username || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const { username, first_name, last_name, email, phone } = userDetails;
    if (!username || !first_name || !last_name || !email || !phone) {
      toast("please fill in all fields");
      return;
    }

    dispatch(updateUser(userDetails));
    setEditDetails(false);
  };

  return (
    <>
      <form onSubmit={handleUpdateProfile}>
        <Text
          sx={{
            color: "var(--prussian-blue-500)",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
        >
          My Personal Details
        </Text>

        <Divider mt={16} mb={32} />

        <Grid>
          <Grid.Col xs={6}>
            <TextInput
              placeholder="Enter your first name"
              label="First Name"
              name="first_name"
              value={userDetails.first_name}
              onChange={handleChange}
              disabled={!editDetails}
            />
          </Grid.Col>
          <Grid.Col xs={6}>
            <TextInput
              placeholder="Enter your last name"
              label="Last Name"
              name="last_name"
              value={userDetails.last_name}
              onChange={handleChange}
              disabled={!editDetails}
            />
          </Grid.Col>

          <Grid.Col xs={6}>
            <TextInput
              placeholder="Enter your phone number"
              label="Phone Number"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              disabled={!editDetails}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" sx={{ marginTop: "1.5rem" }}>
          <Button
            type="button"
            onClick={() => setEditDetails((prevState) => !prevState)}
            variant={editDetails ? "subtle" : "filled"}
            loading={isLoading}
          >
            {editDetails ? "Cancel" : "Update Profile"}
          </Button>
          {editDetails && <Button type="submit">Update</Button>}
        </Group>

        <Text
          sx={{
            color: "var(--prussian-blue-500)",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
          mt={32}
        >
          My Account Details
        </Text>

        <Divider mt={16} mb={32} />

        <Grid>
          <Grid.Col xs={12} sm={6}>
            <TextInput
              label="Username"
              value={userDetails.username}
              onChange={() => {}}
              disabled
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <TextInput
              placeholder="Enter your email address"
              label="Email Address"
              name="email"
              value={userDetails.email}
              type="email"
              onChange={() => {}}
              disabled
            />
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
};

export default UserProfile;
