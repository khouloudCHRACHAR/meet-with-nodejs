


const socket=io('/');

const videoGrid=document.getElementById('video-grid');
let myVideoStream;
const myVideo=document.createElement('video');
myVideo.muted=true;

const peer =new Peer(undefined,{
  path:'/peerjs',
  host:'/',
  port:'3000'
});


const peers = {};


navigator.mediaDevices.getUserMedia({
  video: true,
  audio:true
}).then(stream=>{
  myVideoStream=stream;
  addVideoStream(myVideo, stream);
  
  peer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  

  socket.on('user-connected',(userId)=>{
    connecToNewUser(userId,stream);
  });
})




peer.on('open',id =>{
  console.log(id);
  socket.emit('join-room',ROOM_ID, id);
});



const connecToNewUser=(userId,stream)=>{
  const  call = peer.call(userId,stream)
  const video = document.createElement('video')
  call.on('stream',userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
}


const addVideoStream=(video,stream) => {
  video.srcObject=stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
  
  videoGrid.append(video);
}