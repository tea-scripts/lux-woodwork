import {
  Button,
  Group,
  Paper,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";

const ContactForm = () => {
  return (
    <Paper shadow="xs" radius="md" p="xl">
      <form>
        <Title order={3} mb={5}>
          Send us a message
        </Title>
        <Stack>
          <TextInput
            placeholder="Enter your email"
            label="Email"
            withAsterisk
          />
          <TextInput placeholder="Enter your name" label="Name" withAsterisk />
          <TextInput
            placeholder="Enter the subject"
            label="Subject"
            withAsterisk
          />
          <Textarea
            placeholder="Enter your message"
            label="Message"
            withAsterisk
          />
          <Group position="right">
            <Button>Send message</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};

export default ContactForm;
