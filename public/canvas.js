let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pancil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");
let penColor = "red";
let eraserColor = "white";
let pencilWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;


let undoRedoTracker = [];
let track = 0;

let mouseDown = false;
// API
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = pencilWidth;

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    // beginPath({
    //     x: e.clientX,
    //     y: e.clientY,

    // })
    let data = {
        x: e.clientX,
        y: e.clientY,
    }
    socket.emit("beginPath", data);

})
canvas.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        // drawStoke({
        //     x: e.clientX,
        //     y: e.clientY,
        //     color: eraserFlag ? eraserColor : penColor,
        //     width: eraserFlag ? eraserWidth : pencilWidth
        // })
        let data = {
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag ? eraserColor : penColor,
            width: eraserFlag ? eraserWidth : pencilWidth
        }
        socket.emit("drawStoke", data);
    }

})


canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
    console.log(undoRedoTracker);
})



undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    console.log(track);

    let data = {
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("undoRedoCanvas", data);

    // let trackObj = {
    // undoRedoCanvas(trackObj);
    //     trackValue: track,
    //     undoRedoTracker
    // }
})
redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length - 1) track++;
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("undoRedoCanvas", data);


    // let trackObj = {
    //     trackValue: track,
    // undoRedoCanvas(trackObj);
    //     undoRedoTracker
    // }

})



function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
    let url = undoRedoTracker[track];
    // let img = new Image();
    let img = document.createElement('img');

    img.src = url;
    // img.addEventListener("onload",(e) => {
    //     tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    // } )
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width-100, canvas.height);
    }
}

function beginPath(stokeObj) {


    tool.beginPath(); // new graphic (path) (line)
    tool.moveTo(stokeObj.x, stokeObj.y);
}

function drawStoke(stokeObj) {
    // Starting point
    tool.strokeStyle = stokeObj.color;
    tool.lineWidth = stokeObj.width;
    tool.lineTo(stokeObj.x, stokeObj.y); //end point
    tool.stroke();// fill color (fill graphic)
}

pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];

        penColor = color;
        tool.strokeStyle = penColor;
    })
});

pencilWidthElem.addEventListener("change", (e) => {
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth = pencilWidth
})

eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {

        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
        
    }else{
        tool.strokeStyle = penColor;
        tool.lineWidth = pencilWidth;

    }

})


download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})


socket.on("beginPath", (data) => {

    // data -> dat from server

    beginPath(data);
});

socket.on("drawStoke", (data) => {

    // data -> dat from server

    drawStoke(data);
});
socket.on("undoRedoCanvas", (data) => {

    // data -> dat from server

    undoRedoCanvas(data);
});
