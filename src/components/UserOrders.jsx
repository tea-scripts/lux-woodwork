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
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserOrders } from "../features/orders/orderSlice";
import { formatPrice } from "../utils/helpers";
import Loading from "./Loading";

const useStyles = createStyles((theme) => ({
  orderItem: {
    padding: "1rem",
    borderColor: "var(--prussian-blue-500)",
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
    color: "var(--prussian-blue-500)",
    maxWidth: 350,
    fontWeight: 500,
    fontSize: 16,

    "@media (min-width: 800px)": {
      marginBottom: "1rem",
      fontSize: 18,
      maxWidth: 450,
    },
  },
}));

const UserOrders = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { userOrders, isLoading, pages } = useSelector((state) => state.orders);
  const [activePage, setPage] = useState(1);

  const displayOrders = userOrders.map((order) => {
    return (
      <Paper
        key={order._id}
        className={classes.orderItem}
        shadow="xs"
        withBorder
      >
        <Container className={classes.header}>
          <Text className={classes.orderIdText}>Order ID: {order._id}</Text>
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
        </Container>
        <Divider my={10} />
        {order.orderItems.map((item) => {
          return (
            <Grid key={item._id} p="sm">
              <Grid.Col xs={12} sm={6}>
                <Paper
                  className={classes.imageContainer}
                  component={Link}
                  to={`/products/${item.product}`}
                >
                  <Image radius="md" src={item.image} alt="order item" />
                </Paper>
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text align="center">{item.name}</Text>
                  <div>
                    <Text weight={500} sx={{ color: "var(--hunter-green)" }}>
                      {formatPrice(item.price)}
                    </Text>
                    <Text align="right" sx={{ color: "var(--gray)" }}>
                      Qty: {item.quantity}
                    </Text>
                  </div>
                </Container>
              </Grid.Col>
            </Grid>
          );
        })}
        <Divider my={10} />
        <Container>
          <Group position="right">
            <Text sx={{ color: "var(--hunter-green)" }}>Total:</Text>
            <Text
              weight={600}
              sx={{ color: "var(--hunter-green)", fontSize: "1.2rem" }}
            >
              {formatPrice(order.total)}
            </Text>
          </Group>
          <Group position="right" mt={10}>
            <Button component={Link} to={`/user/orders/${order._id}`}>
              View Order
            </Button>
          </Group>
        </Container>
      </Paper>
    );
  });

  useEffect(() => {
    dispatch(fetchUserOrders(activePage));
  }, [activePage]);

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
