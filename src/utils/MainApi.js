export const getMoviesData = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(getData)
}

function getData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}