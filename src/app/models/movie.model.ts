import { constants } from './../global/constants.global';
import { DatePipe } from "@angular/common";
import { IMovie } from "../interfaces/imovie.interface";
import { People } from './people.model';
import { Video } from './video.model';


export class Movie {
    public id: number;
    public character: string = '';
    public release_date: string = 'No publication date';
    public original_title: string = '';
    public title: string = this.original_title;
    public backdrop_path: string = '';
    public poster_path: string = constants.DEFAULT_IMAGE_MOVIE;
    public overview: string = 'Without overview';
    public vote_average: number = 0;
    public genre_ids: Array<number> = [];
    public original_language: string = '';
    public media_type: string = 'movie';
    public cast: Array<People> = [];
    public crew: Array<People> = [];
    public videos: Array<Video> = [];

    constructor(iMovie: IMovie) {
        let pipe = new DatePipe('en-US');
        Object.keys(iMovie).forEach((key) => {
            if (iMovie[key]) { //This is valid if it is empty, undefined or null
                switch (key) {
                    case 'release_date':
                        this[key] = pipe.transform(iMovie[key], 'mediumDate');
                        break;
                    default:
                        this[key] = iMovie[key];
                        break;
                }
            }
        });
    }

}
