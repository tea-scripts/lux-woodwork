import {
  Alert,
  Anchor,
  Box,
  Button,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import {
  loginUser,
  registerUser,
  toggleForgotPasswordModal,
  toggleSignInModal,
} from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons";
import { toast } from "react-toastify";
import { useEffect } from "react";

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const Registration = () => {
  const dispatch = useDispatch();
  const { isSigninIn, isLoading } = useSelector((store) => store.users);
  const [isNewUser, setIsNewUser] = useState(false);
  const [values, setValues] = useState(initialState);
  const [errorMessages, setErrorMessages] = useState([]);
  const [typedPasswordAtleastOnce, setTypedPasswordAtleastOnce] =
    useState(false);

  const handleErrorMessages = useCallback(() => {
    const hasMinLength = new RegExp("^(?=.{8,})");
    const hasOneUppercaseChar = new RegExp("^(?=.*[A-Z])");
    const hasOneLowerCaseChar = new RegExp("^(?=.*[a-z])");
    const hasOneDigit = new RegExp("^(?=.*[0-9])");
    const hasOneSpecialChar = new RegExp("^(?=.*[!@#$%^&*])");

    const message = []; /* {
      text: string,
      type: "success" | "error"
    } */
    const password = values.password;
    const confirmPassword = values.confirmPassword;

    if (!hasMinLength.test(password)) {
      message.push({
        text: "Password must contain at least 8 characters",
        type: "error",
      });
    } else {
      message.push({
        text: "Password contains at least 8 characters",
        type: "success",
      });
    }

    if (!hasOneUppercaseChar.test(password)) {
      message.push({
        text: "Password must contain at least one uppercase character",
        type: "error",
      });
    } else {
      message.push({
        text: "Password contains at least one uppercase character",
        type: "success",
      });
    }

    if (!hasOneLowerCaseChar.test(password)) {
      message.push({
        text: "Password must contain at least one lowercase character",
        type: "error",
      });
    } else {
      message.push({
        text: "Password contains at least one lowercase character",
        type: "success",
      });
    }

    if (!hasOneDigit.test(password)) {
      message.push({
        text: "Password must contain at least one digit",
        type: "error",
      });
    } else {
      message.push({
        text: "Password contains at least one digit",
        type: "success",
      });
    }

    if (!hasOneSpecialChar.test(password)) {
      message.push({
        text: "Password must contain at least one special character",
        type: "error",
      });
    } else {
      message.push({
        text: "Password contains at least one special character",
        type: "success",
      });
    }

    if (password === confirmPassword && password.length !== 0) {
      message.push({
        text: "Passwords match",
        type: "success",
      });
    } else {
      message.push({
        text: "Passwords do not match",
        type: "error",
      });
    }

    setErrorMessages(message);
  }, [values.password, values.confirmPassword]);

  const handleChange = (e) => {
    if (isNewUser && e.target.name === "password") {
      setTypedPasswordAtleastOnce(true);
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = values;
    if (!username || !password || (isNewUser && errorMessages.length > 0)) {
      toast.warning("Please provide all credentials");
      return;
    }

    if (!isNewUser) {
      dispatch(loginUser({ username, password }));
      return;
    }

    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (isNewUser && typedPasswordAtleastOnce) {
      handleErrorMessages();
    }
  }, [isNewUser, typedPasswordAtleastOnce, handleErrorMessages]);

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
        title={isNewUser ? "Sign Up" : "Sign In"}
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
              {typedPasswordAtleastOnce &&
                errorMessages.map((message) => (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                    key={message._id}
                  >
                    {message.type === "error" ? (
                      <IconAlertCircle size={12} color="red" />
                    ) : (
                      <IconCircleCheck size={12} color="green" />
                    )}
                    <Text
                      color={message.type === "error" ? "red" : "green"}
                      size={12}
                    >
                      {message.text}
                    </Text>
                  </Box>
                ))}
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
            type="submit"
            onClick={handleSubmit}
          >
            {isNewUser ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <Text align="center" mt={15} sx={{ fontSize: 14 }}>
          {isNewUser ? "Already have an account? " : "Don't have an account? "}
          <Button
            variant="subtle"
            compact
            onClick={() => setIsNewUser((prevState) => !prevState)}
          >
            {isNewUser ? "Sign In" : "Sign Up"}
          </Button>
        </Text>
      </Modal>
    </>
  );
};

export default Registration;
