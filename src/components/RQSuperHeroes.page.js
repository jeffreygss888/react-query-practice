import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

export const RQSuperHeroesPage = () => {
  // NOTES useQuery() callback function if onError or onSuccess fetching data
  const onSuccess = (data) =>
    console.log(data, 'Perform side effect after data fetching here.');
  const onError = (err) => console.log(err, 'Navigate to a error page');

  /* NOTES
    - The First Params is the key of the query
    - Second params is the fetcher
    - Third params is useQuery() options
  */
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      // NOTES enabled is a param options to make our useQuery(); to control on event handlers.
      enabled: false,
      // NOTES We can manipulate the response data here before we serve it to the client side
      select: (data) => {
        const newData = data.data.map((hero, i) => `${i + 1}. ${hero.name}`);
        return newData;
      },
    }

    // {
    //   /* NOTES This is how we set useQuery() to refetch anything on the JSON if there's any changes. Also if we go to another page the Observers for this Query will still observe the JSON data and after x amount of ms (cacheTime) it will be garbage collected.

    //   NOTES useQuery() refetch runs on backround so thats why we have   observers.

    //   NOTES This is also the reason why we don't see a loading indicator component.
    //   */
    //   cacheTime: 300000, // Default is 300000 (5mins)
    //   /* NOTES we can also set the stale time if we know that it's okay to serve the user a stale data or you know that it doesn't change often.

    //   NOTES Time for our data before it becomes stale.

    //   NOTES when staleTime is 0 it runs every visit on our page
    //   */
    //   staleTime: 30000, // Default is 0
    //   /* NOTES
    //   if true refetches data when its stale and component mounted

    //   if false disable refetch data

    //   if 'always' always refetch data on mount
    //   */
    //   refetchOnMount: true, // Default is true
    //   /* NOTES
    //   If set to true, the query will refetch on window focus if the data is stale.

    //   If set to false, the query will not refetch on window focus.

    //   If set to 'always', the query will always refetch on window focus.

    //   If set to a function, the function will be executed with the latest data and query to compute the value.
    //    */
    //   refetchOnWindowFocus: true, // Defaults to true.
    //   /* NOTES
    //     Refetches data for every 2 seconds.
    //   */
    //   refetchInterval: 2000, // Defaults to false.
    //   /* NOTES
    //     Refetches data even if we're not in focus or page so that we always serve fresh data.
    //   */
    //   refetchIntervalInBackground: true,
    // }
  );

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
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        data?.map((hero) => <div key={hero}>{hero}</div>)
      )}
    </>
  );
};
