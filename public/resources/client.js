let username = prompt("username");
let id = window.location.pathname;

let permission = undefined;
$(function () {
    Notification.requestPermission().then((perm) => {
    permission = perm;
    console.log("permission granted!");
  });
  console.log(window.location.href);
  var socket = io("wss://" + window.location.host, {
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
    if (permission && ('Notification' in window)) {
      const notification = new Notification(msg.split(">")[0],{
        body: msg.split(">")[1]
      });
    }
    $('#messages').append($('<li>').text(msg));
    $("html, body").animate({
      scrollTop: $(document).height()
    }, 1000);
  });
});