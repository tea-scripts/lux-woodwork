import {
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  Image,
  Pagination,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import emptyCartImage from "../assets/empty-cart.svg";
import { fetchUserWishlist } from "../features/wishlist/wishlistSlice";
import Loading from "./Loading";
import { IconShoppingCartPlus } from "@tabler/icons";
import { HorizontalProductCard, VerticalProductCard } from ".";
import { useViewportSize } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  imgContainer: {
    width: 300,

    "@media (min-width: 481px)": {
      width: 450,
    },
  },
}));

const UserWishlist = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { wishlist, isLoading, pages } = useSelector((state) => state.wishlist);
  const [activePage, setPage] = useState(1);

  const displayWishlist = wishlist.userWishlist?.map((item, index) => (
    <VerticalProductCard
      key={item.id}
      product={item.product}
      wishlistId={item._id}
    />
  ));

  useEffect(() => {
    dispatch(fetchUserWishlist(activePage));
  }, [activePage, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Text
        sx={{
          color: "var(--prussian-blue-500)",
          fontSize: "1.1rem",
          fontWeight: 500,
        }}
      >
        My Wishlist
      </Text>

      <Divider mt={16} mb={32} />

      <SimpleGrid cols={2}></SimpleGrid>

      <Container
        px={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {displayWishlist}
      </Container>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {wishlist?.userWishlist?.length === 0 && (
          <>
            <Group mb={32} position="center">
              <Button
                component={Link}
                to="/products"
                leftIcon={<IconShoppingCartPlus />}
              >
                Add Products
              </Button>
            </Group>
            <Text
              weight={500}
              sx={{ fontSize: "1.5rem", marginBottom: "2rem" }}
            >
              Your wishlist is empty!
            </Text>
            <div className={classes.imgContainer}>
              <Image src={emptyCartImage} />
            </div>
          </>
        )}
      </div>
      {pages > 1 && (
        <Group position="right" mt={32}>
          <Pagination page={activePage} onChange={setPage} total={pages} />
        </Group>
      )}
    </>
  );
};

export default UserWishlist;
