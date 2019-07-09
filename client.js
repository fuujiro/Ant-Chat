 var net = require('net');
 var PORT = 7788;
 var HOST = '192.168.1.5';
 var From, To;
 var Msg = null;

 setTimeout(function () {
   document.getElementById("welcome").style.display = "none";
   document.getElementById("start").style.display = "block";
 }, 1000)
 
 var client = net.connect(PORT, HOST, function () {
   document.getElementById('sendBtn').onclick = function () {
     From = document.getElementById("from").value;
     To = document.getElementById("to").value;
     if (From == To && From != "") {
       alert("Plz input different ID！");
       return 0;
     }
     if (From == "" || To == "") {
       alert("Input can not be empty");
       return 0;
     }
     document.title = From + ' and ' + To + ' in chat.';
     document.getElementById("start").style.display = "none";
     document.getElementById("content").style.display = "block";
   }
   /* document.getElementById('sendMsg').onclick = function() {
     var myDate = new Date();
     Msg = document.getElementById("msg").value;
     if(Msg==""){
       alert("输入空值给你的小伙伴看，并没有什么意义哦！");
       return 0;
     }
     var send = {
       from: From,
       to: To,
       msg: Msg
     };
     client.on('error', function (err) {
       alert('请检查服务器是否正确启动！');
       console.log(err);
     });
     var textNodeTo = document.createElement('to_msg');
     textNodeTo.innerHTML = '<p class="title">' + From + ' - 【Time ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + '】</p>' + '<p>' + Msg.toString() + '</p>';
     textNodeTo.className = 'To tr tblue';
     var parentNode = document.getElementById("chatMsg");
     parentNode.appendChild(textNodeTo);
     client.write(JSON.stringify(send));
     document.getElementById("msg").value = null;
   };
  */
 $('#msg').keypress(function(e) {
  if(e.which == 13) {
    var myDate = new Date();
    $(this).blur();
    let Msg = $('#msg').val().replace(/(<([^>]+)>)/ig,"");
    if(Msg==""){
      alert("It doesn't make sense to enter a null value for me! Bro!");
      return 0;
    }
    var send = {
      from: From,
      to: To,
      msg: Msg
    };
    client.on('error', function (err) {
      alert('Please check if the server is started normally!');
      console.log(err);
    });
    var textNodeTo = document.createElement('to_msg');
    textNodeTo.innerHTML = '<p class="title">' + From + ' - 【Time ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + '】</p>' + '<p>' + Msg.toString() + '</p>';
    textNodeTo.className = 'To tr tblue';
    var parentNode = document.getElementById("chatMsg");
    parentNode.appendChild(textNodeTo);
    client.write(JSON.stringify(send));
    $('#msg').val('');
  }
});

 });

 client.on('data', function (data) {
   var myDate = new Date();
   var textNodeFrom = document.createElement('from_msg');
   textNodeFrom.innerHTML = '<p class="title">' + To + ' - 【Time ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + '】</p>' + '<p>' + data.toString() + '</p>';
   textNodeFrom.className = 'From tl tgreen'; //tgreen
   var parentNode = document.getElementById("chatMsg");
   console.log(textNodeFrom);
   parentNode.appendChild(textNodeFrom);
   console.log(data.toString());
 });

 client.on('end', function () {
   console.log('Disconnected from server');
   //alert(1);
   process.exit();
 });