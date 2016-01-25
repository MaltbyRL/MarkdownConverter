'use strict';

$(document).ready(init);

function init() {
  populateDoc();
  $("#addMarkdown").on('click', sendMarkdown);
}

function sendMarkdown(e) {
  e.stopPropagation();
  var aText = $('#textInputArea').val();
  console.log("sendMarkdown click working");
  $.post('/markdown', {name: aText})
  .success(function(data) {
    var $addIt = $('#convertedText').text(aText);
    $('#addMarkdown').empty();
    populateDoc();
  })
  .fail(function(err) {
    alert('something went wrong')
  });
}


function populateDoc() {

  $.get('/markdown', function(data) {
    var $markdown = data.map(function(marked) {
      return marked;
    });
    $('#convertedText').empty();
    $('#convertedText').append($markdown);
    // $('#taskField').empty();
  });


}

function delTask(e){
  e.stopPropagation();
  $('#taskField').empty();
  $("#taskField").text("double Click Item to remove")
}

function removeTask(){
  console.log("dblclick", event.target)
  event.target.remove();

}
