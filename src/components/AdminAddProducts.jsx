import {
  Button,
  FileButton,
  Grid,
  Group,
  NativeSelect,
  NumberInput,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";

const AdminAddProducts = () => {
  const [file, setFile] = useState(null);

  return (
    <Paper sx={{ width: "100%", padding: "1rem", minHeight: 600 }}>
      <Group mb={20}>
        <Text sx={{ fontSize: "2rem", fontWeight: 500 }}>Add New Product</Text>
      </Group>
      <Grid>
        <Grid.Col xs={12}>
          <TextInput
            placeholder="Enter product Name"
            label="Product Name"
            size="md"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <NumberInput
            placeholder="Enter amount in stock"
            label="Amount in Stock"
            size="md"
            withAsterisk
            hideControls
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <NumberInput
            placeholder="Enter product price"
            label="Price"
            size="md"
            withAsterisk
            hideControls
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <NativeSelect
            data={[]}
            placeholder="Select product brand"
            label="Brand"
            size="md"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <NativeSelect
            data={[]}
            placeholder="Select product category"
            label="Category"
            size="md"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col xs={12}>
          <Group position="right">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button color="green" {...props}>
                  Upload image
                </Button>
              )}
            </FileButton>
            <Button>Add Product</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default AdminAddProducts;
