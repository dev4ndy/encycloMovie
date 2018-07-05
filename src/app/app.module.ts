import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
/**
 * Angular Material Modules
 */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

import { FlexLayoutModule } from "@angular/flex-layout";
import { NgCircleProgressModule } from 'ng-circle-progress';



import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsPersonComponent } from './components/details-person/details-person.component';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { DetailsMovieComponent } from './components/details-movie/details-movie.component';
import { DialogTrailerComponent } from './components/dialog-trailer/dialog-trailer.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsTvComponent } from './components/details-tv/details-tv.component';
import { CardPeopleComponent } from './components/card-people/card-people.component';
import { CardTvShowComponent } from './components/card-tv-show/card-tv-show.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailsPersonComponent,
    CardMovieComponent, 
    CardTvShowComponent,
    DetailsMovieComponent,
    DialogTrailerComponent,
    CardPeopleComponent,
    DetailsTvComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, MatIconModule, MatToolbarModule, MatInputModule, HttpClientModule, MatCardModule, MatDividerModule, MatTabsModule, MatSelectModule, MatButtonModule, MatChipsModule, MatDialogModule,
    FlexLayoutModule,
    NgCircleProgressModule.forRoot({
      "backgroundPadding": 7,
      "radius": 18,
      "space": -2,
      "outerStrokeWidth": 2,
      "outerStrokeColor": "#ff0000",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 2,
      "titleFontSize": "14",
      "subtitleFontSize": "16",
      "animation": false,
      "animateTitle": false,
      "showSubtitle": false,
      "showUnits": true,
      "showBackground": false
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogTrailerComponent]
})
export class AppModule { }
