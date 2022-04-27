import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);
import { ApiService } from './../../../services/api/api.service';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  loc = 'Location';
  banners: any[] = [];
  categories: any[] = [];
  favorites: any[] = [];
  offers: any[] = [];
  nearby: any[] = [];
  bannerConfig: SwiperOptions;
  categoryConfig: SwiperOptions;
  restaurantConfig: SwiperOptions;

  constructor(public popoverController: PopoverController,
    private api: ApiService) { }

  ngOnInit() {
    this.banners = [
      { banner: 'assets/dishes/11.jpeg' },
      { banner: 'assets/dishes/3.jpg' },
      { banner: 'assets/dishes/cab.jpg' },
    ];
    this.categories = this.api.categories;
    this.favorites = this.api.allRestaurants;
    const offers = [...this.api.allRestaurants];
    // eslint-disable-next-line radix
    this.offers = offers.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    this.nearby = this.api.allRestaurants;
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
