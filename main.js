//VARIOUS GETTED DOM ELEMENTS
//#region getted dom elements
const gridContainer = document.getElementsByClassName("grid-container")[0]; //Where the grid should be created inside
const clearButton = document.getElementById("clear-button");
const fillButton = document.getElementById("fill-button");
const eraserButton = document.getElementById("eraser-button");
const penButton = document.getElementById("pen-button");
const slider = document.getElementById("myRange");
const penColorPicker = document.getElementById("pen-color");
const backgroundColorPicker = document.getElementById("background-color");
//#endregion
let output = document.getElementById("demo");
let currentTool = "pen";

const DEFAULT_GRID_SIZE = 8;



function changeColor(evt) {
    if (evt.type === "mousedown" && currentTool == "pen") {
        this.style.backgroundColor = penColorPicker.value;
    } else if(evt.type === "click" && currentTool == "eraser"){
        this.style.backgroundColor = "transparent";
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
    for(let i = 0; i < gridElement.length; i++){
        gridElement[i].addEventListener("click", changeColor);
    }
});

penButton.addEventListener("click", () => {
    currentTool = "pen";
    const gridElement = document.getElementsByClassName("grid-element");
    for(element of gridElement){
        element.addEventListener("mousedown", changeColor);
        element.addEventListener("mouseenter",changeColor);
    }
});

createGrid(DEFAULT_GRID_SIZE);
