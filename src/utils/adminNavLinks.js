import {
  IconNotebook,
  IconUsers,
  IconShoppingCart,
  IconClipboardText,
  IconUserCircle,
  IconHelp,
  IconHome,
} from "@tabler/icons";

const AdminNavLinks = [
  {
    label: "Products",
    icon: IconNotebook,
    initiallyOpened: true,
    links: [
      { label: "Add Products", link: "/admin/products-add" },
      { label: "View Products", link: "/admin/products-view" },
    ],
  },
  {
    label: "Users",
    icon: IconUsers,
    links: [
      { label: "Add Users", link: "/admin/users-add" },
      { label: "View Users", link: "/admin/users-view" },
    ],
  },
  {
    label: "Orders",
    icon: IconShoppingCart,
    links: [{ label: "View Orders", link: "/admin/orders/view" }],
  },
  {
    label: "Reviews",
    icon: IconClipboardText,
    links: [{ label: "View Reviews", link: "/admin/reviews/view" }],
  },
  { label: "Profile", icon: IconUserCircle, link: "/admin/profile" },

  { label: "Support", icon: IconHelp, link: "/admin/support" },
  { label: "Store", icon: IconHome, link: "/" },
];

export default AdminNavLinks;
