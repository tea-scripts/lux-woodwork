import { Button, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
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

const Products = () => {
  const { classes } = useStyles();

  return (
    <section className={classes.wrapper}>
      <Title order={2}>Welcome to our store</Title>
      <Button component={Link} to="/">
        Back to Home
      </Button>
    </section>
  );
};

export default Products;
