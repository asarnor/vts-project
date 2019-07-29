import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter, mergeMap } from 'rxjs/operators';

import { environment } from '$env';
import { AuthService } from '$shared';
import { NtVersionManagementService } from '@ntersol-ui/services';
import { ModalsService } from '$modals';
import { UiStateService } from '$ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  /** Global/app errors */
  // public error$ = this.settings.error$;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private authService: AuthService,
    private version: NtVersionManagementService,
    private modals: ModalsService,
    private uiState: UiStateService,
  ) {}

  ngOnInit() {
    this.routeChange();

    /**
    // If service worker
    if (environment.settings.enableServiceWorker) {
      this.sw.enable();
    }

    // If app comms
    if (environment.settings.enableAppComms) {
      this.comms.commsEnable();
    }
     */

    // If version endpoint specified, poll for version changes
    if (environment.endpoints.version) {
      this.version.start(environment.endpoints.version).subscribe(version => {
        console.warn('Version Updated', version);
        this.modals
          .open(
            'ConfirmationModalComponent',
            false,
            'sm',
            'A new version of this application has just been released, would you like to refresh?',
          )
          .afterClosed()
          .subscribe(closed => {
            if (closed) {
              // Reset ui state to clear out any breaking changes
              this.uiState.reset();
              // Reload page
              location.reload();
            }
          });
      });
    }
  }

  /**
   * Actions to perform on route change
   * Page titles are in app.routes.ts
   */
  public routeChange() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => {
        this.title.setTitle(event['title'] + ' | ' + environment.properties.appName); // Change document title
        // If auth endpoint is available and not on the login page
        if (environment.settings.enableAuth && this.router.url.toLowerCase().indexOf('login') === -1) {
          this.authService.refreshTokenUpdate(); // On Route change, refresh authentication token
        }
      });
  } // end routeChange
}
