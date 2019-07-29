import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UiStateStore } from './ui-state.store';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UiStateQuery extends Query<UIState> {
  /** State of current UI store */
  public uiState$ = this.select();
  /** Return the active tab of the specified tab instance */
  public tabActive$ = (tabInstanceId: string) =>
    this.select(state => state.tabsActive).pipe(
      map(val => (val && val[tabInstanceId] ? val[tabInstanceId] : 0)),
      distinctUntilChanged(),
    );
  /** Return the toggle state of the specificed prop */
  public toggles$ = (toggleProp: string) =>
    this.select(state => state.toggles).pipe(
      map(val => (val && val[toggleProp] !== null ? val[toggleProp] : null)),
      distinctUntilChanged(),
    );

  constructor(protected store: UiStateStore) {
    super(store);
  }
}
