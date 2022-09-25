import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Cart = () => {
  return (
    <Wrapper>
      Your cart is Empty hehe
      <Button>
        <Link to="/products">Fill it up!</Link>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 5rem - 15.6rem);
  display: grid;
  place-items: center;
  width: 90vw;
  margin: 0 auto;
`;
export default Cart;
