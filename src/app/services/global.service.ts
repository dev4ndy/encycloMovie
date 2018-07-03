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
}