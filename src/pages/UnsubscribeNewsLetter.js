import { Box, Button, createStyles } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  handleChange,
  unsubscribeFromNewsLetter,
} from '../features/users/userSlice';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 'calc(100vh - (60px + 150px))',
    width: '100%',
    display: 'flex',
  },

  content: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    padding: theme.spacing.xl,
    margin: '0 auto',
    marginTop: 100,
    width: '30rem',
    height: '20rem',
    minHeight: '15rem',

    '& > div': {
      width: '100%',
      height: '100%',
    },

    '& form': {
      display: 'grid',
      gap: '1rem',
      width: '100%',
      padding: theme.spacing.sm,
      boxShadow: theme.shadows.sm,
      borderRadius: theme.radius.sm,
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    a: {
      textDecoration: 'none',
      width: 'fit-content',
      margin: '0 auto',
    },
  },

  text: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizes.xl,
    textAlign: 'center',
  },
}));

const UnsubscribeNewsLetter = () => {
  const dispatch = useDispatch();
  const { isUnsubscribing, successState } = useSelector((state) => state.users);
  const { classes } = useStyles();
  const query = useQuery();
  const navigate = useNavigate();

  const [email, setEmail] = useState(query.get('email'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(unsubscribeFromNewsLetter({ email }));

    setTimeout(() => {
      dispatch(handleChange({ name: 'successState', value: false }));
      navigate('/');
    }, 7000);
  };

  return (
    <section className={classes.wrapper}>
      <Box className={classes.content}>
        {successState ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',

              p: {
                maxWidth: '300px',
                textAlign: 'center',
              },
            }}
          >
            <div>
              <IconCircleCheck size={60} color="green" />
            </div>
            <h1 className={classes.text}>
              You have been unsubscribed from our newsletter
            </h1>
          </Box>
        ) : (
          <form>
            <h4 className={classes.text}>It's sad to see you go 😢</h4>
            <h4 className={classes.text}>
              Are you sure you want to unsubscribe?
            </h4>

            <Button
              type="submit"
              onClick={handleSubmit}
              color="red"
              variant="filled"
              fullWidth
              loading={isUnsubscribing}
            >
              Unsubscribe
            </Button>
          </form>
        )}
      </Box>
    </section>
  );
};

export default UnsubscribeNewsLetter;
