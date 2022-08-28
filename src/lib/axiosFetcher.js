import axios from 'axios';

export const axiosFetcher = () =>
  axios.get('http://localhost:4000/superheroes');
