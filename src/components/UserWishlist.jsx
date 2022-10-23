import {
  Button,
  createStyles,
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
    <ProductCard
      product={item.product}
      key={item._id}
      location="/user/wishlist"
      wishlistId={item._id}
    />
  ));

  useEffect(() => {
    dispatch(fetchUserWishlist(activePage));
  }, [activePage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Text sx={{ color: "#C0C0C0", fontSize: "1.1rem" }} mb={32}>
        My Wishlist
      </Text>
      <Group mb={32} position="center">
        <Button component={Link} to="/products">
          Add Products
        </Button>
      </Group>
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
