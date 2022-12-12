import { apiPost } from './requests';

const handleDelete = async (deleteImageUrl: string, id: number, token: string) => {
  const requestBody = new URLSearchParams({
    id: id.toString()
  });
  const headers = {
    // prettier-ignore
    'username': token,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  };
  return apiPost(deleteImageUrl, requestBody, headers);
};

export { handleDelete };
