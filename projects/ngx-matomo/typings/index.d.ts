declare global {
  /**
   * Extend Window interface in order to introduce the Matomo _paq attribute
   */
  interface Window {
    _paq: any;
  }
}

export {};
