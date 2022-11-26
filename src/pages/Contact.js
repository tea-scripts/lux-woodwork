import {
  Container,
  createStyles,
  Overlay,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { ContactForm, ContactInformation } from "../components";
import image1 from "../assets/images/contact-image.jpg";

const useStyles = createStyles((theme) => ({
  container: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: "5rem",
    minHeight: "calc(100vh - (60px + 230px))",
  },

  image_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${image1})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPositionX: "center",
    backgroundPositionY: "top",
    backgroundSize: "cover",
    height: 400,
    marginBottom: 96,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 48,
    color: "var(--white)",
    marginBottom: 10,
    zIndex: 2,
  },

  description: {
    textAlign: "center",
    maxWidth: 640,
    color: "#fff",
    opacity: 0.8,
    fontWeight: 500,
    zIndex: 2,
  },
}));

const Contact = () => {
  const { classes } = useStyles();

  return (
    <section className={classes.container}>
      <Container
        style={{ maxWidth: "100%" }}
        className={classes.image_container}
      >
        <Overlay opacity={0.5} color="#000" zIndex={1} sx={{ height: 460 }} />
        <Title className={classes.title} order={2}>
          Talk to us
        </Title>
        <Text className={classes.description}>
          If you have any questions, we will always be happy to help. Feel free
          to contact us by phone or email and we will be sure to get back to you
          as soon as possible.
        </Text>
      </Container>

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
    </section>
  );
};

export default Contact;
