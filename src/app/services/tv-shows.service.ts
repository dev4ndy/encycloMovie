import { ISeason } from './../interfaces/iseason.interface';
import { Season } from './../models/season.model';
import { ITvShow } from './../interfaces/itv-show.interface';
import { Injectable } from '@angular/core';
import { TvShow } from '../models/tv-show.model';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { constants } from '../global/constants.global';
import { map } from 'rxjs/operators';
import { People } from '../models/people.model';
import { IPeople } from '../interfaces/ipeople.interface';
import { Video } from '../models/video.model';
import { IVideo } from '../interfaces/ivideo.interface';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
    * This method return a tv show by id
    * @param id 
    * @param language 
    */
  getById(id: number, language: string = 'en_US'): Observable<Object> {
    let params = new HttpParams();
    let endPoint = `tv/${id}`
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((tvShow: ITvShow) => {
        let lsSeason: Array<Season> = [];
        tvShow.seasons.forEach(season => {
          lsSeason.push(new Season(season as ISeason));
        })
        return {
          tv: new TvShow(tvShow as ITvShow),
          seasons: lsSeason
        };

      })
    );
  }

  /**
  * This method return a array of people by tv id. 
  * More info endpoint API: https://developers.themoviedb.org/3/tv/get-tv-credits
  * @param id 
  * @param language 
  */
  getPeopleCredits(id: number, language: string = 'en_US'): Observable<Object> {
    let params = new HttpParams();
    let endPoint = `tv/${id}/credits`;
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
   * Get the videos that have been added to a TV show.
   * More info endpoint API: https://developers.themoviedb.org/3/tv/get-tv-videos
   * @param id 
   * @param language 
   */
  getVideos(id: number, language: string = 'en_US'): Observable<Array<Video>> {
    let params = new HttpParams();
    let endPoint = `tv/${id}/videos`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsTv: Array<Video> = [];
        data.results.forEach(video => {
          lsTv.push(new Video(video as IVideo));
        });
        return lsTv;
      })
    );
  }

  /**
   * Get the list of TV show recommendations for this item.
   * More info endpoint API: https://developers.themoviedb.org/3/tv/get-tv-recommendations
   * @param id 
   * @param language 
   */
  getRecommendation(id: number, language: string = 'en_US'): Observable<Array<TvShow>> {
    let params = new HttpParams();
    let endPoint = `tv/${id}/recommendations`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsTv: Array<TvShow> = [];
        data.results.forEach(tvShow => {
          lsTv.push(new TvShow(tvShow as ITvShow));
        });
        return lsTv;
      })
    );
  }

  /**
   * Get a list of similar TV shows. These items are assembled by looking at keywords and genres.
   * More Info endpoint API: https://developers.themoviedb.org/3/tv/get-similar-tv-shows
   * @param id 
   * @param language 
   */
  getSimilar(id: number, language: string = 'en_US'): Observable<Array<TvShow>> {
    let params = new HttpParams();
    let endPoint = `tv/${id}/similar`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsTv: Array<TvShow> = [];
        data.results.forEach(movie => {
          lsTv.push(new TvShow(movie as ITvShow));
        });
        return lsTv;
      })
    );
  }

  /**
   * Get a list of the current popular TV shows on TMDb. This list updates daily.
   * More Info endpoint API: https://developers.themoviedb.org/3/tv/get-popular-tv-shows
   * @param language 
   */
  getPopular(language: string = 'en_US'): Observable<Array<TvShow>> {
    let params = new HttpParams();
    let endPoint = `tv/popular`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsTv: Array<TvShow> = [];
        data.results.forEach(movie => {
          lsTv.push(new TvShow(movie as ITvShow));
        });
        return lsTv;
      })
    );
  }

  /**
   * Get a list of the top rated TV shows on TMDb.
   * More Info endpoint API: https://developers.themoviedb.org/3/tv/get-top-rated-tv
   * @param language 
   */
  getTopRated(language: string = 'en_US'): Observable<Array<TvShow>> {
    let params = new HttpParams();
    let endPoint = `tv/top_rated`;
    let url = `${constants.BASE_URL}${endPoint}`;
    params = params.append('api_key', constants.API_KEY);
    params = params.append('language', language);

    return this.httpClient.get(url, { params: params }).pipe(
      map((data: any) => {
        let lsTv: Array<TvShow> = [];
        data.results.forEach(movie => {
          lsTv.push(new TvShow(movie as ITvShow));
        });
        return lsTv;
      })
    );
  }
}
