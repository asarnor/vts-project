import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export function createInitialState(): SimpleState {
  return {
    todos: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'simple' })
export class SimpleStore extends Store<SimpleState> {
  constructor() {
    super(createInitialState());
  }
}
