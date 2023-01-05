import { Stepper, Text } from "@mantine/core";
import {
  IconArticle,
  IconCash,
  IconCircleCheck,
  IconCircleX,
  IconDownload,
  IconTruckDelivery,
} from "@tabler/icons";
import { DateTime } from "luxon";

const OrderStepper = ({ order }) => {
  return (
    <>
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
    </>
  );
};

export default OrderStepper;
