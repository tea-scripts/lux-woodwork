import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import errorImage from '../assets/error-image.svg';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
    height: 'calc(100vh - 5rem - 11.25rem)',
    display: 'grid',
    width: '100%',
    margin: ' 0 auto',
    maxWidth: 1200,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    margin: '0 auto',
  },

  content: {
    alignSelf: 'center',
    [theme.fn.smallerThan('sm')]: {
      paddingTop: 20,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const Error = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={10}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
      >
        <img src={errorImage} className={classes.image} alt="error" />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text size="lg" align="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group position="center">
            <Button size="md" component={Link} to="/">
              Take me back to home page
            </Button>
          </Group>
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default Error;
