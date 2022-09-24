import { Title } from '@mantine/core';
import styled from 'styled-components';

const Products = () => {
  return (
    <Wrapper>
      <Title order={2}>Welcome to our store</Title>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 5rem - 15.6rem);
  display: grid;
  place-items: center;
  width: 90vw;
  margin: 0 auto;
  /* height: 100%; */
`;
export default Products;
