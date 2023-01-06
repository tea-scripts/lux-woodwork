import {
  Divider,
  Text,
  Box,
  Group,
  Paper,
  createStyles,
  Container,
  Badge,
  Spoiler,
  Stack,
  Pagination,
} from "@mantine/core";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTickets } from "../features/support/supportSlice";
import Loading from "./Loading";

const useStyles = createStyles((theme) => ({
  paper: {
    padding: "1rem",
  },
  header: {
    display: "flex",
    flexDirection: "column",

    "@media (min-width: 800px)": {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  orderIdText: {
    maxWidth: 350,
    fontWeight: 500,
    fontSize: 16,

    "@media (min-width: 800px)": {
      marginBottom: "1rem",
      fontSize: 18,
      maxWidth: 450,
    },
  },
}));
const ViewTickets = () => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [activePage, setPage] = useState(1);
  const { isFetchingSupportTickets, userTickets, pages } = useSelector(
    (state) => state.support
  );

  useEffect(() => {
    dispatch(
      getUserTickets({
        page: activePage,
      })
    );
  }, [dispatch, activePage]);

  if (isFetchingSupportTickets) {
    return <Loading />;
  }

  return (
    <Stack>
      {userTickets?.map((ticket) => {
        const date = DateTime.fromISO(ticket.createdAt);
        const readableDate = date.toLocaleString(DateTime.DATETIME_MED);
        return (
          <Paper
            key={ticket._id}
            className={classes.paper}
            shadow="xs"
            withBorder
          >
            <Container className={classes.header}>
              <Text color="gray" size="sm">
                Ticket ID: {ticket._id}
              </Text>
              <Text color="gray" size="sm">
                Issued Date: {readableDate}
              </Text>
              <Group>
                {ticket.status === "pending" ? (
                  <Badge variant="filled" color="yellow">
                    Pending
                  </Badge>
                ) : ticket.status === "resolved" ? (
                  <Badge variant="filled" color="green">
                    Resolved
                  </Badge>
                ) : ticket.status === "cancelled" ? (
                  <Badge variant="filled" color="gray">
                    Cancelled
                  </Badge>
                ) : ticket.status === "closed" ? (
                  <Badge variant="filled" color="red">
                    Closed
                  </Badge>
                ) : null}
              </Group>
            </Container>

            <Divider my={16} />

            <Box>
              <Text
                sx={{ color: "var(--prussian-blue-500)", fontWeight: 600 }}
                fz="lg"
                mb={16}
              >
                [{ticket.subject}]
              </Text>
              <Spoiler maxHeight={75} showLabel="Show more" hideLabel="Hide">
                <Text sx={{ color: "var(--prussian-blue-500)" }}>
                  {ticket.message}
                </Text>
              </Spoiler>
            </Box>
          </Paper>
        );
      })}
      {pages > 1 && (
        <Group position="right">
          <Pagination
            page={activePage}
            onChange={setPage}
            total={pages}
            mt={16}
          />
        </Group>
      )}
    </Stack>
  );
};

export default ViewTickets;
