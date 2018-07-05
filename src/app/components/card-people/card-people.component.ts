import { People } from './../../models/people.model';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-people',
  templateUrl: './card-people.component.html',
  styleUrls: ['./card-people.component.css']
})
export class CardPeopleComponent implements OnInit {

  @Input() people: People;
  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    if(!this.people.character){
      this.people.character = this.people.job;
    }
  }

  getImgCastCrew() {
    return this.globalService.getFullUrlImg(this.people, 'w138_and_h175_face');
  }

}
