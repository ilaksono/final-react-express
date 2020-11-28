import { useState } from 'react';

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  const resetPagination = () => {
    setCurrentPage(1);
  }


  return {
    // submitHandle,
    currentPage,
    setCurrentPage,
    maxPageNumber,
    resultsPerPage,
    setMaxPageNumber,
    handlePageChange,
    resetPagination
  };
};

export default usePagination;