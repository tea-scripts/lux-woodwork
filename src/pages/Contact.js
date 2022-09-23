import styled from "styled-components";
import { Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { ContactForm, ContactInformation } from "../components";

const Contact = () => {
  return (
    <Wrapper>
      <Stack align="center" justify="center" spacing="xs">
        <Title order={2} mb={10}>
          Contact Us
        </Title>
        <Text align="center">
          If you have any questions, we will always be happy to help. Feel free
          to contact us by phone or email and we will be sure to get back to you
          as soon as possible.
        </Text>
      </Stack>
      <Container>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 768, cols: 1 }]}
          spacing="xl"
        >
          <ContactInformation />
          <ContactForm />
        </SimpleGrid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  > .mantine-Stack-root {
    background-color: #228be6;
    height: 300px;
    margin-bottom: 2rem;
    padding: 1.5rem;

    h2 {
      font-size: 2.5rem;
      color: var(--white);
    }

    div {
      max-width: 40rem;
      color: #fff;
      opacity: 0.6;
      font-weight: 500;
    }
  }

  .mantine-Container-root {
    margin-bottom: 2rem;
  }
`;

export default Contact;
