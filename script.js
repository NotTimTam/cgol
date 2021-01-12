// Display data.
const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");
let zoom = 1;

window.addEventListener('wheel', function(event) {
    if (event.deltaY < 0) {
        zoom += 0.1;
    } else if (event.deltaY > 0) {
        zoom -= 0.1;
    }

    if (zoom < 0.1) {
        zoom = 0.1;
    } else if (zoom > 5) {
        zoom = 5;
    }

    canvas.style.zoom = zoom;
});

function display(array, cellSize=5) {
    // Loop through each column in each row, and display a different character based on if it is alive or dead.
    for (let row = 0; row < array.length; row++) {
        for (let column = 0; column < array[row].length; column++) {
            let color;
            if (game[row][column].value == true) {
                color = game[row][column].color;
            } else {
                color = "white";
            }
            ctx.fillStyle = color;
            ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

// Game.
let game = [];
function createGame(width, height, oddsOfLife=15) {
    // Create a 2D array of the given size with all dead cells.
    let gameExport = [];
    for (let row = 0; row < height; row++) {
        let newRow = [];
        for (let column = 0; column < width; column++) {
            // Create a living or dead cell based on the odds of life.
            let randNum = Math.ceil(Math.random() * 100);

            if (randNum <= oddsOfLife) {
                let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
                color = colors[Math.floor(Math.random() * colors.length)];
                newRow.push({ value: true, color: color });

            } else {
                newRow.push({ value: false, color: "white" });
            }
        }
        gameExport.push(newRow);
    }

    // Set up the canvas.
    canvas.setAttribute("width", width*5);
    canvas.setAttribute("height", height*5);

    // Return the array.
    return gameExport;
}

// Do initial setup.
game = createGame(50, 50, 15);
display(game);

// Functionality
function getLivingNeighbors(x, y) {
    // Find the eight neighbors adjacent to a given cell.
    let livingNeighbors = 0;
    let neighbors = [];
    
    // Horizontal and vertical neighbors.

    // IMPLEMENT: wrap around the screen from left to right and top to bottom. ---------------------------------------------- HEY OVER HERE -------------------------------------------------------------------------------------------- ||||||||||||||||||||||||||||||
    
    // Horizontal and vertical neighbors.

    if (y+1 >= game.length) {
        neighbors.push(game[0][x]);
    } else {
        neighbors.push(game[y+1][x]);
    }

    if (y-1 < 0) {
        neighbors.push(game[game.length-1][x]);
    } else {
        neighbors.push(game[y-1][x]);
    }

    if (x+1 >= game[y].length) {
        neighbors.push(game[y][0]);
    } else {
        neighbors.push(game[y][x+1]);
    }

    if (x-1 < 0) {
        neighbors.push(game[y][game[y].length-1]);
    } else {
        neighbors.push(game[y][x-1]);
    }
    
    // Diagonal neighbors.
    try {
        neighbors.push(game[y+1][x+1]);
    } catch {
        console.log("error");
    }
    try {
        neighbors.push(game[y+1][x-1]);
    } catch {
        console.log("error");
    }
    try {
        neighbors.push(game[y-1][x+1]);
    } catch {
        console.log("error");
    }
    try {
        neighbors.push(game[y-1][x-1]);
    } catch {
        console.log("error");
    }

    // Diagonal neighbors via looping. Work in progress.
    // if (y+1 >= game.length && x+1 >= game[y].length) {
    //     neighbors.push(game[0][0]);
    // } else if (y+1 >= game.length && x+1 < game[y].length) {
    //     neighbors.push(game[0][x+1]);
    // } else if (y+1 < game.length && x+1 >= game[y].length) {
    //     neighbors.push(game[y+1][0]);
    // } else {
    //     neighbors.push(game[y+1][x+1]);
    // }

    // if (y+1 >= game.length && x-1 < 0) {
    //     neighbors.push(game[0][game[y].length-1]);
    // }  else if (y+1 >= game.length && x-1 > 0) {
    //     neighbors.push(game[0][x-1]);
    // } else if (y+1 < game.length && x-1 < 0) {
    //     neighbors.push(game[y+1][game[y].length-1]);
    // } else {
    //     neighbors.push(game[y+1][x-1]);
    // }

    // if (y-1 < 0 && x+1 >= game[y].length) {
    //     neighbors.push(game[game.length-1][0]);
    // } else if (y-1 < 0 && x+1 < game[y].length) {
    //     neighbors.push(game[game.length-1][x+1]);
    // } else if (y-1 > 0 && x+1 >= game[y].length) {
    //     neighbors.push(game[y-1][0]);
    // } else {
    //     neighbors.push(game[y-1][x+1]);
    // }

    // if (y-1 < 0 && x-1 < 0) {
    //     neighbors.push(game[game.length-1][game[y].length-1]);
    // } else if (y-1 < 0 && x-1 > 0) {
    //     neighbors.push(game[game.length-1][x-1]);
    // } else if (y-1 > 0 && x-1 < 0) {
    //     neighbors.push(game[y-1][game[y].length-1]);
    // } else {
    //     neighbors.push(game[y-1][x-1]);
    // }
    
    // Return the amount of them that are alive.
    for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i] != undefined && neighbors[i].value == true) {
            livingNeighbors ++;
        }
    }

    return livingNeighbors;
}

