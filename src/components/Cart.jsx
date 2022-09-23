import { Drawer, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((store) => store.cart);

  return (
    <Drawer
      opened={isCartOpen}
      onClose={() => dispatch(openCart())}
      title="Your Bag"
      padding="xl"
      size="lg"
      position="right"
    >
      {/* Cart content */}
      <Title>
        Your cart is empty. <br /> Add some items to it.
      </Title>
    </Drawer>
  );
};
export default Cart;
