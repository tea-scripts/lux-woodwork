import {
  Box,
  Button,
  Group,
  NativeSelect,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createTicket } from "../features/support/supportSlice";

const SUBJECTS = [
  "Account or Login Issues",
  "Billing or Payment Issues",
  "Return or Refund",
  "Report a Bug or Issue",
  "Others",
];

const SubmitTicket = () => {
  const dispatch = useDispatch();
  const { isFetchingSupportTickets } = useSelector((state) => state.support);
  const [subject, setSubject] = React.useState(SUBJECTS[0]);
  const [customSubject, setCustomSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleClear = () => {
    setSubject(SUBJECTS[0]);
    setMessage("");
  };

  const handleSubmit = () => {
    if (!subject || !message) {
      toast.error("Please fill up all the fields.");
      return;
    }

    dispatch(
      createTicket({
        subject: subject === "Others" ? `Others - ${customSubject}` : subject,
        message,
      })
    );
    handleClear();
  };

  return (
    <Box>
      <NativeSelect
        data={SUBJECTS}
        label="Select a Subject"
        value={subject}
        onChange={(event) => setSubject(event.currentTarget.value)}
        mb={16}
        withAsterisk
      />
      {subject === "Others" && (
        <TextInput
          label="Provide a Subject"
          value={customSubject}
          onChange={(event) => setCustomSubject(event.currentTarget.value)}
          mb={16}
          withAsterisk
        />
      )}
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        autosize={false}
        minRows={5}
        label="Describe Your Concern"
        withAsterisk
      />

      <Group position="right" mt={16}>
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isFetchingSupportTickets}
        >
          Clear
        </Button>
        <Button onClick={handleSubmit} loading={isFetchingSupportTickets}>
          Submit
        </Button>
      </Group>
    </Box>
  );
};

export default SubmitTicket;
