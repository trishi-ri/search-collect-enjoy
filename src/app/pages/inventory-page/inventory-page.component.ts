import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss'],
})
export class InventoryPageComponent implements OnInit {
  public inventoryItems = this.inventoryService.inventoryItems;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {}

  public onDeleteSelectedClick(selected: MatListOption[]): void {
    this.inventoryService.removeFromInventory(
      selected.map((v) => v.value.collectionId)
    );
  }
}
