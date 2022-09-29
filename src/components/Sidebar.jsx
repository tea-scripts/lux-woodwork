import {
  Button,
  Center,
  Container,
  Drawer,
  Group,
  List,
  SimpleGrid,
  Text,
  createStyles,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSidebar } from '../features/navigation/navSlice';
import navLinks from '../utils/navLinks';
import logo from '../assets/logo-black.svg';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = createStyles((theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '85vh',
  },

  drawer: {
    height: '100vh',
    textTransform: 'capitalize',
  },

  footer: {
    display: 'grid',
    placeItems: 'center',
    gap: '1rem',
  },

  icons: {
    fontSize: '1.2rem',

    a: {
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        color: theme.colors.blue[6],
      },
    },
  },
}));

const Sidebar = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.navigation);
  const { loginWithPopup, isAuthenticated, logout, user } = useAuth0();

  return (
    <Drawer
      opened={isSidebarOpen}
      onClose={() => dispatch(toggleSidebar())}
      padding="xl"
      size="lg"
      position="right"
      overlayBlur={3}
      className={classes.drawer}
      title={`Hello, ${
        isAuthenticated ? user.given_name || user.nickname : 'Guest'
      }`}
    >
      <div className={classes.sidebar}>
        <SimpleGrid>
          <List spacing="lg" mb="xl">
            {navLinks.map((link) => {
              return (
                <List.Item
                  key={link.id}
                  icon={link.icon}
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <Link to={link.url}>{link.name}</Link>
                </List.Item>
              );
            })}
          </List>
          {isAuthenticated ? (
            <Button
              variant="filled"
              px=".3rem"
              onClick={() => {
                logout({ returnTo: window.location.origin });
                dispatch(toggleSidebar());
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="filled"
              px=".3rem"
              onClick={() => {
                loginWithPopup();
                dispatch(toggleSidebar());
              }}
            >
              Sign in
            </Button>
          )}

          {isAuthenticated && (
            <Button
              component={Link}
              to="/cart"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              Go to Cart
            </Button>
          )}
        </SimpleGrid>

        <Center>
          <Container className={classes.footer}>
            <Text>Follow us on social media</Text>
            <Group position="center" spacing="lg" className={classes.icons}>
              <Link to="https://www.google.com">
                <FaFacebookSquare />
              </Link>
              <Link to="https://www.google.com">
                <FaInstagram />
              </Link>
              <Link to="https://www.google.com">
                <FaTwitterSquare />
              </Link>
            </Group>

            <Center>
              <img src={logo} alt="logo" />
            </Center>
          </Container>
        </Center>
      </div>
    </Drawer>
  );
};
export default Sidebar;
