import {
  Badge,
  Button,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { fetchOrder, cancelOrder } from "../features/orders/orderSlice";
import { DateTime } from "luxon";
import { formatPrice } from "../utils/helpers";

const useStyles = createStyles((theme) => ({
  imageContainer: {
    width: "100%",

    "@media (min-width: 1026px)": {
      width: 300,
    },
  },
  orderIdText: {
    color: "var(--prussian-blue-500)",
    maxWidth: 350,
    fontWeight: 500,
    fontSize: 16,

    "@media (min-width: 800px)": {
      marginBottom: "1rem",
      fontSize: 24,
      maxWidth: 600,
    },
  },
}));

const SingleOrder = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, isLoading, orders } = useSelector((state) => state.orders);
  const date = DateTime.fromISO(order.createdAt);
  const readableDate = date.toLocaleString(DateTime.DATETIME_MED);
  const expiryDate = DateTime.fromISO(order.expiryDate);
  const expiryDateReadable = expiryDate.toLocaleString(DateTime.DATETIME_MED);
  const paidDate = DateTime.fromISO(order.updatedAt);
  const updatedDateReadable = paidDate.toLocaleString(DateTime.DATETIME_MED);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  console.log(order);

  return (
    <Container>
      <Button component={Link} to="/user/orders" mb={32}>
        Back to orders
      </Button>
      <Text size={26} weight={500} mb={20} className={classes.orderIdText}>
        Order ID: {order._id}
      </Text>
      <Text mb={20} weight={500} sx={{ color: "var(--gray)" }}>
        Status:{" "}
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
      </Text>

      <Text mb={20}>
        <span weight={500} style={{ color: "var(--gray)" }}>
          Order Created:
        </span>{" "}
        {readableDate}
      </Text>

      <Text>
        <span weight={500} style={{ color: "var(--gray)" }}>
          {order.status === "paid"
            ? "Order Paid: "
            : order.status === "pending"
            ? "Pay before: "
            : "Order Cancelled: "}
        </span>
        {order.status === "pending" ? expiryDateReadable : updatedDateReadable}
      </Text>

      <Divider my={20} />

      {order.orderItems?.map((item) => {
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
                  <Text align="right" sx={{ color: "#C0C0C0" }}>
                    Qty: {item.quantity}
                  </Text>
                </div>
              </Container>
            </Grid.Col>
          </Grid>
        );
      })}

      <Divider my={20} />

      <Container
        mb={10}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text size={20} weight={500} sx={{ color: "var(--prussian-blue-500)" }}>
          Order Summary
        </Text>
      </Container>

      <Container
        mb={5}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text weight={500} size={18} sx={{ color: "var(--gray)" }}>
          Subtotal
        </Text>
        <Text
          weight={500}
          align="right"
          size={18}
          sx={{ color: "var(--gray)" }}
        >
          {formatPrice(order.subtotal)}
        </Text>
      </Container>

      <Container
        mb={5}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text size={16} sx={{ color: "var(--gray)" }}>
          Shipping Free
        </Text>
        <Text align="right" size={16} sx={{ color: "var(--gray)" }}>
          {formatPrice(order.shippingFee)}
        </Text>
      </Container>

      <Container
        mb={5}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text size={16} sx={{ color: "var(--gray)" }}>
          Tax
        </Text>
        <Text align="right" size={16} sx={{ color: "var(--gray)" }}>
          {formatPrice(order.tax)}
        </Text>
      </Container>

      <Container
        mb={5}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text weight={500} size={18} sx={{ color: "var(--gray)" }}>
          Total
        </Text>
        <Text
          weight={500}
          align="right"
          size={22}
          sx={{ color: "var(--hunter-green)" }}
        >
          {formatPrice(order.total)}
        </Text>
      </Container>

      {order.status === "pending" && (
        <Group position="right" mt={20}>
          <Button
            variant="subtle"
            onClick={() => {
              dispatch(cancelOrder(order._id));
              navigate("/user/orders");
            }}
          >
            Cancel Order
          </Button>
          <Button onClick={() => navigate(`/update-order/${order._id}`)}>
            Proceed to checkout
          </Button>
        </Group>
      )}
    </Container>
  );
};

export default SingleOrder;
