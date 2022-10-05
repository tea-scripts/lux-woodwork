import {
  Badge,
  Button,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import image1 from "../assets/images/product-1.jpg";
import image2 from "../assets/images/product-7.jpg";
import image3 from "../assets/images/product-3.jpg";

const mockData = [
  {
    purchases: [
      {
        img: image1,
        title: "Product 1",
        qty: 1,
      },
      {
        img: image2,
        title: "Product 2",
        qty: 3,
      },
    ],
  },
  {
    purchases: [
      {
        img: image3,
        title: "Product 3",
        qty: 2,
      },
    ],
  },
];

const UserPurchases = () => {
  const displayPurchasedProducts = mockData.map((purchases) => {
    return (
      <Paper mb={20} p="md" shadow="sm" withBorder>
        <Group position="right" mb={20}>
          <Badge color="dark">Delivered</Badge>
        </Group>
        {purchases.purchases.map((item) => (
          <SimpleGrid
            breakpoints={[
              { minWidth: "xs", cols: 1 },
              { minWidth: "sm", cols: 4 },
            ]}
            mb={20}
          >
            <div>
              <Image fit="cover" radius="md" src={item.img} />
            </div>
            <Text
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.title}
            </Text>
            <Text
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              x{item.qty}
            </Text>
          </SimpleGrid>
        ))}
        <Group position="right" mt={20}>
          <Button>View Order Details</Button>
        </Group>
      </Paper>
    );
  });

  return (
    <>
      <Text sx={{ color: "#C0C0C0", fontSize: "1.1rem" }} mb={32}>
        My Purchases
      </Text>
      {displayPurchasedProducts}
    </>
  );
};

export default UserPurchases;
