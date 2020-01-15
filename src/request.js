'use strict'

export class ItunesApiRequest {

    constructor() {
        this.API = "https://itunes.apple.com/";
    }


    search(search) {
        let params='search?term='+search.replace(' ', '+');
        return fetch(this.API + params);
    }

}