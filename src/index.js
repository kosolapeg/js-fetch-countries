import './sass/styles.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import fetchCountries from './modules/fetchCountries';
import countriesTmlpt from './templates/countries.hbs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

const refs = {
  form: document.querySelector('.search-form'),
  countries: document.querySelector('.countries-results'),
};

refs.form.addEventListener('input', debounce(onInputCountry, 500));

function onInputCountry(e) {
  const q = refs.form.elements.query.value;
  fetchCountries(q)
    .then(renderCountries)
    .catch(err => notify('There is no such country. Please try again!'));
}

function renderCountries(data) {
  if (data.length < 10) {
    refs.countries.innerHTML = countriesTmlpt(data);
  } else {
    refs.countries.innerHTML = '';
    notify('Too many matches found. Please enter specific query!');
  }
}

function notify(msg) {
  error({
    text: msg,
    delay: 1500,
  });
}
