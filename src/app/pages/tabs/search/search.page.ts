import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  items_list: any[] = [];
  cat_item: any[] = [];
  searchTerm:string = "";
  constructor(private navCtrl: NavController,
    private route: ActivatedRoute,
    private service: AuthService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.getData();
    console.log(this.searchTerm );

  }



  getData() {
    this.service.getItems().subscribe((res) => {
      console.log(res);
      this.items = [...res];


      //console.log(this.cat_item);
    });




  }
  //search() {
  //  this.items = this.items_list.filter(val => val.name == '%'+this.searchTerm+'%');
  //}
  async goToRest(item) {
    const toast = await this.toastController.create({
      message: 'work in progress!',
      duration: 2000
    });
    toast.present();
  }
  getCuisines(data) {
    return data.join(', ');
  }




}
