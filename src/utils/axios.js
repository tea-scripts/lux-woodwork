import axios from 'axios';
// import { logoutUser } from '../features/users/userSlice';
// import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: 'https://lux-woodwork-api.herokuapp.com/api/v1',
});

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers.common['Authorization'] = `Bearer ${user.token}`;
//   }
//   return config;
// });

// export const checkForUnauthorizedResponse = (error, thunkAPI) => {
//   if (error.response.status === 401) {
//     thunkAPI.dispatch(logoutUser());
//     return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
//   }
//   return thunkAPI.rejectWithValue(error.response.data.msg);
// };

export default customFetch;
