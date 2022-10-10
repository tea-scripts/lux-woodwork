import {
  Button,
  Checkbox,
  Grid,
  Group,
  Modal,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProductValues,
  toggleProductEdit,
  uploadProductImage,
  updateProduct,
  handleChange,
} from '../features/products/productsSlice';
import { toast } from 'react-toastify';

const EditProductModal = () => {
  const {
    isEditingProduct,
    name,
    price,
    inventory,
    category,
    featured,
    freeShipping,
    description,
    isLoading,
    displayProduct,
    image,
    productId,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'featured') {
      value = e.target.checked;
    }
    if (name === 'freeShipping') {
      value = e.target.checked;
    }
    if (name === 'displayProduct') {
      value = e.target.checked;
    }

    dispatch(handleChange({ name, value }));
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    if (image) {
      dispatch(uploadProductImage(formData));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !inventory || !category || !description) {
      toast.warning('Please provide all credentials');
      return;
    }

    dispatch(
      updateProduct({
        name,
        price,
        inventory,
        category,
        description,
        image,
        featured,
        freeShipping,
        displayProduct,
        productId,
      })
    );
  };

  return (
    <Modal
      opened={isEditingProduct}
      onClose={() => {
        dispatch(toggleProductEdit());
        dispatch(setProductValues({}));
      }}
      centered
      size="lg"
      title={`Editing ${name}`}
    >
      <Grid>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter product Name"
            label="Product Name"
            size="md"
            withAsterisk
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput
            type="number"
            placeholder="Enter amount in stock"
            label="Amount in Stock"
            size="md"
            withAsterisk
            name="inventory"
            value={inventory}
            onChange={handleInputChange}
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput
            type="number"
            placeholder="Enter product price"
            label="Price"
            size="md"
            withAsterisk
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <Select
            data={[
              { label: 'Office', value: 'office' },
              { label: 'Bedroom', value: 'bedroom' },
              { label: 'Kitchen', value: 'kitchen' },
              { label: 'Dining', value: 'dining' },
              { label: 'Living Room', value: 'living room' },
              { label: 'Kids', value: 'kids' },
            ]}
            sx={{ textTransform: 'capitalize' }}
            placeholder="Select product category"
            label="Category"
            size="md"
            name="category"
            searchable
            withAsterisk
            value={category}
            onChange={(value) =>
              dispatch(handleChange({ name: 'category', value }))
            }
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <Checkbox
            label="Featured ?"
            size="md"
            name="featured"
            mb={15}
            checked={featured}
            value={featured}
            onChange={handleInputChange}
          />

          <Checkbox
            label="Free Shipping ?"
            size="md"
            mb={15}
            checked={freeShipping}
            name="freeShipping"
            value={freeShipping}
            onChange={handleInputChange}
          />

          <Checkbox
            label="Display Product ?"
            size="md"
            checked={displayProduct}
            name="displayProduct"
            value={displayProduct}
            onChange={handleInputChange}
          />
        </Grid.Col>

        <Grid.Col xs={12}>
          <Textarea
            placeholder="Enter Product Description"
            label="Product Description"
            withAsterisk
            size="md"
            name="description"
            value={description}
            onChange={handleInputChange}
            autosize
            minRows={5}
          />
        </Grid.Col>

        <Grid.Col xs={12}>
          <input
            type="file"
            name="image"
            style={{
              border: 'transparent !important',
              width: '250px',
              background: 'transparent',
            }}
            height={15}
            onChange={handleFileChange}
          />
        </Grid.Col>

        <Grid.Col xs={12}>
          <Group position="right">
            <Button
              variant="outline"
              color="red"
              onClick={() => {
                dispatch(toggleProductEdit());
                dispatch(setProductValues({}));
              }}
            >
              Cancel
            </Button>
            <Button loading={isLoading} onClick={handleSubmit}>
              Update Product
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
export default EditProductModal;
