const gridContainer = document.getElementsByClassName("grid-container")[0]; //Where the grid should be created inside

function createGrid(number){
    for(let i = 0; i < (number); i++){
        const gridColumn = document.createElement("div");
        gridColumn.classList.add("grid-column");
        gridContainer.appendChild(gridColumn);
        for(let j = 0; j < number; j++){
            const gridElement = document.createElement("div");
            gridElement.classList.add("grid-element");
            gridColumn.appendChild(gridElement);
            
            gridElement.addEventListener("mouseenter",changeColor);
            gridElement.addEventListener("mouseleave",changeColor);
            gridElement.addEventListener("mousedown",changeColor);
        }
    }
}

function changeColor(evt){

    if(evt.type === "mousedown"){
        this.style.backgroundColor = "yellow";
    }
}


createGrid(16)

