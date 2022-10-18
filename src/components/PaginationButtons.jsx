import { Pagination } from '@mantine/core';
import { useDispatch } from 'react-redux';

const PaginationButtons = ({ totalPages, page, changePage, isLoading }) => {
  const dispatch = useDispatch();

  return (
    <Pagination
      total={totalPages}
      current={page}
      onChange={(page) => dispatch(changePage(page))}
      disabled={isLoading}
      position="center"
      mt={'1rem'}
    />
  );
};
export default PaginationButtons;
