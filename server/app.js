var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var pg = require( 'pg' );
var connectionString = 'postgres://localhost:5432/todo';
var port = process.env.PORT || 8027;

// spin up server
app.listen( port, function(){
  console.log( 'server up on ' + port );
}); //end server up

// base
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/index.html' ) );
});

// get all tasks
app.get( '/getAll', function( req, res ){
  console.log( 'in getAll' );
});
// put update a task to complete

// post to create a new task

// static folder
app.use( express.static( 'public' ) );
