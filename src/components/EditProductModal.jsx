import {
  Button,
  Checkbox,
  Grid,
  Group,
  createStyles,
  Modal,
  Select,
  SimpleGrid,
  Text,
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
  clearProductValues,
} from '../features/products/productsSlice';
import { toast } from 'react-toastify';
import { IconUpload } from '@tabler/icons';
import { useRef } from 'react';

const useStyles = createStyles((theme) => ({
  images: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    width: '85px',
    height: '75px',
    gap: '.5rem',

    img: {
      width: '100%',
      height: '100%',
      display: 'block',
      borderRadius: '5px',
      objectFit: 'cover',
    },
  },
}));

const EditProductModal = () => {
  const { classes } = useStyles();
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
    images,
    productId,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);

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
    const images = e.target.files;
    const formData = new FormData();

    for (let image of images) {
      formData.append('image', image);
    }

    if (images) {
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
        images,
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
    <SimpleGrid columns={3} spacing="md">
      <Text>{images && images.length} images selected.</Text>
      <div className={classes.images}>
        {images &&
          images.map((image, index) => (
            <img key={index} alt={'prouduct-pic'} radius="md" src={image} />
          ))}
      </div>
    </SimpleGrid>
  );

  return (
    <Modal
      opened={isEditingProduct}
      onClose={() => {
        dispatch(toggleProductEdit());
        dispatch(clearProductValues());
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
            name="inventory"
            mb={16}
            withAsterisk
            value={inventory}
            onChange={handleInputChange}
          />

          <TextInput
            type="number"
            placeholder="Enter product price"
            label="Price (VAT will be added)"
            name="price"
            mb={16}
            withAsterisk
            value={price || 0}
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
              name="featured"
              value={featured}
              checked={featured}
              onChange={handleInputChange}
            />

            <Checkbox
              label="Free Shipping"
              name="freeShipping"
              value={freeShipping}
              checked={freeShipping}
              onChange={handleInputChange}
            />

            <Checkbox
              label="Display Product"
              name="displayProduct"
              value={displayProduct}
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
              fullWidth
            >
              Upload a file
            </Button>
            <input
              type="file"
              name="image"
              multiple
              style={{
                display: 'none',
              }}
              height={15}
              onChange={handleFileChange}
              ref={hiddenFileInput}
            />

            <Button fullWidth loading={isLoading} onClick={handleSubmit}>
              Update Product
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
export default EditProductModal;
