import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './core/guards/public.guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { CalenderPageComponent } from './modules/calender/components/calender-page.component';

const publicRoutes: Route[] = [
  {
    path: 'calender',
    title: 'Calendar',
    loadChildren: () => 
      import('./modules/calender/calender.module').then((d) => d.CalenderModule),
    canActivate: [PublicGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    [
      {
        path: '',
        component: CalenderPageComponent,
        children: publicRoutes,
        canActivate: [PublicGuard]
      },
      { path: '', redirectTo: 'calender', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}