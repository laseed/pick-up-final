import { Item } from 'src/app/model/item';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Order } from 'src/app/model/order';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items: Item[];
  restaurant: any;
  item_qty: number = 1;
  amount: number = 0;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private service: AuthService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.items = this.router.getCurrentNavigation().extras.state.cart;
        this.items.forEach(e => {
          e.qty = 1;
          this.amount += Number(e.price);
        });
        this.restaurant = this.router.getCurrentNavigation().extras.state.rest;
        console.log(this.items);
        console.log(this.restaurant);
      }
    });
  }

  ngOnInit() {
    // this.getItem();
  }
  decrementQty(index) {
    /*. if item passed then item.qty. */
    if (this.items[this.items.indexOf(index)].qty - 1 < 1) {
      this.amount -= Number(this.items[this.items.indexOf(index)].price);
      this.items.splice(this.items.indexOf(index), 1);
      //console.log('item_1-> ' + this.items[this.items.indexOf(index)].qty)
    }
    else {
      this.amount -= Number(this.items[this.items.indexOf(index)].price);
      this.items[this.items.indexOf(index)].qty -= 1;
      //console.log('item_2-> ' + index + '  ' + this.items[this.items.indexOf(index)].qty);
    }
  }
  incrementQty(index) {
    /*. if item passed then item.qty. */
    console.log(this.items.indexOf(index));
    this.amount += Number(this.items[this.items.indexOf(index)].price);
    this.items[this.items.indexOf(index)].qty += 1;
    // console.log('item_2-> ' + index + '  ' + this.items[this.items.indexOf(index)].qty);

  }
   async order() {
    let order: Order = new Order();
    order.items = this.items;
    order.rest = this.restaurant;
    order.orderCost = this.amount;
    order.user_id = 'j5RAa8XCWVeqikdMWBBliAO4O4V2';

    await this.service.addOrder(order);
    this.router.navigate(['']);
  }

}
