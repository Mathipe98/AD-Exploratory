import axios from 'axios';

const apiGet = async (url: string, headers?: object) => {
  try {
    if (headers && !Object.keys(headers).includes('username')) {
      console.warn(
        'Warning: sending GET-request without username-header required for authorization.'
      );
    }
    const response = await axios.get(url, { headers });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const apiPost = async (url: string, requestBody: URLSearchParams, headers?: object) => {
  if (
    headers &&
    !Object.keys(headers).includes('username') &&
    !url.includes('user') &&
    !url.toLowerCase().includes('login')
  ) {
    console.warn(
      'Warning: sending POST-request without username-header required for authorization.'
    );
  }
  const response = await axios.post(url, requestBody, { headers });
  return response;
};

export { apiGet, apiPost };
