import styled from 'styled-components';
import {
  CustomerReview,
  FeaturedProducts,
  Features,
  Hero,
  NewsletterSection,
} from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <Hero />
      <Features />
      <FeaturedProducts />
      <section></section>
      <CustomerReview />
      <NewsletterSection />
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Landing;
