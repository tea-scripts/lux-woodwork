import React, { useEffect } from 'react';
import {
  ActionIcon,
  Container,
  createStyles,
  Group,
  Table,
  Text,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { IconArchive, IconTrashX } from '@tabler/icons';
import {
  archiveReview,
  deleteReview,
  fetchReviews,
  togggleActionConfirmModal,
} from '../features/reviews/reviewsSlice';
import { useState } from 'react';
import ActionConfirmationModal from './ActionConfirmationModal';

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
  },

  inner: {
    maxWidth: 1200,
  },

  title: {
    color: 'var(--prussian-blue-500)',
    fontSize: '1.3rem',
    paddingTop: 5,
    marginBottom: '2rem',
  },
}));

const AdminViewReviews = () => {
  const { classes } = useStyles();
  const [itemId, setItemId] = useState(null);
  const { reviews, isLoading, actionConfirmModal } = useSelector(
    (state) => state.reviews
  );
  const dispatch = useDispatch();

  const rows = reviews
    .filter(
      (review) => review.isArchived === false && review.isDeleted === false
    )
    .map((review, index) => {
      const {
        user: { first_name, last_name },
        product,
        rating,
        comment,
        _id,
      } = review;
      return (
        <tr key={_id}>
          <td>{index + 1}</td>
          <td>
            {first_name} {last_name}
          </td>
          <td>{product.name}</td>
          <td>{rating}</td>
          <td style={{ maxWidth: '400px' }}>{comment}</td>
          <td>
            <Group spacing={5}>
              <ActionIcon
                color="red"
                onClick={() => dispatch(deleteReview(_id))}
              >
                <IconTrashX size={15} />
              </ActionIcon>

              <ActionIcon
                onClick={() => {
                  dispatch(togggleActionConfirmModal());
                  setItemId(_id);
                }}
              >
                <IconArchive size={15} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      );
    });

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Reviews List</Text>
      </Container>
      <ActionConfirmationModal
        onOk={archiveReview}
        onCancel={togggleActionConfirmModal}
        visible={actionConfirmModal}
        _id={itemId}
      />
      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default AdminViewReviews;
