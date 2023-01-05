import { Text, Timeline } from "@mantine/core";
import { IconBox, IconMessageDots, IconTruck } from "@tabler/icons";
import React from "react";

const OrderTimeline = ({ order }) => {
  return (
    <>
      {order.status === "paid" && (
        <>
          <Timeline
            my={32}
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
              bullet={<IconBox size={12} />}
              title="Preparing Order"
            >
              <Text color="dimmed" size="sm">
                The shop is preparing to ship your parcel
              </Text>
            </Timeline.Item>

            {order.status === "paid" && (
              <Timeline.Item
                title="Order On The Way"
                bullet={<IconTruck size={12} />}
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
        </>
      )}
    </>
  );
};

export default OrderTimeline;
