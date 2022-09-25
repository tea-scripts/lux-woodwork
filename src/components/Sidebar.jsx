import {
  Button,
  Center,
  Container,
  Drawer,
  Group,
  List,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSidebar } from '../features/navigation/navSlice';
import navLinks from '../utils/navLinks';
import logo from '../assets/logo-black.svg';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';
import { toggleSignInModal } from '../features/users/userSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.navigation);

  return (
    <Drawer
      opened={isSidebarOpen}
      onClose={() => dispatch(toggleSidebar())}
      padding="xl"
      size="lg"
      position="right"
      overlayBlur={3}
    >
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
        <Button
          variant="filled"
          px=".3rem"
          onClick={() => {
            dispatch(toggleSignInModal());
            dispatch(toggleSidebar());
          }}
        >
          Sign in
        </Button>

        <Button
          component={Link}
          to="/cart"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          Go to Cart
        </Button>
      </SimpleGrid>

      <Center mt="20rem">
        <Container>
          <Text>Follow us on social media</Text>
          <Group position="center" mt="2rem" spacing="lg">
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

          <Center mt="2rem">
            <img src={logo} alt="logo" />
          </Center>
        </Container>
      </Center>
    </Drawer>
  );
};
export default Sidebar;
