import { Loader } from '@mantine/core';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    width: '400px',
    margin: 'auto',
  },
}));

const Loading = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.loader}>
      <Loader size="100" />;
    </div>
  );
};
export default Loading;
