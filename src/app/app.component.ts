import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  peopleId: number;

  listenPerson(peopleId: number) {
    this.peopleId = peopleId;
  }
}
