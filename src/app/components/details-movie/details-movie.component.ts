import { constants } from './../../global/constants.global';
import { GlobalService } from './../../services/global.service';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { People } from '../../models/people.model';
import { Genre } from '../../models/genre.model';
import { MatDialog } from '@angular/material';
import { DialogTrailerComponent } from '../dialog-trailer/dialog-trailer.component';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.css']
})
export class DetailsMovieComponent implements OnInit, OnDestroy {

  TAB_CAST_CREW = 'Cast & Crew';
  TAB_RECOMMENDATION = 'Recommendations';
  TAB_SIMILAR = 'Similar Movies';



  public movie: Movie = new Movie({});
  public feactureCrew: string = '';
  public lsCrew: Array<People> = [];
  public feactureCast: Array<People> = [];
  public lsCast: Array<People> = [];
  public lsGenre: Array<Genre> = [];
  public lsRecommendation: Array<Movie> = [];
  public lsSimilar: Array<Movie> = [];
  public blRecommendation: boolean = true;
  public blSimilar: boolean = true;

  navigationSubscription;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private sanitization: DomSanitizer,
    public dialog: MatDialog,
    private router: Router
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) { // If it is a NavigationEnd event reload the component
        this.router.navigated = false;
        this.lsRecommendation = [];
        this.feactureCrew = '';
        this.feactureCast = [];
        this.lsSimilar = [];
        this.blRecommendation = true;
        this.blSimilar = true;
        this.getDetailMovie(id);
        this.getMovieVideos(id);
        this.getCredits(id);
      }
    });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  /**
   * Call service that return a movie by id. 
   * @param id 
   */
  getDetailMovie(id: number) {
    this.movieService.getById(id).subscribe(
      (movie: Movie) => {
        this.movie = movie;
      }
    );
  }

  getImg() {
    return this.globalService.getFullUrlImg(this.movie, 'w300_and_h450_bestv2');
  }

  /**
   * Background-image
   */
  getBackdrop() {
    let url = this.globalService.getFullUrlImg(this.movie, 'original', true);
    return this.sanitization.bypassSecurityTrustStyle(`url(${url})`);
  }
  
  /**
   * Get people credits of movie
   * @param id 
   */
  getCredits(id: number) {
    this.movieService.getPeopleCredits(id).subscribe(
      (data: any) => {
        this.movie.crew = data.crew;
        this.movie.cast = data.cast;
        this.lsCrew = data.crew.filter((crew: People) => {          
          return constants.FEACTURE_CREW_JOBS.indexOf(crew.job) == -1 ? false : true;
        });
        this.lsCrew.forEach((crew: People) => {
          this.feactureCrew += `, ${crew.name} - ${crew.job}`;
        });
        this.feactureCrew = this.feactureCrew.substring(1);
        this.feactureCast = data.cast.slice(0, 5);
      }
    );
  }

  /**
   * Returns a list of recommendation movies 
   */
  getMovieRecommendation() {
    if (this.blRecommendation) {
      if (this.lsRecommendation.length == 0) {
        this.movieService.getRecommendation(this.movie.id).subscribe(
          (lsMovie: Array<Movie>) => {
            if (lsMovie.length != 0) {
              this.lsRecommendation = lsMovie;
            } else {
              this.blRecommendation = false;
            }
          }
        );
      }
    }
  }

  /**
   * Returns a list of similar movies 
   */
  getMovieSimilar() {
    if (this.blSimilar) {
      if (this.lsSimilar.length == 0) {
        this.movieService.getSimilar(this.movie.id).subscribe(
          (lsMovie: Array<Movie>) => {
            if (lsMovie.length != 0) {
              this.lsSimilar = lsMovie;
            } else {
              this.blSimilar = false;
            }
          }
        );
      }
    }
  }

  /**
   * Returns videos of movie
   * @param id 
   */
  getMovieVideos(id: number) {
    this.movieService.getVideos(id).subscribe(
      (lsVideo: Array<Video>) => {
        this.movie.videos = lsVideo;
      }
    );
  }

  /**
   * Open trailer in a dialog
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTrailerComponent, {
      data: {
        videos: this.movie.videos
      }
    });
  }
}
