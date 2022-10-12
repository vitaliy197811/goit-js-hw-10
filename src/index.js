import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiRrestCountries from './fetchCountries'

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const apiRrestCountries = new ApiRrestCountries();

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    apiRrestCountries.query = e.target.value.toLowerCase().trim();
    if (!apiRrestCountries.query) {
        return clearMarkup()
    }
    apiRrestCountries.fetchCountries()
        .then(createMarkup)
        .catch(error)
}

function clearMarkup() {
    countryList.innerHTML = "";
}

function createMarkup(data) {
    clearMarkup();
    if (data.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (data.length >= 2 && data.length <= 10) {
        createMarkupCountry(data, markupManyCountry);
    } else {
        createMarkupCountry(data, markupOneCountry);
    }
}

function markupManyCountry(data) {
    return `<li><img src="${data.flags.svg}" alt="${data.flag}" width=40>${data.name.official}</li>`
}

function markupOneCountry(data) {
    return `<li>
    <img src="${data.flags.svg}" alt="${data.flag}" width=60><spam class="country-title">${data.name.official}</spam>
    <p><spam class="country-item">Capital:</spam>${data.capital}</p>
    <p><spam class="country-item">Population:</spam>${data.population}</p>
    <p><spam class="country-item">Languages:</spam>${Object.values(data.languages).join(', ')}</p>
    </li>`
}

function createMarkupCountry(data, markupCountry) {
    countryList.innerHTML = data.map(markupCountry).join('');
}

function error() {
    clearMarkup();
    Notify.failure('Oops, there is no country with that name')
}