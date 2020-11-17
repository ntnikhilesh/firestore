import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ItemList { title: string; desc: string; }
export interface ItemId extends ItemList { id: string; }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // items: Observable<any[]>;
  // constructor(firestore: AngularFirestore) {
  //   this.items = firestore.collection('items').valueChanges();
  //   console.log("items::",this.items);
  // }

  private itemCollection: AngularFirestoreCollection<ItemList>;
  private itemDoc: AngularFirestoreDocument<ItemList>;

  itemArr: Observable<ItemId[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.getItem();
  }

  ngOnInit(): void {
  }

  getItem() {
    this.itemCollection = this.afs.collection<ItemList>('items');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.itemArr = this.itemCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ItemList;
        const id = a.payload.doc.id;
        console.log("data:", data);
        console.log("id:", id);
        return { id, ...data };
      }))
    );

    console.log("itemArr::", this.itemArr);
  }

  addItem() {
    console.log("addItem:");
    var d = new Date();
    var n = d.getMilliseconds();
    this.itemCollection.add({ title: "item-" + n, desc: "This is item " + n });
  }

  deleteItem(item: any) {
    console.log("deleteItem::", item);
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
    this.getItem();
  }

  updateItem(item: any) {
    console.log("updateItem::", item);
    var d = new Date();
    var n = d.getMilliseconds();
    item["title"] = "Updated item-" + n
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
    this.getItem();
  }

}
