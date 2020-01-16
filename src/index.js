'use strict'

import { ItunesApiRequest } from './request';
import { RequestParser } from './request-parser';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const mediaList = document.getElementById("mediaList");



    searchBtn.addEventListener('click', () => {
        mediaList.innerHTML = '';
        const request = new ItunesApiRequest();
        mediaList.appendChild(createPreloader());
        request.search(searchBar.value).then(async (response) => {
            const responseBody = await response.json();
            const parser = new RequestParser('song');
            parser.getData(responseBody).then(data => {
                mediaList.innerHTML = '';
                data.forEach(datum => {
                    const element = createCard(datum);
                    mediaList.appendChild(element);
                });
            });
        });

        function createPreloader() {
            const wrapper = document.createElement('div');
            wrapper.className = 'preloader-wrapper big active';
            const layer = document.createElement('div');
            layer.className = 'spinner-layer spinner-blue-only';
            const clipper = document.createElement('div');
            clipper.className = 'circle-clipper';
            const circle = document.createElement('div');
            circle.className = 'circle';
            clipper.appendChild(circle);
            layer.appendChild(clipper);
            wrapper.appendChild(layer);
            return wrapper;
        }

        function createCard({ artistName, trackName, previewUrl, artworkUrl100 }) {
            const container = document.createElement('div');
            container.className = 'col s12 m6 l4';
            const card = document.createElement('div');
            card.className = 'card';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'card-image';
            const image = document.createElement('img');
            image.src = artworkUrl100;
            const trackNameSpan = document.createElement('span');
            trackNameSpan.className = 'card-title';
            trackNameSpan.innerHTML = trackName;
            imageContainer.appendChild(image);
            imageContainer.appendChild(trackNameSpan);

            const artistNameContainer = document.createElement('div');
            artistNameContainer.className = 'card-content';
            const artistNameP = document.createElement('p');
            artistNameP.innerHTML = artistName;
            artistNameContainer.appendChild(artistNameP)

            const playContainer = document.createElement('div');
            playContainer.className = 'card-action';
            const playBtn = document.createElement('a');
            playBtn.className = 'waves-effect waves-teal btn-flat';
            playBtn.innerHTML = 'Play preview';
            playBtn.addEventListener('click', () => {
                const audio = new Audio(previewUrl);
                audio.play();
            });
            playContainer.appendChild(playBtn);

            card.appendChild(imageContainer);
            card.appendChild(artistNameContainer);
            card.appendChild(playContainer);

            container.appendChild(card);

            return container;
        }

    });
});