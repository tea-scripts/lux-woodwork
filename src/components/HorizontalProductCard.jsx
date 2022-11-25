import {
  Badge,
  Box,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Overlay,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import {
  addWishlistItem,
  deleteWishlistItem,
} from "../features/wishlist/wishlistSlice";
import { formatPrice } from "../utils/helpers";

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    minWidth: "100%",
  },
  imageContainer: {
    position: "relative",
    maxWidth: 360,
    minWidth: 360,
    background: "#fff",
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 3,
  },
  productName: {
    "&:hover": {
      textDecoration: "underline",
    },
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
const HorizontalProductCard = ({ product, wishlistId = null }) => {
  const { classes } = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card} shadow="sm" p={0} radius="md" withBorder>
      <Card.Section className={classes.imageContainer} mr={16}>
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
        <Box component={Link} to={`/products/${product._id}`}>
          <Image src={product?.images[0]} height={220} alt={product.name} />
        </Box>
      </Card.Section>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        mx={16}
      >
        <Text
          weight={600}
          mt="md"
          sx={{ color: "#002742", fontSize: 20 }}
          className={classes.productName}
          component={Link}
          to={`/products/${product._id}`}
        >
          {product.name}
        </Text>

        <Text lineClamp={2}>{product.description}</Text>

        <Group position="apart" mt={8}>
          <Text
            sx={{ fontSize: 24, color: "var(--prussian-blue-500)" }}
            weight={500}
          >
            {formatPrice(product.price)}
          </Text>
          <Box>
            {product.inventory > 0 && (
              <Button
                mx={5}
                onClick={() =>
                  dispatch(
                    addToCart({ id: product._id, quantity: 1, ...product })
                  )
                }
              >
                Add To Cart
              </Button>
            )}

            {location.pathname === "/user/wishlist" ? (
              <Button
                mx={5}
                variant="outline"
                color="red"
                onClick={() => dispatch(deleteWishlistItem(wishlistId))}
              >
                Remove from Wishlist
              </Button>
            ) : (
              <Button
                mx={5}
                variant="outline"
                onClick={() => {
                  dispatch(addWishlistItem({ id: product._id }));
                }}
              >
                Add To Wishlist
              </Button>
            )}
          </Box>
        </Group>
      </Box>
    </Card>
  );
};

export default HorizontalProductCard;
