import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../common/service';
import { map } from 'rxjs/operators';
import { ServiceCategory } from '../common/service-category';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = 'http://localhost:8080/api/services'
  private categoryUrl = 'http://localhost:8080/api/service-category'

  constructor(private httpClient: HttpClient) { }

  getService(theServiceId: number): Observable<Service> {

    const serviceUrl = this.baseUrl + '/' + theServiceId;
    
    return this.httpClient.get<Service>(serviceUrl);
  }

  getServiceList(theCategoryid: number, searchByCategory: boolean = true): Observable<Service[]> {

    let searchUrl: string = this.baseUrl;
    if (searchByCategory)
    // build URL based on category id
      searchUrl += '/search/findByCategoryId?id=' + theCategoryid;

    return this.getServices(searchUrl);  
  }

  searchServices(theKeyword: string | null): Observable<Service[]> {

    const searchUrl: string = this.baseUrl + '/search/findByNameContaining?name=' + theKeyword;


    return this.getServices(searchUrl);  
  }
  
  private getServices(searchUrl: string): Observable<Service[]> {
    return this.httpClient.get<GetResponseServices>(searchUrl).pipe(
      map(response => response._embedded.services)
    );
  }

  getServiceCategories(): Observable<ServiceCategory[]> {

    return this.httpClient.get<GetResponseServiceCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.serviceCategory)
    );
  }

}

interface GetResponseServices {
  _embedded: {
    services: Service[];
  }
}

interface GetResponseServiceCategories {
  _embedded: {
    serviceCategory: ServiceCategory[];
  }
}
