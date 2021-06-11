const express=require("express");

const http=require("https");
const app=express();
const server = require('http').Server(app);
const io=require('socket.io')(server);
const {v4:uuidV4}=require("uuid");
const {ExpressPeerServer}=require('peer');
const peerServer= ExpressPeerServer(server,{
  debug:true
});
app.use('/peerjs', peerServer);


app.use(express.static('public'));
//app.set('views', './views')
app.set('view engine','ejs');



app.get('/',(req,res)=>{
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room',(req,res)=>{
  res.render('room',{roomId: req.params.room});
})

io.on('connection',socket=>{
  socket.on('join-room', (roomId, userId)=>{
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId);
  })
})
//server.listen(3000); 
server.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

