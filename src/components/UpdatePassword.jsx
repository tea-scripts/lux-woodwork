import {
  Button,
  Divider,
  Grid,
  Group,
  PasswordInput,
  Text,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword } from "../features/users/userSlice";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.users);
  const [userPassword, setUserPassword] = useState({
    userId: user?._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };

  const handleUpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword, userId } = userPassword;
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning("please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("passwords do not match");
      return;
    }

    dispatch(updatePassword({ oldPassword, newPassword, userId }));

    setUserPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <form onSubmit={handleUpdatePasswordSubmit}>
        <Text
          sx={{
            color: "var(--prussian-blue-500)",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
        >
          Change My Password
        </Text>

        <Divider mt={16} mb={32} />

        <Grid>
          <Grid.Col xs={12} sm={4}>
            <PasswordInput
              placeholder="Enter current password"
              label="Current Password"
              mb={5}
              withAsterisk
              radius="sm"
              name="oldPassword"
              value={userPassword.oldPassword}
              onChange={handleChange}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <PasswordInput
              placeholder="Enter new password"
              label="New Password"
              mb={5}
              withAsterisk
              radius="sm"
              name="newPassword"
              value={userPassword.newPassword}
              onChange={handleChange}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <PasswordInput
              placeholder="Confirm new password"
              label="Confirm Password"
              mb={5}
              withAsterisk
              radius="sm"
              name="confirmPassword"
              value={userPassword.confirmPassword}
              onChange={handleChange}
            />
          </Grid.Col>
        </Grid>
        <Group position="right" sx={{ marginTop: "1.5rem" }}>
          <Button type="submit" loading={isLoading} leftIcon={<IconSend />}>
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
};

export default UpdatePassword;
