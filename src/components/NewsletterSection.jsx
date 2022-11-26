import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
  Container,
  CheckIcon,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import image from '../assets/newsletter.svg';
import {
  clearEmail,
  handleChange,
  subscribeToNewsLetter,
} from '../features/users/userSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.xl * 3,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'column-reverse',
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: '40%',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  body: {
    paddingRight: theme.spacing.xl * 4,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: 'flex',
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: '100%',
    flex: '1',
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

const NewsletterSection = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { email, isSubscribing, successState } = useSelector(
    (state) => state.users
  );

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(subscribeToNewsLetter({ email }));

    setTimeout(() => {
      dispatch(clearEmail());
    }, 1500);
  };

  return (
    <Container size={1200} p="1.25rem">
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>Wait a minute...</Title>
          <Text weight={500} size="lg" mb={5}>
            Subscribe to our newsletter!
          </Text>
          <Text size="sm" color="dimmed">
            You will never miss important product updates, latest news and
            community QA sessions. Our newsletter is once a week, every Sunday.
          </Text>

          <div className={classes.controls}>
            <TextInput
              placeholder="Your email"
              value={email}
              name="email"
              onChange={handleInput}
              disabled={isSubscribing}
              classNames={{ input: classes.input, root: classes.inputWrapper }}
            />
            <Button
              loading={isSubscribing}
              onClick={handleSubmit}
              className={classes.control}
              rightIcon={
                successState ? (
                  <CheckIcon style={{ width: 20, height: 20 }} />
                ) : null
              }
              color={successState ? 'teal' : 'blue'}
            >
              {successState ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </div>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
};

export default NewsletterSection;
