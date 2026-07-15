        let pacmanX = 40;
        let pacmanY = 40;
        let pacmanDx = 0;
        let pacmanDy = 0;
        let pacmanNextDx = 0;
        let pacmanNextDy = 0;
        let pacmanScore = 0;
        let pacmanLives = 3;
        let pacmanLevelDots = [];
        let pacmanCops = [];
        let pacmanScaredMode = 0; // timer ticks left
        const PAC_GRID_SIZE = 28;

        const pacmanMaze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,1,0,1,1,1,1,0,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,1,0,0,1],
            [1,0,1,0,1,1,1,1,1,1,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,0,1,1,0,0,0,1,1,0,1,1,1],
            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
            [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,1,0,0,0,0,1,0,1],
            [1,0,1,1,1,0,0,1,0,0,1,1,1,0,1],
            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
            [1,1,0,0,1,1,1,0,1,1,1,0,0,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        function startMountMaryPacman() {
            pacmanScore = 0;
            pacmanLives = 3;
            document.getElementById("pacmanScore").innerText = pacmanScore;
            document.getElementById("pacmanLives").innerText = pacmanLives;

            // Load Dots
            pacmanLevelDots = [];
            for (let r = 0; r < 15; r++) {
                for (let c = 0; c < 15; c++) {
                    if (pacmanMaze[r][c] === 0) {
                        // Place dynamic elements
                        // Put power pots (☕) in corners
                        const isCorner = (r === 1 && c === 1) || (r === 13 && c === 13) || (r === 1 && c === 13) || (r === 13 && c === 1);
                        pacmanLevelDots.push({
                            row: r, col: c,
                            type: isCorner ? 'chai' : 'dot',
                            active: true
                        });
                    }
                }
            }

            // Reset Pacman
            pacmanX = 7 * PAC_GRID_SIZE + 14;
            pacmanY = 11 * PAC_GRID_SIZE + 14;
            pacmanDx = 0;
            pacmanDy = 0;
            pacmanNextDx = 0;
            pacmanNextDy = 0;
            pacmanScaredMode = 0;

            // Reset Cops
            pacmanCops = [
                { x: 2 * PAC_GRID_SIZE + 14, y: 1 * PAC_GRID_SIZE + 14, color: 'red', dx: 2, dy: 0 },
                { x: 12 * PAC_GRID_SIZE + 14, y: 1 * PAC_GRID_SIZE + 14, color: 'blue', dx: -2, dy: 0 },
                { x: 2 * PAC_GRID_SIZE + 14, y: 13 * PAC_GRID_SIZE + 14, color: 'orange', dx: 0, dy: -2 },
                { x: 12 * PAC_GRID_SIZE + 14, y: 13 * PAC_GRID_SIZE + 14, color: 'pink', dx: 0, dy: 2 }
            ];

            const canvas = document.getElementById("pacmanCanvas");
            const ctx = canvas.getContext("2d");

            if (arcadeGameInterval) clearInterval(arcadeGameInterval);
            arcadeGameInterval = setInterval(() => {
                stepPacman(ctx, canvas);
            }, 50);

            arcadeGameKeysHandler = (e) => {
                const key = e.key;
                if (key === "ArrowLeft" || key === "a") { pacmanNextDx = -4; pacmanNextDy = 0; }
                if (key === "ArrowUp" || key === "w") { pacmanNextDx = 0; pacmanNextDy = -4; }
                if (key === "ArrowRight" || key === "d") { pacmanNextDx = 4; pacmanNextDy = 0; }
                if (key === "ArrowDown" || key === "s") { pacmanNextDx = 0; pacmanNextDy = 4; }
            };
            window.addEventListener("keydown", arcadeGameKeysHandler);
        }

        function triggerPacmanKey(key) {
            arcadeGameKeysHandler({ key });
        }

        function stepPacman(ctx, canvas) {
            if (pacmanLives <= 0) return;

            // --- INTUITIVE GRID SNAPPING & TURN QUEUING ---
            if (pacmanNextDx !== 0 || pacmanNextDy !== 0) {
                // If reversing direction, change instantly
                if ((pacmanNextDx !== 0 && pacmanNextDx === -pacmanDx) || (pacmanNextDy !== 0 && pacmanNextDy === -pacmanDy)) {
                    pacmanDx = pacmanNextDx;
                    pacmanDy = pacmanNextDy;
                    pacmanNextDx = 0;
                    pacmanNextDy = 0;
                } else {
                    // Check if we are close enough to a grid cell center to allow a perpendicular turn
                    const offsetX = (pacmanX - 14) % PAC_GRID_SIZE;
                    const offsetY = (pacmanY - 14) % PAC_GRID_SIZE;
                    
                    if (Math.abs(offsetX) < 10 && Math.abs(offsetY) < 10) {
                        const cellC = Math.round((pacmanX - 14) / PAC_GRID_SIZE);
                        const cellR = Math.round((pacmanY - 14) / PAC_GRID_SIZE);
                        
                        // Check if the cell we'd enter on this turn is walkable
                        const nextR = cellR + (pacmanNextDy / 4);
                        const nextC = cellC + (pacmanNextDx / 4);
                        
                        if (nextR >= 0 && nextR < 15 && nextC >= 0 && nextC < 15) {
                            if (pacmanMaze[nextR][nextC] === 0) {
                                // Snap perfectly to the grid center and apply queued direction
                                pacmanX = cellC * PAC_GRID_SIZE + 14;
                                pacmanY = cellR * PAC_GRID_SIZE + 14;
                                pacmanDx = pacmanNextDx;
                                pacmanDy = pacmanNextDy;
                                pacmanNextDx = 0;
                                pacmanNextDy = 0;
                            }
                        }
                    }
                }
            }

            // Move Pacman with boundary checking
            let nextX = pacmanX + pacmanDx;
            let nextY = pacmanY + pacmanDy;

            // Boundary index clamping for 15x15 maze to prevent Undefined crashes
            const cellR1 = Math.max(0, Math.min(14, Math.floor((nextY - 10) / PAC_GRID_SIZE)));
            const cellR2 = Math.max(0, Math.min(14, Math.floor((nextY + 10) / PAC_GRID_SIZE)));
            const cellC1 = Math.max(0, Math.min(14, Math.floor((nextX - 10) / PAC_GRID_SIZE)));
            const cellC2 = Math.max(0, Math.min(14, Math.floor((nextX + 10) / PAC_GRID_SIZE)));

            const hitWall = pacmanMaze[cellR1][cellC1] === 1 ||
                            pacmanMaze[cellR1][cellC2] === 1 ||
                            pacmanMaze[cellR2][cellC1] === 1 ||
                            pacmanMaze[cellR2][cellC2] === 1;

            if (!hitWall) {
                pacmanX = nextX;
                pacmanY = nextY;
            } else {
                // If hit a wall, stop moving (but keep queue for turns)
                pacmanDx = 0;
                pacmanDy = 0;
            }

            // Check dot eats
            const pRow = Math.floor(pacmanY / PAC_GRID_SIZE);
            const pCol = Math.floor(pacmanX / PAC_GRID_SIZE);

            pacmanLevelDots.forEach(d => {
                if (d.row === pRow && d.col === pCol && d.active) {
                    d.active = false;
                    if (d.type === 'dot') {
                        pacmanScore += 10;
                        chaiPoints += 1;
                        playBeepSound(659, 0.05); // quick coin chirp
                    } else if (d.type === 'chai') {
                        pacmanScore += 50;
                        chaiPoints += 5;
                        pacmanScaredMode = 120; // 6 seconds of scared mode!
                        playBeepSound(880, 0.2); // high tea alarm sound
                    }
                    localStorage.setItem("bandra_hustlers_chai_points", chaiPoints.toString());
                    if (window.updateChaiPointsUI) window.updateChaiPointsUI();
                    document.getElementById("pacmanScore").innerText = pacmanScore;
                }
            });

            // Scared mode cooldown
            if (pacmanScaredMode > 0) pacmanScaredMode--;

            // Move Cops
            pacmanCops.forEach(cop => {
                let copNextX = cop.x + cop.dx;
                let copNextY = cop.y + cop.dy;

                // Clamp boundary coordinates to [0, 14] to prevent undefined array access crash
                const cR1 = Math.max(0, Math.min(14, Math.floor((copNextY - 8) / PAC_GRID_SIZE)));
                const cR2 = Math.max(0, Math.min(14, Math.floor((copNextY + 8) / PAC_GRID_SIZE)));
                const cC1 = Math.max(0, Math.min(14, Math.floor((copNextX - 8) / PAC_GRID_SIZE)));
                const cC2 = Math.max(0, Math.min(14, Math.floor((copNextX + 8) / PAC_GRID_SIZE)));

                const copHitWall = pacmanMaze[cR1][cC1] === 1 ||
                                   pacmanMaze[cR1][cC2] === 1 ||
                                   pacmanMaze[cR2][cC1] === 1 ||
                                   pacmanMaze[cR2][cC2] === 1;

                if (copHitWall) {
                    // Turn random directions
                    const dirs = [[2,0], [-2,0], [0,2], [0,-2]];
                    const validDirs = dirs.filter(d => {
                        const testX = cop.x + d[0] * 5;
                        const testY = cop.y + d[1] * 5;
                        const r = Math.max(0, Math.min(14, Math.floor(testY / PAC_GRID_SIZE)));
                        const c = Math.max(0, Math.min(14, Math.floor(testX / PAC_GRID_SIZE)));
                        return pacmanMaze[r][c] !== 1;
                    });
                    if (validDirs.length > 0) {
                        const nextD = validDirs[Math.floor(Math.random() * validDirs.length)];
                        cop.dx = nextD[0];
                        cop.dy = nextD[1];
                    } else {
                        cop.dx = -cop.dx;
                        cop.dy = -cop.dy;
                    }
                } else {
                    cop.x = copNextX;
                    cop.y = copNextY;
                }

                // Collision with player!
                const dist = Math.sqrt(Math.pow(cop.x - pacmanX, 2) + Math.pow(cop.y - pacmanY, 2));
                if (dist < 16) {
                    if (pacmanScaredMode > 0) {
                        // Eat cop!
                        cop.x = 7 * PAC_GRID_SIZE + 14;
                        cop.y = 7 * PAC_GRID_SIZE + 14;
                        pacmanScore += 200;
                        document.getElementById("pacmanScore").innerText = pacmanScore;
                        playBeepSound(1046, 0.2); // extra high capture beep
                    } else {
                        // Crash!
                        pacmanLives--;
                        document.getElementById("pacmanLives").innerText = pacmanLives;
                        playBeepSound(130, 0.3); // Crash buzz

                        if (pacmanLives <= 0) {
                            clearInterval(arcadeGameInterval);
                            ctx.fillStyle = "rgba(5, 3, 12, 0.9)";
                            ctx.fillRect(0,0, canvas.width, canvas.height);
                            ctx.fillStyle = "#ff003c";
                            ctx.font = "bold 26px 'Anton', sans-serif";
                            ctx.textAlign = "center";
                            ctx.fillText("CAUGHT BY TRAFFIC POLICE!", canvas.width / 2, 180);
                            ctx.fillStyle = "#fff";
                            ctx.font = "14px 'Inter', sans-serif";
                            ctx.fillText(`TOTAL ESCAPE DOTS: ${pacmanScore}`, canvas.width / 2, 225);
                            ctx.fillStyle = "#00e5ff";
                            ctx.font = "12px monospace";
                            ctx.fillText("TAP SCREEN/ARROWS TO RUN AGAIN", canvas.width / 2, 265);
                        } else {
                            // Reset positions
                            pacmanX = 7 * PAC_GRID_SIZE + 14;
                            pacmanY = 11 * PAC_GRID_SIZE + 14;
                            pacmanDx = 0;
                            pacmanDy = 0;
                        }
                    }
                }
            });

            // Draw Maze & Elements
            ctx.fillStyle = "#020104";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Walls
            for (let r = 0; r < 15; r++) {
                for (let c = 0; c < 15; c++) {
                    if (pacmanMaze[r][c] === 1) {
                        ctx.fillStyle = "#1b143c";
                        ctx.fillRect(c * PAC_GRID_SIZE + 2, r * PAC_GRID_SIZE + 2, PAC_GRID_SIZE - 4, PAC_GRID_SIZE - 4);
                    }
                }
            }

            // Draw Dots
            pacmanLevelDots.forEach(d => {
                if (d.active) {
                    if (d.type === 'dot') {
                        ctx.fillStyle = "#ffe600";
                        ctx.beginPath();
                        ctx.arc(d.col * PAC_GRID_SIZE + 14, d.row * PAC_GRID_SIZE + 14, 3, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (d.type === 'chai') {
                        ctx.fillStyle = "#ff008c";
                        ctx.font = "13px sans-serif";
                        ctx.fillText("☕", d.col * PAC_GRID_SIZE + 7, d.row * PAC_GRID_SIZE + 20);
                    }
                }
            });

            // Draw Player Rickshaw (🛺)
            ctx.fillStyle = "#ffe600";
            ctx.font = "18px sans-serif";
            ctx.fillText("🛺", pacmanX - 9, pacmanY + 6);

            // Draw Cops
            pacmanCops.forEach(cop => {
                ctx.fillStyle = pacmanScaredMode > 0 ? '#00e5ff' : '#ff003c';
                ctx.font = "18px Arial";
                ctx.fillText("🚔", cop.x - 9, cop.y + 6);
            });
        }


        // ============================================================
        // GAME 5: RICKSHAW ROAD RAGE SPEEDWAY
        // ============================================================
