import {
  Container,
  Text,
  createStyles,
  TextInput,
  PasswordInput,
  SimpleGrid,
  Button,
  Group,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../features/users/userSlice";

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    width: "100%",
    padding: 0,
  },

  inner: {
    maxWidth: 1200,
  },

  title: {
    color: "var(--prussian-blue-500)",
    fontSize: "1.3rem",
    paddingTop: 5,
    marginBottom: "2rem",
  },
}));

const AdminAddUser = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.users);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = values;
    if (!username || !password || !email) {
      toast.warning("Please provide all credentials");
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    dispatch(registerUser({ username, email, password }));

    setValues(initialState);
  };

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Add New User</Text>
      </Container>
      <Container className={classes.inner} fluid>
        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 1 },
            { minWidth: "sm", cols: 2 },
          ]}
        >
          <TextInput
            placeholder="Enter username"
            label="Username"
            withAsterisk
            name="username"
            mb={8}
            value={values.username}
            onChange={handleChange}
          />

          <TextInput
            placeholder="Enter email"
            label="Email"
            withAsterisk
            name="email"
            mb={8}
            value={values.email}
            onChange={handleChange}
          />

          <PasswordInput
            placeholder="Enter password"
            label="Password"
            withAsterisk
            name="password"
            mb={8}
            value={values.password}
            onChange={handleChange}
          />

          <PasswordInput
            placeholder="Enter password again"
            label="Confirm Password"
            withAsterisk
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </SimpleGrid>
        <Group position="right" mt={8}>
          <Button loading={isLoading} onClick={handleSubmit}>
            Create User
          </Button>
        </Group>
      </Container>
    </Container>
  );
};

export default AdminAddUser;
