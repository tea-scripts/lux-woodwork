import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  List,
} from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import navLinks from '../utils/navLinks';

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor: 'hsla(205, 100%, 13%, 1)',
    height: 150,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inner: {
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: theme.spacing.md,
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',

    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: '1fr 1fr',
      placeItems: 'center',
    },

    [theme.fn.smallerThan('xs')]: {
      gridTemplateColumns: '1fr',
      placeItems: 'center',
    },

    ul: {
      listStyle: 'none',
      display: 'flex',
      gap: 10,
      alignItems: 'center',

      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },

      li: {
        a: {
          color: 'white',
          letterSpacing: 1,
        },
      },
    },

    img: {
      width: '100px',
      height: '80px',
    },
  },

  links: {
    '&:hover': {
      color: 'white',
      backgroundColor: 'transparent',
    },

    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <img src={logo} alt="logo" />
        <List>
          {navLinks.map((link) => {
            return (
              <List.Item key={link.id} color="white">
                <Link to={link.url}>{link.name}</Link>
              </List.Item>
            );
          })}
        </List>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
