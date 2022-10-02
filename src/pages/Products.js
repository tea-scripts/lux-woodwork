import { createStyles } from "@mantine/core";
import { Products as ProductsComponent } from "../components";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "calc(100vh - 5rem - 15.6rem)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "90vw",
    margin: " 0 auto",
    maxWidth: 1200,
    padding: "3rem 0",

    "@media (min-width: 481px)": {
      flexDirection: "row",
      columnGap: "3rem",
    },
  },
}));

const Products = () => {
  const { classes } = useStyles();

  return (
    <section className={classes.wrapper}>
      <ProductsComponent />
    </section>
  );
};

export default Products;
