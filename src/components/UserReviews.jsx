import {
  Button,
  Container,
  createStyles,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import image1 from "../assets/images/product-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserReviews } from "../features/reviews/reviewsSlice";
import Loading from "./Loading";
import { Link } from "react-router-dom";

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
  const { userReviews, isLoading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchUserReviews());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  console.log(userReviews);

  const reviewList = userReviews.map((review) => {
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
            <Image src={review.product.image} />
            <Text my={20} align="center">
              {review.product.name}
            </Text>
            <Button
              fullWidth
              component={Link}
              to={`/products/${review.product._id}`}
            >
              View Product
            </Button>
          </div>
          <div style={{ flex: 2 }}>
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
    </>
  );
};

export default UserReviews;
