import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import ProductsList from './ProductsList';
import { categories } from '../utils/productsList';
import { ProductsListSort, ProductsListFilter } from './';

const Products = () => {
  const minPrice = 0;
  const maxPrice = 300000;
  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [sort, setSort] = useState('Price: Low to High');
  const [gridView, setGridView] = useState(true);
  const { width } = useViewportSize();
  const [itemFiltered, setItemFiltered] = useState(false);

  const resetFilters = () => {
    setSearchText('');
    setCategory(categories[0]);
    setPriceRange([minPrice, maxPrice]);
    setIsFreeShipping(false);
    setSort('Price: Low to High');
  };

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.displayProduct &&
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    filtered = filtered.filter((item) =>
      isFreeShipping ? item.freeShipping : item
    );

    filtered = filtered.filter(
      (item) =>
        item.priceWithVAT / 100 >= priceRange[0] &&
        item.priceWithVAT / 100 <= priceRange[1]
    );

    filtered = filtered.filter((item) =>
      category === 'all' ? item : item.category === category
    );

    switch (sort) {
      case 'Price: High to Low':
        filtered = [...filtered].sort(
          (a, b) => b.priceWithVAT - a.priceWithVAT
        );
        break;
      case 'Alphabetically: A to Z':
        filtered = [...filtered].sort((a, b) => (a.name > b.name ? 1 : -1));
        break;

      case 'Alphabetically: Z to A':
        filtered = [...filtered].sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
      default:
        filtered = [...filtered].sort(
          (a, b) => a.priceWithVAT - b.priceWithVAT
        );
    }

    setFilteredProducts(filtered);
  }, [products, searchText, category, isFreeShipping, priceRange, sort]);

  useEffect(() => {
    if (width < 1100) {
      setGridView(true);
    }
  }, [width]);

  return (
    <>
      <ProductsListFilter
        searchText={searchText}
        setSearchText={setSearchText}
        category={category}
        setCategory={setCategory}
        isFreeShipping={isFreeShipping}
        setIsFreeShipping={setIsFreeShipping}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        resetFilters={resetFilters}
        setItemFiltered={setItemFiltered}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      <Container
        fluid
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0,
          width: '100%',
        }}
      >
        <ProductsListSort
          sort={sort}
          setSort={setSort}
          gridView={gridView}
          setGridView={setGridView}
        />
        <ProductsList
          gridView={gridView}
          filteredProducts={filteredProducts}
          itemFiltered={itemFiltered}
        />
      </Container>
    </>
  );
};

export default Products;
