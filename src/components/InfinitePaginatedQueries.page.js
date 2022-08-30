import React from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

// NOTES this is how we implement Infinite Query pagination
export const InfinitePaginatedQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['colors'], fetchColors, {
    // NOTES we define a option param called getNextPageParam for the logic of infinite query
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

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
        {/* NOTES useInfiniteQuery() returns different useQuery() data to access data you must iterate pages then iterate group */}
        {data?.pages.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group.data.map((color) => (
                <div key={color.id}>
                  <h2>
                    {color.id} - {color.label}
                  </h2>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
      {/* NOTES Simple Infinite Pagination Logic */}
      {/* NOTES fetchNextPage method of useQuery() is responsible for the infinite query */}
      <div>
        <button type="button" onClick={fetchNextPage} disabled={!hasNextPage}>
          See More
        </button>
      </div>
      {isFetching && !isFetchingNextPage ? <p>Loading...</p> : null}
    </section>
  );
};
