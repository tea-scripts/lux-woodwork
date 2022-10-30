import {
  Button,
  Group,
  Stack,
  Text,
  Divider,
  createStyles,
  Paper,
  Image,
  Container,
  Grid,
  Badge,
  Pagination,
  NativeSelect,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserOrders } from "../features/orders/orderSlice";
import { formatPrice } from "../utils/helpers";
import Loading from "./Loading";
import { setUserOrdersQueryType } from "../features/orders/orderSlice";
import { DateTime } from "luxon";
import { IconEye } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  orderItem: {
    padding: "1rem",
  },
  imageContainer: {
    width: "100%",

    "@media (min-width: 800px)": {
      width: 200,
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",

    "@media (min-width: 800px)": {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  orderIdText: {
    maxWidth: 350,
    fontWeight: 500,
    fontSize: 16,

    "@media (min-width: 800px)": {
      marginBottom: "1rem",
      fontSize: 18,
      maxWidth: 450,
    },
  },

  image: {
    "@media (min-width: 800px)": {
      width: 250,
      height: 180,
    },
  },
}));

const UserOrders = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { userOrders, isLoading, pages, userOrdersQueryType } = useSelector(
    (state) => state.orders
  );
  const [activePage, setPage] = useState(1);
  const [currOrderQueryType, setCurrOrderQueryType] =
    useState(userOrdersQueryType);

  const displayOrders = userOrders.map((order) => {
    const date = DateTime.fromISO(order.createdAt);
    const readableDate = date.toLocaleString(DateTime.DATETIME_MED);
    return (
      <Paper
        key={order._id}
        className={classes.orderItem}
        shadow="xs"
        withBorder
      >
        <Container className={classes.header}>
          <Text color="gray" size="sm">
            Order ID: {order._id}
          </Text>
          <Text color="gray" size="sm">
            Order Date: {readableDate}
          </Text>
          <Group>
            <Badge
              radius="xs"
              color={
                order.status === "paid"
                  ? "green"
                  : order.status === "pending"
                  ? "yellow"
                  : "red"
              }
              variant="filled"
            >
              {order.status === "paid"
                ? "Paid"
                : order.status === "pending"
                ? "Pending"
                : "Cancelled"}
            </Badge>
            {order.isDelivered && (
              <Badge radius="xs" color="green" variant="filled">
                Delivered
              </Badge>
            )}
          </Group>
        </Container>

        <Divider my={16} />

        <Grid key={order._id} p="sm">
          <Grid.Col xs={12} sm={6}>
            <Paper className={classes.imageContainer}>
              <Image
                radius="md"
                src={order.orderItems[0].image}
                alt="order item"
              />
            </Paper>
          </Grid.Col>
          <Grid.Col
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Group position="center">
                <Text sx={{ color: "var(--hunter-green)" }}>Total:</Text>
                <Text
                  weight={600}
                  sx={{ color: "var(--hunter-green)", fontSize: "1.2rem" }}
                >
                  {formatPrice(order.total)}
                </Text>
              </Group>
              <Group position="center" mt={10}>
                <Button
                  fullWidth
                  component={Link}
                  to={`/user/orders/${order._id}`}
                  leftIcon={<IconEye />}
                >
                  View Order
                </Button>
              </Group>
            </Container>
          </Grid.Col>
        </Grid>
      </Paper>
    );
  });

  useEffect(() => {
    dispatch(fetchUserOrders(activePage));
    if (currOrderQueryType !== userOrdersQueryType) {
      setCurrOrderQueryType(userOrdersQueryType);
      setPage(1);
    }
  }, [activePage, userOrdersQueryType]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          sx={{
            color: "var(--prussian-blue-500)",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
        >
          My Orders
        </Text>
      </div>

      <Divider mt={16} mb={32} />

      <Group position="right" mb={16}>
        <NativeSelect
          value={userOrdersQueryType}
          onChange={(event) =>
            dispatch(setUserOrdersQueryType(event.currentTarget.value))
          }
          data={["All", "Pending", "Paid", "Delivered", "Cancelled"]}
        />
      </Group>

      <Stack spacing={32}>{displayOrders}</Stack>

      {pages > 1 && (
        <Group position="right" mt={32}>
          <Pagination page={activePage} onChange={setPage} total={pages} />
        </Group>
      )}
    </>
  );
};

export default UserOrders;
