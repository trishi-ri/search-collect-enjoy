import { Component, Input } from '@angular/core';
import { ICollectionElement } from './collection-element.model';

@Component({
  selector: 'app-collection-element',
  templateUrl: './collection-element.component.html',
  styleUrls: ['./collection-element.component.scss'],
})
export class CollectionElementComponent {
  @Input() public element!: ICollectionElement;
}
