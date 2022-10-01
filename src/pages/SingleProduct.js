import { Button, Divider, Image } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { createStyles } from '@mantine/core';
import mockProducts from '../utils/mockProducts';
import { Carousel } from '@mantine/carousel';
import { formatPrice } from '../utils/helpers';
import AddToCart from '../components/AddToCart';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 'calc(100vh - (60px + 140px))',
    width: '90vw',
    margin: '2rem auto',
    maxWidth: 1200,

    a: {
      width: '200px',
      fontFamily: theme.fontFamily,
    },
  },

  carousel: {
    alignSelf: 'flex-start',
  },

  carouselControls: {
    marginTop: theme.spacing.xl,
  },

  carouselIndicator: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 0,
  },

  description: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizes.md - 1,
    lineHeight: 1.8,
    letterSpacing: 0.3,
  },

  product: {
    display: 'grid',
    marginTop: '2rem',
    gap: '3rem',

    img: {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
      objectFit: 'cover',
    },

    [`@media (min-width: 992px)`]: {
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      marginTop: '4rem',
    },
  },

  h4: {
    marginBottom: 0,
    fontFamily: theme.fontFamily,
  },

  info: {
    textTransform: 'capitalize',
    width: '300px',
    display: 'grid',
    gridTemplateColumns: '125px 1fr',
    fontFamily: theme.fontFamily,
    marginBottom: '.7rem',

    span: {
      fontWeight: 700,
    },

    [`@media (min-width: 992px)`]: {
      fontSize: '.9rem',
    },
  },

  content: {
    'h2, h5': {
      fontFamily: theme.fontFamily,
    },

    [`@media (min-width: 992px)`]: {
      h2: {
        marginBottom: '1rem',
      },

      h5: {
        fontSize: '1.2rem',
      },
    },
  },
}));

const SingleProduct = () => {
  const { classes } = useStyles();
  const { id } = useParams();

  const product = mockProducts.find((item) => item.id === Number(id));

  const slides = product.images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={400} />
    </Carousel.Slide>
  ));

  return (
    <section className={classes.wrapper}>
      <Button component={Link} to="/products">
        Back to Products
      </Button>
      <div className={classes.product}>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
        <section className={classes.content}>
          <h2>{product.title}</h2>
          <h5>{formatPrice(product.price)}</h5>
          <p className={classes.description}>{product.description}</p>

          <p className={classes.info}>
            <span>Available : </span>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <p className={classes.info}>
            <span>SKU : </span>
            {product.id}
          </p>
          <p className={classes.info}>
            <span>Brand : </span>
            {product.company || 'Ikea'}
          </p>
          <p className={classes.info}>
            <span>Category : </span>
            {product.category || 'Living Room'}
          </p>

          <Divider />

          {product.stock > 0 && <AddToCart product={product} />}
        </section>
      </div>
    </section>
  );
};

export default SingleProduct;
