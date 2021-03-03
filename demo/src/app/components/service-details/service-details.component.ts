import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/common/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  service: Service = new Service;

  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleServiceDetails();
    });
  }

  handleServiceDetails() {
    const theServiceId: number = +this.route.snapshot.paramMap.getAll('id')[0];
    this.serviceService.getService(theServiceId).subscribe(
      data => {
        this.service = data;
      }
    )
  }

}
