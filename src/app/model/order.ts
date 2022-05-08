import { Restaurant } from 'src/app/model/restaurant';
import { Item } from 'src/app/model/item';
export class Order {
  orderCost: number;
  items: Item[] = [];
  user_id: string;
  id: string;
  rest: Restaurant;


}
