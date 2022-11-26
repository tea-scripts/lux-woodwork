import {
  ActionIcon,
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Overlay,
  Text,
  Tooltip,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import {
  IconGift,
  IconSearch,
  IconShoppingCartPlus,
  IconTrash,
} from '@tabler/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import {
  addWishlistItem,
  deleteWishlistItem,
} from '../features/wishlist/wishlistSlice';
import { formatPrice } from '../utils/helpers';

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    maxWidth: 360,
  },
  imageContainer: {
    position: 'relative',
  },
  BtnContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  },
  icon: {
    borderRadius: '50%',
    transition: 'all 0.2s ease',

    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 3,
  },
}));

/*
 @param product {
    _id: string,
    name: string,
    description: string,
    price: number,
    images: string[],
    featured: boolean,
    inventory: number,
 }
 @param wishlistId: string | null
*/
const VerticalProductCard = ({ product, wishlistId = null }) => {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Card
      className={classes.card}
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      ref={ref}
    >
      <Card.Section className={classes.imageContainer}>
        {hovered && (
          <>
            <Group className={classes.BtnContainer} noWrap>
              <Tooltip
                label="View Product"
                color="blue"
                position="bottom"
                offset={20}
                withArrow
              >
                <ActionIcon
                  className={classes.icon}
                  color="blue"
                  variant="filled"
                  size="lg"
                  component={Link}
                  to={`/products/${product._id}`}
                >
                  <IconSearch size={20} />
                </ActionIcon>
              </Tooltip>

              {product.inventory > 0 && (
                <Tooltip
                  label="Add to Cart"
                  color="blue"
                  position="bottom"
                  offset={20}
                  withArrow
                >
                  <ActionIcon
                    className={classes.icon}
                    color="blue"
                    variant="filled"
                    size="lg"
                    onClick={() =>
                      dispatch(
                        addToCart({ id: product._id, quantity: 1, ...product })
                      )
                    }
                  >
                    <IconShoppingCartPlus size={20} />
                  </ActionIcon>
                </Tooltip>
              )}

              {location.pathname === '/user/wishlist' ? (
                <Tooltip
                  label="Remove from Wishlist"
                  color="blue"
                  position="bottom"
                  offset={20}
                  withArrow
                >
                  <ActionIcon
                    className={classes.icon}
                    color="blue"
                    variant="filled"
                    size="lg"
                    onClick={() => dispatch(deleteWishlistItem(wishlistId))}
                  >
                    <IconTrash size={20} />
                  </ActionIcon>
                </Tooltip>
              ) : (
                <Tooltip
                  label="Add to Wishlist"
                  color="blue"
                  position="bottom"
                  offset={20}
                  withArrow
                >
                  <ActionIcon
                    className={classes.icon}
                    color="blue"
                    variant="filled"
                    size="lg"
                    onClick={() => {
                      dispatch(addWishlistItem({ id: product._id }));
                    }}
                  >
                    <IconGift size={20} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
            <Overlay opacity={0.6} color="#000" zIndex={5} />
          </>
        )}

        {product?.inventory <= 0 ? (
          <Badge
            radius="xs"
            variant="filled"
            color="gray"
            className={classes.badge}
          >
            Out of Stock
          </Badge>
        ) : product?.featured ? (
          <Badge
            radius="xs"
            variant="filled"
            color="red"
            className={classes.badge}
          >
            Featured
          </Badge>
        ) : null}

        <Image src={product?.images[0]} height={200} alt="Norway" />
      </Card.Section>

      <Text
        align="center"
        weight={600}
        mt="md"
        mb="xs"
        sx={{ color: '#002742' }}
      >
        {product.name}
      </Text>

      <Text align="center" sx={{ color: 'var(--prussian-blue-500)' }}>
        {formatPrice(product.price)}
      </Text>
    </Card>
  );
};

export default VerticalProductCard;
