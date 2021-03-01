import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ServiceService } from './services/service.service';
import { RouterModule, Routes } from '@angular/router';

const routs: Routes = [
  {path: 'category/:id', component: ServiceListComponent},
  {path: 'category', component: ServiceListComponent},
  {path: 'services', component: ServiceListComponent},
  {path: '', redirectTo: '/services', pathMatch: 'full'},
  {path: '**', redirectTo: '/services', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ServiceListComponent
  ],
  imports: [
    RouterModule.forRoot(routs),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
