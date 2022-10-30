/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  createStyles,
  Group,
  Image,
  Textarea,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { StarRating } from '../components';
import Loading from '../components/Loading';
import { fetchProduct } from '../features/products/productsSlice';
import { createReview, updateReview } from '../features/reviews/reviewsSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 'calc(100vh - (60px + 150px))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    width: '90vw',
    margin: ' 0 auto',
    maxWidth: 1200,
    padding: '3rem 0',
  },
}));

const ReviewProduct = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, productId } = useParams();
  const { userReviews, isLoading } = useSelector((state) => state.reviews);
  const [searchParams] = useSearchParams();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState('');
  const [reviewId, setReviewId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      rating,
      comment,
      user: userId,
      product: productId,
    };

    if (searchParams.get('update')) {
      const modifiedReview = {
        ...review,
        reviewId,
      };
      console.log('modifiedReview', modifiedReview);
      dispatch(updateReview(modifiedReview));
    } else {
      dispatch(createReview(review));
    }

    navigate('/user/reviews');
  };

  useEffect(() => {
    if (searchParams.get('update')) {
      const review = userReviews.find(
        (review) => review.product.id === productId
      );
      setReviewId(review._id);
      setRating(review.rating);
      setComment(review.comment);
      setImage(review.product.images[0]);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={classes.wrapper}>
      <Title order={2} align="center" mb={16}>
        Leave your review
      </Title>
      <StarRating rating={rating} setRating={setRating} />

      <div
        style={{
          width: 450,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Image radius="md" src={image} alt="product image" />
      </div>

      <form onSubmit={handleSubmit}>
        <Textarea
          value={comment}
          onChange={(event) => setComment(event.currentTarget.value)}
          placeholder="What did you like about the product?"
          label="Your Review"
          size="md"
          minRows={4}
          sx={{ width: '450px' }}
          withAsterisk
        />

        <Group position="right" mt={16}>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </section>
  );
};

export default ReviewProduct;
