import { People } from './../../models/people.model';
import { PeopleService } from './../../services/people.service';
import { TvShowsService } from './../../services/tv-shows.service';
import { TvShow } from './../../models/tv-show.model';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  TAB_MOVIES = 'Movies';
  TAB_TVSHOW = 'Tv Shows';
  TAB_PEOPLE = 'People';


  public nowMovies: Array<Movie> = [];
  public topMovies: Array<Movie> = [];
  public upcomingMovies: Array<Movie> = [];
  public popularTv: Array<TvShow> = [];
  public topTv: Array<TvShow> = [];
  public lastestTv: Array<TvShow> = [];
  public popularPeople: Array<People> = [];


  constructor(
    private movieService: MovieService,
    private tvService: TvShowsService,
    private peopleService: PeopleService
  ) { }

  ngOnInit() {
    this.getTopNowPlayingMovies();
    this.getTopMovies();
    this.getUpcomingMovies();
  }

  getTopNowPlayingMovies() {
    this.movieService.getNowPlaying().subscribe(
      (lsMovies: Array<Movie>) => {
        this.nowMovies = lsMovies.slice(0, 6);
      });
  }

  getTopMovies() {
    this.movieService.getTop().subscribe(
      (lsMovies: Array<Movie>) => {
        this.topMovies = lsMovies.slice(0, 6);
      });
  }

  getUpcomingMovies() {
    this.movieService.getUpcoming().subscribe(
      (lsMovies: Array<Movie>) => {
        this.upcomingMovies = lsMovies.slice(0, 6);
      });
  }

  getPopularTv() {
    if (this.popularTv.length == 0) {
      this.tvService.getPopular().subscribe(
        (lsTv: Array<TvShow>) => {
          this.popularTv = lsTv.slice(0, 6);
        }
      );
    }
  }

  getTopTv() {
    if (this.topTv.length == 0) {
      this.tvService.getTopRated().subscribe(
        (lsTv: Array<TvShow>) => {
          this.topTv = lsTv.slice(0, 6);
        }
      );
    }
  }

  getPopularPeople() {
    if (this.popularPeople.length == 0) {
      this.peopleService.getPopular().subscribe(
        (lsPeople: Array<People>) => {
          this.popularPeople = lsPeople
        }
      );
    }
  }

}
