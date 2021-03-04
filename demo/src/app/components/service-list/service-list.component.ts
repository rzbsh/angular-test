import { DomElementSchemaRegistry, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Service } from 'src/app/common/service';
import { CartService } from 'src/app/services/cart.service';
import { ServiceService, GetResponseServices } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  services: Service[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // pagination:
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string | null = null;


  constructor(private serviceService: ServiceService,
              private cartService: CartService,
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
    
    // check if we have a different category than previous,
    // if we have diffrent category then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
      this.previousCategoryId = this.currentCategoryId;
      console.log('categoryId changed: '+this.currentCategoryId+this.thePageNumber);
    } else
    console.log('categoryId same: '+this.currentCategoryId+this.thePageNumber);


    this.serviceService.getServiceListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
                                                .subscribe(this.processResult());

    // get the services for the id
    //this.serviceService.getServiceList(this.currentCategoryId, hasCategoryId).subscribe(
    //  data => {
    //    console.log('Services = ' + JSON.stringify(data));
    //    this.services = data;
    //  }
    //);
    
  }

  processResult() {

    return (data: GetResponseServices) => {
      this.services = data._embedded.services;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }

  }

  handleSearchServices() {

    const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword');

    // check if we have a different keyword than previous
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
      this.previousKeyword = theKeyword;
    }

    this.serviceService.searchServicesPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword)
    .subscribe(
      data => {
        this.services = data._embedded.services;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      }
    );

  }

  updatePageSize(pageSize: number) {

    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listServices();

  }

  addToCart(theService: Service) {

    const theCartItem = new CartItem(theService);
    this.cartService.addToCart(theCartItem);

  }
  
}
