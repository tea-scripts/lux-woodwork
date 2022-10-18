import { createStyles, Text, Avatar, Group, Paper } from '@mantine/core';
import { DateTime } from 'luxon';
import Stars from './Stars';
const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
}));

const SingleReview = ({ user, createdAt, comment, rating }) => {
  const { classes } = useStyles();

  return (
    <Paper shadow="xs" p="md" mb="md">
      <Group>
        <Avatar src={user?.avatar} alt={user?.username} radius="xl" />
        <div>
          <Text transform="capitalize" size="sm">
            {user?.username}
          </Text>
          <Stars stars={rating} />
          <Text size="xs" color="dimmed">
            {DateTime.fromISO(createdAt)
              .setLocale('en')
              .toLocaleString(DateTime.DATE_MED)}
          </Text>
        </div>
      </Group>

      <Text className={classes.body} size="sm">
        {comment}
      </Text>
    </Paper>
  );
};
export default SingleReview;
