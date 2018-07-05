import { constants } from './../global/constants.global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * This service works as a class of utilities that can be used in any component.
 */
export class GlobalService {

  constructor() { }

  /**
   * Get a full url a image of the a item, can be people, movie or tv show.
   * The item param is a object of resourse Multi Search TMDB
   * @param item 
   * @param size 
   */
  public getFullUrlImg(item: any, size: string, backdrop: boolean = false): string {
    let urlWidth = `${constants.BASE_URL_IMG}/${size}`;
    let fullUrl = '';

    switch (item.media_type) {
      case constants.MEDIA_TYPE_PERSON:
        fullUrl = `${constants.IMG_URL}/${size}/${constants.DEFAULT_IMAGE_PEOPLE}`;
        if (item.profile_path != constants.DEFAULT_IMAGE_PEOPLE) {
          fullUrl = `${urlWidth}${item.profile_path}`;
        }
        return fullUrl;
      case constants.MEDIA_TYPE_TV:
        fullUrl = `${constants.IMG_URL}/${size}/${constants.DEFAULT_IMAGE_TV}`;
        if (item.poster_path != constants.DEFAULT_IMAGE_TV) {
          fullUrl = `${urlWidth}${item.poster_path}`
        }
        return fullUrl;
      case constants.MEDIA_TYPE_MOVIE:
        fullUrl = `${constants.IMG_URL}/${size}/${constants.DEFAULT_IMAGE_MOVIE}`;
        if (!backdrop) {
          if (item.poster_path != constants.DEFAULT_IMAGE_MOVIE) {
            fullUrl = `${urlWidth}${item.poster_path}`
          }
        } else {
          fullUrl = `${urlWidth}${item.backdrop_path}`;
        }
        return fullUrl;
      default:
        break;
    }
  }

  /**
   * Get name of a people, movie or tv show
   * Recives a object of resourse Multi Search TMDB
   * @param item 
   */
  public getName(item: any): string {
    if (item.media_type === constants.MEDIA_TYPE_PERSON || item.media_type === constants.MEDIA_TYPE_TV) {
      return item.name;
    } else {
      return item.title;
    }
  }

  /**
    * This method orders a list by vote average
    * @param ls 
    * @param sort Value: 1 when it is from highest to lowest. Value: 0 when it is from lowest to highes
    */
  orderByVote(ls: Array<any>, sort: number = 1) {
    return ls.sort((a, b) => {
      if (sort == 1) {
        return b.vote_average - a.vote_average;
      } else if (sort == 0) {
        return a.vote_average - b.vote_average;
      }
    });
  }

  /**
   * This method orders a list by date
   * @param ls 
   * @param sort Value: 1 when it is from highest to lowest. Value: 0 when it is from lowest to highes
   */
  orderListByDate(ls: Array<any>, sort: number = 1) {
    return ls.sort((a, b) => {
      let dateB = b.hasOwnProperty('release_date') ? new Date(b.release_date) : new Date(b.first_air_date);
      let dateA = a.hasOwnProperty('release_date') ? new Date(a.release_date) : new Date(a.first_air_date);
      if (sort == 1) {
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      } else if (sort == 0) {
        if (dateA > dateB) return 1;
        if (dateA < dateB) return -1;
        return 0;
      }
    });
  }
}