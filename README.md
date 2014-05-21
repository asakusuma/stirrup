Stirrup
=======

Stirrup is a promise library wrapper and polyfill. Here is the official promise polyfill: https://github.com/jakearchibald/es6-promise

## Why Stirrup?
Stirrup allows you to polyfill native promises with whatever promise library you want. Additionally, it allows configuration of static methods, so you can pick and choose what static utilty methods you want to shim, and what you want to call said utility methods. As a side-effect, Stirrup allows for painless promise library swaping. You can swap your promise library without having to change your API for promise creation and utility functions. You simply have to drop in a different config file and rebuild the JavaScript artifact.

**TL;DR:**
* Let's you choose your own library to polyfill
* Makes library switching painless
* Exposes unified API, no matter what library you use
* Solves issues arrising from different browses supporting different utility methods

## How it works

1. You create or select a config file. The config tells Stirrup how/what methods to shim. Configs are specific to an under-the-hood promise library.
2. Run `grunt`. This will create the artifacts in `/dest`
3. Load Stirrup on your page

### All about configs

To specify a config use the `--lib=` argument when running grunt. For instance:

````
grunt --lib=rsvp
````
Will compile Stirrup using `/config/rsvp.js`. By default, the build process with load `/config/bluebird.js`.

Config files are CommonJS modules that expose an object literal with the following properties:

* **constructor** - {string|null} - References the promise constructor property on the library object. Null if the library object is itself the constructor.
* **defer** - {string} - References the defer creation function property on the library object.
* **deferredFuncs** - {object}
  * **fulfill** - {string} - References the fulfill function on deferred objects returned by defer()
  * **reject** - {string} - References the reject function on deferred objects returned by defer()
* **staticFuncs** - {array} - List of static utility functions to re-map
  * **libName** - {string} - References the name of the function on the library
  * **nativeName** - *{string}* - References the name of the native function
  * **aliases** - {array} - List of property names exposed on the Stirrup instance that should proxy to the *libName* function or the *nativeName* function if it's supported.


## Loading Stirrup

The grunt build task creates 3 artifacts:
* CommonJS module
* AMD module
* Global script file. Attaches module to `Stirrup` global variable.

## Usage

Create a new Stirrup instance and pass in your library.

````JavaScript
var P = new Stirrup(Bluebird);
````
Every Stirrup instance is it's own promise library object, analogous to the native `Promise`.

## Promise creation

Just like the native API, a Stirrup instance is also a promise constructor.

````JavaScript
var promise = new P(function(fulfill, reject) {
    fulfill('Great success!');
}); //This promise fulfills
````

Additionally, you can use `defer()` to create a deferred.
````JavaScript
var deferred = P.defer();
deferred.fulfill('Great Success!');
var promise = deferred.promise;
````

## Deferred methods

**.fulfill(value)** - Fulfills deferred.promise

**.reject(value)** - Rejects deferred.promise

## Running Tests

* `grunt test` will run the tests via phantomJS
* `grunt browsertest` will give you a URL to run the tests in a browser of your choice

## Todo
* Promise inspection
* ~~Shimming deferred methods~~
