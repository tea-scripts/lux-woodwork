import { Button, Modal, SimpleGrid, Text, TextInput } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleChange,
  toggleInventoryModal,
  updateProduct,
} from '../features/products/productsSlice';

const AddInventoryModal = () => {
  const {
    inventoryModal,
    name,
    price,
    inventory,
    category,
    description,
    images,
    featured,
    freeShipping,
    displayProduct,
    productId,
    isLoading,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddInventory = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        name,
        price,
        inventory,
        category,
        description,
        images,
        featured,
        freeShipping,
        displayProduct,
        productId,
      })
    );
  };

  return (
    <Modal
      opened={inventoryModal}
      onClose={() => dispatch(toggleInventoryModal())}
      title="Update Inventory"
    >
      <SimpleGrid>
        <Text>Product ID: {productId}</Text>
        <Text>Name: {name}</Text>
        <Text>Inventory: {inventory}</Text>
        <Text>Category: {category}</Text>
        <form>
          <label htmlFor="quantity">Add Stock</label>
          <TextInput
            type="number"
            name="inventory"
            value={inventory}
            onChange={handleAddInventory}
            withAsterisk
          />
          <Button size="md" loading={isLoading} onClick={handleSubmit} mt={16}>
            Update Product
          </Button>
        </form>
      </SimpleGrid>
    </Modal>
  );
};
export default AddInventoryModal;
