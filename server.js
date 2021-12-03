const express = require("express");
const app = express();
const http =  require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static('/'));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

var users = [];

io.on("connection",(socket)=>{
    console.log("client connected!");

  socket.on("setUserName",(ob)=>{   
    if(users.indexOf(ob.userName)<=-1){
        users.push(ob.userName);
        socket.emit("userRegistered",{userName:ob.userName});
    }else{
        socket.emit("userExists","User already exists!");
    }
  });
  socket.on("msg",(data)=>{
    io.sockets.emit("newMsg",data);
  });
    socket.on("disconnect",()=>{
        console.log("client disconnected");
    });
});

http.listen(3000,()=>console.log("Server is listening at 3000"));
