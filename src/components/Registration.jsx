import {
  Anchor,
  Button,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { toggleSignInModal } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Registration = () => {
  const dispatch = useDispatch();
  const { isSigninIn } = useSelector((store) => store.users);
  const [isNewUser, setIsNewUser] = useState(false);

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
            placeholder="Enter your email address"
            label="Email Address"
            radius="sm"
            withAsterisk
            mb={5}
          />
          <PasswordInput
            placeholder="Enter your password"
            label="Password"
            mb={5}
            withAsterisk
          />
          {isNewUser ? (
            <PasswordInput
              placeholder="Confirm your password"
              label="Confirm Password"
              mb={5}
              withAsterisk
            />
          ) : (
            <Anchor>
              <Text align="right" sx={{ fontSize: 14 }}>
                Forgot your password?
              </Text>
            </Anchor>
          )}

          <Button fullWidth mt={15}>
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
