stirrup
=======

Stirrup is a promise library wrapper and polyfill. Here is the official promise polyfill: https://github.com/jakearchibald/es6-promise

### Why Stirrup?
Stirrup allows you to polyfill native promises with whatever promise library you want. Additionally, it allows configuration of static methods, so you can pick and choose what utilty methods you want to shim, and what you want to call said utility methods. As a side-effect, Stirrup allows for painless promise library swaping. You can swap your promise library without having to change your API for promise creation and utility functions.