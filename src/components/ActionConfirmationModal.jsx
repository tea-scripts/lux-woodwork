import { Box, Group, Modal, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';
import { useDispatch } from 'react-redux';

const ActionConfirmationModal = ({ onOk, onCancel, visible, _id }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      title="Confirm Action"
      opened={visible}
      onClose={() => dispatch(onCancel())}
      size="md"
      centered
      closeOnEscape
    >
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Text>
          <IconAlertTriangle size={25} color="#F08C00" />
        </Text>
        <Text>Are you sure you want to proceed with this action?</Text>
      </Box>

      <Group position="right">
        <Text
          onClick={() => {
            dispatch(onOk(_id));
            dispatch(onCancel());
          }}
          color="red"
          style={{ cursor: 'pointer' }}
        >
          Yes
        </Text>
        <Text
          onClick={() => dispatch(onCancel())}
          color="blue"
          style={{ cursor: 'pointer' }}
        >
          No
        </Text>
      </Group>
    </Modal>
  );
};
export default ActionConfirmationModal;
