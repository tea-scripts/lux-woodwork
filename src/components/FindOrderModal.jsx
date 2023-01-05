import { Box, Button, Divider, Modal, Text, TextInput } from "@mantine/core";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchOrder, resetOrder } from "../features/orders/orderSlice";
import { formatPrice } from "../utils/helpers";
import OrderStepper from "./OrderStepper";
import OrderTimeline from "./OrderTimeline";

const FindOrderModal = ({ opened, setOpened }) => {
  const dispatch = useDispatch();
  const { isFetchingOrder, order } = useSelector((state) => state.orders);
  const [orderId, setOrderId] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const expiryDate = DateTime.fromISO(order.expiryDate);
  const expiryDateReadable = expiryDate.toLocaleString(DateTime.DATETIME_MED);

  useEffect(() => {
    dispatch(resetOrder());
  }, [dispatch, opened]);

  function isValidHexString(str) {
    const hexRegex = /^[0-9a-f]{24}$/i;
    return hexRegex.test(str);
  }

  const handleFindOrder = () => {
    const isValidHex = isValidHexString(orderId);

    if (!isValidHex) {
      toast.error("Invalid order ID");
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false);
    dispatch(fetchOrder(orderId));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Find an Order"
      size={Object.keys(order).length > 0 ? "xl" : "sm"}
      centered
    >
      <TextInput
        placeholder="Enter the order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.currentTarget.value)}
        error={isInvalid ? "Invalid order ID" : ""}
        withAsterisk
      />
      <Button
        mt={8}
        fullWidth
        onClick={handleFindOrder}
        loading={isFetchingOrder}
      >
        Submit
      </Button>

      {Object.keys(order).length > 0 && (
        <>
          <Divider my={16} />

          <Text
            sx={{
              color: "var(--prussian-blue-500)",
              fontSize: "1.1rem",
              fontWeight: 500,
            }}
          >
            Order Status
          </Text>

          <OrderStepper order={order} />

          {order.status === "pending" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Text weight={500} color="orange" fw="bold">
                Please pay before {expiryDateReadable}.
              </Text>
            </Box>
          ) : order.status === "cancelled" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Text weight={500} color="red" fw="bold">
                This order has been cancelled.
              </Text>
            </Box>
          ) : null}

          {order.status === "paid" && (
            <Text
              sx={{
                color: "var(--prussian-blue-500)",
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              Tracking Details
            </Text>
          )}

          <OrderTimeline order={order} />

          {order.status === "paid" && (
            <>
              {!order.isDelivered ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    sx={{ color: "var(--hunter-green)", maxWidth: 400 }}
                    mr={8}
                    align="center"
                    mb={8}
                    fw="bold"
                  >
                    Please wait for the parcel to be delivered and prepare to
                    pay the following amount
                  </Text>
                  <Text
                    weight={600}
                    sx={{ color: "var(--hunter-green)", fontSize: "1.2rem" }}
                    align="center"
                  >
                    {formatPrice(order.total)}
                  </Text>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text sx={{ color: "var(--hunter-green)" }} mr={8} fw="bold">
                    This order has been delivered. Thank you for your purchase!
                  </Text>
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default FindOrderModal;
