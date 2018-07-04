import { constants } from './../global/constants.global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { map } from 'rxjs/operators';
import { IMovie } from '../interfaces/imovie.interface';

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

}
