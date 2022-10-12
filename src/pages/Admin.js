import { Burger, createStyles, Group, Paper, Text } from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    backgroundColor: "#fff",
  },

  content: { flex: 1, display: "flex", flexDirection: "column", gap: "1rem" },
}));

const Admin = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(true);

  return (
    <section className={classes.container}>
      <AdminSidebar opened={opened} setOpened={setOpened} />

      <Paper
        className={classes.content}
        shadow="xs"
        p={opened && "md"}
        withBorder
      >
        {!opened && (
          <Paper shadow="xs" p="md" mb="1rem" withBorder>
            <Group>
              <Burger
                color="var(--prussian-blue-500)"
                size={18}
                onClick={() => setOpened((o) => !o)}
              />
              <Text
                align="center"
                sx={{
                  fontSize: "1.3rem",
                  color: "var(--prussian-blue-500)",
                }}
              >
                Admin Dashboard
              </Text>
            </Group>
          </Paper>
        )}
        <Outlet />
      </Paper>
    </section>
  );
};

export default Admin;
