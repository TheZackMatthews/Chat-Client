class Message {
  constructor (authorId, content) {
    this.authorId = authorId;
    this.content = content;
    this.timeStamp = String(new Date()).slice(16, 21);
  }
}

function fetchdata () {
  $.ajax({
    url: 'http://quotes.stormconsultancy.co.uk/random.json',
    type: 'get',
    success: function (response) {
      //console.log(response);
      let userMessage = new Message (false, response.quote + '-' + response.author);
      myMessage(userMessage);
    }
  });
}
$(document).ready ( function () {
  setInterval(fetchdata,5000);
});

var textForm = document.getElementById ('input-form');
textForm.addEventListener ('submit', (event) => {
  const newText = input.value;
  const newMessage = new Message (true, newText);
  myMessage (newMessage);
  $('#input-form')[0].reset();
});

function myMessage (messageInfo) {
  let div = $('<div>').addClass ('bubble text');
  const whoSent = messageInfo.authorId ? 'Me' : 'API';
  let n = $('<p>').text (whoSent).addClass ('name');
  let m = $('<p>').text (messageInfo.content).addClass ('message');
  if (!messageInfo.authorId) div.addClass ('alt');
  let t = $('<span>').text (messageInfo.timeStamp).addClass ('timestamp');


  div.append(n).append(m).append(t);
  $('.speech-wrapper').prepend(div);
}