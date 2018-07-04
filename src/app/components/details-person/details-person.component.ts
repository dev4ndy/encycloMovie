import { GlobalService } from '../../services/global.service';
import { PeopleService } from '../../services/people.service';
import { Component, OnInit, Input } from '@angular/core';
import { People } from '../../models/people.model';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.css']
})
export class DetailsPersonComponent implements OnInit {


  public people: People;

  constructor(
    private peopleService: PeopleService,
    private globalService: GlobalService,
    private route: ActivatedRoute
  ) { }

  /**
   * We receive the parameters of the route
   */
  ngOnInit() {
    this.route.params.subscribe( //Force reload component
      params => {
        const id = +params['id'];
        this.getDetailPeople(id);
      });
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
   * Get the url of the image in the specified size
   */
  getImg() {
    return this.globalService.getFullUrlImg(this.people, 'w300_and_h450_bestv2');
  }
}