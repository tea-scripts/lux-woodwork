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
  Stepper,
  Text,
  Timeline,
} from "@mantine/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import {
  fetchOrder,
  cancelOrder,
  receiveOrder,
} from "../features/orders/orderSlice";
import { DateTime } from "luxon";
import { formatPrice } from "../utils/helpers";
import {
  IconArticle,
  IconCircleCheck,
  IconTruckDelivery,
  IconDownload,
  IconCash,
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
  IconCircleX,
  IconArrowBack,
  IconCheckupList,
} from "@tabler/icons";

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
  const { order, isLoading } = useSelector((state) => state.orders);
  const date = DateTime.fromISO(order.createdAt);
  const readableDate = date.toLocaleString(DateTime.DATETIME_MED);
  const expiryDate = DateTime.fromISO(order.expiryDate);
  const expiryDateReadable = expiryDate.toLocaleString(DateTime.DATETIME_MED);
  const paidDate = DateTime.fromISO(order.updatedAt);
  const updatedDateReadable = paidDate.toLocaleString(DateTime.DATETIME_MED);

  const receive = () => {
    dispatch(receiveOrder(order._id));
    setTimeout(() => {
      dispatch(fetchOrder(id));
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchOrder(id));
    }, 500);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Text
        sx={{
          color: "var(--prussian-blue-500)",
          fontSize: "1.1rem",
          fontWeight: 500,
        }}
      >
        Order Details
      </Text>

      <Divider my={16} />

      <Text weight={500} mb={20} color="gray">
        Order ID: {order._id}
      </Text>

      <Text mb={20} weight={500} color="gray">
        Order Created: {readableDate}
      </Text>

      <Text weight={500} color="gray">
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

      <Divider my={16} />

      {order.status === "pending" && (
        <Text weight={500} color="gray">
          Pay Before: {expiryDateReadable}
        </Text>
      )}

      {order.status === "cancelled" ? (
        <Stepper active={2} breakpoint="md" my={32} color="red">
          <Stepper.Step
            icon={<IconArticle size={18} />}
            label="Step 1"
            description="Order Placed"
            completedIcon={<IconCircleCheck />}
          />
          <Stepper.Step
            icon={<IconCash size={18} />}
            label="Step 2"
            description="Order Cancelled"
            completedIcon={<IconCircleX />}
          />
        </Stepper>
      ) : (
        <Stepper
          active={
            order.isReceived
              ? 4
              : order.isShipped
              ? 3
              : order.status === "paid"
              ? 2
              : order.status === "pending"
              ? 1
              : 0
          }
          breakpoint="md"
          my={32}
          color="green"
        >
          <Stepper.Step
            icon={<IconArticle size={18} />}
            label="Step 1"
            description="Order Placed"
            completedIcon={<IconArticle />}
          />
          <Stepper.Step
            icon={<IconCash size={18} />}
            label="Step 2"
            description="Payment Confirmed"
            completedIcon={<IconCash />}
          />
          <Stepper.Step
            icon={<IconTruckDelivery size={18} />}
            label="Step 3"
            description="Order Shipped Out"
            completedIcon={<IconTruckDelivery />}
          />
          <Stepper.Step
            icon={<IconDownload size={18} />}
            label="Step 4"
            description="Order Received"
            completedIcon={<IconDownload />}
          />
        </Stepper>
      )}

      <Divider my={16} />

      {order.orderItems?.map((item) => {
        return (
          <Grid key={item._id} p="sm">
            <Grid.Col
              xs={12}
              sm={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Paper
                className={classes.imageContainer}
                component={Link}
                to={`/products/${item.product}`}
              >
                <Image radius="md" src={item.image} alt="order item" />
              </Paper>
              {order.status === "paid" && (
                <Button
                  mt={8}
                  component={Link}
                  to={`/review-product/${item.product}`}
                  leftIcon={<IconCheckupList />}
                >
                  Review Product
                </Button>
              )}
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

      <Grid my={32}>
        <Grid.Col xs={12} sm={6}>
          <div>
            <Container
              mb={16}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text
                size={20}
                weight={500}
                sx={{ color: "var(--prussian-blue-500)" }}
              >
                Delivery Address
              </Text>
            </Container>

            <Container mb={5}>
              <Text sx={{ color: "var(--gray)", maxWidth: "380px" }}>
                {order.shippingAddress?.street},{" "}
                {order.shippingAddress?.barangay}, {order.shippingAddress?.city}
                , {order.shippingAddress?.province},{" "}
                {order.shippingAddress?.region}, {order.shippingAddress?.zip}
              </Text>
            </Container>
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <div>
            <Container
              mb={16}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text
                size={20}
                weight={500}
                sx={{ color: "var(--prussian-blue-500)" }}
              >
                Tracking Details
              </Text>
            </Container>

            {order.status === "paid" && (
              <Timeline
                active={
                  order.isDelivered
                    ? 2
                    : order.isShipped
                    ? 1
                    : order.status === "paid"
                    ? 0
                    : 0
                }
                bulletSize={24}
                lineWidth={2}
              >
                <Timeline.Item
                  bullet={<IconGitBranch size={12} />}
                  title="Preparing Order"
                >
                  <Text color="dimmed" size="sm">
                    The shop is preparing to ship your parcel
                  </Text>
                </Timeline.Item>

                {order.status === "paid" && (
                  <Timeline.Item
                    title="Order On The Way"
                    bullet={<IconGitPullRequest size={12} />}
                  >
                    <Text color="dimmed" size="sm">
                      Parcel is out for delivery
                    </Text>
                  </Timeline.Item>
                )}

                {order.isShipped && (
                  <Timeline.Item
                    title="Order Delivered"
                    bullet={<IconMessageDots size={12} />}
                  >
                    <Text color="dimmed" size="sm">
                      Parcel has been delivered
                    </Text>
                  </Timeline.Item>
                )}
              </Timeline>
            )}
          </div>
        </Grid.Col>
      </Grid>

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
            Pay Now
          </Button>
        </Group>
      )}

      {order.isDelivered && !order.isReceived && (
        <Group position="right" mt={20}>
          <Button onClick={receive}>Order Received</Button>
        </Group>
      )}
    </Container>
  );
};

export default SingleOrder;
