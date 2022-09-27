import { Box, Button, SimpleGrid } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { createStyles } from '@mantine/core';
import mockProducts from '../utils/mockProducts';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: 'calc(100vh - 5rem - 15.6rem)',
    display: 'grid',
    width: '90vw',
    margin: ' 0 auto',
    maxWidth: 1200,

    img: {
      width: '300px',
      height: '300px',
      objectFit: 'cover',
    },

    product: {
      display: 'flex',
    },

    h4: {
      marginBottom: 0,
    },

    a: {
      width: '200px',
    },
  },
}));

const SingleProduct = () => {
  const { classes } = useStyles();
  const { id } = useParams();

  const product = mockProducts.find((item) => item.id === Number(id));

  return (
    <section className={classes.wrapper}>
      <div className={classes.product}>
        <h4>{product.title}</h4>
        <img src={product.image} alt="" />
        <p>{product.description}</p>
      </div>
      <Button component={Link} to="/products">
        Back to Products
      </Button>
    </section>
  );
};

export default SingleProduct;
