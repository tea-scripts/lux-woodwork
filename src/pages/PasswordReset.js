import { Box, Button, createStyles, PasswordInput } from '@mantine/core';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/axios';

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

const PasswordReset = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { classes } = useStyles();
  const [password, setPassword] = useState('');
  const query = useQuery();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    try {
      await customFetch.post('/auth/reset-password', {
        password,
        token: query.get('token'),
        email: query.get('email'),
      });
      toast.success('Password reset successful!');
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setError(true);
    }
    setLoading(false);
    setPassword('');
  };

  if (error) {
    return (
      <section className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.text}>
            Something went wrong. Please try again.
          </h1>
          <Link to="/">
            <Button color="red" variant="outline">
              Go to Home
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={classes.wrapper}>
      <Box className={classes.content}>
        <form>
          <h4 className={classes.text}>Reset your password</h4>
          <PasswordInput
            placeholder="Enter new password"
            label="Password"
            mb={5}
            withAsterisk
            radius="sm"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            color="blue"
            variant="filled"
            fullWidth
            loading={loading}
          >
            Reset Password
          </Button>
        </form>
      </Box>
    </section>
  );
};
export default PasswordReset;
