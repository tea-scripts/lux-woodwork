import LinksGroup from "../components/LinkGroup";
import navLinks from "../utils/adminNavLinks";
import {
  Burger,
  createStyles,
  Group,
  GroupedTransition,
  Navbar,
  ScrollArea,
  Text,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  navbar: {
    maxWidth: 300,
    minWidth: 300,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid hsla(205, 100%, 13%, .3)`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const AdminSidebar = ({ opened, setOpened }) => {
  const { classes } = useStyles();
  const duration = 800;

  const links = navLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <GroupedTransition
      mounted={opened}
      transitions={{
        sidebar: {
          duration,
          transition: "slide-right",
          timingFunction: "ease",
        },
      }}
    >
      {(styles) => (
        <Navbar style={styles.sidebar} p="md" className={classes.navbar}>
          <Navbar.Section className={classes.header}>
            <Group>
              <Burger size={18} onClick={() => setOpened((o) => !o)} />
              <Text
                sx={{ fontSize: "1.3rem", color: "var(--prussian-blue-500)" }}
              >
                Admin Dashboard
              </Text>
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{links}</div>
          </Navbar.Section>
        </Navbar>
      )}
    </GroupedTransition>
  );
};

export default AdminSidebar;
