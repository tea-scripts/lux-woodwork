import styled from 'styled-components';
import { FeaturedProducts, Features, Hero } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <Hero />
      <Features />
      <FeaturedProducts />
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Landing;
