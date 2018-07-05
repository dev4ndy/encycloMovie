import { DatePipe } from '@angular/common';
import { constants } from '../global/constants.global';
import { People } from './people.model';

import { IPeople } from '../interfaces/ipeople.interface';
import { ITvShow } from '../interfaces/itv-show.interface';
import { Video } from './video.model';



export class TvShow {
    /**
     * The properties are defined with a default value
     */
    public id: number;
    public original_name: string = '';
    public name: string = this.original_name;
    public poster_path: string = constants.DEFAULT_IMAGE_TV;
    public vote_count: number = 0;
    public vote_average: number = 0;
    public popularity: number = 0;
    public episode_count: number = 0;
    public original_languaje: string = '';
    public first_air_date: string = 'No publication date';
    public backdrop_path: string = '';
    public overview: string = 'Without overview';
    public media_type: string = 'tv';
    public cast: Array<People> = [];
    public crew: Array<People> = [];
    public created_by: Array<People> = [];
    public videos: Array<Video> = [];
    public isSeason: boolean = false;
    public number_of_episodes: number = 0;
    public number_of_seasons: number = 0;

    constructor(iTvShow: ITvShow) {
        let pipe = new DatePipe('en-US');
        Object.keys(iTvShow).forEach((key) => {
            if (iTvShow[key]) { //This is valid if it is empty, undefined or null
                switch (key) {
                    case 'first_air_date':
                        this[key] = pipe.transform(iTvShow[key], 'mediumDate');
                        break;
                    case 'last_air_date':
                        this[key] = pipe.transform(iTvShow[key], 'mediumDate');
                        break;
                    case 'created_by':
                        iTvShow[key].forEach((people) => {
                            this[key].push(new People(people as IPeople));
                        });
                        break;
                    default:
                        this[key] = iTvShow[key];
                        break;
                }
            }
        });
    }
}
