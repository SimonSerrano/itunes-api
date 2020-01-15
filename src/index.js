'use strict'

import {ItunesApiRequest} from './request';
import {RequestParser} from './request-parser';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const mediaList = document.getElementById("mediaList");

  

    searchBtn.addEventListener('click', () => {
        const request = new ItunesApiRequest();
        request.search(searchBar.value);
        const parser = new RequestParser('song');
        parser.getData().then(data => {
            const element = document.createElement('li');
            element.className = 'collection-item';
            const content = 
            mediaList.appendChild()
        });
    });
});