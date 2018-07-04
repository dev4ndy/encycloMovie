/**
 * TThis interface is built according to the response scheme of the search resource and the endpoint /search/multi
 * More information API: 
 */
export interface IMovie {
    character?: string,
    credit_id?: string,
    release_date?: string,
    vote_count?: number,
    video?: boolean,
    adult?: boolean,
    vote_average?: number,
    title?: string,
    genre_ids?: Array<number>,
    original_language?: string,
    original_title?: string,
    popularity?: number,
    id?: number,
    backdrop_path?: string,
    overview?: string,
    poster_path?: string,
}
