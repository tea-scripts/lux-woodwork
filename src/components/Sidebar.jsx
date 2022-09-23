import { Drawer, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/navigation/navSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.navigation);

  return (
    <Drawer
      opened={isSidebarOpen}
      onClose={() => dispatch(toggleSidebar())}
      title="Lux Woodwork"
      padding="xl"
      size="lg"
      position="right"
    >
      {/* Sidebar content */}
      <Text>This is the sidebar navigation pane</Text>
    </Drawer>
  );
};
export default Sidebar;
