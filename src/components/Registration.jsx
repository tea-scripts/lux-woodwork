import {
  Alert,
  Anchor,
  Button,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import {
  loginUser,
  registerUser,
  toggleForgotPasswordModal,
  toggleSignInModal,
} from '../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { IconAlertCircle } from '@tabler/icons';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const initialState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const Registration = () => {
  const dispatch = useDispatch();
  const { isSigninIn, isLoading } = useSelector((store) => store.users);
  const [isNewUser, setIsNewUser] = useState(false);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = values;
    if (!username || !password || (isNewUser && !confirmPassword && !email)) {
      toast.warning('Please provide all credentials');
      return;
    }

    if (!isNewUser) {
      dispatch(loginUser({ username, password }));
      return;
    }

    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    setValues(initialState);
  }, [isSigninIn]);

  return (
    <>
      <Modal
        opened={isSigninIn}
        onClose={() => {
          setIsNewUser(false);
          dispatch(toggleSignInModal());
        }}
        centered
        title={isNewUser ? 'Sign Up' : 'Sign In'}
      >
        {/* Modal content HERE 🙋‍♂️ */}
        <form>
          <TextInput
            placeholder="Enter your username"
            label="Username"
            radius="sm"
            withAsterisk
            mb={5}
            name="username"
            value={values.username}
            onChange={handleChange}
          />

          {isNewUser && (
            <TextInput
              placeholder="Enter your email address"
              label="Email Address"
              radius="sm"
              withAsterisk
              mb={5}
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          )}

          <PasswordInput
            placeholder="Enter your password"
            label="Password"
            mb={5}
            withAsterisk
            radius="sm"
            name="password"
            value={values.password}
            onChange={handleChange}
          />

          {isNewUser ? (
            <>
              <PasswordInput
                placeholder="Confirm your password"
                label="Confirm Password"
                mb={5}
                withAsterisk
                radius="sm"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />

              {values.confirmPassword &&
                values.password !== values.confirmPassword && (
                  <Alert icon={<IconAlertCircle size={16} />} color="red">
                    Passwords do not match
                  </Alert>
                )}
            </>
          ) : (
            <Anchor>
              <Text
                align="right"
                sx={{ fontSize: 14 }}
                onClick={() => dispatch(toggleForgotPasswordModal())}
              >
                Forgot your password?
              </Text>
            </Anchor>
          )}

          <Button
            fullWidth
            mt={15}
            loading={isLoading}
            type="button"
            onClick={handleSubmit}
          >
            {isNewUser ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <Text align="center" mt={15} sx={{ fontSize: 14 }}>
          {isNewUser ? 'Already have an account? ' : "Don't have an account? "}
          <Button
            variant="subtle"
            compact
            onClick={() => setIsNewUser((prevState) => !prevState)}
          >
            {isNewUser ? 'Sign In' : 'Sign Up'}
          </Button>
        </Text>
      </Modal>
    </>
  );
};

export default Registration;
