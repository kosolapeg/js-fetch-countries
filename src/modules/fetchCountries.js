const API = '';
const BASE_URL = 'https://restcountries.eu/rest/v2/name';

const options = {};

export default function fetchCountries(query) {
  return fetch(`${BASE_URL}/${query}`).then(r => {
    if (!r.ok) {
      throw new Error();
    }

    return r.json();
  });
}
