        let chessBoard = [];
        let selectedChessSquare = null;
        let validChessMoves = [];

        const chessSymbols = {
            'R': '♜', 'N': '♞', 'B': '♝', 'Q': '♛', 'K': '♚', 'P': '♟',
            'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
            '': ''
        };

        function startCarterRoadChess() {
            resetChessGame();
        }

        function resetChessGame() {
            chessBoard = [
                ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
            ];
            selectedChessSquare = null;
            validChessMoves = [];
            document.getElementById("chessTurn").innerText = "YOUR TURN (WHITE)";
            document.getElementById("chessLog").innerText = "Bandra chess derby initialized! White moves.";
            renderChessBoard();
            playBeepSound(440, 0.1);
        }

        function renderChessBoard() {
            const container = document.getElementById("chessBoard");
            container.innerHTML = "";

            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const piece = chessBoard[row][col];
                    const isLight = (row + col) % 2 === 0;

                    const sq = document.createElement("div");
                    sq.className = `chess-square ${isLight ? 'chess-square-light' : 'chess-square-dark'}`;
                    sq.innerText = chessSymbols[piece];

                    if (piece !== '') {
                        if (piece === piece.toUpperCase()) {
                            sq.classList.add("piece-white");
                        } else {
                            sq.classList.add("piece-black");
                        }
                    }

                    // Check if selected
                    if (selectedChessSquare && selectedChessSquare.row === row && selectedChessSquare.col === col) {
                        sq.classList.add("chess-square-selected");
                    }

                    // Check if valid target
                    const isValidTarget = validChessMoves.some(m => m.row === row && m.col === col);
                    if (isValidTarget) {
                        sq.classList.add("chess-square-valid");
                        sq.onclick = () => selectChessTargetSquare(row, col);
                    } else {
                        // Regular piece clicks
                        if (piece !== '' && piece === piece.toUpperCase()) {
                            sq.onclick = () => selectChessSquarePiece(row, col);
                        }
                    }

                    container.appendChild(sq);
                }
            }
        }

        function selectChessSquarePiece(row, col) {
            const piece = chessBoard[row][col];
            selectedChessSquare = { row, col };
            validChessMoves = calculateSimpleChessMoves(row, col, piece);
            renderChessBoard();
            playBeepSound(330, 0.05);
        }

        function selectChessTargetSquare(row, col) {
            const piece = chessBoard[selectedChessSquare.row][selectedChessSquare.col];
            const targetPiece = chessBoard[row][col];

            // Perform move
            chessBoard[row][col] = piece;
            chessBoard[selectedChessSquare.row][selectedChessSquare.col] = '';

            let logMsg = `White moved ${piece} to [${col},${row}]`;
            if (targetPiece !== '') {
                logMsg += ` capturing Black ${targetPiece}!`;
                playBeepSound(880, 0.15);
            } else {
                playBeepSound(523, 0.08);
            }

            document.getElementById("chessLog").innerText = logMsg;

            selectedChessSquare = null;
            validChessMoves = [];
            renderChessBoard();

            // AI Turn
            document.getElementById("chessTurn").innerText = "CHAMPION AI THINKING...";
            setTimeout(makeCarterRoadAIMove, 600);
        }

        function calculateSimpleChessMoves(row, col, piece) {
            let moves = [];
            if (piece === 'P') {
                // Pawn forward
                if (row > 0 && chessBoard[row - 1][col] === '') moves.push({ row: row - 1, col });
                if (row === 6 && chessBoard[row - 1][col] === '' && chessBoard[row - 2][col] === '') moves.push({ row: row - 2, col });
                // Capture diagonals
                if (row > 0 && col > 0 && chessBoard[row - 1][col - 1] !== '' && chessBoard[row - 1][col - 1] === chessBoard[row - 1][col - 1].toLowerCase()) moves.push({ row: row - 1, col: col - 1 });
                if (row > 0 && col < 7 && chessBoard[row - 1][col + 1] !== '' && chessBoard[row - 1][col + 1] === chessBoard[row - 1][col + 1].toLowerCase()) moves.push({ row: row - 1, col: col + 1 });
            } else if (piece === 'N') {
                // Knight moves
                const offsets = [
                    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                    [1, -2], [1, 2], [2, -1], [2, 1]
                ];
                offsets.forEach(off => {
                    const r = row + off[0], c = col + off[1];
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const target = chessBoard[r][c];
                        if (target === '' || target === target.toLowerCase()) moves.push({ row: r, col: c });
                    }
                });
            } else {
                // General Sliding moves (Rook, Bishop, Queen, King sliding 1 square)
                const directions = [];
                if (piece === 'R' || piece === 'Q' || piece === 'K') { directions.push([-1,0],[1,0],[0,-1],[0,1]); }
                if (piece === 'B' || piece === 'Q' || piece === 'K') { directions.push([-1,-1],[-1,1],[1,-1],[1,1]); }

                const limit = (piece === 'K') ? 1 : 8;

                directions.forEach(dir => {
                    for (let step = 1; step <= limit; step++) {
                        const r = row + dir[0] * step;
                        const c = col + dir[1] * step;
                        if (r < 0 || r >= 8 || c < 0 || c >= 8) break;
                        const target = chessBoard[r][c];
                        if (target === '') {
                            moves.push({ row: r, col: c });
                        } else {
                            if (target === target.toLowerCase()) moves.push({ row: r, col: c });
                            break;
                        }
                    }
                });
            }
            return moves;
        }

        function makeCarterRoadAIMove() {
            // Find all valid black moves
            let allMoves = [];
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const piece = chessBoard[row][col];
                    if (piece !== '' && piece === piece.toLowerCase()) {
                        const pMoves = calculateSimpleChessMovesBlack(row, col, piece);
                        pMoves.forEach(m => {
                            allMoves.push({ from: { row, col }, to: m, piece });
                        });
                    }
                }
            }

            if (allMoves.length === 0) {
                document.getElementById("chessLog").innerText = "AI has no valid moves! White has won!";
                document.getElementById("chessTurn").innerText = "VICTORY FOR WHITE!";
                if (typeof playBeepSound === "function") playBeepSound(880, 0.4);
                return;
            }

            // Piece values for tactical evaluation
            const pieceValues = {
                'p': 10, 'n': 30, 'b': 30, 'r': 50, 'q': 90, 'k': 900,
                'P': 10, 'N': 30, 'B': 30, 'R': 50, 'Q': 90, 'K': 900
            };

            // Evaluate all available moves to choose the most tactical option
            let bestMove = null;
            let bestScore = -Infinity;

            allMoves.forEach(move => {
                let score = 0;
                const targetPiece = chessBoard[move.to.row][move.to.col];

                // 1. Prioritize capture value
                if (targetPiece !== '') {
                    score += (pieceValues[targetPiece] || 10) * 10;
                }

                // 2. Position and Pawn advancement
                if (move.piece === 'p') {
                    score += move.to.row; // Encourage advancing pawns
                    if (move.to.row === 7) score += 60; // Huge promotion incentive
                }

                // 3. Mini-Simulation: Avoid move if destination is under heavy fire
                const origFrom = chessBoard[move.from.row][move.from.col];
                const origTo = chessBoard[move.to.row][move.to.col];

                // Apply move temporarily
                chessBoard[move.to.row][move.to.col] = move.piece;
                chessBoard[move.from.row][move.from.col] = '';

                let isHanging = false;
                for (let r = 0; r < 8; r++) {
                    for (let c = 0; c < 8; c++) {
                        const oppPiece = chessBoard[r][c];
                        if (oppPiece !== '' && oppPiece === oppPiece.toUpperCase()) {
                            const oppMoves = calculateSimpleChessMoves(r, c, oppPiece);
                            if (oppMoves.some(m => m.row === move.to.row && m.col === move.to.col)) {
                                isHanging = true;
                                break;
                            }
                        }
                    }
                    if (isHanging) break;
                }

                // Revert move
                chessBoard[move.from.row][move.from.col] = origFrom;
                chessBoard[move.to.row][move.to.col] = origTo;

                if (isHanging) {
                    score -= (pieceValues[move.piece] || 10) * 8; // Heavy penalty for hanging pieces
                }

                // Add slight random noise to prevent mechanical/repetitive game lines
                score += Math.random() * 4;

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            });

            const chosenMove = bestMove || allMoves[Math.floor(Math.random() * allMoves.length)];
            const targetPiece = chessBoard[chosenMove.to.row][chosenMove.to.col];

            // Execute actual AI Move
            chessBoard[chosenMove.to.row][chosenMove.to.col] = chosenMove.piece;
            chessBoard[chosenMove.from.row][chosenMove.from.col] = '';

            // Handle AI Pawn promotion
            if (chosenMove.piece === 'p' && chosenMove.to.row === 7) {
                chessBoard[chosenMove.to.row][chosenMove.to.col] = 'q'; // Auto-queen promotion
            }

            let logMsg = `AI moved ${chosenMove.piece.toUpperCase()} to [${chosenMove.to.col},${chosenMove.to.row}]`;
            if (targetPiece !== '') {
                logMsg += ` capturing White ${targetPiece}!`;
                if (typeof playBeepSound === "function") playBeepSound(130, 0.25); // Warning drop sound
            } else {
                if (typeof playBeepSound === "function") playBeepSound(220, 0.1);
            }

            document.getElementById("chessLog").innerText = logMsg;
            document.getElementById("chessTurn").innerText = "YOUR TURN (WHITE)";
            renderChessBoard();
        }

        function calculateSimpleChessMovesBlack(row, col, piece) {
            let moves = [];
            if (piece === 'p') {
                if (row < 7 && chessBoard[row + 1][col] === '') moves.push({ row: row + 1, col });
                if (row === 1 && chessBoard[row + 1][col] === '' && chessBoard[row + 2][col] === '') moves.push({ row: row + 2, col });
                if (row < 7 && col > 0 && chessBoard[row + 1][col - 1] !== '' && chessBoard[row + 1][col - 1] === chessBoard[row + 1][col - 1].toUpperCase()) moves.push({ row: row + 1, col: col - 1 });
                if (row < 7 && col < 7 && chessBoard[row + 1][col + 1] !== '' && chessBoard[row + 1][col + 1] === chessBoard[row + 1][col + 1].toUpperCase()) moves.push({ row: row + 1, col: col + 1 });
            } else if (piece === 'n') {
                const offsets = [
                    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                    [1, -2], [1, 2], [2, -1], [2, 1]
                ];
                offsets.forEach(off => {
                    const r = row + off[0], c = col + off[1];
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const target = chessBoard[r][c];
                        if (target === '' || target === target.toUpperCase()) moves.push({ row: r, col: c });
                    }
                });
            } else {
                const directions = [];
                if (piece === 'r' || piece === 'q' || piece === 'k') { directions.push([-1,0],[1,0],[0,-1],[0,1]); }
                if (piece === 'b' || piece === 'q' || piece === 'k') { directions.push([-1,-1],[-1,1],[1,-1],[1,1]); }

                const limit = (piece === 'k') ? 1 : 8;

                directions.forEach(dir => {
                    for (let step = 1; step <= limit; step++) {
                        const r = row + dir[0] * step;
                        const c = col + dir[1] * step;
                        if (r < 0 || r >= 8 || c < 0 || c >= 8) break;
                        const target = chessBoard[r][c];
                        if (target === '') {
                            moves.push({ row: r, col: c });
                        } else {
                            if (target === target.toUpperCase()) moves.push({ row: r, col: c });
                            break;
                        }
                    }
                });
            }
            return moves;
        }


        // ============================================================
        // GAME 4: MOUNT MARY PACMAN IMPLEMENTATION
        // ============================================================
