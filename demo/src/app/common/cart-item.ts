import { Service } from "./service";

export class CartItem {

    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(service: Service) {
        this.id = service.id;
        this.name = service.name;
        this.imageUrl = service.imageUrl;
        this.unitPrice = service.price;
        this.quantity = 1;
    }

}
