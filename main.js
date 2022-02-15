//VARIOUS GETTED DOM ELEMENTS
//#region getted dom elements
const gridContainer = document.getElementsByClassName("grid-container")[0]; //Where the grid should be created inside
const clearButton = document.getElementById("clear-button");
const fillButton = document.getElementById("fill-button");
const eraserButton = document.getElementById("eraser-button");
const penButton = document.getElementById("pen-button");
const rainbowButton = document.getElementById("rainbow-button");
const slider = document.getElementById("myRange");
const penColorPicker = document.getElementById("pen-color");
const backgroundColorPicker = document.getElementById("background-color");
//#endregion
let output = document.getElementById("demo");
let currentTool = "pen";

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const DEFAULT_GRID_SIZE = 8;



function changeColor(evt) {
    if (evt.type === 'mouseover' && !mouseDown) return
    if (currentTool == "pen") {
        this.style.backgroundColor = penColorPicker.value;
    } else if(currentTool == "eraser"){
        this.style.backgroundColor = "transparent";
    } else if(currentTool == "rainbow"){
        this.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);

    }
}


output.innerHTML = `${slider.value} x ${slider.max}`;

slider.oninput = function () {
    output.innerHTML = `${this.value} x ${slider.max}`;
    updateGrid();
};


//GRID MANAGEMENT FUNCTIONS
//#region grid functions
function createGrid(number) {
    for (let i = 0; i < number; i++) {
        const gridColumn = document.createElement("div");
        gridColumn.classList.add("grid-column");
        gridContainer.appendChild(gridColumn);
        for (let j = 0; j < number; j++) {
            const gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
            gridColumn.appendChild(gridElement);
        }
    }
}

function clearGrid(){
    gridContainer.innerHTML = "";
}

function resetGrid(){
    clearGrid();
    createGrid(slider.value);
    gridContainer.style.backgroundColor = "transparent";
}

function updateGrid(){
    clearGrid();
    createGrid(slider.value);
}
//#endregion


clearButton.addEventListener("click", () => {
    resetGrid();
});

fillButton.addEventListener("click", () => {
    gridContainer.style.backgroundColor = backgroundColorPicker.value;
});

eraserButton.addEventListener("click", () => {
    currentTool = "eraser";
    const gridElement = document.getElementsByClassName("grid-element");
    for(element of gridElement){
        element.addEventListener("mousedown", changeColor);
        element.addEventListener("mouseover",changeColor);
    }
});

penButton.addEventListener("click", () => {
    currentTool = "pen";
    const gridElement = document.getElementsByClassName("grid-element");
    for(element of gridElement){
        element.addEventListener("mousedown", changeColor);
        element.addEventListener("mouseover",changeColor);
    }
});

rainbowButton.addEventListener("click", () => {
    currentTool = "rainbow";
    const gridElement = document.getElementsByClassName("grid-element");
    for(element of gridElement){
        element.addEventListener("mousedown", changeColor);
        element.addEventListener("mouseover",changeColor);
    }
});


//USED TO AUTO CLICK ON THE PEN TOOL ON PAGE RELOAD
window.onload = () => {
    document.getElementById("pen-button").click();
};

createGrid(DEFAULT_GRID_SIZE);
