import {
  Container,
  Grid,
  Select,
  Textarea,
  TextInput,
  Text,
  Group,
  createStyles,
  Button,
  Checkbox,
  Image,
  SimpleGrid,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createProduct,
  handleChange,
  uploadProductImage,
} from '../features/products/productsSlice';

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

const AdminAddProducts = () => {
  const {
    name,
    price,
    inventory,
    category,
    featured,
    freeShipping,
    description,
    isLoading,
    image,
    displayProduct,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  const { classes } = useStyles();
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
    console.log(
      name,
      price,
      inventory,
      category,
      description,
      featured,
      freeShipping,
      displayProduct,
      image
    );
    dispatch(
      createProduct({ name, price, inventory, category, description, image })
    );
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const imagePreview = (
    <div
      style={{
        width: 250,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      {prevFile && <Image radius="md" src={prevFile} />}
    </div>
  );

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Create New Product</Text>
      </Container>
      <Container className={classes.inner} fluid>
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
                onChange={handleInputChange}
              />

              <Checkbox
                label="Free Shipping"
                size="md"
                name="freeShipping"
                value={featured}
                onChange={handleInputChange}
              />

              <Checkbox
                label="Display Product"
                size="md"
                name="displayProduct"
                value={featured}
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
                size="sm"
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
                size="sm"
                fullWidth
                loading={isLoading}
                onClick={handleSubmit}
              >
                Create Product
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
};

export default AdminAddProducts;
