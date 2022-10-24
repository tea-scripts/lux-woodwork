import React from 'react';
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
  deleteReview,
  unarchiveReview,
} from '../features/reviews/reviewsSlice';
import { Admin } from '../pages';
import ActionConfirmationModal from './ActionConfirmationModal';
import { togggleActionConfirmModal } from '../features/orders/orderSlice';
import { useState } from 'react';

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

const AdminArchivedReviews = () => {
  const { classes } = useStyles();
  const [itemId, setItemId] = useState(null);
  const { reviews, isLoading, actionConfirmModal } = useSelector(
    (state) => state.reviews
  );
  const dispatch = useDispatch();

  const rows =
    reviews &&
    reviews
      .filter(
        (review) => review.isArchived === true && review.isDeleted === false
      )
      .map((review, index) => {
        const { first_name, last_name, product, rating, comment, _id } = review;
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
              </Group>
            </td>
            <td>
              <ActionIcon
                onClick={() => {
                  dispatch(togggleActionConfirmModal());
                  setItemId(_id);
                }}
              >
                <IconArchive size={15} />
              </ActionIcon>
            </td>
          </tr>
        );
      });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Archived Reviews</Text>
      </Container>
      <ActionConfirmationModal
        onOk={unarchiveReview}
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
                <th>Unarchive</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default AdminArchivedReviews;
