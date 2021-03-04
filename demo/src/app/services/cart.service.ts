import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems: CartItem[] = [];

  // Subject is a subclass of Observable
  // use Subject to publish events
  // the event will be sent to all of the subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    /*
    for (let tempCartItem of this.cartItems)
      if (tempCartItem.id === theCartItem.id) {
        existingCartItem = tempCartItem;
        break;
      }
    */

    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

    if (alreadyExistsInCart = (existingCartItem != undefined))
        existingCartItem.quantity ++;
    else
      this.cartItems.push(theCartItem);

    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }

    // publish the new values
    // all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  decrementQuantity(theCartItem: CartItem) {

    if (theCartItem.quantity == 1) {
      this.remove(theCartItem);
    } else {
      theCartItem.quantity --;
      this.computeCartTotals();
    }

  }

  remove(theCartItem: CartItem) {

    const itemIdex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    if (itemIdex > -1) {
      this.cartItems.splice(itemIdex, 1);
      this.computeCartTotals();
    }

  }

}
