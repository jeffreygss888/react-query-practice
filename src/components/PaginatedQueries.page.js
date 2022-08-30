import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchColors = ({ queryKey }) => {
  const pageNum = queryKey[1];

  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNum}`);
};

// NOTES this is how we implement query pagination
export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNumber],
    fetchColors,
    // NOTES when previous data is true all successful fetch will be kept in memory
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id} - {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      {/* NOTES Simple Pagination Logic */}
      <div>
        <button
          type="button"
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber <= 1}
        >
          Prev page
        </button>
        <button
          type="button"
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber > data?.data.length + 1}
        >
          Next Page
        </button>
      </div>
      {isFetching && <p>Loading...</p>}
    </section>
  );
};
