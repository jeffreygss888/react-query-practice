import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  // NOTES this is how we use useQueries for dynamic parallel queries
  // NOTES It takes an array of params and map it to input a queryKey and the fetcher function
  const queryResults = useQueries(
    heroIds.map((id) => ({
      queryKey: ['super-hero', id],
      queryFn: () => fetchSuperHero(id),
    }))
  );

  console.log({ queryResults });
  return <div>test</div>;
};
