'use strict'

export class RequestParser {

    constructor(kind) {
        this.kind = kind;
    }


    getData({results}) {
        return new Promise((resolve, reject) => {
            const result = [];
            for(let i=0; i<results.length; i++) {
                if(results.kind === this.kind) {
                    const {artistName, trackName, previewUrl, artworkUrl30} = results[i];
                    result.push({artistName, trackName, previewUrl, artworkUrl30});
                }
            }
            resolve(result);
        });
    } 

}