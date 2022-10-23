import {
  Button,
  createStyles,
  Group,
  Image,
  Pagination,
  Paper,
  Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteReview,
  fetchUserReviews,
} from "../features/reviews/reviewsSlice";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  reviewContainer: {
    display: "flex",
    flexDirection: "column",

    "@media (min-width: 481px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  },

  reviewItem: {
    padding: "1rem",
    borderColor: "var(--prussian-blue-500)",
  },

  imgContainer: {
    marginRight: "1rem",
    flex: 1,
    marginBottom: "1rem",

    "@media (min-width: 481px)": {
      width: 220,
      marginRight: "1rem",
      flex: 1,
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
    return (
      <Paper
        className={classes.reviewItem}
        key={review._id}
        shadow="sm"
        p="lg"
        mb={20}
        withBorder
      >
        <div className={classes.reviewContainer}>
          <div className={classes.imgContainer}>
            <Image
              component={Link}
              to={`/products/${review.product._id}`}
              src={review.product.image}
            />
            <Button
              mt={8}
              color="yellow"
              onClick={() => {
                navigate({
                  pathname: `/review-product/${user._id}/${review.product._id}`,
                  search: `update=true`,
                });
              }}
              fullWidth
            >
              Update Review
            </Button>
            <Button
              mt={8}
              color="red"
              fullWidth
              onClick={() => dispatch(deleteReview(review._id))}
            >
              Remove Review
            </Button>
          </div>
          <div style={{ flex: 2 }}>
            <Text weight={500} mb={10}>
              {review.product.name}
            </Text>
            <Text weight={500} mb={10}>
              Rating: {review.rating}
            </Text>
            <Text mb={10}>
              <span style={{ fontWeight: 500 }}>Review:</span> {review.comment}
            </Text>
          </div>
        </div>
      </Paper>
    );
  });

  return (
    <>
      <Text sx={{ color: "#C0C0C0", fontSize: "1.1rem" }} mb={32}>
        My Reviews
      </Text>
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
