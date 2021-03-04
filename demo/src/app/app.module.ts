import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ServiceService } from './services/service.service';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCategoryMenuComponent } from './components/service-category-menu/service-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component'

const routs: Routes = [
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'search/:keyword', component: ServiceListComponent},
  {path: 'category/:id', component: ServiceListComponent},
  {path: 'category', component: ServiceListComponent},
  {path: 'services/:id', component: ServiceDetailsComponent},
  {path: 'services', component: ServiceListComponent},
  {path: '', redirectTo: '/services', pathMatch: 'full'},
  {path: '**', redirectTo: '/services', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ServiceListComponent,
    ServiceCategoryMenuComponent,
    SearchComponent,
    ServiceDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
  ],
  imports: [
    RouterModule.forRoot(routs),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
