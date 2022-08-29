import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

/* NOTES this is how we fetch dependent queries */
export const DependentQueriesPage = ({ email }) => {
  // NOTES First is we query the dependency
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );

  // NOTES Second we make a variable on it or error handling so that it will not query on our dependent query.
  const channelId = user?.data.channelId;

  // NOTES Third we query the dependent query params here
  const { data: courses } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    // NOTES Fourth we put a options object with enabled option that is dependent on the queryParams so it doesn't fetch on mount
    { enabled: !!channelId }
  );

  console.log(courses);

  return <div>Dependent Queries Page</div>;
};
