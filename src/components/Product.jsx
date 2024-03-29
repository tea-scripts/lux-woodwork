import {
  Box,
  Card,
  Image,
  Text,
  Group,
  createStyles,
  Badge,
} from '@mantine/core';
import { formatPrice } from '../utils/helpers';

const useStyles = createStyles((theme) => ({
  product: {
    transition: 'all 0.2s ease-in-out',
    height: '100% !important',
    alignSelf: 'center',
    maxWidth: '300px',

    '&:hover': {
      boxShadow: theme.shadows.md,
      cursor: 'pointer',
    },
  },
  price: {
    fontSize: '.8rem',
  },

  card: {
    height: '100%',
  },
}));

const Product = ({ _id, name, images, priceWithVAT }) => {
  const { classes } = useStyles();
  const navigateToProduct = () => {
    window.location.href = `/products/${_id}`;
  };

  return (
    <Box onClick={navigateToProduct} className={classes.product}>
      <Card shadow="sm" p="lg" radius="md" withBorder className={classes.card}>
        <Card.Section>
          <Image src={images[0]} height={280} alt="Norway" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500} transform="capitalize">
            {name}
          </Text>

          <Badge color="pink" variant="light" className={classes.price}>
            {formatPrice(priceWithVAT)}
          </Badge>
        </Group>
      </Card>
    </Box>
  );
};
export default Product;
