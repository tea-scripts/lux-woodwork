import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { toast } from "react-toastify";
import {
  updateUser,
  uploadAvatar,
  clearAvatar,
} from "../features/users/userSlice";
import { IconUpload } from "@tabler/icons";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [editDetails, setEditDetails] = useState(false);
  const { user, isLoading, avatar } = useSelector((state) => state.users);
  const [userDetails, setUserDetails] = useState({
    userId: user?._id,
    username: user?.username || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });
  const hiddenFileInput = useRef(null);

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

    if (avatar) {
      dispatch(updateUser({ ...userDetails, avatar }));
    } else {
      dispatch(updateUser({ ...userDetails, avatar: user.avatar }));
    }

    setEditDetails(false);
  };

  const handleAvatarChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    if (image) {
      dispatch(uploadAvatar(formData));
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
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
          <Grid.Col xs={12} sm={6}>
            <Group position="center">
              <Avatar
                src={user.avatar || null}
                alt="user avatar"
                radius="50%"
                size={200}
              />
            </Group>
            {avatar && (
              <Group position="center" mt={32}>
                <Text>Preview Avatar:</Text>
                <Avatar
                  src={avatar}
                  alt="preview avatar"
                  radius="50%"
                  size={82}
                />
              </Group>
            )}
            {editDetails && (
              <Group position="center" mt="1.5rem">
                <Button
                  onClick={handleClick}
                  leftIcon={<IconUpload />}
                  variant="outline"
                  size="sm"
                  loading={isLoading}
                >
                  Upload a file
                </Button>
                <input
                  type="file"
                  name="image"
                  style={{
                    display: "none",
                  }}
                  height={15}
                  onChange={handleAvatarChange}
                  ref={hiddenFileInput}
                />
              </Group>
            )}
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <TextInput
              placeholder="Enter your first name"
              label="First Name"
              name="first_name"
              value={userDetails.first_name}
              onChange={handleChange}
              disabled={!editDetails}
              mb={8}
            />

            <TextInput
              placeholder="Enter your last name"
              label="Last Name"
              name="last_name"
              value={userDetails.last_name}
              onChange={handleChange}
              disabled={!editDetails}
              mb={8}
            />

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
            onClick={() => {
              setEditDetails((prevState) => !prevState);
              if (editDetails) {
                dispatch(clearAvatar());
              }
            }}
            variant={editDetails ? "subtle" : "filled"}
            disabled={isLoading}
          >
            {editDetails ? "Cancel" : "Update Profile"}
          </Button>
          {editDetails && (
            <Button type="submit" disabled={isLoading}>
              Update
            </Button>
          )}
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
