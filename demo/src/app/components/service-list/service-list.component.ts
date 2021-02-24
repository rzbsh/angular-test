import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/common/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  services: Service[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.listServices();
  }

  listServices() {
    this.serviceService.getServiceList().subscribe(
      data => {
        this.services = data;
      }
    )
  }

}
