'use strict'
$(document).ready(init); 

function init(){
  loadPage();
  $('.addNewTask').click(addNewTask);
  $('.cancelInput').click(cancelAddTask);
  $('.submitInput').click(submitInput);
  $('.tableArea').on('click', '.upvotebtn', upvote);
  $('.tableArea').on('click', '.downvotebtn', downvote);
  $('.tableArea').on('click', '.deleteBtn', deleteQuote);
  $('.sortVotes').click(sortVotes);
  $('.reverseSortVotes').click(reverseSortVotes);
  $('.filter').keyup(filter);
}

function loadPage(){
  $.get('tasks')
  .done(function(data){
      //console.log("data: " , data[0]);
      var $tasks = [];
      for(var i =0; i<data.length;i++){
        var description = data[i].description;
        var due = data[i].duedate;
        var done = data[i].done;
        //console.log("votes in load: ", done);
        var id = data[i].id;
        console.log("Done/votes: ", done);
        var $temp = $('.template').clone();
        $temp.find('.editNdelete').find('.upvotebtn').data('votes', done);
        $temp.find('.editNdelete').find('.upvotebtn').data('id', id);
        $temp.find('.editNdelete').find('.downvotebtn').data('votes', done);
        $temp.find('.editNdelete').find('.downvotebtn').data('id', id);
        $temp.find('.editNdelete').find('.deleteBtn').data('id', id);
        $temp.find('.description').text(description);
        $temp.find('.due').text(due);
        $temp.find('.done').text(done);
        $temp.removeClass('template');
        $tasks.push($temp);
        //console.log("votes in load: ", $temp.find('.editNdelete').find('.upvotebtn').data('votes'));
      }

      $('.tableArea').empty().append($tasks);

  })
 .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}

function addNewTask(){
  $('.addNewTask').hide();
  $('.newInput').show();
}

function cancelAddTask(){
  $('.addNewTask').show();
  $('.newInput').hide();
}

function submitInput(){
  $('.addNewTask').show();
  $('.newInput').hide();

  var description  = $('.newDescription').val();
  var due  = $('.newDueDate').val();
  var done  = 0;

  var formData = {description : description, duedate : due, done : done}; //Array 
 

  $.ajax({
    url : '/tasks',
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
      console.log("data: " , data);
      loadPage();
        //data - response from server
    },
    error: function (jqXHR, status, error)
    {
       console.log("error: " , error);
       console.log("status: " , status);
 
    }

});
}

function upvote(){
  console.log("UPVOTE");
  console.log("votes: ", $(this).data('votes'));

  var votes = parseInt($(this).data('votes'))+1;
  $(this).data('votes', votes);
  var id = $(this).data('id');
  var urly = `/tasks/${id}`;

  $.ajax({
    url: urly,
    type: 'PUT',
    dataType: 'json',
    data: {done : votes},
    success: function(data, status, jqXHR){
      console.log("stat: ", status);
      loadPage();
    },
    error: function(jqXHR, status, errorThrown){
      console.log("errthr: " ,errorThrown );
      loadPage();
    }
  })
}


function downvote(){
  console.log("down");
  console.log("votes: ",$(this).data('votes'));

  if(parseInt($(this).data('votes')) >0){
  var votes = parseInt($(this).data('votes'))-1;
  }

  $(this).data('votes', votes);
  var id = $(this).data('id');
  var urly = `/tasks/${id}`;

  $.ajax({
    url: urly,
    type: 'PUT',
    dataType: 'json',
    data: {done : votes},
    success: function(data, status, jqXHR){
      console.log("stat: ", status);
      loadPage();
    },
    error: function(jqXHR, status, errorThrown){
      console.log("errthr: " ,errorThrown );
      loadPage();
    }
  })
}

function deleteQuote(){
  var id = $(this).data('id');
  var urly = `/tasks/${id}`;

    $.ajax({
    url: urly,
    type: 'DELETE',
    success: function(data, status)
    {
      //console.log("data: " , data);
      loadPage();
        //data - response from server
    },
    error: function (jqXHR, status, error)
    {
       console.log("error: " , error);
       console.log("status: " , status);
 
    }
  });
}

