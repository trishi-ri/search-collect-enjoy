import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICollectionGeneratorConfig } from 'src/app/initialize/config.service';
import {
  ICollectionElement,
  CollectionElement,
  CssStyle,
} from './collection-element/collection-element.model';
import { generateFromSource } from './collection-source-parser';
import { Collection } from './collection.model';

@Injectable({ providedIn: 'root' })
export class CollectionGenerator {
  private maxLength = 0;
  private source = new BehaviorSubject<CollectionSource | undefined>(undefined);

  constructor(private http: HttpClient) {}

  public init(config: ICollectionGeneratorConfig): Observable<void> {
    this.maxLength = config.maxCollectionLength;
    return this.getCollectionSource().pipe(
      map((source) => this.source.next(source))
    );
  }

  public generate(collectionName: string = 'default'): Collection {
    return new Collection({
      name: collectionName,
      elements: this.generateElements(),
    });
  }

  private generateElements(): ICollectionElement[] {
    const source = this.source.value;
    if (!source) {
      return [];
    }
    return new Array(this.maxLength)
      .fill(undefined)
      .map(() => this.generateElementName(source))
      .reduce((acc: string[], curr: string) => {
        if (!acc.includes(curr)) {
          acc.push(curr);
        }
        return acc;
      }, [])
      .map((name: string, index: number) => {
        const description = this.generateDescription(source, { name });
        const iconStyle = this.generateIconStyle(name.split(' ')[0]);
        return new CollectionElement(index, name, description, iconStyle);
      });
  }

  private generateElementName(source: CollectionSource): string {
    return generateFromSource(source, source.patterns.name);
  }

  private generateDescription(
    source: CollectionSource,
    context: { name: string }
  ): string {
    return generateFromSource(source, source.patterns.description, context);
  }

  private generateIconStyle(elementColor: string): CssStyle {
    return {
      background: elementColor,
      outline: '1px solid black',
      opacity: '0.5',
    };
  }

  private getCollectionSource(): Observable<CollectionSource> {
    return this.http.get<CollectionSource>('./assets/collection.json');
  }
}

export type CollectionSource = {
  patterns: {
    name: string;
    description: string;
  };
  patternParsers: {
    dictionary: string;
    contextParameter: string;
  };
  dictionaries: {
    color: string[];
    item: string[];
    defenition: string[];
  };
};
