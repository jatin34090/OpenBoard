let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let optionsFlag = true;

let pencil = document.querySelector(".pencil");
let pencilToolCont = document.querySelector(".pancil-tool-cont");
let pencilFlag = false;

let eraser = document.querySelector(".eraser");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let eraserFlag = false;
let upload = document.querySelector(".upload");
let stickynote = document.querySelector(".stickynote");
let StickyNoteFlag = false;

optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;
    if (optionsFlag) {
        openTools();
    } else {
        closeTools();
    }
})
function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-xmark");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";
    toolsCont.classList.add("scale-tools");
}
function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-xmark");
    toolsCont.style.display = "none";
    eraserToolCont.style.display = "none";
    pencilToolCont.style.display = "none";
}


pencil.addEventListener("click", (e) => {
    if (eraserFlag) {
        eraser.click();
    }
    pencilFlag = !pencilFlag;
    if (pencilFlag) pencilToolCont.style.display = "block";
    else pencilToolCont.style.display = "none";



})
eraser.addEventListener("click", (e) => {
    if (pencilFlag) pencil.click();
    eraserFlag = !eraserFlag;
    if (eraserFlag) eraserToolCont.style.display = "flex";
    else eraserToolCont.style.display = "none";


})



let nodeContFlag = true;
function noteAction(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })

    minimize.addEventListener("click", (e) => {
        nodeContFlag = !nodeContFlag;
        let nodeCont = stickyCont.querySelector(".note-cont");
        // let stickyCont = document.querySelector(".sticky-cont")
        if (nodeContFlag) {
            nodeCont.style.display = "block";
            stickyCont.style.height = "15rem";

        }
        else {

            nodeCont.style.display = "none";
            stickyCont.style.height = "2rem"

        }
    })

}


stickynote.addEventListener("click", (e) => {

    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    // stickyCont.setAttribute("id", `${}`);
    let stickyTemplateHTML = ` 
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>`;
    createSticky(stickyTemplateHTML);


})


upload.addEventListener("click", (e) => {

    // Open File Explore
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file); 
        console.log(url)


        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}">
        </div>`

        createSticky(stickyTemplateHTML)

    })
})


function createSticky(stickyTemplateHTML) {

    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");

    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);
    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteAction(minimize, remove, stickyCont);
    stickyCont.onmousedown = function (event) {

        dragAndDrap(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };


}



function dragAndDrap(stickyCont, event) {


    let shiftX = event.clientX - stickyCont.getBoundingClientRect().left;
    let shiftY = event.clientY - stickyCont.getBoundingClientRect().top;

    stickyCont.style.position = 'absolute';
    stickyCont.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the stickyCont at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        stickyCont.style.left = pageX - shiftX + 'px';
        stickyCont.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the stickyCont on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the stickyCont, remove unneeded handlers
    stickyCont.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        stickyCont.onmouseup = null;
    };



}