import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../common/service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = 'http://localhost:8080/api/services'
  constructor(private httpClient: HttpClient) { }
  getServiceList(): Observable<Service[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.services)
    );
  }
}

interface GetResponse {
  _embedded: {
    services: Service[];
  }
}
