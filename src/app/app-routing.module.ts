import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPersonComponent } from './components/details-person/details-person.component';

const routes: Routes = [
  { path: 'people/detail/:id', component: DetailsPersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
