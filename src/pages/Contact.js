import styled from "styled-components";
import {
  Container,
  createStyles,
  Overlay,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ContactForm, ContactInformation } from "../components";

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const Contact = () => {
  const { classes } = useStyles();

  return (
    <Wrapper>
      <Stack className="header" align="center" justify="center" spacing="xs">
        <Overlay opacity={0.5} color="#000" zIndex={1} sx={{ height: 460 }} />
        <Title className={classes.title} order={2} mb={10}>
          Contact Us
        </Title>
        <Text className="description" align="center">
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
    background: url("https://i.ibb.co/cr65GKb/contact-image.jpg") no-repeat top
      center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 400px;
    margin-bottom: 3rem;

    h2 {
      font-size: 2.5rem;
      color: var(--white);
      z-index: 2;
    }

    .description {
      max-width: 40rem;
      color: #fff;
      opacity: 0.8;
      font-weight: 500;
      z-index: 2;
    }
  }
`;

export default Contact;
