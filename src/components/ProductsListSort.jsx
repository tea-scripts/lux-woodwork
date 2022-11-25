import { ActionIcon, Container, NativeSelect, Text } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { IconChevronDown, IconList, IconGridDots } from "@tabler/icons";
import { sortBy } from "../utils/productsList";

const useStyles = createStyles((theme) => ({
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

    "@media (min-width: 1100px)": {
      display: "flex",
    },
  },
}));

const ProductsListSort = ({ gridView, setGridView, sort, setSort }) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.sortContainer}>
      <div className={classes.view}>
        <Text sx={{ fontSize: 14 }}>View:</Text>
        <ActionIcon
          color="blue"
          size="lg"
          variant={gridView ? "outline" : "filled"}
          onClick={() => setGridView(false)}
        >
          <IconList size={18} />
        </ActionIcon>
        <ActionIcon
          color="blue"
          size="lg"
          variant={gridView ? "filled" : "outline"}
          onClick={() => setGridView(true)}
        >
          <IconGridDots size={18} />
        </ActionIcon>
      </div>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontSize: 14,
        }}
      >
        <label style={{ width: 75 }}>Sort by:</label>
        <NativeSelect
          value={sort}
          onChange={(event) => setSort(event.currentTarget.value)}
          placeholder="Your favorite library/framework"
          data={[...sortBy]}
          rightSection={<IconChevronDown size={14} />}
          sx={{ width: "100%" }}
        />
      </div>
    </Container>
  );
};

export default ProductsListSort;
