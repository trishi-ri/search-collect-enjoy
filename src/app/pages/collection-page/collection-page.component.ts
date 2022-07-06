import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICollectionElement } from './collection-element/collection-element.model';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
})
export class CollectionPageComponent {
  public elements: Observable<ICollectionElement[]> =
    this.collectionService.elements;

  constructor(private collectionService: CollectionService) {}
}
