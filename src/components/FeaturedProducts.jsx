import {
  Box,
  Container,
  Title,
  Card,
  Image,
  Text,
  Badge,
  Group,
  SimpleGrid,
  createStyles,
  Button,
} from '@mantine/core';
import featuredProducts from '../utils/mockProducts';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: '1.25rem',
  },

  heading: {
    marginBottom: '1.25rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',

    span: {
      color: theme.colors.pink[6],
      marginRight: '0.5rem',
    },
  },

  product: {
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
      boxShadow: theme.shadows.md,
    },
  },

  viewProductsBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.25rem',

    a: {
      background: theme.colors.pink[6],
      color: theme.colors.gray[0],

      padding: theme.spacing.xs + ' ' + theme.spacing.md,
      display: 'inline-block',
      borderRadius: '0.25rem',
      transition: 'all 0.3s ease-in-out',
      boxShadow: theme.shadows.sm,
      margin: '1rem auto',

      '&:hover': {
        boxShadow: theme.shadows.md,
        background: theme.colors.gray[0],
        color: theme.colors.pink[6],

        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          transform: 'translateY(-2px)',
        },
      },
    },
  },
}));

const FeaturedProducts = () => {
  const { classes } = useStyles();

  return (
    <Container size={1200}>
      <section className={classes.wrapper}>
        <Title order={2} className={classes.heading}>
          <span>Top Products</span>
          of the Week
        </Title>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: 678, cols: 2 },
            { minWidth: 992, cols: 3 },
          ]}
        >
          {featuredProducts.map((product) => (
            <Box
              component={Link}
              to={`products/${product.id}`}
              key={product.id}
              className={classes.product}
            >
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src={product.images[0]} height={280} alt="Norway" />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500} transform="capitalize">
                    {product.title}
                  </Text>
                  {product.featured && (
                    <Badge color="pink" variant="light">
                      Featured
                    </Badge>
                  )}
                </Group>

                <Text color="dimmed">{formatPrice(product.price)}</Text>
              </Card>
            </Box>
          ))}
        </SimpleGrid>
        <Box className={classes.viewProductsBtn}>
          <Button component={Link} to="/products" color="white">
            View All Products
          </Button>
        </Box>
      </section>
    </Container>
  );
};

export default FeaturedProducts;
