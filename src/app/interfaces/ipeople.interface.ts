import { Movie } from "../models/movie.model";

export interface IPeople {
    name?: string,
    id?: number,
    birthday?: Date,
    deathday?: Date,
    gender?: string,
    homepage?: string,
    biography?: string,
    place_of_birth?: string,
    popularity?: number,
    profile_path?: string,
    movies?: Array<Movie>,
    media_type?: string,
    character?:string,
    cast_id?:number,
    job?:string,
    department?:string
}
