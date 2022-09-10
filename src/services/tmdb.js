class TMDB {

    _token = ''
    _base_url = 'https://api.themoviedb.org/3'

    constructor(token) {
        this._token = token;
    }

    _get_url(path, query = "") {
        return `${this._base_url}${path}?api_key=${this._token}&language=he${query}`
    }

    async _get(path, query = "") {

        var axios = require('axios');

        var config = {
            method: 'get',
            url: this._get_url(path, query),
        };

        let response;

        try {

            response = await axios(config);

        } catch (error) {

            console.error(error);
            return; // TODO: handle properly

        }

        return response;

    }

    async get_popular_movies() {
        const response = await this._get('/movie/popular');
        const movies = response.data.results;
        return movies;
    }

    async get_movie(id) {
        const response = await this._get(`/movie/${id}`);
        const movie = response.data;
        return movie;
    }

    async search_movies(query) {
        const response = await this._get(`/search/movie`, query = `&query=${query}`);
        console.log({ response });
        const movies = response.data.results;
        return movies;
    }

}

export default TMDB;