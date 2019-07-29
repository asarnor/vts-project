// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { common } from './environment.common';
import { local } from './environment.local';

interface Env {
  properties?: {
    /** Name of application */
    appName?: string;
  };
  settings?: {
    /** Is an authentication endpoint available? If so make sure to update the endpoints in this file */
    enableAuth?: boolean;
    /** Enable service worker functionality */
    enableServiceWorker?: boolean;
    /** Is this app going to communicate with other domains or instances of itself for multiscreen usage?
     * If so, whitelist domains in the domains.listenTo property */
    enableAppComms?: boolean;
    /** Should lazy loaded routes be preloaded on app instantiation? If false will be loaded on demand */
    preloadRoutes?: boolean;
    /** Should data that is written to localstorage (such as app settings and store state) be obfuscated? */
    obfuscate?: boolean;
  };
  domains?: {
    /** If App Comms is enabled, whitelist domains to accept messages from here */
    listenTo?: string;
  };
  endpoints?: {
    /** Location to get environment and config settings */
    envConfig?: string;
    /** Location of API if not getting that from envConfig */
    apiUrl?: string;
    /** Login endpoint */
    authLogin?: string;
    /** Refresh token endpoint */
    authTokenRefresh?: string;
    /** Api version endpoint. If not null then the app will request an update when the version changes */
    version?: string;
    /** Log front-end errors to here. Used by error.intercepter */
    errors?: string;
  };
  state?: {
    /** Which UI store properties to not write to localstorage. IE do not persist confidential/personal information */
    uiStoreBlacklist?: string[];
  };
  licenses?: {
    agGrid?: string;
  };
  production?: boolean;
}

export const environment: Env = {
  ...common,
  endpoints: {
    ...common.endpoints,
    ...local.endpoints,
  },
  production: false,
};
