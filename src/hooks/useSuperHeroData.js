import { useQuery } from 'react-query';
import axios from 'axios';

// NOTES We can access queryKey from the useQuery since it automatically pass in the fetcher function
const fetchSuperHero = ({ queryKey }) => {
  // NOTES queryKey returns an array
  const heroId = queryKey[1];

  return axios(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery(['super-hero', heroId], fetchSuperHero);
};
