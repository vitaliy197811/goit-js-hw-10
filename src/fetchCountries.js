export default class ApiRrestCountries {
    constructor() {
        this.searchQuery = '';
    }

    fetchCountries() {
        return fetch(`https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,flags,capital,population,languages`)
            .then(response => response.json())
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}