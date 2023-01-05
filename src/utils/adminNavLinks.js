import {
  IconNotebook,
  IconUsers,
  IconShoppingCart,
  IconClipboardText,
  IconUserCircle,
  IconHome,
  IconFileZip,
  IconList,
  IconTruckDelivery,
  IconMessageChatbot,
} from '@tabler/icons';

const AdminNavLinks = [
  {
    label: 'Products',
    icon: IconNotebook,
    initiallyOpened: true,
    links: [
      { label: 'Add Products', link: '/admin/products-add' },
      { label: 'View Products', link: '/admin/products-view' },
    ],
  },
  {
    label: 'Users',
    icon: IconUsers,
    links: [
      { label: 'Add Users', link: '/admin/users-add' },
      { label: 'View Users', link: '/admin/users-view' },
    ],
  },
  {
    label: 'Orders',
    icon: IconList,
    links: [
      // { label: 'Add Orders', link: '/admin/orders-add' },
      { label: 'Find Order', link: '/admin/orders-search' },
      // { label: 'Pending Orders', link: '/admin/orders-pending' },
      // { label: 'Canceled Orders', link: '/admin/orders-canceled' },
      { label: 'View Orders', link: '/admin/orders-view' },
    ],
  },
  {
    label: 'Reviews',
    icon: IconClipboardText,
    link: '/admin/reviews/view',
  },
  {
    label: 'Archives',
    icon: IconFileZip,
    links: [
      { label: 'Products', link: '/admin/archives/products' },
      { label: 'Reviews', link: '/admin/archives/reviews' },
      { label: 'Orders', link: '/admin/archives/orders' },
    ],
  },
  {
    label: 'Support',
    icon: IconMessageChatbot,
    links: [
      { label: 'Tickets', link: '/admin/support/tickets' },
      { label: 'Contact Us', link: '/admin/support/contact-us' },
    ],
  },
  {
    label: 'Shipment & Tracking',
    icon: IconTruckDelivery,
    links: [
      { label: 'Shipment', link: '/admin/shipment' },
      { label: 'Inventory', link: '/admin/inventory' },
    ],
  },
  { label: 'Profile', icon: IconUserCircle, link: '/admin/profile' },

  { label: 'Store', icon: IconHome, link: '/' },
];

export default AdminNavLinks;
