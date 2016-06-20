'use strict'
$(document).ready(init); 

function init(){
  loadPage();
  $('.addNewTask').click(addNewTask);
  $('.cancelInput').click(cancelAddTask);
  $('.submitInput').click(submitInput);
}

function loadPage(){
  $.get('tasks')
  .done(function(data){
      console.log("data: " , data[0]);
      var $tasks = [];
      for(var i =0; i<data.length;i++){
        var description = data[i].description;
        var due = data[i].duedate;
        var done = data[i].done;
        var $temp = $('.template').clone();
        $temp.find('.description').text(description);
        $temp.find('.due').text(due);
        $temp.find('.done').text(done);
        $temp.removeClass('template');
        $tasks.push($temp);
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
  $.post('tasks')
  .done(function(data){
      console.log("data: " , data);
  })
 .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}



