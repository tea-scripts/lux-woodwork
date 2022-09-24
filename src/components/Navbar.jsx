import {
  Box,
  Burger,
  Button,
  Container,
  Group,
  Header,
  List,
} from '@mantine/core';
import { HiShoppingBag } from 'react-icons/hi';
import logo from '../assets/logo.svg';
import logoBlack from '../assets/logo-black.svg';
import styled from 'styled-components';
import { toggleSidebar } from '../features/navigation/navSlice';
import { toggleSignInModal } from '../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../features/cart/cartSlice';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.navigation);
  const [isHome, setIsHome] = useState(true);

  const location = useLocation();
  useEffect(() => {
    if (window.location.pathname !== '/') {
      setIsHome(false);
    } else {
      setIsHome(true);
    }
  }, [location]);

  return (
    <NavWrapper prop={isHome}>
      <Container size={1200}>
        <Header className="nav-header" px={15}>
          <Box className="nav-logo">
            <img src={isHome ? logo : logoBlack} alt="lux woodwork" />
          </Box>
          <Box className="nav-links">
            <List>
              <List.Item>
                <Link to="/">home</Link>
              </List.Item>
              <List.Item>
                <Link to="/about">about</Link>
              </List.Item>
              <List.Item>
                <Link to="/products">our store</Link>
              </List.Item>
              <List.Item>
                <Link to="/contact">contact</Link>
              </List.Item>
            </List>
          </Box>
          <Group position="center" px="md" className="btn-container">
            <Button
              p={0}
              sx={{ backgroundColor: 'transparent' }}
              className="cart-btn"
              color={isHome ? 'white' : 'black'}
              onClick={() => dispatch(openCart())}
            >
              <HiShoppingBag />
            </Button>

            <Button
              variant="filled"
              sx={{
                backgroundColor: isHome ? '#f5f5f5' : '#228be6',
                color: isHome ? '#000' : '#fff',
              }}
              px=".3rem"
              onClick={() => dispatch(toggleSignInModal())}
              radius="md"
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
      </Container>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  z-index: 2;
  position: relative;
  width: 100%;
  margin: 0 auto;
  color: ${(props) => (props.prop ? '#fff' : '#000')};
  background: ${(props) => (props.prop ? 'transparent' : '#fff')};

  .nav-header {
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border-bottom: none;
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
          color: ${(props) => (props.prop ? '#fff' : '#000')};
          font-size: 1rem;
          font-weight: 500;
          text-transform: capitalize;
          letter-spacing: 1px;

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
        color: ${(props) => (props.prop ? '#fff' : '#228be6')};

        &:hover {
          background: transparent;
        }
      }
    }
  }
`;

export default Navbar;
