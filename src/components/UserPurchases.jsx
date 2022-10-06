import {
  Badge,
  Button,
  createStyles,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
} from '@mantine/core';
import image1 from '../assets/images/product-1.jpg';
import image2 from '../assets/images/product-7.jpg';
import image3 from '../assets/images/product-3.jpg';

const mockData = [
  {
    purchases: [
      {
        img: image1,
        title: 'Product 1',
        qty: 1,
      },
      {
        img: image2,
        title: 'Product 2',
        qty: 3,
      },
    ],
  },
  {
    purchases: [
      {
        img: image3,
        title: 'Product 3',
        qty: 2,
      },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  imageContainer: {
    // width: 250,

    '@media (min-width: 481px)': {
      width: 200,
    },
  },
  addressItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',

    '@media (min-width: 481px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
}));

const UserPurchases = () => {
  const { classes } = useStyles();

  const displayPurchasedProducts = mockData.map((purchases, index) => {
    return (
      <Paper key={index} shadow="sm" p="xl" mb={20} withBorder>
        <Group position="right" mb={20}>
          <Badge color="dark">Delivered</Badge>
        </Group>
        {purchases.purchases.map((item, index) => (
          <Group mb={20}>
            <SimpleGrid
              breakpoints={[
                { minWidth: 'xs', cols: 1 },
                { minWidth: 'sm', cols: 3 },
              ]}
              key={index}
            >
              <div className={classes.imageContainer}>
                <Image radius="md" src={item.img} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.qty}
              </div>
            </SimpleGrid>
          </Group>
        ))}
        <Group position="right" mt={20}>
          <Button>View Details</Button>
        </Group>
      </Paper>
    );
  });

  return (
    <>
      <Text sx={{ color: '#C0C0C0', fontSize: '1.1rem' }} mb={32}>
        My Purchases
      </Text>

      {displayPurchasedProducts}
    </>
  );
};

export default UserPurchases;
