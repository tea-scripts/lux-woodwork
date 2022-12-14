import {
  Box,
  Container,
  Title,
  SimpleGrid,
  createStyles,
  Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import Loading from './Loading';

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
  const { products, isLoading } = useSelector((state) => state.products);

  const filteredProducts = products
    .filter(
      (product) =>
        product.featured && product.displayProduct && product.inventory > 0
    )
    .splice(0, 3);

  if (isLoading) {
    return <Loading />;
  }

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
            { minWidth: 992, cols: filteredProducts.length < 3 ? 2 : 3 },
          ]}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
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
