import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  id: any;
  restaurant: any;
  categories: any[] = [];
  items: any[] = [];

  constructor( private navCtrl: NavController,
    private route: ActivatedRoute,
    private api: ApiService) { }

    ngOnInit() {
      this.getData();
    }



    getData() {
      this.restaurant = this.api.allRestaurants;
      this.categories = this.api.categories;
      this.items = [...this.api.allItems];
      console.log(this.items);
    }

    getCuisines(data) {
      return data.join(', ');
    }




}
