import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { DatePipe, CurrencyPipe } from '@angular/common';

// Directives
import { FullScreenDirective } from './directives/full-screen.directive';
import { FocusDirective } from './directives/focus.directive';
import { ModalLaunchDirective } from './directives/modal-launch.directive';
import { DomObserverDirective } from './directives/dom-observer.directive';

// Pipes + Directives
export const APP_PIPES_DIRECTIVES = [
  // Pipes

  // Directives
  FullScreenDirective,
  FocusDirective,
  ModalLaunchDirective,
  DomObserverDirective,
];

@NgModule({
  imports: [
    // Angular
    CommonModule,
  ],
  providers: [DatePipe, CurrencyPipe],
  declarations: [APP_PIPES_DIRECTIVES],
  exports: [APP_PIPES_DIRECTIVES],
  entryComponents: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
