import { useQuery } from 'react-query';
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
  return useQuery(['super-hero', heroId], fetchSuperHero);
};
