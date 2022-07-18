import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionPageModule } from '@collection-page/collection-page.module';
import { NgMaterialModule } from '@shared/ng-material.module';
import { of } from 'rxjs';

import { InventoryPageComponent } from './inventory-page.component';
import { InventoryService } from './inventory.service';

const mockInventoryService: Partial<InventoryService> = {
  inventoryItems: of([]),
};

describe('InventoryPageComponent', () => {
  let component: InventoryPageComponent;
  let fixture: ComponentFixture<InventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryPageComponent],
      imports: [CollectionPageModule, NgMaterialModule],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
