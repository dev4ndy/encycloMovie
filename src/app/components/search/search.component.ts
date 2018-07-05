import { constants } from './../../global/constants.global';
import { GlobalService } from '../../services/global.service';
import { MovieService } from '../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, transition, style, animate, query, animateChild } from '@angular/animations';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('resultState', [
      state('active', style({ height: '*' })),
      state('inactive', style({ height: '0' })),
      transition('inactive => active', [
        animate('500ms ease-in-out'), //first the father
        query('@innerState', [animateChild()]) //second the children
      ]),
      transition('active => inactive', [
        query('@innerState', [animateChild()]), //first the children
        animate('500ms ease-in-out')]) // second the father
    ]),
    trigger('innerState', [
      state('inactive', style({ opacity: 0, transform: 'translateY(-100%)' })),
      state('active', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('inactive => active', [
        animate('500ms ease-in-out'),
      ]),
      transition('active => inactive', [
        animate('600ms ease-in-out'),
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {

  constants = constants;
  elmResult: HTMLElement = document.getElementById('result');
  txtSearch = '';
  doneTypingInterval = 500;
  typingTimer = null;
  list = [];
  state = 'inactive';

  constructor(
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private gobalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
    * Perform the search when the user finishes writing
    * @param value 
    */
  onKeyUp(value: string) {
    if (value.length <= 0) {
      this.list = [];
      this.state = 'inactive';
    }
    if (value.length > 2) {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.getAll(value);
      }, this.doneTypingInterval);
    }
  }

  /**
   * Call a component depending on the media type
   * @param item 
   */
  openDetails(item: any) {
    let media_type = item.media_type;
    switch (media_type) {
      case constants.MEDIA_TYPE_PERSON:
        this.state = 'inactive';
        this.router.navigate([`/people/detail/${item.id}`]);
        setTimeout(() => this.list = [], 700); // clear list before animations
        break;
      case constants.MEDIA_TYPE_MOVIE:
        this.state = 'inactive';
        this.router.navigate([`/movie/detail/${item.id}`]);
        setTimeout(() => this.list = [], 700); // clear list before animations
        break;
      default:
        break;
    }
  }

  /**
   * Returns the results of the search and adds a default image when they do not have
   * @param value 
   */
  getAll(value: string) {
    if (value) {
      this.movieService.getAll(value).subscribe(
        (result: any) => {
          let results = result.results;
          for (let i = 0; i < results.length; i++) {
            const item = results[i];
            switch (item.media_type) {
              case constants.MEDIA_TYPE_PERSON:
                if (!item.profile_path) {
                  results[i].profile_path = constants.DEFAULT_IMAGE_PEOPLE
                }
                break;
              case constants.MEDIA_TYPE_TV:
                if (!item.poster_path) {
                  results[i].poster_path = constants.DEFAULT_IMAGE_TV
                }
                break;
              case constants.MEDIA_TYPE_MOVIE:
                if (!item.poster_path) {
                  results[i].poster_path = constants.DEFAULT_IMAGE_MOVIE
                }
                break;
            }
          }
          this.list = this.orderByPopularity(result.results);
          this.state = 'active';
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /**
   * Place a background image securely
   * @param item 
   */
  getImg(item) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.gobalService.getFullUrlImg(item, 'w185_and_h278_bestv2')})`);
  }

  /**
   * returns the name depending on the media type
   * @param item 
   */
  getName(item) {
    return this.gobalService.getName(item);
  }

  /**
   * Receives a list of objects and then it orders by popularity, for suggest a more effective query 
   * @param lsMTP 
   */
  orderByPopularity(lsMTP) {
    return lsMTP.sort((a, b) => {
      return parseFloat(b.popularity) - parseFloat(a.popularity);
    });
  }
}
