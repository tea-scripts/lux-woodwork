import {
  Container,
  Text,
  Group,
  createStyles,
  Table,
  ActionIcon,
} from "@mantine/core";
import { IconSquareCheck, IconEdit, IconTrashX } from "@tabler/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAllProducts,
  setProductValues,
  toggleProductEdit,
  toggleProductView,
} from "../features/products/productsSlice";
import { formatPrice } from "../utils/helpers";
import Loading from "./Loading";
import ViewProductModal from "./ViewProductModal";
import EditProductModal from "./EditProductModal";

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    width: "100%",
    padding: 0,
  },

  inner: {
    maxWidth: 1200,
  },

  title: {
    color: "var(--prussian-blue-500)",
    fontSize: "1.3rem",
    paddingTop: 5,
    marginBottom: "2rem",
  },
}));

const AdminViewProducts = () => {
  const { classes } = useStyles();
  const { products, isLoading } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const rows =
    products &&
    products.map((product, index) => {
      const { _id, name, inventory, price, category } = product;
      return (
        <tr key={_id}>
          <td>{index + 1}</td>
          <td style={{ textTransform: "capitalize" }}>{name}</td>
          <td>{inventory}</td>
          <td>{formatPrice(price)}</td>
          <td style={{ textTransform: "capitalize" }}>{category}</td>
          <td>
            <Group spacing={5}>
              <ActionIcon
                color="green"
                onClick={() => {
                  dispatch(toggleProductView());
                  dispatch(setProductValues(product));
                }}
              >
                <IconSquareCheck size={15} />
              </ActionIcon>

              <ActionIcon
                color="yellow"
                onClick={() => {
                  dispatch(setProductValues(product));
                  dispatch(toggleProductEdit());
                }}
              >
                <IconEdit size={15} />
              </ActionIcon>

              <ActionIcon
                color="red"
                onClick={() => dispatch(deleteProduct(_id))}
              >
                <IconTrashX size={15} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      );
    });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>View Products List</Text>
      </Container>
      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          <ViewProductModal />
          <EditProductModal />
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default AdminViewProducts;
