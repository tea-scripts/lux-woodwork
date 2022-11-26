import {
  Container,
  createStyles,
  Image,
  Overlay,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconChecks,
  IconEye,
  IconHeartHandshake,
  IconMedal,
  IconTarget,
  IconThumbUp,
} from "@tabler/icons";
import image1 from "../assets/images/about-image-1.png";
import image2 from "../assets/images/about-image-2.png";
import image3 from "../assets/images/about-image-3.jpg";

const useStyles = createStyles((theme) => ({
  container: {
    marginLeft: 0,
    marginRight: 0,
  },

  image_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${image3})`,
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

  sub_title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 26,
    fontWeight: 600,
    color: "var(--prussian-blue-500)",
    marginBottom: 30,

    "@media (min-width: 1000px)": {
      fontSize: 26,
      textAlign: "left",
    },
  },

  text: {
    fontSize: 18,
    fontWeight: 400,
    width: "initial",
    marginBottom: 30,

    "@media (min-width: 1000px)": {
      textAlign: "left",
      maxWidth: 400,
    },
  },

  content_column: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    maxWidth: 1200,

    "@media (min-width: 1000px)": {
      paddingLeft: 120,
      paddingRight: 120,
      marginBottom: 96,
    },
  },

  image_one: {
    boxShadow: "var(--shadow)",
    marginBottom: 96,
    maxWidth: 800,

    "@media (min-width: 1000px)": {
      marginBottom: 0,
    },
  },

  image_two: {
    boxShadow: "var(--shadow)",
    marginBottom: 20,
    maxWidth: 800,

    "@media (min-width: 1000px)": {
      marginBottom: 0,
    },
  },

  company_statements_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  sub_title_2: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 26,
    fontWeight: 600,
    color: "var(--prussian-blue-500)",
    textAlign: "center",
    marginBottom: 10,

    "@media (min-width: 1000px)": {
      fontSize: 26,
    },
  },

  sub_title_3: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 20,
    fontWeight: 600,
    color: "var(--gray)",
    textAlign: "center",
    marginBottom: 10,

    "@media (min-width: 1000px)": {
      fontSize: 20,
    },
  },

  text_2: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: "center",
    width: "initial",
    marginBottom: 10,
  },

  core_values_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  paper_style: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  flex_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    "@media (min-width: 1000px)": {
      flexDirection: "row",
    },
  },
}));

const imageLinks = [
  "https://res.cloudinary.com/dtyzbmtlz/image/upload/v1664179826/about-image-1_fbte82.png",
  "https://res.cloudinary.com/dtyzbmtlz/image/upload/v1664191210/about-img-2_sk5bxm.png",
];

const About = () => {
  const { classes } = useStyles();

  return (
    <section className={classes.container}>
      <Container
        style={{ maxWidth: "100%" }}
        className={classes.image_container}
      >
        <Overlay opacity={0.5} color="#000" zIndex={1} sx={{ height: 460 }} />
        <Title className={classes.title} order={2}>
          Want to know more about us?
        </Title>
      </Container>

      <Container
        className={classes.flex_container}
        sx={{ maxWidth: 1280, marginBottom: 96 }}
      >
        <div style={{ flex: 1 }}>
          <Title className={classes.sub_title} order={3}>
            Our Company
          </Title>
          <Text className={classes.text}>
            Lux Woodwork is your destination for unique furnishings and decors
            that bring personality to your spaces.
          </Text>
          <Text className={classes.text}>
            We aim to offer our customers a variety of the latest furnishings.
            We have come a long way, so we know exactly which direction to take
            when supplying you with high quality yet budget-friendly products.
            We offer all of this while providing excellent customer service and
            friendly support.
          </Text>
          <Text className={classes.text}>
            If you’re looking for something new, you’re in the right place. We
            strive to be industrious and innovative, offering our customers
            something they want, putting their desires at the top of our
            priority list.
          </Text>
        </div>
        <div style={{ flex: 1 }}>
          <Image
            src={image1}
            className={classes.image_one}
            alt="images of furnitures"
          />
        </div>
      </Container>

      <Container
        className={classes.flex_container}
        sx={{ maxWidth: 1280, marginBottom: 96 }}
      >
        <div style={{ flex: 1 }}>
          <Title className={classes.sub_title} order={3}>
            Our Story
          </Title>
          <Text className={classes.text}>
            Lux Woodwork started as a small furniture business in the city of
            Las Pinas in 1995. Our passion for building unique and personal
            furnitures drove our company. Since then, our furnitures have
            reached and decorated thousands of homes.
          </Text>
          <Text className={classes.text}>
            Our passion for making furniture means that we provide our customers
            with nothing but the highest quality of products that are guaranteed
            to meet their needs and keep them satisfied.
          </Text>
          <Text className={classes.text}>
            With a motivated team, we strive to be the creative minds that bring
            a smile to your face. That’s why we’re always looking for innovative
            new ways to get the best to you.
          </Text>
        </div>
        <div style={{ flex: 1 }}>
          <Image
            src={image2}
            className={classes.image_two}
            alt="images of people"
          />
        </div>
      </Container>

      <Title className={classes.sub_title_2} order={3} mb={30}>
        Mission & Vision
      </Title>
      <Container
        className={classes.flex_container}
        sx={{ maxWidth: 1280, marginBottom: 96 }}
      >
        <SimpleGrid
          cols={2}
          breakpoints={[
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          <Paper shadow="md" p="xl">
            <ThemeIcon size="xl" align="center">
              <IconTarget />
            </ThemeIcon>
            <Title className={classes.sub_title_3} weight={500} align="center">
              Our Mission
            </Title>
            <Text className={classes.text_2}>
              To provide an assortment of comfortable and well-designed
              furnishing products to help you find your dream furniture.
            </Text>
          </Paper>
          <Paper shadow="md" p="xl">
            <ThemeIcon size="xl">
              <IconEye />
            </ThemeIcon>
            <Title className={classes.sub_title_3} weight={500} align="center">
              Our Vision
            </Title>
            <Text className={classes.text_2}>
              To be a leading furniture company in the Philippines by providing
              customers the furniture that best fits them.
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>

      <Title className={classes.sub_title_2} order={3} mb={30}>
        Core Values
      </Title>
      <Container
        className={classes.flex_container}
        sx={{ maxWidth: 1280, marginBottom: 96 }}
      >
        <SimpleGrid
          cols={2}
          breakpoints={[
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          <Paper className={classes.core_values_container} shadow="md" p="xl">
            <ThemeIcon mb={15} size="lg" align="center">
              <IconMedal />
            </ThemeIcon>
            <Title
              className={classes.sub_title_3}
              size="lg"
              weight={500}
              align="center"
            >
              Quality
            </Title>
            <Text className={classes.text_2}>
              We strive to provide high-quality services and products that meet
              the expectations and requirements of our customers.
            </Text>
          </Paper>
          <Paper className={classes.core_values_container} shadow="md" p="xl">
            <ThemeIcon mb={15} size="lg" align="center">
              <IconHeartHandshake />
            </ThemeIcon>
            <Title
              className={classes.sub_title_3}
              size="lg"
              weight={500}
              align="center"
            >
              Customer First
            </Title>
            <Text className={classes.text_2}>
              We strive to understand our customer’s needs and provide them with
              the best furnitures available.
            </Text>
          </Paper>
          <Paper className={classes.core_values_container} shadow="md" p="xl">
            <ThemeIcon mb={15} size="lg" align="center">
              <IconThumbUp />
            </ThemeIcon>
            <Title
              className={classes.sub_title_3}
              size="lg"
              weight={500}
              align="center"
            >
              Honesty and Integrity
            </Title>
            <Text className={classes.text_2}>
              We are honest, transparent and committed to doing what’s best for
              our customers and our company.
            </Text>
          </Paper>
          <Paper className={classes.core_values_container} shadow="md" p="xl">
            <ThemeIcon mb={15} size="lg" align="center">
              <IconChecks />
            </ThemeIcon>
            <Title
              className={classes.sub_title_3}
              size="lg"
              weight={500}
              align="center"
            >
              Accountability
            </Title>
            <Text className={classes.text_2}>
              We take ownership for the quality of our work and take pride in
              what we deliver as a team.
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>
    </section>
  );
};

export default About;
