import {
  Container,
  Text,
  createStyles,
  Table,
  ActionIcon,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { formatPrice } from '../utils/helpers';

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

const AdminInventory = () => {
  const { classes } = useStyles();
  const { products } = useSelector((store) => store.products);

  const rows = products
    .filter(
      (product) => product.isArchived === false && product.isDeleted === false
    )
    .map((product, index) => {
      const { _id, name, inventory, price } = product;
      return (
        <tr key={_id}>
          <td>{index + 1}</td>
          <td>{name}</td>
          <td>{inventory}</td>
          <td>{formatPrice(price)}</td>
          <td>
            <ActionIcon
              color="yellow"
              onClick={() => {
                console.log('edit');
              }}
            >
              <IconEdit size={15} />
            </ActionIcon>
          </td>
        </tr>
      );
    });

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Inventory</Text>
      </Container>
      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          <Table highlightOnHover captionSide="bottom">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Price Per Item</th>
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

export default AdminInventory;
