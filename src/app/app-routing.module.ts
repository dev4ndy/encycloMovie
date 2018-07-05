import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPersonComponent } from './components/details-person/details-person.component';
import { DetailsMovieComponent } from './components/details-movie/details-movie.component';
import { DetailsTvComponent } from './components/details-tv/details-tv.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'people/detail/:id', component: DetailsPersonComponent, runGuardsAndResolvers: 'always' },
  { path: 'movie/detail/:id', component: DetailsMovieComponent, runGuardsAndResolvers: 'always' },
  { path: 'tv/detail/:id', component: DetailsTvComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
