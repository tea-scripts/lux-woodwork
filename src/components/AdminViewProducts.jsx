import {
  Container,
  Text,
  Group,
  createStyles,
  Table,
  ActionIcon,
  Input,
} from '@mantine/core';
import {
  IconSquareCheck,
  IconEdit,
  IconTrashX,
  IconSearch,
  IconArchive,
} from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  archiveProduct,
  changePage,
  deleteProduct,
  fetchAllProducts,
  handleChange,
  setProductValues,
  togggleActionConfirmModal,
  toggleDeleteProduct,
  toggleProductEdit,
  toggleProductView,
} from '../features/products/productsSlice';
import { formatPrice } from '../utils/helpers';
import Loading from './Loading';
import ViewProductModal from './ViewProductModal';
import EditProductModal from './EditProductModal';
import PaginationButtons from './PaginationButtons';
import ActionConfirmationModal from './ActionConfirmationModal';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
  },

  inner: {
    maxWidth: 1200,
  },

  title: {
    color: 'var(--prussian-blue-500)',
    fontSize: '1.3rem',
    paddingTop: 5,
    marginBottom: '2rem',
  },
}));

const AdminViewProducts = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);
  const {
    products,
    isLoading,
    totalPages,
    totalProducts,
    page,
    searchField,
    actionConfirmModal,
    deleteConfirmation,
  } = useSelector((store) => store.products);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const rows =
    products &&
    products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchField.toLowerCase()) &&
          product.isArchived === false &&
          product.isDeleted === false
      )
      .map((product, index) => {
        const { _id, name, inventory, price, category } = product;
        return (
          <tr key={_id}>
            <td>{index + 1}</td>
            <td style={{ textTransform: 'capitalize' }}>{name}</td>
            <td>{inventory}</td>
            <td>{formatPrice(price)}</td>
            <td style={{ textTransform: 'capitalize' }}>{category}</td>
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
                  onClick={() => {
                    dispatch(togggleActionConfirmModal());
                    dispatch(toggleDeleteProduct());
                    setItemId(_id);
                  }}
                >
                  <IconTrashX size={15} />
                </ActionIcon>
              </Group>
            </td>
            <td>
              <ActionIcon
                onClick={() => {
                  dispatch(togggleActionConfirmModal());
                  setItemId(_id);
                }}
              >
                <IconArchive size={15} />
              </ActionIcon>
            </td>
          </tr>
        );
      });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Products List</Text>
      </Container>
      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          <ViewProductModal />
          <EditProductModal />
          <ActionConfirmationModal
            onOk={deleteConfirmation ? deleteProduct : archiveProduct}
            onCancel={togggleActionConfirmModal}
            visible={actionConfirmModal}
            _id={itemId}
          />
          <Group mb={10}>
            <Input
              rightSection={<IconSearch size={16} />}
              placeholder="Search by product name"
              name="searchField"
              value={searchField}
              onChange={handleInput}
            />
          </Group>
          {isLoading ? (
            <Loading />
          ) : (
            <Table highlightOnHover captionSide="bottom">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                  <th>Archive</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
              <caption>
                {totalProducts} products found. Showing {totalProducts}{' '}
              </caption>
            </Table>
          )}
        </Container>
      </Container>
      {/* {totalPages > 1 && (
        <PaginationButtons
          changePage={changePage}
          totalPages={totalPages}
          page={page}
          isLoading={isLoading}
        />
      )} */}
    </Container>
  );
};

export default AdminViewProducts;
