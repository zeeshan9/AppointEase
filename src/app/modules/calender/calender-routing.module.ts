import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderPageComponent } from './components/calender-page.component';

const routes: Routes = [
  { path: '', component: CalenderPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
