'use strict'

import { ItunesApiRequest } from './request';
import { RequestParser } from './request-parser';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const mediaList = document.getElementById("mediaList");



    searchBtn.addEventListener('click', () => {
        const request = new ItunesApiRequest();
        request.search(searchBar.value).then(async (response) => {
            const responseBody = await response.json();
            const parser = new RequestParser('song');
            parser.getData(responseBody).then(data => {
                mediaList.innerHTML = '';
                data.forEach(datum => {
                    const element = document.createElement('li');
                element.className = 'collection-item avatar';
                element.addEventListener('click', () => {
                    const audio = new Audio(datum.previewUrl);
                    audio.play();
                });
                const image = document.createElement('img');
                image.src = datum.artworkUrl30;
                image.className = 'circle';
                const trackName = document.createElement('span');
                trackName.className = 'title';
                trackName.innerHTML = datum.trackName;
                const artistName = document.createElement('p');
                artistName.innerHTML = datum.artistName;
                element.appendChild(image);
                element.appendChild(trackName);
                element.appendChild(artistName);
                mediaList.appendChild(element);
                });
            });
        });

    });
});