import { IPeople } from './../interfaces/ipeople.interface';
import { constants } from './../global/constants.global';
import { People } from './../models/people.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { TvShow } from '../models/tv-show.model';
import { ITvShow } from '../interfaces/itv-show.interface';
import { Movie } from '../models/movie.model';
import { IMovie } from '../interfaces/imovie.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  /**
   * This method return a people by id
   * @param id 
   * @param language 
   */
  getById(id: number, language: string = 'en_US'): Observable<People> {
    let params = new HttpParams();
    let endPoint = `person/${id}`
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((iPeople: IPeople) => {
        return new People(iPeople as IPeople);
      })
    );
  }

  /**
 * This method return a array of tv shows by person id. 
 * More info endpoint API: https://developers.themoviedb.org/3/people/get-person-tv-credits
 * @param id 
 * @param language 
 */
  getTVShowsCredits(id: number, language: string = 'en_US'): Observable<Array<TvShow>> {
    let params = new HttpParams();
    let endPoint = `person/${id}/tv_credits`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params })
      .pipe(
        map((data: any) => {
          let lsTvShows: Array<TvShow> = [];
          data.cast.forEach(tvShow => {
            let ITvShow = tvShow as ITvShow; //Cast response as interface Tv Show.
            lsTvShows.push(new TvShow(ITvShow));
          });
          return lsTvShows;
        })
      );
  }

  /**
 * This method return a array of movie by person id. 
 * More info endpoint API: https://developers.themoviedb.org/3/people/get-person-movie-credits
 * @param id 
 * @param language 
 */
  getMovieCredits(id: number, language: string = 'en_US'): Observable<Array<Movie>> {
    let params = new HttpParams();
    let endPoint = `person/${id}/movie_credits`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params })
      .pipe(
        map((data: any) => {
          let lsMovie: Array<Movie> = [];
          data.cast.forEach(movie => {
            let Imovie = movie as IMovie;
            lsMovie.push(new Movie(Imovie));
          });
          return lsMovie;
        })
      );
  }

}
