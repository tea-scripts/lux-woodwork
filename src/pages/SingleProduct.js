import { Button } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const SingleProduct = () => {
  const { id } = useParams();

  return (
    <Wrapper>
      <h1>Single Product Page</h1>
      <h2>{id}</h2>
      <Button component={Link} to="/products">
        Back to Products
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
export default SingleProduct;
