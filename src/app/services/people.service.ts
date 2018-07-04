import { IPeople } from './../interfaces/ipeople.interface';
import { constants } from './../global/constants.global';
import { People } from './../models/people.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

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

}
