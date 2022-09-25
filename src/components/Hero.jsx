import {
  Title,
  Text,
  Container,
  Overlay,
  createStyles,
  Box,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginTop: -60,
    paddingTop: 180,
    paddingBottom: 130,
    zIndex: 0,
    backgroundImage:
      'url(https://res.cloudinary.com/teascript/image/upload/v1663866947/Lux-Woodwork/steph-wilson-G4fICun7Q48-unsplash_f2equq.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 800,

    '@media (max-width: 520px)': {
      paddingTop: 150,
      paddingBottom: 50,
      minHeight: 600,
    },
  },

  inner: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      marginTop: theme.spacing.md,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },
}));

const Hero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <Box className={classes.inner}>
        <Title className={classes.title}>
          Find Your{' '}
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

        <HeroButtonWrapper>
          <div className="button-borders">
            <Link to="/products" className="primary-button">
              Shop Now
            </Link>
          </div>
        </HeroButtonWrapper>
      </Box>
    </div>
  );
};

const HeroButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .primary-button {
    color: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.05rem;
    border: 1px solid #0e1822;
    padding: 0.8rem 2.1rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cdefs%3E%3Cstyle%3E .shape %7B fill: %23FF4655 /* fill: %230E1822; */ %7D %3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpolygon class='shape' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
    background-color: #4dabf7;
    background-size: 200%;
    background-position: 200%;
    background-repeat: no-repeat;
    transition: 0.3s ease-in-out;
    transition-property: background-position, border, color;
    position: relative;
    z-index: 1;
    height: 3rem;
    display: inline-block;
  }

  .primary-button:hover {
    border: 1px solid var(--imperial-red-500);
    color: white;
    background-position: 40%;
  }

  .primary-button:before {
    content: '';
    position: absolute;
    background-color: #4dabf7;
    width: 0.2rem;
    height: 0.2rem;
    top: -1px;
    left: -1px;
    transition: background-color 0.15s ease-in-out;
  }

  .primary-button:hover:before {
    background-color: white;
  }

  .primary-button:hover:after {
    background-color: white;
  }

  .primary-button:after {
    content: '';
    position: absolute;
    background-color: var(--imperial-red-500);
    width: 0.3rem;
    height: 0.3rem;
    bottom: -1px;
    right: -1px;
    transition: background-color 0.15s ease-in-out;
  }

  .button-borders {
    position: relative;
    width: fit-content;
    height: fit-content;
  }

  .button-borders:before {
    content: '';
    position: absolute;
    width: calc(100% + 0.5em);
    height: 50%;
    left: -0.3em;
    top: -0.3em;
    border: 1px solid #4dabf7;
    border-bottom: 0px;
    /* opacity: 0.3; */
  }

  .button-borders:after {
    content: '';
    position: absolute;
    width: calc(100% + 0.5em);
    height: 50%;
    left: -0.3em;
    bottom: -0.3em;
    border: 1px solid #4dabf7;
    border-top: 0px;
    /* opacity: 0.3; */
    z-index: 0;
  }

  .shape {
    fill: #4dabf7;
  }
`;

export default Hero;
