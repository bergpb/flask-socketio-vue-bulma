var socket = io.connect('http://' + document.domain + ':' + location.port);
var app = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: { content: '{{ value }}' }
});
// verify our websocket connection is established
socket.on('connect', function() {
    console.log('Websocket connected!');
});
// receive confirmation
socket.on('updated', function(content) {
    console.log('Printing msg...!', content.msg);
    // update var after confirmation
    app.$set(app, 'content', content.msg);
});
// update values to show in screen
function updateValues() {
  console.log('Updating content...');
  socket.emit('update', {'msg': 'Content Updated!'});
}
// auto update content in 2 seconds
setInterval(function(){ updateValues(); }, 2000);
