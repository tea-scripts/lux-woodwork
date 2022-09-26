import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: 'calc(100vh - 5rem - 15.6rem)',
    display: 'grid',
    placeItems: 'center',
    width: '90vw',
    margin: ' 0 auto',
    maxWidth: 1200,
  },
}));

const About = () => {
  const { classes } = useStyles();
  return <section className={classes.wrapper}>About Us</section>;
};

export default About;
