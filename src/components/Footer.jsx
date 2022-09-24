import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Image,
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
    marginTop: 120,
    backgroundColor: 'hsla(205, 100%, 13%, 1)',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },

    ul: {
      listStyle: 'none',
      display: 'flex',
      gap: 10,
      alignItems: 'center',

      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },

      li: {
        a: {
          color: 'white',
          letterSpacing: 1,
        },
      },
    },
  },

  links: {
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
        <img src={logo} alt="logo" width={120} height={150} />
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
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
