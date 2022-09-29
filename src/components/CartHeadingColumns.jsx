import styled from 'styled-components';
import { Divider } from '@mantine/core';

const CartHeadingColumns = () => {
  return (
    <Wrapper>
      <div className="content">
        <h5>Product</h5>
        <h5>Price</h5>
        <h5>Quantity</h5>
        <h5>Total</h5>
        <span></span>
      </div>
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;

  @media (min-width: 776px) {
    display: block;
    margin-bottom: 2rem;

    .content {
      display: grid;
      grid-template-columns: 316px 1fr 1fr 1fr auto;
      justify-items: center;
      column-gap: 1rem;

      h5 {
        color: var(--prussian-blue-500);
        font-weight: 400;
      }
    }

    span {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export default CartHeadingColumns;
