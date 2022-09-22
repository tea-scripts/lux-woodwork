import { Modal } from '@mantine/core';
import { toggleSignInModal } from '../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Registration = () => {
  const dispatch = useDispatch();
  const { isSigninIn } = useSelector((store) => store.users);

  return (
    <>
      <Modal
        opened={isSigninIn}
        onClose={() => dispatch(toggleSignInModal())}
        title="Sign In"
      >
        {/* Modal content HERE 🙋‍♂️ */}
        <h3>Registration and Login Form </h3>
      </Modal>
    </>
  );
};

export default Registration;