function sortVotes(){
  console.log("sort votes");
  $.get('tasks')
  .done(function(data){
      console.log("data: " , data[0].done);
      data.sort(function(a,b){
        if(a.done < b.done){
          return -1
        }
        if(a.done> b.done){
          return 1
        }
        return 0;
      })
      var $tasks = [];
      console.log("sorted: ", data);    
      for(var i =0; i<data.length;i++){
        var description = data[i].description;
        var due = data[i].duedate;
        var done = data[i].done;
        //console.log("votes in load: ", done);
        var id = data[i].id;
        console.log("Done/votes: ", done);
        var $temp = $('.template').clone();
        $temp.find('.editNdelete').find('.upvotebtn').data('votes', done);
        $temp.find('.editNdelete').find('.upvotebtn').data('id', id);
        $temp.find('.editNdelete').find('.downvotebtn').data('votes', done);
        $temp.find('.editNdelete').find('.downvotebtn').data('id', id);
        $temp.find('.editNdelete').find('.deleteBtn').data('id', id);
        $temp.find('.description').text(description);
        $temp.find('.due').text(due);
        $temp.find('.done').text(done);
        $temp.removeClass('template');
        $tasks.push($temp);
        //console.log("votes in load: ", $temp.find('.editNdelete').find('.upvotebtn').data('votes'));
      }

      $('.tableArea').empty().append($tasks);  

    })
  .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}

function reverseSortVotes(){
  console.log("reversew sort votes");

  $.get('tasks')
  .done(function(data){
      console.log("data: " , data[0].done);
      data.sort(function(a,b){
        if(a.done > b.done){
          return -1
        }
        if(a.done < b.done){
          return 1
        }
        return 0;
      })
      var $tasks = [];
      console.log("sorted: ", data);    
      for(var i =0; i<data.length;i++){
        var description = data[i].description;
        var due = data[i].duedate;
        var done = data[i].done;
        //console.log("votes in load: ", done);
        var id = data[i].id;
        console.log("Done/votes: ", done);
        var $temp = $('.template').clone();
        $temp.find('.editNdelete').find('.upvotebtn').data('votes', done);
        $temp.find('.editNdelete').find('.upvotebtn').data('id', id);
        $temp.find('.editNdelete').find('.downvotebtn').data('votes', done);
        $temp.find('.editNdelete').find('.downvotebtn').data('id', id);
        $temp.find('.editNdelete').find('.deleteBtn').data('id', id);
        $temp.find('.description').text(description);
        $temp.find('.due').text(due);
        $temp.find('.done').text(done);
        $temp.removeClass('template');
        $tasks.push($temp);
        //console.log("votes in load: ", $temp.find('.editNdelete').find('.upvotebtn').data('votes'));
      }

      $('.tableArea').empty().append($tasks);  

    })
  .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}

var letters = '';

function filter(event){
  var c = String.fromCharCode(event.which);
  var num = event.which;
  console.log("let: ", c);

  $.get('tasks')
  .done(function(data){
      console.log("data: " , data);
      var $tasks = [];

      if(num === 8)
        letters = letters.substring(0, letters.length-1);
      else
        letters += c;
 
      for(var i =0; i<data.length;i++){
        var description = data[i].description.toLowerCase();
        letters = letters.toLowerCase();
        if(letters === description.substring(0, letters.length)){
        

          var due = data[i].duedate;
          var done = data[i].done;
          //console.log("votes in load: ", done);
          var id = data[i].id;
          console.log("Done/votes: ", done);
          var $temp = $('.template').clone();
          $temp.find('.editNdelete').find('.upvotebtn').data('votes', done);
          $temp.find('.editNdelete').find('.upvotebtn').data('id', id);
          $temp.find('.editNdelete').find('.downvotebtn').data('votes', done);
          $temp.find('.editNdelete').find('.downvotebtn').data('id', id);
          $temp.find('.editNdelete').find('.deleteBtn').data('id', id);
          $temp.find('.description').text(description);
          $temp.find('.due').text(due);
          $temp.find('.done').text(done);
          $temp.removeClass('template');
          $tasks.push($temp);
           //console.log("votes in load: ", $temp.find('.editNdelete').find('.upvotebtn').data('votes'));
        }
      }
      $('.tableArea').empty().append($tasks);  

    })
  .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}



/*  var num = event.which;
  var c = String.fromCharCode(event.which);
  var tasks = getTasks();
  var nTasks = [];
  if(num === 8){
    letters = letters.substring(0, letters.length-1);
  }  
  else
    letters += c;

  for(let i =0; i < tasks.length; i++){
    var description = tasks[i].description
    description = description.toLowerCase();
    letters = letters.toLowerCase();
    if(letters === description.substring(0, letters.length)){
       nTasks.push(tasks[i]);
    }
  }
   renderTasks(nTasks);
}
*/












      
      