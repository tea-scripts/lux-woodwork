import { Container, createStyles, Group, Paper, Title } from '@mantine/core';
import { Outlet, useLocation } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 'calc(100vh - (60px + 70px))',
    display: 'flex',
    flexDirection: 'column',
    width: '90vw',
    margin: ' 0 auto',
    maxWidth: 1200,
    padding: '3rem 0',

    '@media (min-width: 481px)': {
      flexDirection: 'row',
    },
  },

  container: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
}));

const User = () => {
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <section className={classes.wrapper}>
      <UserSidebar location={location.pathname} />

      <Container className={classes.container} fluid>
        <Group mb={20} noWrap>
          <Title order={2} sx={{ color: 'var(--prussian-blue-500)' }}>
            My Account
          </Title>
        </Group>
        <Paper
          shadow="xs"
          p="xl"
          withBorder
          sx={{ backgroundColor: '#fff', minHeight: 420 }}
        >
          <Outlet />
        </Paper>
      </Container>
    </section>
  );
};

export default User;
