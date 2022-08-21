import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

export const RQSuperHeroesPage = () => {
  /* NOTES 
    - The First Params is the key of the query
    - Second params is the fetcher
  */

  const { isLoading, data } = useQuery('super-heroes', fetchSuperHeroes);

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* NOTES data returns an object of our queried data */}
      {isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        data.data.map((hero) => <div key={hero.name}>{hero.name}</div>)
      ) : (
        <p>Heroes not found!</p>
      )}
    </>
  );
};
