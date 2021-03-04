import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Service } from 'src/app/common/service';
import { CartService } from 'src/app/services/cart.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})

export class ServiceDetailsComponent implements OnInit {

  service: Service = new Service;

  constructor(private serviceService: ServiceService,
              private cartService: CartService,
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

  addToCart() {

    const theCartItem = new CartItem(this.service);
    this.cartService.addToCart(theCartItem);

  }

}
