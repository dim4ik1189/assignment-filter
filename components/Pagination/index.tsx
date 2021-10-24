import { FC } from "react";
import ReactPaginate from 'react-paginate';

type PaginateProps = {
  totalPages: number;
  forcePage: number;
  onPageChange: (selected: { selected: number }) => void;
}

const Pagination: FC<PaginateProps> = ({ totalPages, onPageChange, forcePage }) => {
  return <ReactPaginate
      forcePage={forcePage}
      pageCount={totalPages}
      onPageChange={onPageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      containerClassName={'pagination'}
  />;
};

export default Pagination;
