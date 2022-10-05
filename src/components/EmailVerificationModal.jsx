import { Modal, createStyles } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeVerificationModal } from '../features/users/userSlice';
import { GoVerified } from 'react-icons/go';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gridGap: theme.spacing.xs,

    p: {
      fontFamily: theme.fontFamily,
      textAlign: 'center',
    },
  },

  icon: {
    fontSize: '10rem',
    color: theme.colors.green[6],
    display: 'flex',
    justifyContent: 'center',
  },
}));

const EmailVerificationModal = () => {
  const { emailVerificationModal } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const { classes } = useStyles();

  return (
    <Modal
      opened={emailVerificationModal}
      onClose={() => dispatch(closeVerificationModal())}
      title="Registration Successful!"
      centered
    >
      <div className={classes.wrapper}>
        <div className={classes.icon}>
          <GoVerified />
        </div>
        <p>Please Check your email for a verification link.</p>
      </div>
    </Modal>
  );
};
export default EmailVerificationModal;
