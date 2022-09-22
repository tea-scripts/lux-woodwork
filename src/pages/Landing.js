import styled from 'styled-components';
import { FeaturedProducts, Hero, Registration } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <Registration />
      <Hero />
      <FeaturedProducts />
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Landing;
