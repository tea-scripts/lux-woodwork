import {
  Button,
  createStyles,
  Group,
  Image,
  SimpleGrid,
  Textarea,
  Title,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { StarRating } from "../components";
import Loading from "../components/Loading";
import { fetchProduct } from "../features/products/productsSlice";
import {
  createReview,
  updateReview,
  fetchSingleReview,
} from "../features/reviews/reviewsSlice";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "calc(100vh - (60px + 150px))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "90vw",
    margin: " 0 auto",
    maxWidth: 1200,
    padding: "3rem 0",
  },

  image: {
    "@media (min-width: 800px)": {
      width: 450,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
  },
}));

const ReviewProduct = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reviewId, productId } = useParams();
  const { review, isLoading } = useSelector((state) => state.reviews);
  const { product, isLoading: productIsLoading } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.users);
  const [searchParams] = useSearchParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      rating,
      comment,
      user: user._id,
      product: productId,
    };
    if (searchParams.get("update")) {
      dispatch(updateReview({ ...review, reviewId }));
    } else {
      dispatch(createReview(review));
    }
    navigate("/user/reviews");
  };

  useEffect(() => {
    if (reviewId) {
      dispatch(fetchSingleReview(reviewId));
    } else {
      dispatch(fetchProduct(productId));
    }
  }, []);

  useEffect(() => {
    if (reviewId) {
      setRating(review?.rating);
      setComment(review?.comment);
      setImage(review?.product?.images[0] ? review?.product.images[0] : "");
    } else {
      setImage(product.images ? product.images[0] : "");
    }
  }, [review, product]);

  if (isLoading || productIsLoading) {
    return <Loading />;
  }

  return (
    <section className={classes.wrapper}>
      <Title order={2} align="center" mb={16}>
        Leave your review
      </Title>
      <StarRating rating={rating} setRating={setRating} />

      <SimpleGrid
        mt={16}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <div className={classes.image}>
          <Image radius="md" src={image} alt="product image" />
        </div>

        <form onSubmit={handleSubmit}>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.currentTarget.value)}
            placeholder="What did you like about the product?"
            label="Your Review"
            size="md"
            minRows={8}
            withAsterisk
          />

          <Group position="right" mt={16}>
            <Button type="submit" leftIcon={<IconSend />}>
              Submit
            </Button>
          </Group>
        </form>
      </SimpleGrid>
    </section>
  );
};

export default ReviewProduct;
