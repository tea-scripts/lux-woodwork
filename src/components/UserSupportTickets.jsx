import { Tabs, Space } from "@mantine/core";
import SubmitTicket from "./SubmitTicket";
import ViewTickets from "./ViewTickets";

const UserSupportTickets = () => {
  return (
    <Tabs defaultValue="submit" variant="outline" keepMounted={false}>
      <Tabs.List>
        <Tabs.Tab value="submit">Submit a ticket</Tabs.Tab>
        <Tabs.Tab value="view">View tickets</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="submit" pt="xs">
        <Space mt={16} />
        <SubmitTicket />
      </Tabs.Panel>

      <Tabs.Panel value="view" pt="xs">
        <Space mt={16} />
        <ViewTickets />
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserSupportTickets;
