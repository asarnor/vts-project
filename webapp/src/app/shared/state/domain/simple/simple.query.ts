import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SimpleStore } from './simple.store';

@Injectable({ providedIn: 'root' })
export class SimpleQuery extends Query<SimpleState> {
  constructor(protected store: SimpleStore) {
    super(store);
  }
}
