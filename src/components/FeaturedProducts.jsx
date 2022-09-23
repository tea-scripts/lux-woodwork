import {
  Box,
  Container,
  Title,
  Card,
  Image,
  Text,
  Badge,
  Group,
  SimpleGrid,
} from '@mantine/core';
import styled from 'styled-components';
import productImage2 from '../assets/images/product-2.jpg';
import productImage4 from '../assets/images/product-4.jpg';
import productImage15 from '../assets/images/product-15.jpg';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  return (
    <Container size={1200}>
      <Wrapper>
        <Title order={2}>Top Products of the Week</Title>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: 678, cols: 2 },
            { minWidth: 992, cols: 3 },
          ]}
        >
          <Box component={Link} to="/">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={productImage2} height={280} alt="Norway" />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500} transform="capitalize">
                  accent chair
                </Text>
                <Badge color="pink" variant="light">
                  Featured
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium aliquam voluptas placeat atque, enim reiciendis non
                pariatur? Repudiandae, architecto nostrum?
              </Text>

              <Text color="dimmed">$56,000</Text>
            </Card>
          </Box>

          <Box component={Link} to="/">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={productImage4} height={280} alt="Norway" />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500} transform="capitalize">
                  albany sectional
                </Text>
                <Badge color="pink" variant="light">
                  Featured
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium aliquam voluptas placeat atque, enim reiciendis non
                pariatur? Repudiandae, architecto nostrum?
              </Text>

              <Text color="dimmed">$56,000</Text>
            </Card>
          </Box>

          <Box component={Link} to="/">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={productImage15} height={280} alt="Norway" />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500} transform="capitalize">
                  utopia sofa
                </Text>
                <Badge color="pink" variant="light">
                  Featured
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium aliquam voluptas placeat atque, enim reiciendis non
                pariatur? Repudiandae, architecto nostrum?
              </Text>

              <Text color="dimmed">$56,000</Text>
            </Card>
          </Box>
        </SimpleGrid>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.section`
  padding: 1.25rem;

  h2 {
    margin-bottom: 1.25rem;
  }

  div {
    margin-bottom: 1.25rem;
  }
`;

export default FeaturedProducts;
