import { IoHome } from 'react-icons/io5';
import { HiInformationCircle } from 'react-icons/hi';
import { BiMessageDots } from 'react-icons/bi';
import { IoStorefrontSharp } from 'react-icons/io5';

const navLinks = [
  {
    id: 1,
    name: 'Home',
    url: '/',
    icon: <IoHome />,
  },
  {
    id: 2,
    name: 'About',
    url: '/about',
    icon: <HiInformationCircle />,
  },
  {
    id: 3,
    name: 'Our Store',
    url: '/products',
    icon: <IoStorefrontSharp />,
  },
  {
    id: 4,
    name: 'Contact',
    url: '/contact',
    icon: <BiMessageDots />,
  },
];

export default navLinks;
