import {
  Button,
  createStyles,
  Group,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import emptyCartImage from "../assets/empty-cart.svg";
import { fetchUserWishlist } from "../features/wishlist/wishlistSlice";
import Loading from "./Loading";

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
  const { wishlist, isLoading } = useSelector((state) => state.wishlist);

  const displayWishlist = wishlist.userWishlist?.map((item, index) => (
    <ProductCard
      product={item.product}
      key={item._id}
      location="/user/wishlist"
      wishlistId={item._id}
    />
  ));

  useEffect(() => {
    dispatch(fetchUserWishlist());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Text sx={{ color: "#C0C0C0", fontSize: "1.1rem" }} mb={32}>
        My Wishlist
      </Text>
      <SimpleGrid
        breakpoints={[
          { minWidth: "xs", cols: 1 },
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
        ]}
      >
        {displayWishlist}
      </SimpleGrid>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {wishlist.length === 0 && (
          <>
            {" "}
            <div className={classes.imgContainer}>
              <Image src={emptyCartImage} />
            </div>
            <Text sx={{ fontSize: "1.5rem", marginTop: "2rem" }}>
              Your wishlist is empty!
            </Text>
          </>
        )}
        <Group mt={32} position="center">
          <Button size="md" component={Link} to="/products">
            Add Products
          </Button>
        </Group>
      </div>
    </>
  );
};

export default UserWishlist;
