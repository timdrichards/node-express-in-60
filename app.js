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

// We will use this to record the number of times the `/times` route
// has been requested by a browser.
var visits = 0;

// The `timesHandler` will handle HTTP requests. It dynamically
// generates k images, where k is the number of times this route has
// been requested by a browser.
function timesHandler(req, res) {
  // Update the number of visits:
  visits += 1;

  var html = '<html>';
  html += '<body>';
  html += '<h2>Welcome to HackHolyoke ' + visits + ' times!</h2>';

  // Iterate over the number of visits:
  for (var i = 0; i < visits; i++) {
    html += '<img width="5%" src="img/mypic.jpg"/>'
  }

  html += '</body>';
  html += '</html>';

  // Send the response back to the browser:
  res.send(html);
}

app.get('/times', timesHandler);

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