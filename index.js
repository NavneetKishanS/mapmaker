const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'village',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'plains',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'village',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'plains',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'village',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'village',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'plains',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'plains',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

document.addEventListener("DOMContentLoaded",function() 
{
    var myAud = document.getElementById('myAudio');
    document.addEventListener('click', function() {
        myAud.play();
      });
})

document.addEventListener("DOMContentLoaded", function() {
    const matrix = document.getElementById("matrix");
    const unitsCard = document.getElementById("units-card");
    const generatorCard = document.getElementById("generator-card");
    const pointsCard = document.getElementById("points-card");
    const grid = document.getElementById("grid");
    let remainingTime = 28;
    let preview = null;
    let prevType = null;
    let prevTime = null;
    let unitsCompleted = 0;
    let points = 0;
    let awardedRows = [];
    let awardedColumns = [];
    let springScore = 0;
    let summerScore = 0;
    let autumnScore = 0;
    let winterScore = 0;
    const endAudio = document.getElementById("endAud");
    const popupContainer = document.getElementById('popup-container');
    const closePopupButton = document.getElementById('close-popup');
    const popupContent = document.querySelector('.popup-content');
    const invalid = document.getElementById('invalid');
    let time;
    let type;
    let pattern;
    function generateRandomPattern() {
        const randomIndex = Math.floor(Math.random() * elements.length);
         pattern = elements[randomIndex].shape;
         type = elements[randomIndex].type;
         time = elements[randomIndex].time;
        nextPatternGenerate(pattern, type, time, remainingTime); 
        // generateRandomPattern();
    }

    generateRandomPattern();
    
    function nextPatternGenerate(pattern, type, time, remainingTime) {
        const grid = document.getElementById("grid");
        grid.innerHTML = "";


        const timeUnit = document.getElementById("time-unit");
        timeUnit.innerText = `Time: ${time} | Remaining Time: ${remainingTime - unitsCompleted}`;
        
        console.log(pattern)
        
        pattern.forEach(row => {
            row.forEach(cellValue => {
                const cell = document.createElement("div");
                cell.classList.add("preview-cell");
                if (cellValue) {
                    cell.style.backgroundImage = `url('assets/tiles/${type}_tile.png')`;
                }
                grid.appendChild(cell);
            });
        });
    }

    function rotateShape() {
        pattern = pattern[0].map((col, i) => pattern.map(row => row[i])).reverse();
        return pattern;
    }

    function mirror() {
        pattern = pattern.map(row => row.reverse());
        return pattern;
    }
    
    function place(pattern, type, targetCell) {
        const matrix = document.getElementById("matrix");
        let alreadyPlaced = false;

        for (let i = 0; i < pattern.length; i++) 
        {
            for (let j = 0; j < pattern[0].length; j++) 
            {
                const cell = matrix.querySelector(`.row-${targetCell.row + i}.col-${targetCell.col + j}`);
            
                if (!cell.classList.contains('mountain')) 
                {
                    const cellType = pattern[i][j];
                    if (cellType) {
                        if (cell.classList.contains('placed') || cell.classList.contains('mountain'))
                         {
                            alreadyPlaced = true;
                        } else {
                            cell.style.backgroundImage = `url('assets/tiles/${type}_tile.png')`;


                            cell.classList.add('placed');
                        }
                    } else {
                   
                    }
                }
            }



        }

        return alreadyPlaced;
    }

    function updateSeasonScores() {
        const springDiv = document.querySelector('.spring .text');
        const summerDiv = document.querySelector('.summer .text');
        const autumnDiv = document.querySelector('.autumn .text');
        const winterDiv = document.querySelector('.winter .text');
    
        if (unitsCompleted <= 7) {
            springScore += points;
            points = 0;
        } else if (unitsCompleted > 7 && unitsCompleted <= 14) {
            autumnScore += points;
            points = 0;
        } else if (unitsCompleted > 14 && unitsCompleted <= 21) {
            summerScore += points;
            points = 0;
        } else if (unitsCompleted > 21 && unitsCompleted <= 28) {
            winterScore += points;
            points = 0;
        }
    
        springDiv.textContent = `Pt: ${springScore}`;
        summerDiv.textContent = `Pt: ${summerScore}`;
        autumnDiv.textContent = `Pt: ${autumnScore}`;
        winterDiv.textContent = `Pt: ${winterScore}`;
    }
    function closePopup() {
        popupContainer.style.display = 'none';
    }
    if (closePopupButton) {
        closePopupButton.addEventListener('click', closePopup);
    }

    function updateCloseButtonReference() {
        closePopupButton = document.getElementById('close-popup');
        if (closePopupButton) {
            closePopupButton.addEventListener('click', closePopup);
        }
    }
    let surroundedMountainCells = [];
    let borderlands = 0;
    
    //edgeOfForest mision
    // Function to check forest tiles along the edges
function checkForestTilesAlongEdge() {
    let edgeForestPoints = 0;

    for (let i = 0; i < 11; i++) {
        if (matrix.querySelector(`.row-0.col-${i}`).classList.contains('forest')) {
            edgeForestPoints++;
        }
        if (matrix.querySelector(`.row-10.col-${i}`).classList.contains('forest')) {
            edgeForestPoints++;
        }
    }

    // Check left and right edges for forest tiles
    for (let j = 1; j < 10; j++) {
        if (matrix.querySelector(`.row-${j}.col-0`).classList.contains('forest')) {
            edgeForestPoints++;
        }
        if (matrix.querySelector(`.row-${j}.col-10`).classList.contains('forest')) {
            edgeForestPoints++;
        }
    }

    // Update points and return the count of forest tiles along the edge
}

let awardedEdgeForestCells = [];

function awardPointsForEdgeForestCells() {
    let edgeForestPoints = 0;

    for (let i = 0; i < 11; i++) {
        const topCell = matrix.querySelector(`.row-0.col-${i}`);
        const bottomCell = matrix.querySelector(`.row-10.col-${i}`);

        if (topCell.classList.contains('forest') && !awardedEdgeForestCells.includes(`${0}-${i}`)) {
            edgeForestPoints++;
            awardedEdgeForestCells.push(`${0}-${i}`);
        }

        if (bottomCell.classList.contains('forest') && !awardedEdgeForestCells.includes(`10-${i}`)) {
            edgeForestPoints++;
            awardedEdgeForestCells.push(`10-${i}`);
        }
    }

    for (let j = 1; j < 10; j++) {
        const leftCell = matrix.querySelector(`.row-${j}.col-0`);
        const rightCell = matrix.querySelector(`.row-${j}.col-10`);

        if (leftCell.classList.contains('forest') && !awardedEdgeForestCells.includes(`${j}-0`)) {
            edgeForestPoints++;
            awardedEdgeForestCells.push(`${j}-0`);
        }

        if (rightCell.classList.contains('forest') && !awardedEdgeForestCells.includes(`${j}-10`)) {
            edgeForestPoints++;
            awardedEdgeForestCells.push(`${j}-10`);
        }
    }
    points += edgeForestPoints;
    return edgeForestPoints;
}

    function checkAndAwardPoints() {
        for (let i = 0; i < 11; i++) {
            if (!awardedRows.includes(i) && placedRow(i)) {
                points += 6;
                borderlands += 6;
                //borderLandsPoints+= 6;
                awardedRows.push(i);
            }
        }
    
        for (let j = 0; j < 11; j++) {
            if (!awardedColumns.includes(j) && placedColumn(j)) {
                points += 6;
                borderlands += 6;
                //borderLandsPoints+= 6;
                awardedColumns.push(j);
            }
        }
    
        //Mountain Surrounding
        const mountainCells = [
            { row: 1, col: 1 },
            { row: 3, col: 8 },
            { row: 5, col: 3 },
            { row: 8, col: 9 },
            { row: 9, col: 5 }
        ];
    
        for (const mountainCell of mountainCells) {
            if (!surroundedMountainCells.some(cell => cell.row === mountainCell.row && cell.col === mountainCell.col)) {
                const surrounded = isSurroundedByPlacedCells(mountainCell.row, mountainCell.col);
                if (surrounded) {
                    points += 1; 
                    surroundedMountainCells.push({ row: mountainCell.row, col: mountainCell.col });
                }
            }
        }

        const edgeForestCount = awardPointsForEdgeForestCells();
        console.log(`Forest along edge: ${edgeForestCount}`);
    
        updateSeasonScores();
    }
    function isSurroundedByPlacedCells(row, col) {
        const adjacentCells = [
            { row: row - 1, col: col }, 
            { row: row + 1, col: col }, 
            { row: row, col: col - 1 }, 
            { row: row, col: col + 1 } 
        ];
    
        for (const cell of adjacentCells) {
            const gridCell = document.querySelector(`.row-${cell.row}.col-${cell.col}`);
            if (!gridCell || !gridCell.classList.contains('placed')) {
                return false;
            }
        }
    
        return true; 
    }
    
    function placedRow(row) {
        for (let j = 0; j < 11; j++) {
            const cell = document.querySelector(`.row-${row}.col-${j}`);
            if (!cell.classList.contains('placed') && !cell.classList.contains('mountain')) {
                return false;
            }
        }
        return true;
    }
    
    function placedColumn(column) {
        for (let i = 0; i < 11; i++) {
            const cell = document.querySelector(`.row-${i}.col-${column}`);
            if (!cell.classList.contains('placed') && !cell.classList.contains('mountain')) {
                return false;
            }
        }
        return true;
    }

    //totalPoints = summerScore + springScore+autumnScore + winterScore;
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", `row-${i}`, `col-${j}`);
            cell.row = i;
            cell.col = j;

            if ((i === 1 && j === 1) ||
                (i === 3 && j === 8) ||
                (i === 5 && j === 3) ||
                (i === 8 && j === 9) ||
                (i === 9 && j === 5)) {
                cell.style.backgroundImage = "url('assets/tiles/mountain_tile.png')";
                cell.classList.add('mountain');
            }

            cell.addEventListener("click", function () {
                if (!cell.classList.contains('placed') && !cell.classList.contains('mountain') && unitsCompleted < 28) {
                    // const arr = generateRandomPattern();
                    preview = pattern;
                    prevType = type;
                    place(preview, prevType, cell);
                    if (!cell.querySelector('.placed')) {
                        unitsCompleted += time;
                        checkAndAwardPoints();
                        
                        generateRandomPattern();
                    }
                    
                    document.querySelector('.borderlandsPoints').textContent = `Points: ${borderlands}`;

                    totalPoints = summerScore + springScore+autumnScore + winterScore;
                    unitsCard.textContent = `Time Elapsed : ${unitsCompleted} / 28`;
                    pointsCard.textContent = `Points: ${totalPoints}`;
                    
                    popupContent.innerHTML = `
                    <h2>Congratulations Player!</h2>
                    <p>You have scored ${totalPoints} points.</p>
                    <button id="close-popup">Close</button>
                    <button id="reloadBtn">Restart</button>
                `;
                

    
    
                    if(unitsCompleted >= 28){
                        
                        endAudio.play();
                        popupContainer.style.display = 'flex';
                    }
                    updateCloseButtonReference();
                }
            });

            
            matrix.appendChild(cell);
        }
    }

    document.getElementById('rotateBtn').addEventListener('click', function() {
        if (preview) {
            
            preview = rotateShape(preview);
            nextPatternGenerate(pattern, type, pattern.length, remainingTime);
        }
    });

    document.getElementById('mirrorBtn').addEventListener('click', function() {
        if (preview) {
            preview = mirror(preview);
            nextPatternGenerate(pattern, type, pattern.length, remainingTime);
        }
    });

    document.getElementById('reloadBtn').addEventListener('click', function() {
        location.reload();
    });
 });

//function invalidCell(){
    //invalid.play();
//}

/*
document.addEventListener('click' , function() {
    if (cell.classList.contains('placed')) {
        
        //invalidCell();
        invalid.play();
}
        return; 
    });*/

    /*
closePopupButton.addEventListener('click', function() {
    popupContainer.style.display = 'none';
});*/

const startup = document.getElementById('start-up');

document.getElementById('reloadBtn').addEventListener('click', function() {
    location.reload();
    startup.play();
});
