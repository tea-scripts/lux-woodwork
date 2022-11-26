import React from "react";
import { VerticalProductCard, HorizontalProductCard } from ".";
import { Box, Center, SimpleGrid, Text } from "@mantine/core";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const ProductsList = ({ gridView, filteredProducts, itemFiltered }) => {
  const { isLoading } = useSelector((state) => state.products);

  console.log(itemFiltered);

  if (isLoading) {
    return <Loading />;
  }

  if (itemFiltered && filteredProducts.length <= 0) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text
          align="center"
          sx={{
            fontSize: 24,
            maxWidth: 600,
            color: "var(--prussian-blue-500)",
            fontWeight: 500,
          }}
          mt={100}
        >
          No products were found matching your filter criteria. Use fewer
          filters or clear all.
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid
      cols={1}
      breakpoints={[
        { minWidth: 769, cols: gridView ? 2 : 1 },
        { minWidth: 1200, cols: gridView ? 3 : 1 },
      ]}
    >
      {filteredProducts.map((product) => {
        if (gridView) {
          return <VerticalProductCard key={product.id} product={product} />;
        } else {
          return <HorizontalProductCard key={product.id} product={product} />;
        }
      })}
    </SimpleGrid>
  );
};

export default ProductsList;

// {
//   filteredProducts.length < 1 ? (
//     <>
//       <div></div>
//       <Text align="center" sx={{ fontSize: 32 }}>
//         No products were found matching your filter criteria.
//       </Text>
//       <div></div>
//     </>

{
  /* <SimpleGrid
  cols={1}
  breakpoints={[
    { minWidth: 769, cols: gridView ? 2 : 1 },
    { minWidth: 1200, cols: gridView ? 3 : 1 },
  ]}
>
  {filteredProducts.map((product) => {
    if (gridView) {
      return <VerticalProductCard key={product.id} product={product} />;
    } else {
      return <HorizontalProductCard key={product.id} product={product} />;
    }
  })}
</SimpleGrid>; */
}
