import { GlobalService } from './../../services/global.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-tv-show',
  templateUrl: './card-tv-show.component.html',
  styleUrls: ['./card-tv-show.component.css']
})
export class CardTvShowComponent implements OnInit {


  @Input() tvShow;
  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
  }

  getImg() {
    return this.globalService.getFullUrlImg(this.tvShow, 'w185_and_h278_bestv2');
  }

}
