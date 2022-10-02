import React from "react";
import { ProductCard } from ".";
import { SimpleGrid } from "@mantine/core";

const ProductsList = ({ gridView, filteredProducts }) => {
  return (
    <SimpleGrid
      cols={1}
      breakpoints={[
        { minWidth: 769, cols: gridView ? 2 : 1 },
        { minWidth: 1200, cols: gridView ? 3 : 1 },
      ]}
    >
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          horizontal={gridView ? false : true}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProductsList;
