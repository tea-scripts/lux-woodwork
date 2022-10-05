import { Badge, Group, Paper, Table, Text } from "@mantine/core";
import React from "react";

const data = [
  {
    id: 1,
    first_name: "Vaclav",
    last_name: "Knowlson",
    email: "vknowlson0@imdb.com",
    phone: "5026791147",
    status: "Pending",
    date_delivered: "11/7/2021",
  },
  {
    id: 2,
    first_name: "Timotheus",
    last_name: "Boothman",
    email: "tboothman1@hc360.com",
    phone: "8075634500",
    status: "Pending",
    date_delivered: "2/10/2022",
  },
  {
    id: 3,
    first_name: "Lola",
    last_name: "Barenski",
    email: "lbarenski2@wikia.com",
    phone: "9976610055",
    status: "Delivered",
    date_delivered: "10/26/2021",
  },
  {
    id: 4,
    first_name: "Lizbeth",
    last_name: "Dinse",
    email: "ldinse3@amazon.co.jp",
    phone: "5195858879",
    status: "Delivered",
    date_delivered: "9/5/2022",
  },
  {
    id: 5,
    first_name: "Lona",
    last_name: "Pring",
    email: "lpring4@squidoo.com",
    phone: "9986104020",
    status: "Delivered",
    date_delivered: "9/9/2022",
  },
  {
    id: 6,
    first_name: "Gabi",
    last_name: "Fruen",
    email: "gfruen5@nydailynews.com",
    phone: "5243622209",
    status: "Pending",
    date_delivered: "10/28/2021",
  },
  {
    id: 7,
    first_name: "Martina",
    last_name: "Lukash",
    email: "mlukash6@mit.edu",
    phone: "1716320702",
    status: "Delivered",
    date_delivered: "10/8/2021",
  },
  {
    id: 8,
    first_name: "Jennette",
    last_name: "Sans",
    email: "jsans7@oakley.com",
    phone: "8853637109",
    status: "Pending",
    date_delivered: "10/13/2021",
  },
  {
    id: 9,
    first_name: "Leonerd",
    last_name: "Boxer",
    email: "lboxer8@comsenz.com",
    phone: "9175152371",
    status: "Delivered",
    date_delivered: "10/13/2021",
  },
  {
    id: 10,
    first_name: "Julianne",
    last_name: "Tunno",
    email: "jtunno9@telegraph.co.uk",
    phone: "1576297459",
    status: "Pending",
    date_delivered: "3/13/2022",
  },
  {
    id: 11,
    first_name: "Eldin",
    last_name: "Malt",
    email: "emalta@123-reg.co.uk",
    phone: "9636368703",
    status: "Delivered",
    date_delivered: "6/8/2022",
  },
];
const AdminOrders = () => {
  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>
        {element.first_name} {element.last_name}
      </td>
      <td>{element.email}</td>
      <td>{element.phone}</td>
      <td>
        {element.status === "Delivered" ? (
          <Badge color="green">Delivered</Badge>
        ) : (
          <Badge color="gray">Pending</Badge>
        )}
      </td>
      <td>{element.status === "Pending" ? "" : element.date_delivered}</td>
    </tr>
  ));

  return (
    <Paper sx={{ width: "100%", padding: "1rem" }}>
      <Group>
        <Text sx={{ fontSize: "2rem", fontWeight: 500 }}>Orders List</Text>
      </Group>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Date Delivered</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
};

export default AdminOrders;
