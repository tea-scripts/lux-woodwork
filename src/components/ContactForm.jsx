import {
  Box,
  Button,
  Group,
  Paper,
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
import { contactUs } from '../features/users/userSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { isLoading, successState } = useSelector((store) => store.users);
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.message || !values.subject) {
      toast.warning('Please provide all credentials');
      return;
    }

    dispatch(contactUs(values));
  };

  useEffect(() => {
    if (successState) {
      setValues({
        name: '',
        email: '',
        message: '',
        subject: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper shadow="xs" radius="md" p="xl">
      <form>
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
              value={values.email}
              onChange={handleChange}
              withAsterisk
            />
            <TextInput
              placeholder="Enter your name"
              name="name"
              value={values.name}
              onChange={handleChange}
              label="Name"
              withAsterisk
            />
            <TextInput
              placeholder="Enter the subject"
              label="Subject"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              withAsterisk
            />
            <Textarea
              placeholder="Enter your message"
              label="Message"
              name="message"
              value={values.message}
              onChange={handleChange}
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
