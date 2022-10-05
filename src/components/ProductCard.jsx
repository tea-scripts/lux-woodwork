import styled from 'styled-components';
import {
  Card,
  Text,
  Group,
  createStyles,
  ActionIcon,
  Transition,
  Badge,
  Image,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconSearch, IconShoppingCartPlus } from '@tabler/icons';
import { useHover } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { formatPrice } from '../utils/helpers';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  horizontalWrapper: {
    display: 'flex',
  },

  imageContainer: {
    position: 'relative',
  },

  btnContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    zIndex: 11,
  },

  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.6)',
    position: 'absolute',
    zIndex: 10,
  },

  productBtn: {
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

/*
 * @param product - product object {id, title, description, price, images, featured}
 * @param horizontal - boolean, determines if card is horizontal or vertical
 * @param height - number, height of the image
 */
const ProductCard = ({ product, height = 200, horizontal = false }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { hovered, ref } = useHover();

  return (
    <Card
      className={horizontal ? classes.horizontalWrapper : classes.wrapper}
      shadow="sm"
      radius="md"
      p={0}
      ref={ref}
      withBorder
    >
      {/* Image */}
      <Card.Section className={classes.imageContainer}>
        <Transition
          mounted={hovered}
          transition="fade"
          duration={50}
          timingFunction="ease"
        >
          {(styles) => (
            <>
              <div className={classes.overlay}></div>
              <Group className={classes.btnContainer}>
                <ActionIcon
                  type="button"
                  color="blue"
                  variant="filled"
                  component={Link}
                  to={`/products/${product.id}`}
                  radius="50%"
                  size="lg"
                  className={classes.productBtn}
                >
                  <IconSearch size={18} />
                </ActionIcon>
                <ActionIcon
                  type="button"
                  color="blue"
                  variant="filled"
                  radius="50%"
                  size="lg"
                  className={classes.productBtn}
                  component={Link}
                  to="/cart"
                  onClick={() =>
                    dispatch(
                      addToCart({ id: product.id, quantity: 1, ...product })
                    )
                  }
                >
                  <IconShoppingCartPlus size={18} />
                </ActionIcon>
              </Group>
            </>
          )}
        </Transition>

        <InnerImageContainer height={height}>
          <Image
            src={product.images[0]}
            alt={product.title}
            height={horizontal ? 200 : height}
            width={horizontal ? 300 : '100%'}
            fit="cover"
          />
        </InnerImageContainer>
      </Card.Section>

      {/* Details */}
      <div
        className={horizontal ? classes.detailsContainer : ''}
        style={{ padding: '.5rem 1rem' }}
      >
        <Group>
          {product.featured && horizontal && (
            <Badge color="pink" variant="light">
              Featured
            </Badge>
          )}
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text
            weight={500}
            transform="capitalize"
            color={'var(--prussian-blue-500)'}
          >
            {product.title}
          </Text>
          {product.featured && !horizontal && (
            <Badge color="pink" variant="light">
              Featured
            </Badge>
          )}
        </Group>

        <Text color="dimmed">{formatPrice(product.price)}</Text>

        {horizontal && (
          <Text lineClamp={3} mt={5}>
            {product.description}
          </Text>
        )}
      </div>
    </Card>
  );
};

const InnerImageContainer = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.horizontal && 300};
`;

export default ProductCard;
