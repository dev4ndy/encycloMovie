import { GlobalService } from '../../services/global.service';
import { PeopleService } from '../../services/people.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { People } from '../../models/people.model';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Movie } from '../../models/movie.model';
import { TvShow } from '../../models/tv-show.model';

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.css'],
  animations: [
    trigger('resultState', [
      state('active', style({
        opacity: 1
      })),
      state('inactive', style({
        opacity: 0
      })),
      transition('inactive => active', [
        animate('5000ms ease-in-out')
      ])
    ])
  ]
})
export class DetailsPersonComponent implements OnInit, OnDestroy {

  TAB_BIOGRAPHY = 'Biography';
  TAB_MOVIES = 'Movies';
  TAB_TVSHOWS = 'Tv Shows';
  LBL_ORDER_VOTE = 'Vote';
  LBL_ORDER_DATE = 'Date release';

  public people: People;
  public order = [this.LBL_ORDER_VOTE, this.LBL_ORDER_DATE];
  public selected: string = this.LBL_ORDER_VOTE;

  public state = 'inactive'; //For animations
  public sort: number = 1; //Value: 1 when it is from highest to lowest. Value: 0 when it is from lowest to highes
  public iconSort: string = 'arrow_upward'; //Value: arrow_upward when it is from highest to lowest. Value: arrow_downward when it is from lowest to highest
  public blTvShows: boolean = true;
  public blMovie: boolean = true;

  navigationSubscription;

  public tabSelect: string = this.TAB_BIOGRAPHY;
  constructor(
    private peopleService: PeopleService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    const id = +this.route.snapshot.paramMap.get('id'); //Get params route
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event refresh the component
      if (e instanceof NavigationEnd) {
        this.router.navigated = false;
        this.getDetailPeople(id);
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onChangeMatTab(event) {
    this.tabSelect = event.tab.textLabel;
  }

  /**
   * returns the details of a person by the id
   * @param id 
   */
  getDetailPeople(id: number) {
    this.peopleService.getById(id).subscribe(
      (people: People) => {
        this.people = people;
      }
    );
  }

  /**
   * Returns the cretidos in the movies that a person has worked
   */
  getMovieCredits() {
    if (this.blMovie) {
      if (this.people.movies.length == 0) {
        this.peopleService.getMovieCredits(this.people.id).subscribe(
          (lsMovie: Array<Movie>) => {
            if (lsMovie.length != 0) {
              this.people.movies = this.orderByVoteAverange(lsMovie);
            } else {
              this.blMovie = false;
            }
          },
          (error) => {
          },
          () => {
            this.state = 'active';
          }
        );
      }
    }
  }

  /**
   * Return the tv show credits that a person has worked
   */
  getTvShowsCredits() {
    if (this.blTvShows) {
      if (this.people.tvShows.length == 0) {
        this.peopleService.getTVShowsCredits(this.people.id).subscribe(
          (lsTvShow: Array<TvShow>) => {
            if (lsTvShow.length != 0) {
              this.people.tvShows = this.orderByVoteAverange(lsTvShow);
            } else {
              this.blTvShows = false;
            }
          },
          (error) => {
          },
          () => {
            this.state = 'active';
          }
        );
      }
    }
  }

  /**
 * Get the url of the image in the specified size
 */
  getImg() {
    return this.globalService.getFullUrlImg(this.people, 'w300_and_h450_bestv2');
  }

  /**
   * returns a list ordered from lowest to highest or vice versa by the average vote
   * @param ls //can be a list of movies or a list of tv shows
   * @param sort Value: 1 greater to minor | value: 0 minor to greater
   */
  orderByVoteAverange(ls: Array<any>, sort: number = 1) {
    return this.globalService.orderByVote(ls, sort);
  }

  /**
   * returns a list sorted from lowest to highest or vice versa by date
   * @param ls //can be a list of movies or a list of tv shows
   * @param sort Value: 1 greater to minor | value: 0 minor to greater
   */
  orderByDate(ls: Array<any>, sort: number = 1) {
    return this.globalService.orderListByDate(ls, sort);
  }

  /**
   * Select the type of order to be made.
   * @param option // value: LBL_ORDER_VOTE | value:  LBL_ORDER_DATE
   * @param sort  Value: 1 greater to minor | value: 0 minor to greater
   */
  orderBy(option: string, sort: number = 1) {
    this.selected = option;
    if (option == this.LBL_ORDER_VOTE) {
      if (this.tabSelect == this.TAB_MOVIES) {
        this.orderByVoteAverange(this.people.movies, sort);
      } else if (this.tabSelect == this.TAB_TVSHOWS) {
        this.orderByVoteAverange(this.people.tvShows, sort);
      }
    } else if (option == this.LBL_ORDER_DATE) {
      if (this.tabSelect == this.TAB_MOVIES) {
        this.orderByDate(this.people.movies, sort);
      } else if (this.tabSelect == this.TAB_TVSHOWS) {
        this.orderByDate(this.people.tvShows, sort);
      }
    }
  }

  /**
   * change the state and name of the arrow for ordering
   */
  sortLs() {
    if (this.sort == 1) {
      this.sort = 0;
      this.iconSort = 'arrow_downward';
    } else if (this.sort == 0) {
      this.sort = 1;
      this.iconSort = 'arrow_upward';
    }
    this.orderBy(this.selected, this.sort);
  }

}