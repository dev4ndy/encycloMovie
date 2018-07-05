import { constants } from './../global/constants.global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { map } from 'rxjs/operators';
import { IMovie } from '../interfaces/imovie.interface';
import { People } from '../models/people.model';
import { IPeople } from '../interfaces/ipeople.interface';
import { Video } from '../models/video.model';
import { IVideo } from '../interfaces/ivideo.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }
  /**
   * This method consults by person, movie, tvShow and brings the first 20 results that coincide with the query.
   * More Information end-point API: https://developers.themoviedb.org/3/search/multi-search
   * @param query 
   * @param language 
   * @param page 
   * @param includeAdult 
   */
  getAll(query: string, language: string = 'en_US', page: number = 1, includeAdult: boolean = false): Observable<any> {
    let params = new HttpParams();

    let url = `${constants.BASE_URL}search/multi`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('query', query);
    params = params.append('language', language);
    params = params.append('page', String(page));
    params = params.append('include_adult', String(page));

    return this.httpClient.get(url, { params: params });
  }

  /**
    * This method return a movie by id
    * @param id 
    * @param language 
  */
  getById(id: number, language: string = 'en_US'): Observable<Movie> {
    let params = new HttpParams();
    let endPoint = `movie/${id}`
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((movie: IMovie) => {
        return new Movie(movie as IMovie);
      })
    );
  }

  /**
   * This method return a array of people by movie id. 
   * More info endpoint API: https://developers.themoviedb.org/3/movies/get-movie-credits
   * @param id 
   * @param language 
   */
  getPeopleCredits(id: number, language: string = 'en_US'): Observable<Object> {
    let params = new HttpParams();
    let endPoint = `movie/${id}/credits`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params })
      .pipe(
        map((data: any) => {
          let lsCast: Array<People> = [];
          let lsCrew: Array<People> = [];

          data.cast.forEach(cast => {
            lsCast.push(new People(cast as IPeople));
          });
          data.crew.forEach(crew => {
            lsCrew.push(new People(crew as IPeople));
          });
          return {
            cast: lsCast,
            crew: lsCrew
          };
        })
      );
  }

  /**
   * Get a list of recommended movies for a movie.
   * More info endpoint API: https://developers.themoviedb.org/3/movies/get-movie-recommendations
   * @param id 
   * @param language 
   */
  getRecommendation(id: number, language: string = 'en_US'): Observable<Array<Movie>> {
    let params = new HttpParams();
    let endPoint = `movie/${id}/recommendations`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsMovie: Array<Movie> = [];
        data.results.forEach(movie => {
          lsMovie.push(new Movie(movie as IMovie));
        });
        return lsMovie;
      })
    );
  }

  /**
   * Get a list of similar movies.
   * More info endpoint API: https://developers.themoviedb.org/3/movies/get-similar-movies
   * @param id 
   * @param language 
   */
  getSimilar(id: number, language: string = 'en_US'): Observable<Array<Movie>> {
    let params = new HttpParams();
    let endPoint = `movie/${id}/similar`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsMovie: Array<Movie> = [];
        data.results.forEach(movie => {
          lsMovie.push(new Movie(movie as IMovie));
        });
        return lsMovie;
      })
    );
  }

  /**
   * Get the videos that have been added to a movie.
   * More info endpoint API: https://developers.themoviedb.org/3/movies/get-movie-videos
   * @param id 
   * @param language 
   */
  getVideos(id: number, language: string = 'en_US'): Observable<Array<Video>> {
    let params = new HttpParams();
    let endPoint = `movie/${id}/videos`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsMovie: Array<Video> = [];
        data.results.forEach(video => {
          lsMovie.push(new Video(video as IVideo));
        });
        return lsMovie;
      })
    );
  }

  /**
   * Get a list of movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.
   * More info endpoint API: https://developers.themoviedb.org/3/movies/get-now-playing
   * @param language 
   */
  getNowPlaying(language: string = 'en_US'): Observable<Array<Movie>> {
    let params = new HttpParams();
    let endPoint = `movie/now_playing`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsMovie: Array<Movie> = [];
        data.results.forEach(movie => {
          lsMovie.push(new Movie(movie as IMovie));
        });
        return lsMovie;
      })
    );
  }

  /**
   * Get the top rated movies on TMDb.
   * More info endpoint API: https://developers.themoviedb.org/3/movies/get-top-rated-movies
   * @param language 
   */
  getTop(language: string = 'en_US'): Observable<Array<Movie>> {
    let params = new HttpParams();
    let endPoint = `movie/top_rated`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsMovie: Array<Movie> = [];
        data.results.forEach(movie => {
          lsMovie.push(new Movie(movie as IMovie));
        });
        return lsMovie;
      })
    );
  }

  /**
   * Get a list of upcoming movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.
   * More info endpoint API: https://developers.themoviedb.org/3/movies/get-upcoming
   * @param language 
   */
  getUpcoming(language: string = 'en_US'): Observable<Array<Movie>> {
    let params = new HttpParams();
    let endPoint = `movie/upcoming`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsMovie: Array<Movie> = [];
        data.results.forEach(movie => {
          lsMovie.push(new Movie(movie as IMovie));
        });
        return lsMovie;
      })
    );
  }

}
