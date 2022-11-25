import React from "react";
import { VerticalProductCard, HorizontalProductCard } from ".";
import { Center, SimpleGrid } from "@mantine/core";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const ProductsList = ({ gridView, filteredProducts }) => {
  const { isLoading } = useSelector((state) => state.products);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SimpleGrid
      cols={1}
      breakpoints={[
        { minWidth: 769, cols: gridView ? 2 : 1 },
        { minWidth: 1200, cols: gridView ? 3 : 1 },
      ]}
    >
      {filteredProducts.length < 1 ? (
        <Center style={{ width: "100%", height: 200 }}>
          <h1>No products found</h1>
        </Center>
      ) : (
        filteredProducts.map((product) => {
          if (gridView) {
            return <VerticalProductCard key={product.id} product={product} />;
          } else {
            return <HorizontalProductCard key={product.id} product={product} />;
          }
        })
      )}
    </SimpleGrid>
  );
};

export default ProductsList;
