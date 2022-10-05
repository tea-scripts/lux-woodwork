import {
  Button,
  Grid,
  Group,
  NativeSelect,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";

const AdminAddUsers = () => {
  return (
    <Paper sx={{ width: "100%", padding: "1rem", minHeight: 600 }}>
      <Group mb={20}>
        <Text sx={{ fontSize: "2rem", fontWeight: 500 }}>Create New User</Text>
      </Group>
      <Grid>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter username"
            label="Username"
            size="md"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter email"
            label="Email"
            size="md"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <PasswordInput
            placeholder="Enter password"
            label="Password"
            size="md"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <PasswordInput
            placeholder="Enter password again"
            label="Confirm Password"
            size="md"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter first name"
            label="First Name"
            size="md"
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter last name"
            label="Last Name"
            size="md"
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter phone number"
            label="Phone Number"
            size="md"
          />
        </Grid.Col>

        <Grid.Col xs={12}>
          <Group position="right">
            <Button>Create User</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default AdminAddUsers;
