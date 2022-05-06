import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  id: any;
  restaurant: any;
  categories: any[] = [];
  items: any[] = [];
  cat_item: any[] = [];
  cart: any[];
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private service: AuthService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getId();
    this.getData();
    this.cart = null;
    console.log(this.cart);
  }

  getId() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if (!id) {
      this.navCtrl.back();
      return;
    }
    this.id = id;
  }

  getData() {
    this.service.getRestaurantById(this.id).subscribe((res) => {
      console.log(res);
      this.restaurant = res;
    });
    this.service.getItems().subscribe((res) => {
      console.log(res);
      this.items = [...res].filter((x) => x.uid == this.id);
      if (this.items != [])
        this.items.forEach((val) => {
          this.cat_item.push(val.category_id);
        });
      //console.log(this.cat_item);
    });
    this.service.getCategories().subscribe((res1) => {
      console.log(res1);
      [...res1].forEach(
        (val) => this.cat_item.includes(val.id) && this.categories.push(val)
      );
      console.log(this.categories);
    });
  }

  getCuisines(data) {
    return data.join(', ');
  }
  addToCart(item) {
    if (this.cart == null) this.cart = [];
    this.cart.push(item);

  }
}
