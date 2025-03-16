import { InjectionToken } from '@angular/core';

import './matomo-configuration';

export const MATOMO_TRACKER_SET_FUNCTION = new InjectionToken<
  (command: string, ...args: unknown[]) => void
>('Matomo tracker set function');

export function setFunctionFactory(dummyMode = false, debugTracing = false) {
  return !dummyMode
    ? function (method: string, ...args: unknown[]) {
        if (debugTracing)
          console.debug(
            `\x1B[1mngx-Matomo\x1B[m • 🚀 Call tracker Set method \x1B[4m${method}\x1B[m with`,
            args,
          );
        try {
          window['_paq'].push([method, ...args]);
        } catch (e) {
          if (!(e instanceof ReferenceError)) throw e;
        }
      }
    : function (method: string, ...args: unknown[]) {
        if (debugTracing)
          console.debug(
            `\x1B[1mngx-Matomo\x1B[m • 🚀 Call dummy tracker Set method \x1B[4m${method}\x1B[m with`,
            args,
          );
      };
}

export const MATOMO_TRACKER_GET_FUNCTION = new InjectionToken<
  <T>(func: string, ...args: unknown[]) => Promise<T>
>('Matomo tracker get function');

export function getFunctionFactory(dummyMode = false, debugTracing = false) {
  return !dummyMode
    ? function <T>(method: string, ...args: unknown[]) {
        if (debugTracing)
          console.debug(
            `\x1B[1mngx-Matomo\x1B[m • 🚀 Call tracker Get method \x1B[4m${method}\x1B[m with`,
            args,
          );
        return new Promise((resolve, reject) => {
          try {
            window['_paq'].push([
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              function (this: any): void {
                resolve(this[method](args) as T);
              },
            ]);
          } catch (e) {
            if (!(e instanceof ReferenceError)) reject(e);
          }
        });
      }
    : function (method: string, ...args: unknown[]) {
        if (debugTracing)
          console.debug(
            `\x1B[1mngx-Matomo\x1B[m • 🚀 Call dummy tracker Get method \x1B[4m${method}\x1B[m with`,
            args,
          );
        return Promise.resolve();
      };
}

export const MATOMO_TRACKER_INVOKE_FUNCTION = new InjectionToken<
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  (command: string, callback: Function) => void
>('Matomo tracker invoke function');

export function invokeFunctionFactory(dummyMode = false, debugTracing = false) {
  return !dummyMode
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      function (method: string, callback: Function) {
        if (debugTracing)
          console.debug(
            `\x1B[1mngx-Matomo\x1B[m • 🚀 Call tracker Invoke method \x1B[4m${method}\x1B[m with`,
            callback,
          );
        try {
          window['_paq'].push([method, callback]);
        } catch (e) {
          if (!(e instanceof ReferenceError)) throw e;
        }
      }
    : // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      function (method: string, callback: Function) {
        if (debugTracing)
          console.debug(
            `\x1B[1mngx-Matomo\x1B[m • 🚀 Call dummy tracker Invoke method \x1B[4m${method}\x1B[m with`,
            callback,
          );
      };
}
