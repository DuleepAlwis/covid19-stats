import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GlobalComponent } from './global/global.component';
import { SubscribeComponent } from './subscribe/subscribe.component';


const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children:[
      {
        path:"global",
        component:GlobalComponent
        
      }
    ]
  },
  {
    path:"subscribe",
    component:SubscribeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
