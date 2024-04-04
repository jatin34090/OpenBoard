const express = require("express");
const socket = require("socket.io");

const app = express(); //Inatialize

app.use(express.static("public"));

let port = process.env.PORT || 5500;
let server = app.listen(port, ()=>{
    console.log("listining to port" + port)
})

let io = socket(server);

io.on("connection",(socket)=>{
    console.log("Socket Connection");

    // Recived data 
    socket.on("beginPath",(data)=>{
        // data -> dat from frontend
        //   Now tranfer data to all connected computers
        io.sockets.emit("beginPath",data);
    });
    socket.on("drawStoke",(data)=>{
        // data -> dat from frontend
        //   Now tranfer data to all connected computers
        io.sockets.emit("drawStoke",data);
    });
    socket.on("undoRedoCanvas",(data)=>{
        // data -> dat from frontend
        //   Now tranfer data to all connected computers
        io.sockets.emit("undoRedoCanvas",data);
    });



})


