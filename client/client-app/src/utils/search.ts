import { FormEvent } from 'react';
import { apiGet } from './requests';

const handleTitleSearch = async (
  event: FormEvent<HTMLFormElement>,
  searchByTitle: string,
  token: string
) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const { title } = Object.fromEntries(data.entries());
  const headers = {
    // prettier-ignore
    'username': token,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  };

  return apiGet(searchByTitle + `/${title}`, headers);
};

const handleIdSearch = async (
  event: FormEvent<HTMLFormElement>,
  searchById: string,
  token: string
) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const { id } = Object.fromEntries(data.entries());
  const headers = {
    // prettier-ignore
    'username': token,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  };

  return apiGet(searchById + `/${id}`, headers);
};

const handleAuthorSearch = async (
  event: FormEvent<HTMLFormElement>,
  searchByAuthor: string,
  token: string
) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const { author } = Object.fromEntries(data.entries());
  const headers = {
    // prettier-ignore
    'username': token,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  };

  return apiGet(searchByAuthor + `/${author}`, headers);
};

const handleDateSearch = async (
  event: FormEvent<HTMLFormElement>,
  searchByCreationDate: string,
  token: string
) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const { date } = Object.fromEntries(data.entries());
  const headers = {
    // prettier-ignore
    'username': token,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  };

  return apiGet(searchByCreationDate + `/${date}`, headers);
};

const handleKeywordsSearch = async (
  event: FormEvent<HTMLFormElement>,
  searchByKeywords: string,
  token: string
) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const { keywords } = Object.fromEntries(data.entries());
  const headers = {
    // prettier-ignore
    'username': token,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  };

  return apiGet(searchByKeywords + `/${keywords}`, headers);
};

export {
  handleTitleSearch,
  handleIdSearch,
  handleAuthorSearch,
  handleDateSearch,
  handleKeywordsSearch
};
