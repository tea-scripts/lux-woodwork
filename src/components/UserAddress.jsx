import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Modal,
  NativeSelect,
  Paper,
  ActionIcon,
  Badge,
  createStyles,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  addressItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem",

    "@media (min-width: 481px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  },
}));

const UserAddress = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Text sx={{ color: "#C0C0C0", fontSize: "1.1rem" }} mb={10}>
          My Addresses
        </Text>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="New Address"
          size="lg"
          centered
        >
          <Grid>
            <Grid.Col xs={12} sm={6}>
              <TextInput placeholder="Enter Name" label="Full Name" size="md" />
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              <TextInput
                placeholder="Enter Phone Number"
                label="Phone Number"
                size="sm"
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              <NativeSelect
                value={selectedRegion}
                onChange={(event) =>
                  setSelectedRegion(event.currentTarget.value)
                }
                data={[]}
                placeholder="Select Region"
                label="Region"
                size="sm"
              />
            </Grid.Col>

            <Grid.Col xs={12} sm={6}>
              <NativeSelect
                data={[]}
                placeholder="Select Province"
                label="Province"
                size="sm"
                disabled
              />
            </Grid.Col>

            <Grid.Col xs={12} sm={6}>
              <NativeSelect
                data={[]}
                placeholder="Select City"
                label="City"
                size="sm"
                disabled
              />
            </Grid.Col>

            <Grid.Col xs={12} sm={6}>
              <NativeSelect
                data={[]}
                placeholder="Select Barangay"
                label="Barangay"
                size="sm"
                disabled
              />
            </Grid.Col>

            <Grid.Col xs={12} sm={6}>
              <TextInput
                placeholder="Enter Postal Code"
                label="Postal Code"
                size="sm"
              />
            </Grid.Col>

            <Grid.Col xs={12} sm={6}>
              <TextInput
                placeholder="Enter Street Name, Building, House No"
                label="Street Name, Building, House No."
                size="sm"
              />
            </Grid.Col>
          </Grid>
          <Group mt={20} position="right">
            <Button>Add New Address</Button>
          </Group>
        </Modal>
        <Group position="right">
          <Button onClick={() => setOpened(true)}>Add New Address</Button>
        </Group>
      </div>
      <Stack>
        <Paper className={classes.addressItem} withBorder>
          <div>
            <Badge color="dark">Default</Badge>

            <Group>Patrick Santos | (63+)9328762312</Group>
            <Text sx={{ maxWidth: 400, color: "var(--gray)" }}>
              5/F B And L Building 116 Legaspi Street Legaspi Village 1200,
              Makati City, Metro Manila, 1200
            </Text>
          </div>
          <div style={{ display: "flex" }}>
            <Group mb={10} position="right"></Group>
            <Group>
              <ActionIcon color="orange">
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          </div>
        </Paper>
        <Paper className={classes.addressItem} withBorder>
          <div>
            <Badge color="dark">Default</Badge>

            <Group>Patrick Santos | (63+)9328762312</Group>
            <Text sx={{ maxWidth: 400, color: "var(--gray)" }}>
              5/F B And L Building 116 Legaspi Street Legaspi Village 1200,
              Makati City, Metro Manila, 1200
            </Text>
          </div>
          <div style={{ display: "flex" }}>
            <Group mb={10} position="right"></Group>
            <Group>
              <ActionIcon color="orange">
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size={18} />
              </ActionIcon>
              <Button variant="subtle">Select as default</Button>
            </Group>
          </div>
        </Paper>
        <Paper className={classes.addressItem} withBorder>
          <div>
            <Badge color="dark">Default</Badge>

            <Group>Patrick Santos | (63+)9328762312</Group>
            <Text sx={{ maxWidth: 400, color: "var(--gray)" }}>
              5/F B And L Building 116 Legaspi Street Legaspi Village 1200,
              Makati City, Metro Manila, 1200
            </Text>
          </div>
          <div style={{ display: "flex" }}>
            <Group mb={10} position="right"></Group>
            <Group>
              <ActionIcon color="orange">
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size={18} />
              </ActionIcon>
              <Button variant="subtle">Select as default</Button>
            </Group>
          </div>
        </Paper>
      </Stack>
    </>
  );
};

export default UserAddress;
