import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

// NOTES We can access queryKey from the useQuery since it automatically pass in the fetcher function
const fetchSuperHero = ({ queryKey }) => {
  // NOTES queryKey returns an array
  const heroId = queryKey[1];

  return axios(`http://localhost:4000/superheroes/${heroId}`);
};

/*
NOTES
If your query function depends on a variable, include it in your query key
Since query keys uniquely describe the data they are fetching, they should include any variables you use in your query function that change.

So thats why we pass in an array in our queryKey
*/

export const useSuperHeroData = (heroId) => {
  // NOTES This is how we put initial data on our query
  // NOTES useQueryClient() is the instance of the QueryClient() we defined on the root app
  // NOTES useful for SSR
  const queryClient = useQueryClient();

  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      // NOTES We get the super-heroes queryKey data as our initial data
      const heroData = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      // NOTES If there is a query of super-heroes queryKey data then we return than value
      if (heroData) {
        return { data: heroData };
      } else {
        // NOTES If there is no super-heroes queryKey then we return undefined
        return undefined;
      }
    },
  });
};
