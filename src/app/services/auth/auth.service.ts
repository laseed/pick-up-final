import { Order } from './../../model/order';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  addDoc,
  collection,
  deleteDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { StorageService } from '../storage.service';
import { updateDoc } from 'firebase/firestore';
import { Category } from 'src/app/model/category';
import { Restaurant } from 'src/app/model/restaurant';
import { Item } from 'src/app/model/item';
import { Status } from 'src/app/model/status';

export const user_key = 'maza_eats_user_id';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _fireAuth: Auth,
    private _firestore: Firestore,
    private storage: StorageService
  ) { }

  async register(formValue) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        this._fireAuth,
        formValue.email,
        formValue.password
      );
      console.log('registered user: ', registeredUser);
      const uid = registeredUser.user.uid;
      const dataRef = doc(this._firestore, `users/${uid}`);
      const data = {
        email: formValue.email,
        username: formValue.username,
      };
      setDoc(dataRef, data);
      await this.storage.setStorage(user_key, uid);
      return uid;
    } catch (e) {
      throw e;
    }
  }

  async login(formValue) {
    try {
      const response = await signInWithEmailAndPassword(
        this._fireAuth,
        formValue.email,
        formValue.password
      );
      console.log('login user: ', response);
      if (response?.user) {
        const uid = response.user.uid;
        await this.storage.setStorage(user_key, uid);
        return uid;
      } else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._fireAuth, (user) => {
        console.log(user);
        if (user) resolve(true);
        resolve(false);
      });
    });
  }

  async logout() {
    try {
      await signOut(this._fireAuth);
      await this.storage.removeStorage(user_key);
      return true;
    } catch (e) {
      throw e;
    }
  }
  getCategories(): Observable<Category[]> {
    const ref = collection(this._firestore, 'category');
    return collectionData(ref, { idField: 'id' }) as Observable<
      Category[]
    >;
  }
  getItems(): Observable<Item[]> {
    const ref = collection(this._firestore, 'item');
    return collectionData(ref, { idField: 'id' }) as Observable<
      Item[]
    >;
  }
  getRestaurant(): Observable<Restaurant[]> {
    const ref = collection(this._firestore, 'restaurant');
    return collectionData(ref, { idField: 'id' }) as Observable<
      Restaurant[]
    >;
  }
  getRestaurantById(id): Observable<Restaurant[]> {
    const ref = doc(this._firestore, 'restaurant/' + id);
    return docData(ref, { idField: 'id' }) as Observable<Restaurant[]>;
  }

  getOrders(): Observable<Order[]> {
    const orderRef = collection(this._firestore, 'order');
    return collectionData(orderRef, { idField: 'id' }) as Observable<
      Order[]
    >;
  }
  getOrderStatuses(): Observable<Status[]> {
    const ref = collection(this._firestore, 'order_status');
    return collectionData(ref, { idField: 'id' }) as Observable<
      Status[]
    >;
  }
  getOrderById(id) {

    return query(collection(this._firestore, 'order'), where("user_id", "==", id));
  }
  addOrder(order: Order) {
    const orderRef = doc(collection(this._firestore, 'order'));
    return setDoc(orderRef, {
      orderCost: order.orderCost,
      items: order.items,
      user_id: order.user_id,
      rest: order.rest,
      status_id: '1'
    });
  }
  deleteOrderById(order: Order) {
    const orderRef = doc(this._firestore, 'order/' + order.id);
    return deleteDoc(orderRef);
  }
  updateOrderById(order: Order) {
    const orderRef = doc(this._firestore, 'order/' + order.id);
    return updateDoc(orderRef, { id: order.id, orderCost: order.orderCost });
  }
  cancelOrderById(order: Order) {
    console.log(order);
    const orderRef = doc(this._firestore, 'order/' + order.id);
    return updateDoc(orderRef, { id: order.id, status_id: '4'});
  }
  search(name) {
    const ref = collection(this._firestore, "item");

    // Create a query against the collection.
    return query(ref, where("name", "==", name));
  }
}
