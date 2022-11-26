import {
  Title,
  Text,
  Container,
  Overlay,
  createStyles,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import image1 from "../assets/images/landing-image.jpg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginTop: -60,
    paddingTop: 180,
    paddingBottom: 130,
    zIndex: 0,
    backgroundImage: `url(${image1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: 800,

    "@media (max-width: 520px)": {
      paddingTop: 150,
      paddingBottom: 50,
      minHeight: 600,
    },
  },

  inner: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 60,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      marginTop: theme.spacing.md,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },
}));

const Hero = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <Box className={classes.inner}>
        <Title className={classes.title}>
          Find Your{" "}
          <Text component="span" inherit className={classes.highlight}>
            Dream Furniture
          </Text>
        </Title>

        <Container size={640}>
          <Text
            size="lg"
            align="center"
            weight={500}
            className={classes.description}
          >
            Here at Lux Woodwork, our main focus is making comfortable yet
            stylish furniture for your home. We have a wide range of products to
            choose from, so you can find the perfect piece for your home.
          </Text>
        </Container>

        <HeroButton>
          <button onClick={() => navigate("/products")}>
            <span className="label">Shop Now</span>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </span>
          </button>
        </HeroButton>
      </Box>
    </div>
  );
};

const HeroButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  button {
    position: relative;
    font-size: 14px;
    letter-spacing: 3px;
    height: 3em;
    padding: 0 3em;
    border: none;
    background-color: #c41b54;
    color: #fff;
    text-transform: uppercase;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;

    &::before {
      content: "";
      display: block;
      position: absolute;
      z-index: 0;
      bottom: 0;
      left: 0;
      height: 0px;
      width: 100%;
      background: rgb(196, 27, 84);
      background: linear-gradient(
        90deg,
        rgba(196, 27, 84, 1) 20%,
        rgba(124, 7, 46, 1) 100%
      );
      transition: 0.2s;
    }

    .label {
      position: relative;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3em;
      width: 3em;
      position: absolute;
      top: 3em;
      right: 0;
      opacity: 0;
      transition: 0.4s;
    }

    &:hover::before {
      height: 100%;
    }

    &:hover .icon {
      top: 0;
      opacity: 1;
    }
  }
`;

export default Hero;
