import { Group, Paper, Table, Text } from "@mantine/core";
import React from "react";

const data = [
  {
    id: 1,
    title: "Sunflower Seed Raw",
    stock: 20,
    price: "₱15875.62",
    brand: "Ursodiol",
    category: "Overhead Doors",
  },
  {
    id: 2,
    title: "Honey - Lavender",
    stock: 78,
    price: "₱32911.65",
    brand: "Apricot",
    category: "Retaining Wall and Brick Pavers",
  },
  {
    id: 3,
    title: "Clam Nectar",
    stock: 45,
    price: "₱99366.10",
    brand: "Keystone",
    category: "Fire Sprinkler System",
  },
  {
    id: 4,
    title: "Sauce - Roasted Red Pepper",
    stock: 63,
    price: "₱62928.70",
    brand: "COUMADIN",
    category: "Retaining Wall and Brick Pavers",
  },
  {
    id: 5,
    title: "Vinegar - White",
    stock: 68,
    price: "₱72662.77",
    brand: "Hydrochlorothiazide",
    category: "Site Furnishings",
  },
  {
    id: 6,
    title: "Wine - Duboeuf Beaujolais",
    stock: 86,
    price: "₱13240.67",
    brand: "Amoebatox",
    category: "Soft Flooring and Base",
  },
  {
    id: 7,
    title: "Veal - Insides, Grains",
    stock: 35,
    price: "₱72662.59",
    brand: "Docetaxel",
    category: "Plumbing & Medical Gas",
  },
  {
    id: 8,
    title: "Wine - Red, Harrow Estates, Cab",
    stock: 58,
    price: "₱25445.09",
    brand: "APIS MELLIFICA",
    category: "EIFS",
  },
  {
    id: 9,
    title: "Wine - Maipo Valle Cabernet",
    stock: 24,
    price: "₱58361.58",
    brand: "Witch Hazel",
    category: "Fire Sprinkler System",
  },
  {
    id: 10,
    title: "Sorrel - Fresh",
    stock: 47,
    price: "₱86894.07",
    brand: "SKIN LIGHTENING COMPLEX",
    category: "Rebar & Wire Mesh Install",
  },
  {
    id: 11,
    title: "Syrup - Monin - Granny Smith",
    stock: 15,
    price: "₱75332.59",
    brand: "Quetiapine fumarate",
    category: "Masonry",
  },
  {
    id: 12,
    title: "Wine - White, Pinot Grigio",
    stock: 54,
    price: "₱73637.07",
    brand: "NeutrapHorus Rex",
    category: "Asphalt Paving",
  },
  {
    id: 13,
    title: "Water - Aquafina Vitamin",
    stock: 24,
    price: "₱50524.32",
    brand: "BLATELLA GERMANICA",
    category: "Painting & Vinyl Wall Covering",
  },
];

const AdminViewProducts = () => {
  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.title}</td>
      <td>{element.stock}</td>
      <td>{element.price}</td>
      <td>{element.brand}</td>
      <td>{element.category}</td>
    </tr>
  ));

  return (
    <Paper sx={{ width: "100%", padding: "1rem" }}>
      <Group>
        <Text sx={{ fontSize: "2rem", fontWeight: 500 }}>Products List</Text>
      </Group>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
};

export default AdminViewProducts;
