import {
  Button,
  createStyles,
  Divider,
  Group,
  Image,
  Pagination,
  Paper,
  Spoiler,
  Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserReviews } from "../features/reviews/reviewsSlice";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import { IconEdit, IconEye } from "@tabler/icons";
import { DateTime } from "luxon";

const useStyles = createStyles((theme) => ({
  reviewContainer: {
    display: "flex",
    flexDirection: "column",

    "@media (min-width: 800px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  },

  reviewItem: {
    padding: "1rem",
  },

  imgContainer: {
    width: "100%",
    marginRight: "1rem",
    marginBottom: "1rem",

    "@media (min-width: 800px)": {
      width: 200,
      marginBottom: 0,
    },
  },
}));

const UserReviews = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { userReviews, isLoading, pages } = useSelector(
    (state) => state.reviews
  );
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserReviews(activePage));
  }, [activePage]);

  if (isLoading) {
    return <Loading />;
  }

  const reviewList = userReviews?.map((review) => {
    const date = DateTime.fromISO(review.createdAt);
    const readableDate = date.toLocaleString(DateTime.DATETIME_MED);
    return (
      <Paper
        className={classes.reviewItem}
        key={review._id}
        shadow="xs"
        mb={20}
        withBorder
      >
        <Text color="gray" size="sm" mb={16}>
          Review on {readableDate}
        </Text>

        <div className={classes.reviewContainer}>
          <div className={classes.imgContainer}>
            <Image src={review.product?.images[0]} />
            <Button
              mt={8}
              component={Link}
              to={`/products/${review.product._id}`}
              leftIcon={<IconEye />}
              fullWidth
            >
              View Product
            </Button>
            <Button
              mt={8}
              color="yellow"
              onClick={() => {
                navigate({
                  pathname: `/review-product/${review._id}/${review.product._id}`,
                  search: `update=true`,
                });
              }}
              leftIcon={<IconEdit />}
              fullWidth
            >
              Update Review
            </Button>
          </div>
          <div style={{ flex: 2 }}>
            <Text mb={10}>Rating: {review.rating}</Text>
            <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
              Review: {review.comment}
            </Spoiler>
          </div>
        </div>
      </Paper>
    );
  });

  return (
    <>
      <Text
        sx={{
          color: "var(--prussian-blue-500)",
          fontSize: "1.1rem",
          fontWeight: 500,
        }}
      >
        My Reviews
      </Text>

      <Divider mt={16} mb={32} />

      {reviewList}
      {pages > 1 && (
        <Group position="right" mt={32}>
          <Pagination page={activePage} onChange={setPage} total={pages} />
        </Group>
      )}
    </>
  );
};

export default UserReviews;
