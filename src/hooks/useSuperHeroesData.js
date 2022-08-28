import { useQuery } from 'react-query';
import { axiosFetcher } from '../lib/axiosFetcher';

const useSuperHeroesData = (onSuccess, onError) => {
  const queryFunction = useQuery(
    'super-heroes',
    axiosFetcher,
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

  return queryFunction;
};

export default useSuperHeroesData;
