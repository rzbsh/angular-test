import { Component, OnInit } from '@angular/core';
import { ServiceCategory } from 'src/app/common/service-category';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-category-menu',
  templateUrl: './service-category-menu.component.html',
  styleUrls: ['./service-category-menu.component.css']
})
export class ServiceCategoryMenuComponent implements OnInit {

  serviceCategories: ServiceCategory[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.listServiceCategories();
  }

  listServiceCategories() {

    this.serviceService.getServiceCategories().subscribe(
      data => {
        //console.log('Service Categories = ' + JSON.stringify(data));
        this.serviceCategories = data;
      }
    );
  }

}
