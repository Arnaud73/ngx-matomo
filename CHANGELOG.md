# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/Arnaud73/ngx-matomo/compare/v2.0.0-rc.1...v2.0.0) (2023-07-02)

## [2.0.0-rc.1](https://github.com/Arnaud73/ngx-matomo/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2023-06-27)


### Bug Fixes

* Fix version requirement for Angular router optional dependency ([ff2e38a](https://github.com/Arnaud73/ngx-matomo/commit/ff2e38a3980bfcab4ad052f659a6d34d8a402ff4))

## [2.0.0-rc.0](https://github.com/Arnaud73/ngx-matomo/compare/v1.1.0...v2.0.0-rc.0) (2023-06-26)


### Features

* **route-tracking:** Make use of Angular router route title ([2bde340](https://github.com/Arnaud73/ngx-matomo/commit/2bde3405c05faca0ae32715cf2a4f033b915c359))

## [1.1.0](https://github.com/Arnaud73/ngx-matomo/compare/v1.0.0...v1.1.0) (2022-12-29)


### Features

* **lib:** Accept Angular 15 ([7a8de83](https://github.com/Arnaud73/ngx-matomo/commit/7a8de8372283ce7460ad0ed99428e04a88c6ce90))


### Bug Fixes

* **tracker:** Correct type for MATOMO_CONFIGURATION token ([ad603b8](https://github.com/Arnaud73/ngx-matomo/commit/ad603b807929bbf0f8e6c35c317e5cf0968df27d))

## [1.0.0](https://github.com/Arnaud73/ngx-matomo/compare/v1.0.0-rc.2...v1.0.0) (2022-07-09)

## [1.0.0-rc.2](https://github.com/Arnaud73/ngx-matomo/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2022-06-17)

## [1.0.0-rc.1](https://github.com/Arnaud73/ngx-matomo/compare/v1.0.0-rc.0...v1.0.0-rc.1) (2021-05-10)


### Features

* **injector:** Allow operations with a predefined tracker ([805bb60](https://github.com/Arnaud73/ngx-matomo/commit/805bb60d547e069043d985d915daa5d46a8358c8))

## [1.0.0-rc.0](https://github.com/Arnaud73/ngx-matomo/compare/v0.1.4...v1.0.0-rc.0) (2021-05-02)


### ⚠ BREAKING CHANGES

* **tracker:** Rename getPiwikUrl to getMatomoUrl
* **injector:** since the injection is now automatic, the old way (0.x) of injecting the tracker manually is no longer compatible with this library.

### Features

* **injector:** Add support for specific script URL ([9b1b022](https://github.com/Arnaud73/ngx-matomo/commit/9b1b022d616df29151abeb0a62191929f2474b4e))
* **injector:** Inject the Matomo tracker at module import ([a56bfa3](https://github.com/Arnaud73/ngx-matomo/commit/a56bfa39a8d84fde82fa4a810ff590adf51f0db8))
* **route-tracking:** Add automatic route tracking ([75b0ccf](https://github.com/Arnaud73/ngx-matomo/commit/75b0ccf93b35b188bcf1182afe7bec370d3c0bb6))
* **ssr:** Add SSR support ([04cfe3f](https://github.com/Arnaud73/ngx-matomo/commit/04cfe3f9f7c878de2b149b2b46bb490a45ab5eb4))
* **tracker:** Add additional consent management functions ([f257a71](https://github.com/Arnaud73/ngx-matomo/commit/f257a717f51da024baf3fb8e7fa633f0c618f989))
* **tracker:** Add consent tracking functions ([868eb1b](https://github.com/Arnaud73/ngx-matomo/commit/868eb1b2052f3505c36c3950e2bf5761f09b7c78))
* **tracker:** Add DeleteCustomVariables function ([9e50ea0](https://github.com/Arnaud73/ngx-matomo/commit/9e50ea099410ae2fd5b989149aae65faf8139cf2))
* **tracker:** Add disableQueueRequest function ([017aa53](https://github.com/Arnaud73/ngx-matomo/commit/017aa534c3f11f7af5dc002212d9ef2dcabf671f))
* **tracker:** Add getCrossDomainLinkingUrlParameter function ([e6de929](https://github.com/Arnaud73/ngx-matomo/commit/e6de9297cba2e1b2e77377c2ad7a20777c19a64c))
* **tracker:** Add missing ecommerce tracking functions ([b3dc0bb](https://github.com/Arnaud73/ngx-matomo/commit/b3dc0bbf2bb8b511cce906594e9931e5e1514ad8))
* **tracker:** Add ping function ([10b1423](https://github.com/Arnaud73/ngx-matomo/commit/10b1423b74027904dcac6ac16e94ba26233c36a0))


### Bug Fixes

* **demo:** Fix missing declaration in FormComponent component ([462330d](https://github.com/Arnaud73/ngx-matomo/commit/462330dc7f53dedf0150cb16e2a36c9eed01b343))
* **injector:** Add missing MATOMO_CONFIGURATION import ([5e7a1fd](https://github.com/Arnaud73/ngx-matomo/commit/5e7a1fdb9c054cc03a1e12ee4214ba6325ca35c3))
* **injector:** Fix issue with PLATFORM_ID injection  ([b0c7b59](https://github.com/Arnaud73/ngx-matomo/commit/b0c7b59a0bf7b62571fb94d91f31a6b94693ac38))
* **route-tracker:** Fix an issue with incorrect content ids in configuration ([5488c01](https://github.com/Arnaud73/ngx-matomo/commit/5488c01c42d5251cbe92ed4cf6b04dd9dc6cab61))
* **tracker:** Fix incorrect management of optional parameters ([85241d8](https://github.com/Arnaud73/ngx-matomo/commit/85241d84966f164755021ba37b129c3594f1e70c))
* **tracker:** Handle Matomo deprecated features correctly ([78fa246](https://github.com/Arnaud73/ngx-matomo/commit/78fa246ecba8653f62b5fe06156b1ee21d14ac9f))


* **tracker:** Rename getPiwikUrl to getMatomoUrl ([d6da5da](https://github.com/Arnaud73/ngx-matomo/commit/d6da5dadfa85368c034290d319c826f4e5f35673))

<a name="0.1.4"></a>
## [0.1.4](https://github.com/Arnaud73/ngx-matomo/compare/v0.1.3...v0.1.4) (2019-05-10)


### Bug Fixes

* **config:** Accept Angular 5, 6, 7 & 8 ([11d7dd8](https://github.com/Arnaud73/ngx-matomo/commit/11d7dd8))
* **matomo-tracker:** Fix tracker getter functions ([#14](https://github.com/Arnaud73/ngx-matomo/issues/14)) ([3ad96cf](https://github.com/Arnaud73/ngx-matomo/commit/3ad96cf))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/Arnaud73/ngx-matomo/compare/v0.1.2...v0.1.3) (2019-04-03)


### Bug Fixes

* **matomo-tracker:** Fix value 0 passed to several tracker functions ([#12](https://github.com/Arnaud73/ngx-matomo/issues/12)) ([65ce508](https://github.com/Arnaud73/ngx-matomo/commit/65ce508))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/Arnaud73/ngx-matomo/compare/v0.1.1...v0.1.2) (2019-01-10)


### Bug Fixes

* **config:** Accept Angular 5, 6 & 7 ([bf343fa](https://github.com/Arnaud73/ngx-matomo/commit/bf343fa))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/Arnaud73/ngx-matomo/compare/v0.1.0...v0.1.1) (2018-08-02)


### Bug Fixes

* **config:** Accept Angular 5 & 6  ([9d8068c](https://github.com/Arnaud73/ngx-matomo/commit/9d8068c))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/Arnaud73/ngx-matomo/compare/v0.0.3...v0.1.0) (2018-05-15)


### Bug Fixes

* **library:** Remove unnecessary peer dependencies ([f600307](https://github.com/Arnaud73/ngx-matomo/commit/f600307))
* **tracker:** Update warning message for missing Matomo initialization ([3d677fa](https://github.com/Arnaud73/ngx-matomo/commit/3d677fa))



<a name="0.0.3"></a>
# [0.0.3](https://github.com/Arnaud73/ngx-matomo/tree/v0.0.3) (2018-04-16)


First public release.
