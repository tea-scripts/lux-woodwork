export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  }).format(number / 100);
};

export const reviews = [
  {
    name: 'John Doe',
    avatar: 'https://avatars0.githubusercontent.com/u/9947422?s=460&v=4',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nisl, vel aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nisl, vel aliquet nunc nisl eget nunc.',
    postedAt: '6 days ago',
  },
  {
    name: 'Peter Parker',
    avatar: 'https://avatars0.githubusercontent.com/u/9947422?s=460&v=4',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nisl, vel aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nisl, vel aliquet nunc nisl eget nunc.',
    postedAt: '2 days ago',
  },
  {
    name: 'Bruce Wayne',
    avatar: 'https://avatars0.githubusercontent.com/u/9947422?s=460&v=4',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nisl, vel aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nisl, vel aliquet nunc nisl eget nunc.',
    postedAt: '5 hours ago',
  },
];
