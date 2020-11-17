import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Item } from '../models/Item';
import { map } from 'rxjs/operators';

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) {
    //this.items = this.afs.collection('items').valueChanges();

    this.itemsCollection = this.afs.collection<Item>('items', ref => ref.orderBy('title', 'asc'));


    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        console.log("data::", data);
        return data;

      }))
    );


  }

  getItems() {
    return this.items;
  }


  addItem() {
    console.log("addItem:");
    var d = new Date();
    var n = d.getMilliseconds();
    this.itemsCollection.add({ title: "item-" + n, desc: "This is item " + n });
  }

  deleteItem(item: any) {
    console.log("deleteItem::", item);
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
    window.alert("Item deleted successfully!");
  }

  updateItem(item: any) {
    console.log("updateItem::", item);
    var d = new Date();
    var n = d.getMilliseconds();
    item["title"] = "Updated item-" + n
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
    window.alert("Item updated successfully!");
  }


}

