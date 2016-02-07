# Node Application Initializers

Initialize important parts of your Node and Express applications
before starting the main processing.

## What Is This?

Nanit - the Node Application Initialzer - allows you to easily
and cleanly sepearate the initializers and finalizers from the main parts of
your code. 

### Why?

Applications often need to have various systems initialized and
configured before the main process starts up. Additionally, there
may be connections and external resources that need to be cleaned
up before the application exits.

For example, most Express apps need a database connection, or maybe 
an external message server. These things must be up and running before 
the Express app can start listening for incoming requests. 

Unfortunately, Express doesn't have a simple way to do this. You end 
up writing a lot of ugly code in your `bin/www` file or the `app.js` 
file to handle your application initialization. And most Node apps don't
have any kind of shut-down capabilities, other than crash and hope the
connections don't leak.

## Getting Started

To get rolling, you need to install nanit in to your project:

`npm install --save nanit`

Then you need to create an 'initializers' and an optional 'finalizers' 
folder in your project structure:

<pre>
./my-project
  /lib
  /initializers
  /finalizers
  /web
  /...etc
</pre>

In the `initializers` folder, place any `.js` files you want to
run as an initializer.

In the `finalizers` fodler, place any `.js` files that should be
run just before the application shuts down or exits.

Each of the files should contain an export with a signature like this:

```js
function initMyAwesomeThing(next){
  // when you're done, call next
  next();
}

module.exports = initMyAwesomeThing;
```

Once you have your initializers setup, you can run them from
your application, like this:

```js
var nanit = require("nanit")

nanit.intialize(function(err){
  // start the real app, now
});
```

Finalizers are executed in the same manner, only calling the `finalize`
method instead:

```js
var nanit = require("nanit")

nanit.finalize(function(err){
  // exit the app, here
  proces.exit();
});
```

## Pass App Or Other Options To Initializers

You can optionally specify an argument to pass in to the 
initializers. This is useful for Express apps, for example:

```js
var nanit = require("nanit")
var express = require("express");

var app = express();

nanit.intialize(app, function(err, result){
  
  // check for errors
  if (err) { 
    // throw it, or log it or whatever
    throw err; 
  }

});
```

The first argument will be passed along to all initialzers. 

```js
// initializers/foo.js
module.exports = function(arg, next){
  
  // use the arg
  doStuff(arg, () => {
    next();
  });
};
```

If you need multiple arguments, use an object literal with
`key: value` pairs for named arguments.

## Use A Custom Initializers Folder

The default `Nanit.initialize()` call will look for a folder located at `./initializers`.

If you need to provide a custom initializers folder, you can do so by creating
an instance of `Nanit`, passing an options object to the constructor.

```js
var Nanit = require("nanit");


// provide a custom initializers folder
var nanit = new Nanit({
  folder: "my/custom/initializers/folder"
});


nanit.initialize(function(err){
  // ...
});

```
## Use A Custom Finalizers Folder

The default `Nanit.finalize()` call will look for a folder located at `./finalizers`.

If you need to provide a custom initializers folder, you can do so by creating
an instance of `Nanit`, passing an options object to the constructor.

```js
var Nanit = require("nanit");


// provide a custom finalizer folder
var nanit = new Nanit({
  finalizerFonder: "my/custom/finalizer/folder"
});


nanit.finalize(function(err){
  // ...
});
```

## Handling Errors

If your initialzer or finalizer hits an error, return it through the `next(err)`
method call:

```js
// initializers/foo.js

module.exports = function(next){
  // if you get an error, call next(err)

  doStuff((err) => {

    // done with error
    if (err) { return next(err); }

    // done, no error
    next();
  });

}
```

Then in your `nanit.initialize` or `nanit.finalize` call, be sure to check the
first parameter of the callback for an error.

```js
var nanit = require("nanit")

nanit.intialize(function(err){

  // throw or log it or whatever you want
  if (err) { throw err; }

  // ...
});

// ...

nanit.finalize(function(err){
  if (err) { throw err; }
  // ...
});
```

Any error returns through the `next(err)` call will force 
the initializers/finalizers to stop executing and immediately return the
error to the callback.

## Legal Mumbo-Jumbo

Copyright &copy;2016 Muted Solutions, LLC. All Rights Reserved.

Nanit is distributed under the [MIT License](http://mutedsolutions.mit-license.org)
