import {
  Button,
  createStyles,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconUser,
  IconShoppingCart,
  IconAddressBook,
  IconTruck,
  IconNotes,
  IconHeart,
  IconRotateRectangle,
} from "@tabler/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "calc(100vh - (60px + 140px))",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "90vw",
    margin: " 0 auto",
    maxWidth: 1200,
    padding: "3rem 0",

    "@media (min-width: 481px)": {
      flexDirection: "row",
      columnGap: "3rem",
    },
  },

  title: {
    color: "var(--prussian-blue-500)",
    fontSize: "1rem",
    marginBottom: "1rem",
  },

  filterBar: {
    display: "none",
    marginBottom: "3rem",

    "@media (min-width: 1024px)": {
      minWidth: "15rem",
      maxWidth: "15rem",
    },

    "@media (min-width: 481px)": {
      display: "flex",
      minWidth: "15rem",
      maxWidth: "15rem",
      marginTop: "3.5rem",
    },
  },

  openSidebar: {
    display: "flex",
  },

  btn: {
    "@media (min-width: 481px)": {
      display: "none",
    },
  },

  link: {
    fontWeight: 500,
    padding: ".3rem .3rem .3rem 1rem",
    borderRadius: "30px",
    color: "inherit",

    "@media (min-width: 481px)": {
      borderRadius: "30px 0 0 30px",
    },
  },
}));

const mockdata = [
  { label: "Profile", icon: <IconUser />, link: "/user" },
  { label: "Addresses", icon: <IconAddressBook />, link: "/user/address" },
  { label: "Purchases", icon: <IconShoppingCart />, link: "/user/purchases" },
  { label: "Orders", icon: <IconTruck />, link: "/user/orders" },
  { label: "Reviews", icon: <IconNotes />, link: "/user/reviews" },
  { label: "Wishlist", icon: <IconHeart />, link: "/user/wishlist" },
  {
    label: "Update Password",
    icon: <IconRotateRectangle />,
    link: "/user/update-password",
  },
];

const UserSidebar = ({ location }) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const links = mockdata.map((item, index) => {
    return (
      <Group
        key={index}
        className={classes.link}
        component={Link}
        to={item.link}
        sx={{
          background: location === item.link ? "#228be6" : "",
          color: location === item.link ? "#fff" : "var(--prussian-blue-500)",
          cursor: "pointer",
        }}
      >
        <ThemeIcon sx={{ border: "none", color: "inherit" }} variant="outline">
          {item.icon}
        </ThemeIcon>
        <Text className={classes.link} to={item.link}>
          {item.label}
        </Text>
      </Group>
    );
  });

  return (
    <>
      <Button
        className={classes.btn}
        onClick={() => setOpened((prevState) => !prevState)}
        sx={{ marginBottom: "1rem" }}
      >
        Open
      </Button>
      <Stack
        className={`${classes.filterBar} ${opened ? classes.openSidebar : ""}`}
      >
        {links}
      </Stack>
    </>
  );
};

export default UserSidebar;
