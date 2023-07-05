import { Injectable } from '@angular/core';

import { SanitizedMatomoConfiguration } from './matomo-configuration';

declare global {
  /**
   * Extend Window interface in order to introduce the Matomo _paq attribute
   */
  interface Window {
    _paq: any;
  }
}

/**
 * Service for injecting the Matomo tracker in the application.
 * This service shall no longer be used directly within an application.
 */
@Injectable()
export class MatomoInjector {
  /**
   * Creates an instance of MatomoInjector.
   */
  constructor() {}

  /**
   * Configures and injects the Matomo tracker in the DOM.
   */
  init(configuration: SanitizedMatomoConfiguration): void {
    if (!!configuration.scriptUrl) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = configuration.scriptUrl;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    }
  }
}
