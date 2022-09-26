import { Button } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: 'calc(100vh - 5rem - 15.6rem)',
    display: 'grid',
    placeItems: 'center',
    width: '90vw',
    margin: ' 0 auto',
    maxWidth: 1200,
  },
}));

const SingleProduct = () => {
  const { classes } = useStyles();
  const { id } = useParams();

  return (
    <section className={classes.wrapper}>
      <h1>Single Product Page</h1>
      <h2>{id}</h2>
      <Button component={Link} to="/products">
        Back to Products
      </Button>
    </section>
  );
};

export default SingleProduct;
