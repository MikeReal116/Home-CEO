import Pagination from '@material-ui/lab/Pagination';

interface Props {
  page: number;
  count: number;
  onSetPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationControlled = ({ page, count, onSetPage }: Props) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onSetPage(value);
  };

  return (
    <div>
      <Pagination
        count={count}
        page={page}
        onChange={handlePageChange}
        variant='outlined'
        color='primary'
        shape='rounded'
      />
    </div>
  );
};

export default PaginationControlled;
