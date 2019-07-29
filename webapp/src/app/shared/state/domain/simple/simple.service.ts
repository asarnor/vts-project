import { Injectable } from '@angular/core';
import { SimpleStore } from './simple.store';
import { HttpClient } from '@angular/common/http';
import { SimpleQuery } from './simple.query';
/**
 * The simple domain store is for web api requests that are GET only and do not need create/update/delete
 * This is to eliminate the need to have a new store for every web api call
 */
@Injectable({ providedIn: 'root' })
export class SimpleService {
  public todos$ = this.query.select(state => state.todos);

  constructor(private simpleStore: SimpleStore, private http: HttpClient, private query: SimpleQuery) {}

  /**
   * Load todos into the store
   */
  public todos() {
    this.http.get<any[]>('//jsonplaceholder.typicode.com/todos').subscribe(todos => this.simpleStore.update({ todos: todos }));
  }
}
