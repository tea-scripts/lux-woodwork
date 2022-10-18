import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, { stars, reviewsCount }) => ({
  stars: {
    display: 'flex',
    alignItems: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    marginBottom: theme.spacing.xs,
  },

  star: {
    marginRight: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '#ffb900',
    fontSize: '1.1rem',
  },

  starsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  reviewsCount: {
    marginLeft: theme.spacing.xs,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
}));

const Stars = ({ stars, reviewsCount }) => {
  const { classes } = useStyles({ stars, reviewsCount }, null, 'stars');
  return (
    <div className={classes.stars}>
      <div className={classes.starsWrapper}>
        {Array.from({ length: 5 }, (_, i) => {
          if (stars - i >= 1) {
            return <BsStarFill key={i} className={classes.star} />;
          }

          if (stars - i >= 0.5) {
            return <BsStarHalf key={i} className={classes.star} />;
          }

          return <BsStar key={i} className={classes.star} />;
        })}
      </div>
      {reviewsCount && (
        <span className={classes.reviewsCount}>({reviewsCount})</span>
      )}
    </div>
  );
};
export default Stars;
