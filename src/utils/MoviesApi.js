import { BASE_URL } from './constants';

export const getUserMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(getData);
}

export const createMovie = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(data),
  }).then(getData);
}

export const removeMovie = (data) => {
  return fetch(`${BASE_URL}/movies/${data._id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(getData);
}

function getData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}