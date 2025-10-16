import axios from 'axios';

export const fetchCv = async values => {
  return await axios.post('http://localhost:3000/cvs', values, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
