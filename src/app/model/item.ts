export class Item {
  category_id: string;
  cover: string;
  desc: string;
  id: string;
  name: string;
  price: string;
  rating: string;
  status: boolean;
  uid: string;
  variation: boolean;
  veg: boolean;
  qty: number = 1 ;
  Item() {
    this.qty = 1;
  }
}
