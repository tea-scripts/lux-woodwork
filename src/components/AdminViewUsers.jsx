import { Group, Paper, Table, Text } from "@mantine/core";
import React from "react";

const data = [
  {
    id: 1,
    first_name: "Vilma",
    last_name: "Raison",
    email: "vraison0@wikimedia.org",
    phone: "8953863627",
  },
  {
    id: 2,
    first_name: "Leroy",
    last_name: "Riddett",
    email: "lriddett1@scribd.com",
    phone: "3544212774",
  },
  {
    id: 3,
    first_name: "Dean",
    last_name: "Navein",
    email: "dnavein2@wikipedia.org",
    phone: "1513888017",
  },
  {
    id: 4,
    first_name: "Felipe",
    last_name: "Laidlaw",
    email: "flaidlaw3@bloglines.com",
    phone: "5409970589",
  },
  {
    id: 5,
    first_name: "Anallise",
    last_name: "Fernehough",
    email: "afernehough4@etsy.com",
    phone: "3978823918",
  },
  {
    id: 6,
    first_name: "Franni",
    last_name: "Tegeller",
    email: "ftegeller5@indiegogo.com",
    phone: "2029928582",
  },
  {
    id: 7,
    first_name: "Ursuline",
    last_name: "Sambells",
    email: "usambells6@bravesites.com",
    phone: "2412851040",
  },
  {
    id: 8,
    first_name: "Lesya",
    last_name: "Rogger",
    email: "lrogger7@goo.gl",
    phone: "8573199447",
  },
  {
    id: 9,
    first_name: "Winfred",
    last_name: "Pickover",
    email: "wpickover8@wikispaces.com",
    phone: "5613205644",
  },
  {
    id: 10,
    first_name: "Adena",
    last_name: "Dowding",
    email: "adowding9@usda.gov",
    phone: "9404983998",
  },
  {
    id: 11,
    first_name: "Rachelle",
    last_name: "Djuricic",
    email: "rdjuricica@devhub.com",
    phone: "5828400633",
  },
  {
    id: 12,
    first_name: "Ariel",
    last_name: "Gossan",
    email: "agossanb@reverbnation.com",
    phone: "3552061019",
  },
  {
    id: 13,
    first_name: "Crystie",
    last_name: "Barbrook",
    email: "cbarbrookc@360.cn",
    phone: "8577344830",
  },
];

const AdminViewUsers = () => {
  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>
        {element.first_name} {element.last_name}
      </td>
      <td>{element.email}</td>
      <td>{element.phone}</td>
    </tr>
  ));

  return (
    <Paper sx={{ width: "100%", padding: "1rem" }}>
      <Group>
        <Text sx={{ fontSize: "2rem", fontWeight: 500 }}>Users List</Text>
      </Group>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
};

export default AdminViewUsers;
