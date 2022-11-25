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
  Divider,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { useEffect } from 'react';
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
    images,
    displayProduct,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  const { classes } = useStyles();
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
      createProduct({
        name,
        price,
        inventory,
        category,
        description,
        images,
        featured,
        displayProduct,
        freeShipping,
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
              name="name"
              mb={8}
              withAsterisk
              value={name}
              onChange={handleInputChange}
            />

            <TextInput
              type="number"
              placeholder="Enter amount in stock"
              label="Amount in Stock"
              name="inventory"
              mb={8}
              withAsterisk
              value={inventory}
              onChange={handleInputChange}
            />

            <TextInput
              type="number"
              placeholder="Enter product price"
              label="Price (in cents)"
              name="price"
              mb={8}
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
                onChange={handleInputChange}
              />

              <Checkbox
                label="Free Shipping"
                name="freeShipping"
                value={freeShipping}
                onChange={handleInputChange}
              />

              <Checkbox
                label="Display Product"
                name="displayProduct"
                value={displayProduct}
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
                Select Image(s)
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
