import { Box, Button, Card, createStyles } from '@mantine/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

  icon: {
    fontSize: '10rem',
    color: theme.colors.green[6],
    display: 'flex',
    justifyContent: 'center',
  },
}));

const EmailVerification = () => {
  const { isLoading } = useSelector((state) => state.users);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);

    try {
      await customFetch.post('/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  // Verify token on page load

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect to homepage after 10 seconds

  useEffect(() => {
    let timer = setTimeout(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    if (seconds === 0 && !error) {
      navigate('/');
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, navigate]);

  if (loading) {
    return (
      <section className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.text}>Verifying your email...</h1>
        </div>
      </section>
    );
  }

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
        <Card shadow="md">
          <p className={classes.text}>Your email Has been Verified!</p>
          <div className={classes.icon}>
            <GoVerified />
          </div>
          {!isLoading && !loading && !error && (
            <p className={classes.text}>
              Redirecting to Home Page in {seconds} seconds.
            </p>
          )}
        </Card>
      </Box>
    </section>
  );
};

export default EmailVerification;
