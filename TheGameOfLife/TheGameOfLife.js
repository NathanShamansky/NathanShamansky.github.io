// Create the grid
const grid = document.getElementById("grid");
for (let i = 0; i < 100; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 100; j++) {
        const cell = document.createElement("td");
        cell.addEventListener("mousedown", function() {
            grid.style.userSelect = "none";
            grid.style.cursor = "crosshair";
            cell.classList.toggle("alive");
            grid.addEventListener("mouseover", changeState);
            grid.addEventListener("mouseup", clearEvent);
        });
        row.appendChild(cell);
    }
    grid.appendChild(row);
}

let intervalId;
let running = false;
document.getElementById("start-button").addEventListener("click", function() {
    running = !running;
    this.innerHTML = running ? "Stop" : "Start";
    if (running) {
        update();
    } else {
        clearTimeout(intervalId);
    }
});

// Clear the grid
document.getElementById("clear-button").addEventListener("click", function() {
    const cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("alive");
    }
});

document.getElementById("randomize-button").addEventListener("click", function() {
    const cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        if(Math.random() < 0.1){
            cells[i].classList.toggle("alive");
        }
    }
});

function changeState(event) {
    if (event.target.tagName === "TD") {
        event.target.classList.toggle("alive");
    }
}

function clearEvent() {
    grid.removeEventListener("mouseover", changeState);
    grid.removeEventListener("mouseup", clearEvent);
    grid.style.userSelect = "";
    grid.style.cursor = "";
}

function getNeighbors(cell) {
    let x = cell.parentNode.rowIndex;
    let y = cell.cellIndex;
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            if (grid.rows[x + i] && grid.rows[x + i].cells[y + j] && grid.rows[x + i].cells[y + j].classList.contains("alive")) {
                count++;
            }
        }
    }
    return count;
}

document.getElementById("SimSpeedSlider").addEventListener("change", function(){
    let speed = document.getElementById("SimSpeedSlider").value;
    document.getElementById("SimSpeedText").value = "Value: " + speed;
});  

document.getElementById("SimSpeedText").addEventListener("change", function(){
    let speed = document.getElementById("SimSpeedText").value;
    document.getElementById("SimSpeedSlider").value = speed;
});  

function update() {
    const cells = document.getElementsByTagName("td");
    let speed = document.getElementById("SimSpeedSlider").value;
    document.getElementById("SimSpeedText").value = "Value: " + speed;
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const neighbors = getNeighbors(cell);
        if (cell.classList.contains("alive")) {
            if (neighbors < 2 || neighbors > 3) {
                cell.classList.remove("alive");
            }
        } else if (neighbors === 3) {
            cell.classList.add("alive");
        }
    }
    intervalId = setTimeout(update, speed);
}
