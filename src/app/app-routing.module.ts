import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPersonComponent } from './components/details-person/details-person.component';
import { DetailsMovieComponent } from './components/details-movie/details-movie.component';

const routes: Routes = [
  { path: 'people/detail/:id', component: DetailsPersonComponent, runGuardsAndResolvers: 'always' },
  { path: 'movie/detail/:id', component: DetailsMovieComponent, runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
