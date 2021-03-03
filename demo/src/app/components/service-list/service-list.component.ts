import { DomElementSchemaRegistry, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/common/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  services: Service[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = true;

  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listServices();
    });
  }

  listServices() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode)
      this.handleSearchServices();
    else
      this.handleListServices();
  }

  handleListServices() {

    // check if "id" paramter is available
    // route: use the activated route
    // snapshot: state of route at this given moment of time
    // paramMap: map of all the route parameters
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.getAll('id')[0];
    } else {
      // default to 1
      this.currentCategoryId = 1; // has no effect
    }
    
    // get the services for the id
    this.serviceService.getServiceList(this.currentCategoryId, hasCategoryId).subscribe(
      data => {
        console.log('Services = ' + JSON.stringify(data));
        this.services = data;
      }
    )
    
  }

  handleSearchServices() {

    const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword');
    this.serviceService.searchServices(theKeyword).subscribe(
      data => {
        this.services = data;
      }
    )

  }

}
