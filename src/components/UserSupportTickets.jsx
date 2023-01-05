import { Divider, Text } from "@mantine/core";
import React from "react";

const UserSupportTickets = () => {
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
          Submit a Ticket
        </Text>
      </div>

      <Divider mt={16} mb={32} />
    </>
  );
};

export default UserSupportTickets;
