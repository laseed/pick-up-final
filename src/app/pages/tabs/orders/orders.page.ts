import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from './../../../services/api/api.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, AfterContentChecked {
  banners: any[] = [];
  favorites: any[] = [];
  bannerConfig: SwiperOptions;
  categoryConfig: SwiperOptions;
  restaurantConfig: SwiperOptions;
  orders = [];
  status: any[] = [];
  constructor(private service: AuthService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router,) { }

  ngOnInit() {

    this.service.getRestaurant().subscribe((res) => {
      console.log(res);
      this.favorites = res;
    });

    this.service.getOrders().subscribe((res) => {
      console.log(res);
      this.orders = res;
      this.service.getOrderStatuses().subscribe((res) => {
        console.log(res);
        this.status = res;
        if(this.orders != []){
          this.orders.forEach(e =>{
            this.orders[this.orders.indexOf(e)].status = this.status.find(f => e.status_id == f.id).status;
          });
        }

      });
    });

  }
  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      centeredSlides: true,
      initialSlide: this.banners?.length > 1 ? 1 : 0,
      autoplay: {
        delay: 3000,
      },
      pagination: { clickable: true },
    };
    this.categoryConfig = {
      slidesPerView: 3.5,
    };
    this.restaurantConfig = {
      slidesPerView: 1.1,
    };
  }
  getCuisines(data) {
    return data.join(', ');
  }

  onClick(order) {


  }
  async presentActionSheet(order) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Pick',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          if(order.status_id == 3 ||  order.status_id == 4){
            this.presentToast();
          }else{
            this.presentAlertConfirm(order);
          }

        }
      },  {
        text: 'View Restaurant',
        icon: 'eye',
        handler: () => {
          console.log('Eye clicked');
          this.viewRestaurant(order.rest);

        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
  }
  viewRestaurant(favorite) {
    let navigationExtras: NavigationExtras = {
      state: {
        rest: favorite
      }
    };
    this.router.navigate(['/', 'tabs', 'restaurants',favorite?.id], navigationExtras);

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Cannot Delete This Order",
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  async presentAlertConfirm(order) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "<strong>ARE YOU SURE YOU WANT TO CANCEL THIS ORDER ?</strong>",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.service.cancelOrderById(order);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  getColor(status_id){
    if(status_id == 1){
      return 'yellow';
    }else if(status_id == 2){
      return 'orange';
    }else if(status_id == 3){
      return 'green';
    }else if(status_id == 4){
      return 'red';
    }
  }
}
