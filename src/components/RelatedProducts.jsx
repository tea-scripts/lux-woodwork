import { SimpleGrid } from '@mantine/core';
import mockProducts from '../utils/mockProducts';
import Product from './Product';

const RelatedProducts = ({ productID }) => {
  return (
    <SimpleGrid
      cols={1}
      spacing="md"
      breakpoints={[
        { minWidth: 678, cols: 2 },
        { minWidth: 992, cols: 3 },
      ]}
    >
      {mockProducts
        .filter((item) => item.id !== productID)
        .map((item) => <Product {...item} key={item.id} />)
        .slice(0, 3)}
    </SimpleGrid>
  );
};
export default RelatedProducts;
