import {
  Box,
  Button,
  Group,
  Paper,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { contactUs, handleChange } from '../features/users/userSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    successState,
    name,
    email,
    message,
    subject,
    product_name,
    order_id,
    support_type,
  } = useSelector((store) => store.users);
  const { products } = useSelector((store) => store.products);

  const handleInputChange = (event) => {
    dispatch(
      handleChange({ name: event.target.name, value: event.target.value })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message || !subject) {
      toast.warning('Please provide all credentials');
      return;
    }

    if (subject === 'product-availability') {
      dispatch(
        contactUs({
          name,
          email,
          message,
          subject,
          product_name,
        })
      );
    } else if (subject === 'product-return') {
      dispatch(
        contactUs({
          name,
          email,
          message,
          subject,
          order_id,
        })
      );
    } else if (subject === 'support') {
      dispatch(
        contactUs({
          name,
          email,
          message,
          subject,
          support_type,
        })
      );
    } else {
      dispatch(
        contactUs({
          name,
          email,
          message,
          subject,
        })
      );
    }
  };

  return (
    <Paper
      shadow="xs"
      radius="md"
      p="xl"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <form style={{ width: '100%' }}>
        <Title align={successState && 'center'} order={3} mb={5}>
          Send us a message
        </Title>
        {successState ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',

              p: {
                maxWidth: '300px',
                textAlign: 'center',
              },
            }}
          >
            <div>
              <IconCircleCheck size={80} color="green" />
            </div>
            <p>Thank you for contacting us! We will get back to you shortly.</p>
          </Box>
        ) : (
          <Stack>
            <TextInput
              placeholder="Enter your email"
              label="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              withAsterisk
            />
            <TextInput
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={handleInputChange}
              label="Name"
              withAsterisk
            />
            <Select
              label="Subject"
              placeholder="Select subject"
              name="subject"
              value={subject}
              onChange={(value) =>
                dispatch(
                  handleChange({
                    name: 'subject',
                    value: value,
                  })
                )
              }
              withAsterisk
              data={[
                { label: 'General', value: 'general' },
                { label: 'Support', value: 'support' },
                {
                  label: 'Product Availability',
                  value: 'product-availability',
                },
              ]}
            />

            {subject === 'product-availability' && (
              <Select
                label="Product"
                placeholder="Select product"
                name="product_name"
                value={product_name}
                onChange={(value) =>
                  dispatch(
                    handleChange({
                      name: 'product_name',
                      value: value,
                    })
                  )
                }
                withAsterisk
                data={products
                  .filter((product) => product.displayProduct === true)
                  .map((product) => ({
                    label: product.name,
                    value: product._id,
                  }))}
              />
            )}

            {subject === 'support' && (
              <Select
                label="Support Type"
                placeholder="Select support type"
                name="support_type"
                value={support_type}
                onChange={(value) =>
                  dispatch(
                    handleChange({
                      name: 'support_type',
                      value: value,
                    })
                  )
                }
                withAsterisk
                data={[
                  { label: 'Technical', value: 'technical' },
                  { label: 'Billing', value: 'billing' },
                  { label: 'Account', value: 'account' },
                  {
                    label: 'Returns',
                    value: 'product-return',
                  },
                ]}
              />
            )}

            {support_type === 'product-return' && subject === 'support' && (
              <TextInput
                placeholder="Enter your order id"
                label="Order ID"
                name="order_id"
                value={order_id}
                onChange={handleInputChange}
                withAsterisk
              />
            )}

            <Textarea
              placeholder="Enter your message"
              label="Message"
              name="message"
              value={message}
              onChange={handleInputChange}
              withAsterisk
            />
            <Group position="right">
              <Button type="button" loading={isLoading} onClick={handleSubmit}>
                Send message
              </Button>
            </Group>
          </Stack>
        )}
      </form>
    </Paper>
  );
};

export default ContactForm;