function getNeighborColors(x, y) {
        // Find the eight neighbors adjacent to a given cell.
        let livingNeighbors = 0;
        let neighbors = [];
        let neighborColors = [];
        
        // Horizontal and vertical neighbors.
    
        // IMPLEMENT: wrap around the screen from left to right and top to bottom. ---------------------------------------------- HEY OVER HERE -------------------------------------------------------------------------------------------- ||||||||||||||||||||||||||||||
        
        // Horizontal and vertical neighbors.
    
        if (y+1 >= game.length) {
            neighbors.push(game[0][x]);
        } else {
            neighbors.push(game[y+1][x]);
        }
    
        if (y-1 < 0) {
            neighbors.push(game[game.length-1][x]);
        } else {
            neighbors.push(game[y-1][x]);
        }
    
        if (x+1 >= game[y].length) {
            neighbors.push(game[y][0]);
        } else {
            neighbors.push(game[y][x+1]);
        }
    
        if (x-1 < 0) {
            neighbors.push(game[y][game[y].length-1]);
        } else {
            neighbors.push(game[y][x-1]);
        }
        
        // Diagonal neighbors.
        try {
            neighbors.push(game[y+1][x+1]);
        } catch {
        }
        try {
            neighbors.push(game[y+1][x-1]);
        } catch {
        }
        try {
            neighbors.push(game[y-1][x+1]);
        } catch {
        }
        try {
            neighbors.push(game[y-1][x-1]);
        } catch {
        }
        
        // Return the amount of them that are alive.
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i] != undefined && neighbors[i].value == true) {
                neighborColors.push(neighbors[i].color);
            }
        }
    
        return mode(neighborColors);
}

function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}


function setStatus(x, y) {
    // Get the given cells living neighbor count.
    let livingNeighbors = getLivingNeighbors(x, y);
    let mostColor = getNeighborColors(x, y);

    // Get the given cells current state.
    let cellStatus = game[y][x].value;

    // Run through the rules and see which apply.
    if (cellStatus == true) {
        // If the cell is alive.
        if (livingNeighbors < 2) {
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            game[y][x].value = false;
            game[y][x].color = "white";
            return;
        } else if (livingNeighbors == 2 || livingNeighbors == 3) {
            // Any live cell with two or three live neighbours lives on to the next generation.
            game[y][x].value = true;
            game[y][x].color = mostColor;
            return;
        } else if (livingNeighbors > 3) {
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            game[y][x].value = false;
            game[y][x].color = "white";
            return;
        }
    } else {
        // If the cell is dead.
        if (livingNeighbors == 3) {
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            game[y][x].value = true;
            game[y][x].color = mostColor;
            return;
        }
    }
}

let canRunIter = true;
function runIteration() {
    if (canRunIter) {
        // Run through and set the status of every element in the game.
        canRunIter = false;
        
        // Loop through each column in each row, check the status of the cell in that position.
        for (let row = 0; row < game.length; row++) {
            for (let column = 0; column < game[row].length; column++) {
                setStatus(column, row);
            }
        }

        display(game, 5);

        // console.log("Ran iteration.");

        canRunIter = true;
        return;
    } else {
        return;
    }
}

// Run an iteration every 500 milliseconds.
window.setInterval(runIteration, 100);
