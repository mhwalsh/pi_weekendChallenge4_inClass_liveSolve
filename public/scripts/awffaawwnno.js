console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  $( 'body' ).on( 'click', '.completeMe', function(){
    // get id from clicked button
    var id = $( this ).attr( 'myId' );
    console.log( 'in body on click for completeMe class:', id );
  }); // end body on click for completeMe class

  showTasks();
}); // end doc ready

// show all tasks
var showTasks = function(){
    console.log( 'in showTasks');
    // get tasks from db
    $.ajax({
      url:'/getAll',
      type: 'GET',
      success: function( data ){
        console.log( 'back from getAll:', data );
        // hold output in a variable
        var output = $( '#displayEverything' );
        output.empty();
        // loop through data and append to output
        for (var i = 0; i < data.length; i++) {
          if( !data[i].complete ){
            output.append( '<p>' + data[i].name + ': ' + data[i].description + ' <button class="completeMe" myId=' + data[i].id + '>You Complete Me</button></p>' );
          } // not complete
          else {
            output.append( '<p>' + data[i].name + ': ' + data[i].description + '</p>' );
          }
        } // end for
      } // end success
    }); // end ajax
    // display
} // end showTasks
