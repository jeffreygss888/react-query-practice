import useSuperHeroesData from '../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom';

export const RQSuperHeroesPage = () => {
  /* NOTES
    - The First Params is the key of the query
    - Second params is the fetcher
    - Third params is useQuery() options
  */

  // NOTES useQuery() callback function if onError or onSuccess fetching data

  const onSuccess = (data) =>
    console.log(data, 'Perform side effect after data fetching here.');
  const onError = (err) => console.log(err, 'Navigate to a error page');

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  if (isError) {
    return <p>Heroes not found</p>;
  }

  // NOTES isFetching is a boolean if our query is fetching/refetching our data
  console.log(isFetching);

  // Error object
  console.log(error);

  console.log(data);

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button type="button" onClick={refetch}>
        Fetch super heroes
      </button>
      {/* NOTES data returns an object of our queried data */}
      {/* isLoading || isFetching is a must if you are fetching onEvent else isLoading can suffice */}
      {/* NOTES Hero data not manipulated */}
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        data?.data.map((hero) => (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        ))
      )}

      {/* NOTES Hero data manipulated */}
      {/* {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        data?.map((hero) => <div key={hero}>{hero}</div>)
      )} */}
    </>
  );
};
