import { constants } from './../../global/constants.global';
import { GlobalService } from '../../services/global.service';
import { MovieService } from '../../services/movie.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, transition, style, animate, query, animateChild } from '@angular/animations';
import { Router } from "@angular/router";
import { fromEvent, Observable, merge } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  doneTypingInterval = 500;
  typingTimer = null;
  list = [];
  state: string = 'inactive';
  blResult: boolean = false;
  blLengthText: boolean = false;
  query: string = '';

  @ViewChild('txtSearch') txtSearch: ElementRef;
  constructor(
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private gobalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    let evtKeyUp$ = fromEvent(this.txtSearch.nativeElement, 'keyup');
    let AllEvents$ = merge(evtKeyUp$);
    AllEvents$.pipe(
      // get value
      map((evt: any) => { this.query = evt.target.value; return evt.target.value }),
      // text length must be > 2 chars
      filter(res => {
        if (res && res.length > 2) {
          this.blLengthText = false;
          return true;
        } else {
          this.list = [];
          this.blLengthText = true;
          return false;
        }
      }
      ),
      // emit after 1s of silence
      debounceTime(1000),
      // emit only if data changes since the last emit       
      distinctUntilChanged()
      // subscription
    ).subscribe((text: string) => {
      this.getAll(text);
    });
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
      case constants.MEDIA_TYPE_TV:
        this.state = 'inactive';
        this.router.navigate([`/tv/detail/${item.id}`]);
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
          if (results.length != 0) {
            this.blLengthText = false;
            this.blResult = false;
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
          } else {
            this.blResult = true;
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
