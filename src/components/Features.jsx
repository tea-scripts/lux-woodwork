import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  ThemeIcon,
  Grid,
  Col,
  Container,
} from '@mantine/core';

import {
  IconArmchair2,
  IconBrandAirtable,
  IconButterfly,
  IconCategory2,
} from '@tabler/icons';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: '1rem 0',

    '& .grid-container': {
      justifyContent: 'center',
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    span: {
      color: theme.colors.blue[6],
    },
  },
}));

const features = [
  {
    icon: IconButterfly,
    title: 'Comfort and Safety',
    description: `With respect to staffing furniture, it’s important for the chairs and desks they use to be ergonomic to reduce work staff fatigue and back pain.This ensures that replacement parts can be acquired quickly and easily.`,
  },
  {
    icon: IconCategory2,
    title: 'Usability',
    description: `For many people, easy-to-use furniture is always a plus. This is particularly true for furniture that is utilized by people coming from different walks of life on a daily or frequent basis.`,
  },
  {
    icon: IconArmchair2,
    title: 'Durability',
    description: `The sturdiness of furniture contributes to its overall quality. Reliable furniture does not need repetitive repairs in a short course of time.Ultimately, sturdy furniture helps save money as it can be used throughout the years without having to be repaired.`,
  },
  {
    icon: IconBrandAirtable,
    title: 'Classicality',
    description: `The modesty or simplicity of furniture can be spotted out by how it is, in terms of design, not too much and not too dull either. Simplicity can be ambiguous such that it doesn't mean the same thing for many people`,
  },
];

const Features = () => {
  const { classes } = useStyles();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);

    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container size={1200}>
      <div className={classes.wrapper}>
        <Grid
          gutter={dimensions.width < 678 ? 40 : 80}
          m="0 auto"
          className="grid-container"
        >
          <Col span={dimensions.width > 641 ? 8 : 12} md={5}>
            <Title className={classes.title} order={2}>
              Every Furniture we build is <span> unique </span>
              and
              <span> personal.</span>
            </Title>
            <Text color="dimmed">
              We are a furniture company that has been in the business for over
              20 years. We have provided furniture for many companies and
              individuals. We have a wide range of furniture that can be used
              for both commercial and residential purposes.
            </Text>

            {/* <Grid> */}
            <SimpleGrid
              cols={2}
              mt="1rem"
              breakpoints={[{ minWidth: 678, cols: 3 }]}
            >
              <div>
                <Title size="h2" weight={600}>
                  50+
                </Title>
                <Text size=".89rem" color="dimmed">
                  Years of Experience
                </Text>
              </div>
              <div>
                <Title size="h2" weight={600}>
                  100+
                </Title>
                <Text size=".89rem" color="dimmed">
                  Happy Customers
                </Text>
              </div>
              <div>
                <Title size="h2" weight={600}>
                  1000+
                </Title>
                <Text size=".89rem" color="dimmed">
                  Furniture Sold
                </Text>
              </div>
            </SimpleGrid>
            {/* </Grid> */}
          </Col>
          <Col span={dimensions.width > 641 ? 8 : 12} md={7}>
            <SimpleGrid
              cols={2}
              spacing={30}
              breakpoints={[{ maxWidth: 'md', cols: 1 }]}
            >
              {items}
            </SimpleGrid>
          </Col>
        </Grid>
      </div>
    </Container>
  );
};

export default Features;
