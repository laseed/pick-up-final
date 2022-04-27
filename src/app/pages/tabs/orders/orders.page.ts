import { ApiService } from './../../../services/api/api.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
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
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.banners = [
      { banner: 'assets/dishes/11.jpeg' },
      { banner: 'assets/dishes/3.jpg' },
      { banner: 'assets/dishes/cab.jpg' },
    ];
    this.favorites = this.api.allRestaurants;
  }
  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      centeredSlides: true,
      initialSlide: this.banners?.length > 1 ? 1 : 0,
      autoplay: {
        delay: 3000
      },
      pagination: { clickable: true }
    };
    this.categoryConfig = {
      slidesPerView: 3.5
    };
    this.restaurantConfig = {
      slidesPerView: 1.1
    };
  }

}