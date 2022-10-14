import {BASE_URL} from "./constants";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, email, password})
  })
    .then(getData)
}

export const auth = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then(getData)
}

function getData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}