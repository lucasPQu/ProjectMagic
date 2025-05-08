import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchCardsComponent } from './pages/search-cards/search-cards.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/cards', component: SearchCardsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
