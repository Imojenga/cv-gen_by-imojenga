import axios from 'axios';

export const fetchCv = async values => {
  return await axios.post(
    'https://cv-gen-by-imojenga-back.onrender.com/cvs',
    values,
    {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
