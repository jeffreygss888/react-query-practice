// NOTES Our aim is to fetch both Superheroes data and friends data
import { useQuery } from 'react-query';
import axios from 'axios';
import { axiosFetcher } from '../lib/axiosFetcher';

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
};

export const ParallelQueriesPage = () => {
  const { data: dataHeroes } = useQuery('super-heroes', axiosFetcher);
  const { data: dataFriends } = useQuery('friends', fetchFriends);

  return <div>Parallel query</div>;
};
