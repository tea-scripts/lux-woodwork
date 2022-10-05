import productImage4 from '../assets/images/product-4.jpg';
import productImage15 from '../assets/images/product-15.jpg';

const featuredProducts = [
  {
    id: 1,
    title: 'accent chair',
    price: 56000000,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
      'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
    featured: true,
    stock: 10,
    freeShipping: false,
    category: 'Kids',
  },
  {
    id: 2,
    title: 'albany sectional',
    price: 7500000,
    images: [productImage4],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
    featured: true,
    stock: 10,
    freeShipping: false,
    category: 'Dining',
  },
  {
    id: 3,
    title: 'utopia sofa',
    price: 1300000,
    images: [productImage15],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
    featured: true,
    stock: 10,
    freeShipping: true,
    category: 'Office',
  },
  {
    id: 4,
    title: 'lorem ipsum 4',
    price: 8876640,
    images: [
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
    featured: false,
    stock: 10,
    freeShipping: true,
    category: 'Kids',
  },
  {
    id: 5,
    title: 'lorem ipsum 5',
    price: 5600000,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
    featured: false,
    stock: 10,
    freeShipping: false,
    category: 'Kids',
  },
];

export default featuredProducts;
