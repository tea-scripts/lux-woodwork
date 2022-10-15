import { createStyles, Text, Avatar, Group, Paper } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
}));

const SingleReview = ({ avatar, name, postedAt, text, title }) => {
  const { classes } = useStyles();

  return (
    <Paper shadow="xs" p="md" mb="md">
      <Group>
        <Avatar src={avatar} alt={name} radius="xl" />
        <div>
          <Text size="sm">{name}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>

      <Text className={classes.body} size="sm">
        {text}
      </Text>
    </Paper>
  );
};
export default SingleReview;
