import { IPeople } from './../interfaces/ipeople.interface';
import { constants } from './../global/constants.global';
import { TvShow } from './tv-show.model';
import { Movie } from './movie.model';

export class People {
    
    public name: string;
    public character: string;
    public biography: string;
    public birthday: Date;
    public deathday: Date;
    public gender: string;
    public homepage: string;
    public id: number;
    public place_of_birth: string;
    public popularity: number = 0.0;
    public profile_path: string = constants.DEFAULT_IMAGE_PEOPLE;
    public media_type: string = 'person';
    public job: string;
    public department: string
    public tvShows: Array<TvShow> = [];
    public movies: Array<Movie> = [];


    public constructor(iPeople: IPeople) {
        Object.keys(iPeople).forEach((key) => {
            if (iPeople[key]) { //This is valid if it is empty, undefined or null
                switch (key) {
                    case 'gender':
                        switch (+iPeople.gender) {
                            case constants.GENDER_FEMALE:
                                this[key] = 'Female';
                                break;
                            case constants.GENDER_MALE:
                                this[key] = "Male";
                                break;
                            default:
                                this[key] = "Undefined"
                                break;
                        }
                        break;
                    default:
                        this[key] = iPeople[key];
                        break;
                }
            } else {
                switch (key) {
                    case 'biography':
                        this.biography = `We do not have a biography for ${this.name}`
                        break;
                }
            }
        });
    }
}
