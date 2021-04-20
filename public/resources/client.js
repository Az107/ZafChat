let username = prompt("username");
let id = window.location.pathname;

$(function () {
  console.log(window.location.href);
  var socket = io("ws://" + window.location.host, {
    extraHeaders: {
      "Access-Control-Allow-Origin": "*"
    }
  });
  socket.auth = { id };
  socket.connect();

  $('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    let content = username + "> " + $('#m').val();
    socket.emit('msg', {
      content,
      to: id
    });

    $('#m').val('');
    return false;
  });
  socket.on('msg', function (msg) {
    $('#messages').append($('<li>').text(msg));
    $("html, body").animate({
      scrollTop: $(document).height()
    }, 1000);
  });
});