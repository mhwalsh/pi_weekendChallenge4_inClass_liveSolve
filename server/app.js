var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var pg = require( 'pg' );
var connectionString = require('../modules/connection');
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
  // connect to db
  pg.connect( connectionString, function( err, client, done ){
    if( err ){
      console.log( err );
    } // end error
    else{
      console.log( 'connected to db' );
      // array to hold our results
      var resultsArray = [];
      // get all the things from table and hold the query results in a variable
      var queryResults = client.query( 'SELECT * FROM todos' );
      queryResults.on( 'row', function( row ){
        // push each row into results array
        resultsArray.push( row );
      }); //end on row
      queryResults.on( 'end', function(){
        // let the db know we are done
        done();
        // send back to client
        res.send( resultsArray );
      }); // end on end
    } // end no error
  }); // end pg connect
}); // end get all

// put update a task to complete
app.put( '/completeMe', urlencodedParser, function( req, res ){
    console.log( 'in completeMe:', req.body );
    // send back something to trigger ajax success
    // connect to db
    pg.connect( connectionString, function( err, client, done ){
      if( err ){
        console.log( err );
      }
      else{
        // update the record with this ID to have "complete" as true
        client.query( 'UPDATE todos SET complete=true WHERE id=' + req.body.id );
        // let it know we're done
        done();
        // send something back
        res.send( true );
      }
    }); // end pg connect
}); // end complete me

// post to create a new task

// static folder
app.use( express.static( 'public' ) );
