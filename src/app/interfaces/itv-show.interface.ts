import { People } from "../models/people.model";

export interface ITvShow {
    id?: number,
    original_name?: string,
    name?: string,
    poster_path?: string,
    vote_count?: string,
    vote_average?: number,
    popularity?: number,
    episode_count?: number,
    original_languaje?: string,
    first_air_date?: string,
    backdrop_path?: string,
    overview?: string,
    credit_id?: string,
    genre_ids?: Array<number>,
    character?: string,
    origin_country?: Array<String>,
    created_by?: Array<People>,
    in_production?: boolean,
    last_air_date?: string,
    number_of_episodes?: number,
    number_of_seasons?: number
}
