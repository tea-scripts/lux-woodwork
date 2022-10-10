import { ActionIcon, Group, Paper, Table, Text } from '@mantine/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  fetchAllProducts,
  setProductValues,
  toggleProductEdit,
  toggleProductView,
} from '../features/products/productsSlice';
import { formatPrice } from '../utils/helpers';
import Loading from './Loading';
import { IconEdit, IconSquareCheck, IconTrashX } from '@tabler/icons';
import ViewProductModal from './ViewProductModal';
import EditProductModal from './EditProductModal';

const AdminViewProducts = () => {
  const { products, isLoading } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  const rows =
    products &&
    products.map((product, index) => {
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
    <Paper sx={{ width: '100%', padding: '1rem' }}>
      <Group>
        <Text sx={{ fontSize: '2rem', fontWeight: 500 }}>Products List</Text>
      </Group>
      <ViewProductModal />
      <EditProductModal />
      <Table highlightOnHover striped>
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
    </Paper>
  );
};

export default AdminViewProducts;
