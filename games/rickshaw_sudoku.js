        let currentSudokuBoard = [];
        const sudokuSolution = [
            [5,3,4, 6,7,8, 9,1,2],
            [6,7,2, 1,9,5, 3,4,8],
            [1,9,8, 3,4,2, 5,6,7],
            [8,5,9, 7,6,1, 4,2,3],
            [4,2,6, 8,5,3, 7,9,1],
            [7,1,3, 9,2,4, 8,5,6],
            [9,6,1, 5,3,7, 2,8,4],
            [2,8,7, 4,1,9, 6,3,5],
            [3,4,5, 2,8,6, 1,7,9]
        ];
        const sudokuInitialMask = [
            [5,3,0, 0,7,0, 0,0,0],
            [6,0,0, 1,9,5, 0,0,0],
            [0,9,8, 0,0,0, 0,6,0],
            [8,0,0, 0,6,0, 0,0,3],
            [4,0,0, 8,0,3, 0,0,1],
            [7,0,0, 0,2,0, 0,0,6],
            [0,6,0, 0,0,0, 2,8,0],
            [0,0,0, 4,1,9, 0,0,5],
            [0,0,0, 0,8,0, 0,7,9]
        ];

        function startRickshawSudoku() {
            resetSudokuGame();
        }

        function resetSudokuGame() {
            // Clone masks
            currentSudokuBoard = JSON.parse(JSON.stringify(sudokuInitialMask));
            document.getElementById("sudokuMessage").innerText = "TARIFF LOADED. SOLVE!";
            renderSudokuBoard();
            playBeepSound(440, 0.1);
        }

        function renderSudokuBoard() {
            const grid = document.getElementById("sudokuGrid");
            grid.innerHTML = "";

            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    const val = currentSudokuBoard[row][col];
                    const isPre = sudokuInitialMask[row][col] !== 0;

                    const cell = document.createElement("div");
                    cell.className = "sudoku-cell";
                    if (isPre) {
                        cell.classList.add("sudoku-cell-pre");
                        cell.innerText = val;
                    } else {
                        cell.innerText = val === 0 ? "" : val;
                        // On click, rotate value 1 -> 9 -> 0
                        cell.onclick = () => {
                            let nextVal = (val + 1) % 10;
                            currentSudokuBoard[row][col] = nextVal;
                            playBeepSound(330, 0.05);
                            renderSudokuBoard();
                        };
                    }
                    grid.appendChild(cell);
                }
            }
        }

        function checkSudokuSolve() {
            let hasErrors = false;
            let isComplete = true;

            const cells = document.querySelectorAll(".sudoku-cell");

            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    const idx = row * 9 + col;
                    const val = currentSudokuBoard[row][col];
                    const correctVal = sudokuSolution[row][col];

                    if (val === 0) {
                        isComplete = false;
                    } else if (val !== correctVal) {
                        hasErrors = true;
                        cells[idx].classList.add("sudoku-cell-err");
                    } else {
                        cells[idx].classList.remove("sudoku-cell-err");
                    }
                }
            }

            const msg = document.getElementById("sudokuMessage");
            if (hasErrors) {
                msg.innerText = "🛑 DETECTED CONFLICTS ON FARES!";
                msg.style.color = "var(--red)";
                playBeepSound(150, 0.35);
            } else if (!isComplete) {
                msg.innerText = "⚡ NO ERRORS SO FAR, COMPLETE GRIDS!";
                msg.style.color = "var(--yellow)";
                playBeepSound(440, 0.15);
            } else {
                msg.innerText = "🏆 PUZZLE SOLVED! METER RATER MASTER!";
                msg.style.color = "var(--cyan)";
                playBeepSound(880, 0.25);
            }
        }


        // ============================================================
        // GAME 3: CARTER ROAD CHESS MASTER VS AI
        // ============================================================
