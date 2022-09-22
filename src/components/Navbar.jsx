import { Box, Burger, Button, Group, Header, List } from '@mantine/core';
import { IoIosCart } from 'react-icons/io';
import logo from '../assets/logo.svg';
import styled from 'styled-components';
import { toggleSidebar } from '../features/navigation/navSlice';
import { toggleSignInModal } from '../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.navigation);

  return (
    <NavWrapper>
      <Header className="nav-header" px={15}>
        <Box className="nav-logo">
          <img src={logo} alt="lux woodwork" />
        </Box>
        <Box className="nav-links">
          <List>
            <List.Item>
              <a href="/">home</a>
            </List.Item>
            <List.Item>
              <a href="/">about</a>
            </List.Item>
            <List.Item>
              <a href="/">our store</a>
            </List.Item>
            <List.Item>
              <a href="/">contact</a>
            </List.Item>
          </List>
        </Box>
        <Group position="center" px="md" className="btn-container">
          <Button p={0} variant="white" className="cart-btn">
            <IoIosCart />
          </Button>

          <Button
            variant="filled"
            px=".3rem"
            onClick={() => dispatch(toggleSignInModal())}
          >
            Sign in
          </Button>
        </Group>
        <Burger
          className="nav-toggle"
          opened={isSidebarOpen}
          onClick={() => dispatch(toggleSidebar())}
        />
      </Header>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  .nav-header {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }

  .nav-toggle {
    background: transparent;
    color: var(--prussian-blue-900);
    font-size: 1.5rem;
  }

  .nav-links,
  .btn-container {
    display: none;
  }

  .nav-links {
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;
      width: 300px;

      li {
        a {
          text-decoration: none;
          color: #000;
          font-size: 1.1rem;
          font-weight: 500;
          text-transform: capitalize;

          &:hover {
            color: #f26a2e;
            transition: all 0.3s ease-in-out;
          }
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .nav-toggle {
      display: none;
    }

    .nav-links,
    .btn-container {
      display: block;
    }

    .btn-container {
      display: flex;
      align-items: center;

      .cart-btn {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Navbar;
