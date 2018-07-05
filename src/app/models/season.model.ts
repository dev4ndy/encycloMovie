import { ISeason } from './../interfaces/iseason.interface';
import { TvShow } from "./tv-show.model";
import { ITvShow } from '../interfaces/itv-show.interface';
export class Season extends TvShow {

    air_date: string = 'No publication date';
    episode_count: number = 0;
    season_number: number = 0;

    constructor(iSeason: ISeason) {
        super({} as ITvShow);
        this.isSeason = true;
        Object.keys(iSeason).forEach((key) => {
            if (iSeason[key]) { //This is valid if it is empty, undefined or null
                switch (key) {
                    case 'air_date':
                        this[key] = iSeason[key];
                        this.first_air_date = iSeason[key];
                        break;
                    default:
                        break;
                }
                this[key] = iSeason[key];
            }
        });
    }
}
