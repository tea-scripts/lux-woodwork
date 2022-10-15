import React from 'react';
import { Container, createStyles, Table, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import Loading from './Loading';

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
  const { reviews, isLoading } = useSelector((state) => state.reviews);

  const rows = reviews.map((review, index) => {
    const { name, rating, comment, _id } = review;
    return (
      <tr key={_id}>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{rating}</td>
        <td>{comment}</td>
      </tr>
    );
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className={classes.container} fluid>
      <Container className={classes.inner} fluid>
        <Text className={classes.title}>Reviews</Text>
      </Container>
      <Container className={classes.inner} fluid>
        <Container sx={{ padding: 0 }} fluid>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
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
