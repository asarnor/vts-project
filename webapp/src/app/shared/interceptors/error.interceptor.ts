import { ErrorHandler, Injectable } from '@angular/core';

import { environment } from '$env';
import { SettingsService } from '$settings';

interface AngularError {
  promise: any;
  rejection: any;
  task: any;
  zone: any;
  message: string;
  stack: string;
  errorMsg?: string;
  status?: number;
}

interface LogError {
  eventTime?: string;
  level?: string;
  class: string;
  message: string;
  exception: string;
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private settings: SettingsService) {}

  // Custom error handler for application/angular errors
  // Uses plain JS to eliminate any dependencies that may not be available due to the error
  public handleError(error: AngularError) {
    // If is browser
    // Does not have custom error message
    // Does not have http status field (to ignore http errors)
    if (this.settings.isBrowser && !error.errorMsg && !error.hasOwnProperty('status') && environment.production) {
      // If error endpoint specified, log errors
      if (environment.endpoints.errors) {
        this.logError(error);
      }
      // this.settings.error$.next(error.message);
      this.resetState(error);
    }
    // Now throw the error to the console
    throw error;
  } // end handleError

  /**
   * Reset app state
   * @param error
   */
  private resetState(error: AngularError) {
    console.error({ error: error });
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/#/login';
  }

  /**
   * Log the error to an API
   * Use XMLHttpRequest since httpClient may not be available
   */
  private logError(error: AngularError) {
    const http = new XMLHttpRequest();
    const url = environment.endpoints.apiUrl + environment.endpoints.errors;
    const data: LogError = {
      level: 'Error',
      class: '',
      message: error.message,
      exception: error.stack,
    };
    http.open('POST', url, true);
    // Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    http.send(JSON.stringify(data));
  } // end logError
}
