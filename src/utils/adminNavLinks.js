import {
  IconNotebook,
  IconUsers,
  IconShoppingCart,
  IconClipboardText,
  IconUserCircle,
  IconHome,
  IconFileZip,
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
    icon: IconShoppingCart,
    links: [{ label: 'View Orders', link: '/admin/orders/view' }],
  },
  {
    label: 'Reviews',
    icon: IconClipboardText,
    links: [{ label: 'View Reviews', link: '/admin/reviews/view' }],
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
    label: 'Shipment & Tracking',
    icon: IconHome,
    links: [
      { label: 'Shipment', link: '/admin/shipment' },
      { label: 'Inventory', link: '/admin/inventory' },
    ],
  },
  { label: 'Profile', icon: IconUserCircle, link: '/admin/profile' },

  { label: 'Store', icon: IconHome, link: '/' },
];

export default AdminNavLinks;
