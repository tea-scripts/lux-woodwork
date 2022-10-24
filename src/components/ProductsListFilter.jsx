import {
  Button,
  Checkbox,
  Divider,
  List,
  RangeSlider,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { createStyles } from "@mantine/core";
import { IconSearch, IconTag, IconFilter } from "@tabler/icons";
import { useState } from "react";
import { categories } from "../utils/productsList";

const useStyles = createStyles((theme) => ({
  filterBar: {
    display: "none",
    marginBottom: "3rem",

    "@media (min-width: 1024px)": {
      minWidth: "12rem",
      maxWidth: "12rem",
    },

    "@media (min-width: 481px)": {
      display: "flex",
    },
  },

  openFilterBar: {
    display: "flex",
  },

  filterTitle: {
    color: "var(--prussian-blue-500)",
    fontSize: "1rem",
    marginBottom: "1rem",
  },

  openFilterButton: {
    "@media (min-width: 481px)": {
      display: "none",
    },
  },

  sortContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,

    "@media (min-width: 1024px)": {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },

  view: {
    marginBottom: "1rem",
    alignItems: "center",
    gap: "1rem",
    fontSize: 14,
    display: "none",

    "@media (min-width: 1024px)": {
      display: "flex",
    },
  },
}));

const ProductsListFilter = ({
  searchText,
  setSearchText,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  isFreeShipping,
  setIsFreeShipping,
  resetFilters,
  minPrice,
  maxPrice,
}) => {
  const { classes } = useStyles();
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <>
      <Button
        className={classes.openFilterButton}
        onClick={() => setOpenFilter((prevState) => !prevState)}
        leftIcon={<IconFilter size={14} />}
        sx={{ marginBottom: "1rem" }}
      >
        Search Filters
      </Button>
      <Stack
        className={`${classes.filterBar} ${
          openFilter ? classes.openFilterBar : ""
        }`}
      >
        <div className={classes.filter} style={{ marginBottom: 10 }}>
          <TextInput
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
            placeholder="Search"
            icon={<IconSearch size={14} />}
          />
        </div>

        <div className={classes.filter}>
          <Title className={classes.filterTitle} order={2}>
            Category
          </Title>
          <List>
            {categories.map((cat, index) => (
              <List.Item
                key={index}
                sx={{
                  fontSize: 14,
                  cursor: "pointer",
                  color: category === cat ? "blue" : "inherit",
                  textTransform: "capitalize",
                }}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </List.Item>
            ))}
          </List>
        </div>

        <Divider mt={10} mb={10} />

        <div className={classes.filter}>
          <Title className={classes.filterTitle} order={2}>
            Price Range
          </Title>
          <RangeSlider
            value={priceRange}
            onChange={setPriceRange}
            min={minPrice}
            max={maxPrice}
            step={10000}
            color="green"
            thumbChildren={<IconTag size={16} />}
            styles={{
              markLabel: { display: "none" },
              thumb: { borderWidth: 2, padding: 3 },
            }}
            thumbSize={26}
          />

          <div
            className={classes.filter}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Text mt={20} sx={{ color: "var(--gray)", fontSize: 14 }}>
              Min: ${priceRange[0]}
            </Text>
            <Text mt={20} sx={{ color: "var(--gray)", fontSize: 14 }}>
              Max: ${priceRange[1]}
            </Text>
          </div>
        </div>

        <Divider mt={10} mb={10} />

        <div className={classes.filter}>
          <Title className={classes.filterTitle} order={2}>
            Other
          </Title>
          <Checkbox
            checked={isFreeShipping}
            onChange={(event) => setIsFreeShipping(event.currentTarget.checked)}
            label="Free Shipping"
            mb={10}
          />
          <Checkbox checked={false} label="New Product" disabled />
        </div>

        <Divider mt={10} mb={10} />

        <div className={classes.filter}>
          <Button
            type="button"
            onClick={resetFilters}
            variant="outline"
            color="red"
            sx={{ width: "100%" }}
          >
            Clear All
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default ProductsListFilter;
