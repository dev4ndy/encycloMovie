import { CardTvShowComponent } from './components/card-tv-show/card-tv-show.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

import { FlexLayoutModule } from "@angular/flex-layout";
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsPersonComponent } from './components/details-person/details-person.component';
import { CardMovieComponent } from './components/card-movie/card-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailsPersonComponent,
    CardMovieComponent, 
    CardTvShowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, MatIconModule, MatToolbarModule, MatInputModule, HttpClientModule, MatCardModule, MatDividerModule, MatTabsModule, MatSelectModule, MatButtonModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
