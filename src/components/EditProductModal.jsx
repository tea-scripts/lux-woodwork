import {
  Button,
  Checkbox,
  Grid,
  Group,
  Image,
  Modal,
  Select,
  SimpleGrid,
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
import { IconUpload } from '@tabler/icons';
import { useRef, useState } from 'react';

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
  const hiddenFileInput = useRef(null);
  const [prevFile, setPrevFile] = useState(null);

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
    setPrevFile(URL.createObjectURL(e.target.files[0]));
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

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const imagePreview = (
    <div
      style={{
        width: 240,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2rem',
      }}
    >
      {prevFile && <Image radius="md" src={prevFile} />}
    </div>
  );

  return (
    <Modal
      opened={isEditingProduct}
      onClose={() => {
        dispatch(toggleProductEdit());
        dispatch(setProductValues({}));
      }}
      centered
      size="xl"
      title={`Editing ${name}`}
    >
      <Grid mb={32}>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            placeholder="Enter product Name"
            label="Product Name"
            size="md"
            name="name"
            mb={16}
            withAsterisk
            value={name}
            onChange={handleInputChange}
          />

          <TextInput
            type="number"
            placeholder="Enter amount in stock"
            label="Amount in Stock"
            size="md"
            name="inventory"
            mb={16}
            withAsterisk
            value={inventory}
            onChange={handleInputChange}
          />

          <TextInput
            type="number"
            placeholder="Enter product price"
            label="Price (in cents)"
            size="md"
            name="price"
            mb={16}
            withAsterisk
            value={price}
            onChange={handleInputChange}
          />

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
            mb={16}
            searchable
            withAsterisk
            value={category}
            onChange={(value) =>
              dispatch(handleChange({ name: 'category', value }))
            }
          />

          <SimpleGrid breakpoints={[{ minWidth: 'xs', cols: 1 }]}>
            <Checkbox
              label="Featured"
              size="md"
              name="featured"
              value={featured}
              checked={featured}
              onChange={handleInputChange}
            />

            <Checkbox
              label="Free Shipping"
              size="md"
              name="freeShipping"
              value={featured}
              checked={freeShipping}
              onChange={handleInputChange}
            />

            <Checkbox
              label="Display Product"
              size="md"
              name="displayProduct"
              value={featured}
              checked={displayProduct}
              onChange={handleInputChange}
            />
          </SimpleGrid>
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <Textarea
            placeholder="Enter Product Description"
            label="Product Description"
            withAsterisk
            size="md"
            name="description"
            autosize
            minRows={5}
            value={description}
            onChange={handleInputChange}
          />
          {imagePreview}

          <Group noWrap>
            <Button
              onClick={handleClick}
              leftIcon={<IconUpload />}
              variant="outline"
              size="md"
              fullWidth
            >
              Upload a file
            </Button>
            <input
              type="file"
              name="image"
              style={{
                display: 'none',
              }}
              height={15}
              onChange={handleFileChange}
              ref={hiddenFileInput}
            />

            <Button
              size="md"
              fullWidth
              loading={isLoading}
              onClick={handleSubmit}
            >
              Update Product
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
export default EditProductModal;
