import { ActionIcon, Badge, Group, Paper, Table, Text } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { IconArchive, IconSquareCheck, IconTrashX } from "@tabler/icons";
import {
  archiveOrder,
  changePage,
  deleteOrder,
  fetchAllOrders,
  setOrderValues,
  togggleActionConfirmModal,
  toggleOrderView,
} from "../features/orders/orderSlice";
import ViewOrderModal from "./ViewOrderModal";
import PaginationButtons from "./PaginationButtons";
import { useEffect } from "react";
import Loading from "./Loading";
import { useState } from "react";
import ActionConfirmationModal from "./ActionConfirmationModal";

const AdminShipment = () => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);
  const {
    shippedOrders,
    totalPages,
    page,
    isLoading,
    totalShippedOrders,
    actionConfirmModal,
  } = useSelector((state) => state.orders);

  const rows = shippedOrders
    .filter((order) => order.isShipped)
    .map((order) => {
      const { _id, user, status, createdAt } = order;
      return (
        <tr key={_id}>
          <td>{_id}</td>
          <td>
            {user.first_name} {user.last_name}
          </td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>
            {status === "paid" ? (
              <Badge color="green">Paid</Badge>
            ) : status === "cancelled" ? (
              <Badge color="red">Cancelled</Badge>
            ) : (
              <Badge color="yellow">Pending</Badge>
            )}
          </td>
          <td>
            {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_MED)}
          </td>
          <td>
            <Group spacing={5}>
              <ActionIcon
                color="green"
                onClick={() => {
                  dispatch(toggleOrderView());
                  dispatch(setOrderValues(order));
                }}
              >
                <IconSquareCheck size={15} />
              </ActionIcon>

              <ActionIcon
                color="red"
                onClick={() => dispatch(deleteOrder(_id))}
              >
                <IconTrashX size={15} />
              </ActionIcon>

              <ActionIcon
                onClick={() => {
                  dispatch(togggleActionConfirmModal());
                  setItemId(_id);
                }}
              >
                <IconArchive size={15} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      );
    });

  useEffect(() => {
    dispatch(fetchAllOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dispatch]);

  return (
    <Paper sx={{ width: "100%", padding: "0 1rem" }}>
      <Group>
        <Text
          sx={{
            fontSize: "1.3rem",
            color: "var(--prussian-blue-500)",
            fontSize: "1.3rem",
            paddingTop: 5,
            marginBottom: "2rem",
          }}
        >
          Shipped Orders
        </Text>
      </Group>

      <ViewOrderModal />
      <ActionConfirmationModal
        onOk={archiveOrder}
        onCancel={togggleActionConfirmModal}
        visible={actionConfirmModal}
        _id={itemId}
      />

      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loading />
        </div>
      ) : (
        <Table highlightOnHover striped captionSide="bottom">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <caption>{totalShippedOrders} orders found.</caption>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7}>No orders found</td>
              </tr>
            ) : (
              rows
            )}
          </tbody>
        </Table>
      )}
      {totalPages > 1 && (
        <PaginationButtons
          changePage={changePage}
          totalPages={totalPages}
          page={page}
          isLoading={isLoading}
        />
      )}
    </Paper>
  );
};

export default AdminShipment;
