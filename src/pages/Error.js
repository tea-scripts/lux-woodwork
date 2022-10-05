import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import errorImage from '../assets/error-image.svg';

const useStyles = createStyles((theme) => ({
  root: {
    minHeight: 'calc(100vh - (60px + 140px))',
    margin: ' 0 auto',
    height: '100%',
    maxWidth: 1200,
    padding: '2rem',

    a: {
      width: 'fit-content',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: theme.fontFamily,
      letterSpacing: 1,
    },
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    margin: '0 auto',
    maxWidth: 500,
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
    <Container size={1200} className={classes.root}>
      <SimpleGrid spacing={10}>
        <img src={errorImage} className={classes.image} alt="error" />
        <Title className={classes.title}>Nothing to see here</Title>
        <Text size="lg" align="center" className={classes.description}>
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>

        <Button size="sm" component={Link} to="/">
          Take me back to home page
        </Button>
      </SimpleGrid>
    </Container>
  );
};

export default Error;
