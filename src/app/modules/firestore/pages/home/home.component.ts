import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../services/item.service';
import { Item } from '../../../../models/Item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.getUpdatedItems();
  }


  getUpdatedItems() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      console.log("items::", this.items);
    });
  }

  addItem() {
    console.log("addItem: ");
    this.itemService.addItem();
  }

  deleteItem(item: any) {
    console.log("deleteItem: ", item);
    this.itemService.deleteItem(item);
  }

  updateItem(item: any) {
    console.log("updateItem: ", item);
    this.itemService.updateItem(item);
  }


}
