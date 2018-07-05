import { Router, NavigationEnd } from '@angular/router';
import { Season } from './../../models/season.model';
import { GlobalService } from './../../services/global.service';
import { TvShowsService } from './../../services/tv-shows.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvShow } from '../../models/tv-show.model';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { People } from '../../models/people.model';
import { Genre } from '../../models/genre.model';
import { MatDialog } from '@angular/material';
import { DialogTrailerComponent } from '../dialog-trailer/dialog-trailer.component';
import { Video } from '../../models/video.model';
import { ITvShow } from '../../interfaces/itv-show.interface';

@Component({
  selector: 'app-details-tv',
  templateUrl: './details-tv.component.html',
  styleUrls: ['./details-tv.component.css']
})
export class DetailsTvComponent implements OnInit, OnDestroy {

  TAB_CAST_CREW = 'Cast & Crew';
  TAB_SEASONS = 'Seasons';
  TAB_RECOMMENDATION = 'Recommendations'
  TAB_SIMILAR = 'Similar Tv Shows'


  public seasons: Array<Season> = [];
  public tv: TvShow = new TvShow({} as ITvShow);
  public creators: string = '';
  public feactureCast: Array<People> = [];
  public feactureCrew: Array<People> = [];
  public lsRecommendation: Array<TvShow> = [];
  public lsSimilar: Array<TvShow> = [];
  public lsCast: Array<People> = [];
  public lsGenre: Array<Genre> = [];
  public blRecommendation: boolean = true;
  public blSimilar: boolean = true;


  navigationSubscription;

  constructor(
    private tvService: TvShowsService,
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
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.router.navigated = false;
        this.creators = '';
        this.feactureCast = [];
        this.blRecommendation = true;
        this.blSimilar = true;
        this.lsRecommendation = [];
        this.lsSimilar = [];
        this.getDetailTv(id);
        this.getTvVideos(id);
        this.getCredits(id);
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
  
  /**
   * Call service that return a tv by id. 
   * @param id 
   */
  getDetailTv(id: number) {
    this.tvService.getById(id).subscribe(
      (obj: any) => {
        this.tv = obj.tv;
        this.tv.created_by.forEach((people: People) => {
          this.creators += `, ${people.name}`;
        });
        this.creators = this.creators.substring(1);
        this.seasons = obj.seasons;
      }
    );
  }

  getTvVideos(id: number) {
    this.tvService.getVideos(id).subscribe(
      (lsVideo: Array<Video>) => {
        this.tv.videos = lsVideo;
      }
    );
  }

  getTvRecommendation() {
    if (this.blRecommendation) {
      if (this.lsRecommendation.length == 0) {
        this.tvService.getRecommendation(this.tv.id).subscribe(
          (lsTv: Array<TvShow>) => {
            if (lsTv.length != 0) {
              this.lsRecommendation = lsTv;
            } else {
              this.blRecommendation = false;
            }
          }
        );
      }
    }
  }

  getTvSimilar() {
    if (this.blSimilar) {
      if (this.lsSimilar.length == 0) {
        this.tvService.getSimilar(this.tv.id).subscribe(
          (lsTv: Array<TvShow>) => {
            if (lsTv.length != 0) {
              this.lsSimilar = lsTv;
            } else {
              this.blSimilar = false;
            }
          }
        );
      }
    }
  }

  getImg() {
    return this.globalService.getFullUrlImg(this.tv, 'w300_and_h450_bestv2');
  }

  getImgCastCrew(people: People) {
    return this.globalService.getFullUrlImg(people, 'w138_and_h175_face');
  }

  /**
   * Background-image
   */
  getBackdrop() {
    let url = this.globalService.getFullUrlImg(this.tv, 'original', true);
    return this.sanitization.bypassSecurityTrustStyle(`url(${url})`);
  }

  getCredits(id: number) {
    this.tvService.getPeopleCredits(id).subscribe(
      (data: any) => {
        this.tv.crew = data.crew;
        this.feactureCrew = data.crew.slice(0, 5);
        this.tv.cast = data.cast;
        this.feactureCast = data.cast.slice(0, 5);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTrailerComponent, {
      data: {
        videos: this.tv.videos
      }
    });
  }


}
