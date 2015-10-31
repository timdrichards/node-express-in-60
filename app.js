// This line will give us access to the express library. If you are
// not familiar with JavaScript, the left-hand side of the '=' is a
// variable declaration and the right-hand side returns the library.
var express = require('express');

// ADDITION //////////////////////////////////////////////////////////
var handlebars = require('express-handlebars');
//////////////////////////////////////////////////////////////////////

// This creates a new express web application and assigns it to the
// `app` variable.
var app = express();

// This will tell our expression application to use the `/public`
// directory to serve static resources.
app.use(express.static(__dirname + '/public'));

// ADDITION //////////////////////////////////////////////////////////
var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');
//////////////////////////////////////////////////////////////////////

// ADDITION //////////////////////////////////////////////////////////

// We will use this to record image URLs and dates when they were
// requested. This is how you create a new Array in JavaScript.
var images = [];

// This is a rewrite of our original times handler to use a view
// instead of dynamically generating HTML in JavaScript.
function timesHandler(req, res) {
  // The `render` method is added by the handlebars middleware. The
  // first argument is the name of the view. You need not indicate
  // the full path and you can drop the extension. The second argument
  // is a "context" that is passed into the view template to fill in
  // the holes.
  res.render('times-view', {
    visits: images.length,
    images: images
  });
}

// The cat handler pushes a new object with properties for the image
// that was requested and the date it was requested on. It then
// renders the view with the given array of image objects to be filled
// in by the template.
function timesCatHandler(req, res) {
  images.push({
    url: '/img/mypic.jpg',
    date: new Date()
  });
  res.render('times-view', {
    visits: images.length,
    images: images
  });
}

// The dog handler pushes a new object with properties for the image
// that was requested and the date it was requested on. It then
// renders the view with the given array of image objects to be filled
// in by the template.
function timesDogHandler(req, res) {
  images.push({
    url: '/img/dog.jpg',
    date: new Date()
  });
  res.render('times-view', {
    visits: images.length,
    images: images
  });
}

// Here, we bind our routes to route handlers.
app.get('/times', timesHandler);
app.get('/times/cat', timesCatHandler);
app.get('/times/dog', timesDogHandler);

//////////////////////////////////////////////////////////////////////

// This will run our web server on port 3000 and wait for incoming
// HTTP requests from the "outside" world. In reality, this is
// running on your local machine and allows you to connect to it
// from your browser with http://localhost:3000/.
//
// Go ahead, give it a try!
//
// > node app.js
//
// Congrats! You just created your first express app!
//
app.listen(3000, function () {
  console.log('Express started on http://localhost:' +
              3000 + '; press Ctrl-C to terminate');
});