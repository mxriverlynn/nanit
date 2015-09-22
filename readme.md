# Node Application Initializers

Initialize important parts of your Node and Express applications
before starting the main processing.

## What Is This?

Applications often need to have various systems initialized and
configured before the main process starts up. 

For example, most
Express apps need a database connection, some routing, maybe
an external message server and other bits. Thesse things must
be up and running before the Express app can start listening
for incoming requests. 

Unfortunately, Express (and most other Node frameworks) doesn't
have a simple way to do this. You end up writing a lot of ugly
code in your `bin/www` file or the `app.js` file to handle
your application initialization.

Nanit - the Node Application Initialzer - allows you to easily
and cleanly sepearate the initializers from the main parts of
your code. 

## Getting Started

To get rolling, you need to install nanit in to your project:

`npm install --save nanit`

Then you need to create an 'initializers' folder in your
project structure:

<pre>
/my-project
  /lib
  /initializers
  /web
  /...etc
</pre>

In the `initializers` folder, place any `.js` files you want to
run as an initializer. Each of the files should contain an
export with a signature like this:

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

## Errors In Initializers

If your initialzer hits an error, return it through the `next(err)`
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

Then in your `nanit.initialze` call, be sure to check the
first parameter of the callback for an error.


```js
var nanit = require("nanit")

nanit.intialize(function(err){

  // throw or log it or whatever you want
  if (err) { throw err; }

});
```

Any error returns through the `next(err)` call will force 
the initializers to stop executing and immediately return the
error to the initialize callback.

## Legal Mumbo-Jumbo

Copyright 2015 Muted Solutions, LLC. All Rights Reserved.

Nanit is distributed under the [MIT License](http://mutedsolutions.mit-license.org)
