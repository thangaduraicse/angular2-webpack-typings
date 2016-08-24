/**
 * Karma - pre-load and primes the Angular test framework
 * @author: Thangadurai Nainamalai<duraithanga3@gmail.com>
 */

Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');
require('reflect-metadata');

// Typescript emit helpers polyfill
require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');

require('rxjs/Rx');

var appContext = require.context('../src', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());
