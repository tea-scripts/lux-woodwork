import {
  Container,
  Grid,
  SimpleGrid,
  createStyles,
  Text,
  Title,
  Card,
} from '@mantine/core';
import familyImage from '../assets/images/happy-family.jpg';
import { MdVerified } from 'react-icons/md';
import { TbTruckReturn } from 'react-icons/tb';

const useStyles = createStyles((theme) => ({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
  },

  title: {
    marginBottom: theme.spacing.md,
    fontFamily: `${theme.fontFamily}`,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      textAlign: 'center',
    },
  },

  card: {
    height: '100%',
    fontSize: theme.breakpoints.sm ? '0.9rem' : '1.2rem',
  },

  heading: {
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    fontFamily: `${theme.fontFamily}`,
    fontWeight: 600,

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      fontSize: '1.2rem',
    },
  },

  iconGreen: {
    marginRight: theme.spacing.xs,
    color: theme.colors.green[6],
    fontSize: '1.5rem',
    marginBottom: '-0.3rem',
  },

  iconBlue: {
    marginRight: theme.spacing.xs,
    color: theme.colors.blue[6],
    fontSize: '1.5rem',
    marginBottom: '-0.3rem',
  },
}));

const CustomerReview = () => {
  const { classes } = useStyles();

  return (
    <Container my="md" p="1.25rem" size={1200}>
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
      >
        <img src={familyImage} className={classes.image} alt="happy family" />

        <Grid gutter="md" align="stretch">
          <Grid.Col>
            <Card shadow="sm" radius="md" className={classes.card}>
              <Title order={2} className={classes.title} mb=".7rem">
                Satisfaction is guaranteed.
              </Title>
              <Text sx={{ fontSize: '0.9rem' }}>
                We are committed to providing the highest quality of service to
                our customers. We are proud to have earned the trust of our
                customers and we are committed to maintaining that trust.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col lg={6} md={12}>
            <Card shadow="sm" radius="md" className={classes.card}>
              <Text className={classes.heading}>
                <span>
                  <MdVerified className={classes.iconGreen} />
                </span>{' '}
                Product Verification
              </Text>
              This badge symbolizes that the product has been verified by our
              team of experts and you will get exactly what is listed.
            </Card>
          </Grid.Col>

          <Grid.Col lg={6} md={12}>
            <Card shadow="sm" radius="md" className={classes.card}>
              <Text className={classes.heading}>
                <span>
                  <TbTruckReturn className={classes.iconBlue} />
                </span>
                Easy Return Policy
              </Text>
              We offer a 30-day return policy for all products. If you are not
              satisfied with your purchase, you can return it for a full refund.
            </Card>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};
export default CustomerReview;
