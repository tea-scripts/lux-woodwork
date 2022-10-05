import { Modal, createStyles, TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  toggleForgotPasswordModal,
  forgotPassword,
  toggleSignInModal,
} from '../features/users/userSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gridGap: theme.spacing.xs,

    p: {
      fontFamily: theme.fontFamily,
      textAlign: 'center',
      marginTop: '1rem',
    },
  },

  icon: {
    fontSize: '10rem',
    color: theme.colors.green[6],
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ForgotPasswordModal = () => {
  const { forgotPasswordModal, isLoading } = useSelector(
    (store) => store.users
  );
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { classes } = useStyles();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please provide an email');
      return;
    }

    dispatch(forgotPassword({ email }));

    if (!isLoading) {
      setEmail('');
    }
  };

  return (
    <Modal
      opened={forgotPasswordModal}
      onClose={() => dispatch(toggleForgotPasswordModal())}
      title="Reset Password"
      centered
    >
      <div className={classes.wrapper}>
        <TextInput
          placeholder="Enter your email address"
          label="Email"
          radius="sm"
          withAsterisk
          mb={5}
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Button
          fullWidth
          mt={15}
          loading={isLoading}
          type="button"
          onClick={handleSubmit}
        >
          Get Password Reset Link
        </Button>

        <p>
          Already have an account?{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => {
              dispatch(toggleForgotPasswordModal());
              dispatch(toggleSignInModal());
            }}
          >
            Login
          </span>
        </p>
      </div>
    </Modal>
  );
};
export default ForgotPasswordModal;
