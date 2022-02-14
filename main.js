const gridContainer = document.getElementsByClassName("grid-container")[0]; //Where the grid should be created inside
const clearButton = document.getElementById("clear-button");
const fillButton = document.getElementById("fill-button");
const eraserButton = document.getElementById("eraser-button");
const slider = document.getElementById("myRange");
const penColorPicker = document.getElementById("pen-color");
const backgroundColorPicker = document.getElementById("background-color");
let output = document.getElementById("demo");

const DEFAULT_GRID_SIZE = 8;

function createGrid(number) {
    for (let i = 0; i < number; i++) {
        const gridColumn = document.createElement("div");
        gridColumn.classList.add("grid-column");
        gridContainer.appendChild(gridColumn);
        for (let j = 0; j < number; j++) {
            const gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
            gridColumn.appendChild(gridElement);

            gridElement.addEventListener("mouseenter", changeColor);
            gridElement.addEventListener("mouseleave", changeColor);
            gridElement.addEventListener("mousedown", changeColor);
        }
    }
}

function changeColor(evt) {
    if (evt.type === "mousedown") {
        this.style.backgroundColor = penColorPicker.value;
    }
}


output.innerHTML = `${slider.value} x ${slider.max}`;

slider.oninput = function () {
    output.innerHTML = `${this.value} x ${slider.max}`;
    updateGrid();
};

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

clearButton.addEventListener("click", () => {
    resetGrid();
});

fillButton.addEventListener("click", () => {
    gridContainer.style.backgroundColor = backgroundColorPicker.value;
});

eraserButton.addEventListener("click", () => {
    const gridElement = document.getElementsByClassName("grid-element");
    for(let i = 0; i < gridElement.length; i++){
        gridElement[i].addEventListener("click", () => {
            gridElement[i].style.backgroundColor = "transparent";
        });
    }
});

createGrid(DEFAULT_GRID_SIZE);
