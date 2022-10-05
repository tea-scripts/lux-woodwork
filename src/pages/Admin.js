import { createStyles, Group, Navbar, ScrollArea } from "@mantine/core";
import {
  IconNotebook,
  IconUsers,
  IconShoppingCart,
  IconClipboardText,
  IconHelp,
  IconUserCircle,
  IconHome,
} from "@tabler/icons";
import React from "react";
import { Outlet } from "react-router-dom";
import { LinksGroup } from "../components";
import logo from "../assets/logo-black.svg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "calc(100vh - (60px + 70px))",
    display: "flex",
    // maxWidth: 1200,

    h1: {
      textAlign: "center",
    },
  },

  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
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

const mockdata = [
  {
    label: "Products",
    icon: IconNotebook,
    initiallyOpened: true,
    links: [
      { label: "Add Products", link: "/admin/products/add" },
      { label: "View Products", link: "/admin/products/view" },
    ],
  },
  {
    label: "Users",
    icon: IconUsers,
    links: [
      { label: "Add Users", link: "/admin/users/add" },
      { label: "View Users", link: "/admin/users/view" },
    ],
  },
  {
    label: "Orders",
    icon: IconShoppingCart,
    links: [{ label: "View Orders", link: "/admin/orders/view" }],
  },
  {
    label: "Reviews",
    icon: IconClipboardText,
    links: [{ label: "View Reviews", link: "/admin/reviews/view" }],
  },
  { label: "Profile", icon: IconUserCircle, link: "/admin/profile" },

  { label: "Support", icon: IconHelp, link: "/admin/support" },
  { label: "Home", icon: IconHome, link: "/" },
];

const Admin = () => {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <section className={classes.wrapper}>
      <Navbar
        sx={{ height: "500" }}
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group position="center">
            <img src={logo} alt="lux woodwork" />
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
      <Outlet />
    </section>
  );
};

export default Admin;
