import { GlobalService } from './../../services/global.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css']
})
export class CardMovieComponent implements OnInit {

  @Input() movie;
  constructor(
    private globalService: GlobalService
  ) { }
  
  ngOnInit() {
  }

  getImg() {
    return this.globalService.getFullUrlImg(this.movie, 'w185_and_h278_bestv2');
  }



}
