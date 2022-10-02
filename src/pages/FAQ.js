import {
  Accordion,
  Anchor,
  Button,
  Col,
  Container,
  createStyles,
  Grid,
  Group,
  Image,
  Overlay,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { accFaq, categories, ordersFaq, paymentsFaq } from "../utils/faqs";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: "3rem",
  },

  contentWrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },

  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url(https://res.cloudinary.com/dtyzbmtlz/image/upload/v1664723665/4853433_zjgdnv.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
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

  categoryCard: {
    height: 160,
    position: "relative",
    backgroundSize: "100%",
    backgroundPosition: "center",
    color: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    overflow: "hidden",
    transition: "background-size 300ms ease",

    "&:hover": {
      backgroundSize: "105%",
    },
  },

  categoryLabel: {
    color: "var(--white)",
    fontSize: "2rem",
    zIndex: 2,
    position: "relative",
  },

  accordionTitle: {
    color: "var(--prussian-blue-500)",
    fontSize: "2rem",
    marginBottom: "2rem",
  },
}));

const FAQ = () => {
  const { classes } = useStyles();

  const items = categories.map((category, index) => (
    <Anchor key={index} href={category.href} sx={{ display: "inline-block" }}>
      <UnstyledButton
        style={{ backgroundImage: `url(${category.image})` }}
        className={classes.categoryCard}
        key={category.label}
        as="a"
        href={category.href}
        sx={{ width: "100%" }}
      >
        <Overlay color="#000" opacity={0.6} zIndex={1} />
        <Text
          size="xl"
          align="center"
          weight={700}
          className={classes.categoryLabel}
        >
          {category.label}
        </Text>
      </UnstyledButton>
    </Anchor>
  ));

  return (
    <section className={classes.wrapper}>
      <Container
        style={{ maxWidth: "100%" }}
        className={classes.imageContainer}
      >
        <Overlay opacity={0.4} color="#000" zIndex={1} sx={{ height: 460 }} />
        <Title className={classes.title} order={2}>
          Hi, how can we help you?
        </Title>
      </Container>
      <Container sx={{ maxWidth: 1200, marginBottom: "5rem", padding: "1rem" }}>
        <Title
          order={2}
          sx={{
            fontSize: "2.5rem",
            color: "var(--prussian-blue-500)",
            marginBottom: "2rem",
          }}
        >
          Frequently Asked Questions
        </Title>
        <SimpleGrid
          cols={3}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          mb={94}
        >
          {items}
        </SimpleGrid>

        <div className={classes.wrapper} id="section1">
          <Container size="lg">
            <Grid id="faq-grid" gutter={50}>
              <Col span={12} md={6}>
                <Image
                  src="https://res.cloudinary.com/dtyzbmtlz/image/upload/v1664728846/Finger_print_Monochromatic_ietkxt.png"
                  alt="Frequently Asked Questions"
                />
              </Col>
              <Col span={12} md={6}>
                <Title
                  order={2}
                  align="left"
                  className={classes.accordionTitle}
                >
                  Account
                </Title>

                <Accordion
                  chevronPosition="right"
                  defaultValue="reset-password"
                  variant="separated"
                >
                  {accFaq.map((item, index) => (
                    <Accordion.Item
                      className={classes.item}
                      key={index}
                      value={item.question}
                    >
                      <Accordion.Control>{item.question}</Accordion.Control>
                      <Accordion.Panel>{item.answer}</Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Grid>
          </Container>
        </div>

        <div className={classes.wrapper} id="section2">
          <Container size="lg">
            <Grid id="faq-grid" gutter={50}>
              <Col span={12} md={6}>
                <Title
                  order={2}
                  align="left"
                  className={classes.accordionTitle}
                >
                  Orders
                </Title>

                <Accordion
                  chevronPosition="right"
                  defaultValue="reset-password"
                  variant="separated"
                >
                  {ordersFaq.map((item, index) => (
                    <Accordion.Item
                      className={classes.item}
                      key={index}
                      value={item.question}
                    >
                      <Accordion.Control>{item.question}</Accordion.Control>
                      <Accordion.Panel>{item.answer}</Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
              <Col span={12} md={6}>
                <Image
                  src="https://res.cloudinary.com/dtyzbmtlz/image/upload/v1664728849/Online_payment_Monochromatic_eohv9z.png"
                  alt="Frequently Asked Questions"
                />
              </Col>
            </Grid>
          </Container>
        </div>

        <div className={classes.wrapper} id="section3">
          <Container size="lg">
            <Grid id="faq-grid" gutter={50}>
              <Col span={12} md={6}>
                <Image
                  src="https://res.cloudinary.com/dtyzbmtlz/image/upload/v1664728846/Online_payment_Flatline_1_oqkfgh.png"
                  alt="Frequently Asked Questions"
                />
              </Col>
              <Col span={12} md={6}>
                <Title
                  order={2}
                  align="left"
                  className={classes.accordionTitle}
                >
                  Payment
                </Title>

                <Accordion
                  chevronPosition="right"
                  defaultValue="reset-password"
                  variant="separated"
                >
                  {paymentsFaq.map((item, index) => (
                    <Accordion.Item
                      className={classes.item}
                      key={index}
                      value={item.question}
                    >
                      <Accordion.Control>{item.question}</Accordion.Control>
                      <Accordion.Panel>{item.answer}</Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Grid>
          </Container>
        </div>

        <Container>
          <Text
            align="center"
            sx={{ fontSize: "2rem", fontWeight: 500 }}
            mb={20}
          >
            Did we not answer your question?
          </Text>
          <Group position="center">
            <Button size="xl" component={Link} to="/contact">
              Contact Us
            </Button>
          </Group>
        </Container>
      </Container>
    </section>
  );
};

export default FAQ;
