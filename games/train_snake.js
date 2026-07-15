        let snakeParts = [];
        let snakeFood = {};
        let snakeDx = 20;
        let snakeDy = 0;
        let snakeScore = 0;
        let isSnakeRunning = false;
        const SNAKE_GRID = 20;

        function startLocalTrainSnake() {
            isSnakeRunning = true;
            snakeScore = 3;
            document.getElementById("snakeScore").innerText = snakeScore;

            // Start in the middle
            snakeParts = [
                {x: 200, y: 200},
                {x: 180, y: 200},
                {x: 160, y: 200}
            ];
            snakeDx = 20;
            snakeDy = 0;
            spawnSnakeFood();

            const canvas = document.getElementById("snakeCanvas");
            const ctx = canvas.getContext("2d");

            if (arcadeGameInterval) clearInterval(arcadeGameInterval);
            arcadeGameInterval = setInterval(() => {
                moveLocalTrainSnake(ctx, canvas);
            }, 120);

            arcadeGameKeysHandler = (e) => {
                const key = e.key;
                if ((key === "ArrowLeft" || key === "a") && snakeDx === 0) { snakeDx = -20; snakeDy = 0; }
                if ((key === "ArrowUp" || key === "w") && snakeDy === 0) { snakeDx = 0; snakeDy = -20; }
                if ((key === "ArrowRight" || key === "d") && snakeDx === 0) { snakeDx = 20; snakeDy = 0; }
                if ((key === "ArrowDown" || key === "s") && snakeDy === 0) { snakeDx = 0; snakeDy = 20; }
            };
            window.addEventListener("keydown", arcadeGameKeysHandler);
        }

        function triggerSnakeKey(key) {
            if (!isSnakeRunning) return;
            arcadeGameKeysHandler({ key });
        }

        function spawnSnakeFood() {
            snakeFood.x = Math.floor(Math.random() * (420 / SNAKE_GRID)) * SNAKE_GRID;
            snakeFood.y = Math.floor(Math.random() * (420 / SNAKE_GRID)) * SNAKE_GRID;
            // Guard
            snakeParts.forEach(part => {
                if (part.x === snakeFood.x && part.y === snakeFood.y) spawnSnakeFood();
            });
        }

        function moveLocalTrainSnake(ctx, canvas) {
            if (!isSnakeRunning) return;

            // Calculate next head position
            const head = { x: snakeParts[0].x + snakeDx, y: snakeParts[0].y + snakeDy };

            // Wall and body collisions
            const hitLeft = head.x < 0;
            const hitRight = head.x >= canvas.width;
            const hitTop = head.y < 0;
            const hitBottom = head.y >= canvas.height;
            let hitSelf = false;

            for (let i = 1; i < snakeParts.length; i++) {
                if (snakeParts[i].x === head.x && snakeParts[i].y === head.y) {
                    hitSelf = true;
                    break;
                }
            }

            if (hitLeft || hitRight || hitTop || hitBottom || hitSelf) {
                // Game over!
                isSnakeRunning = false;
                clearInterval(arcadeGameInterval);
                playBeepSound(110, 0.4); // Fail hum

                ctx.fillStyle = "rgba(5, 3, 12, 0.85)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#ff003c";
                ctx.font = "bold 26px 'Anton', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("TRAIN DERAILMENT!", canvas.width / 2, 180);

                ctx.fillStyle = "#fff";
                ctx.font = "14px 'Inter', sans-serif";
                ctx.fillText(`TOTAL COACHES SAVED: ${snakeScore}`, canvas.width / 2, 220);

                ctx.fillStyle = "#00e5ff";
                ctx.font = "12px monospace";
                ctx.fillText("PRESS ANY KEY OR ARROWS TO RESTART", canvas.width / 2, 260);

                if (snakeScore > arcadeHighScores.snake) {
                    arcadeHighScores.snake = snakeScore;
                    document.getElementById("snakeHighScore").innerText = snakeScore;
                }
                return;
            }

            snakeParts.unshift(head);

            // Eat commuter
            if (head.x === snakeFood.x && head.y === snakeFood.y) {
                snakeScore++;
                document.getElementById("snakeScore").innerText = snakeScore;
                playBeepSound(587.33, 0.08); // High note chime
                chaiPoints += 10;
                localStorage.setItem("bandra_hustlers_chai_points", chaiPoints.toString());
                if (window.updateChaiPointsUI) window.updateChaiPointsUI();
                spawnSnakeFood();
            } else {
                snakeParts.pop();
            }

            // Draw Train Scene
            ctx.fillStyle = "#030206";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw railway tracks
            ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
            ctx.lineWidth = 2;
            for (let i = 10; i < canvas.width; i += 20) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }

            // Draw Commuter Target (🧍)
            ctx.fillStyle = "#ffe600";
            ctx.font = "14px Arial";
            ctx.fillText("🧍", snakeFood.x + 4, snakeFood.y + 15);

            // Draw Train Coaches
            snakeParts.forEach((part, index) => {
                const isHead = index === 0;
                if (isHead) {
                    ctx.fillStyle = "#ff008c";
                    ctx.fillRect(part.x + 1, part.y + 1, SNAKE_GRID - 2, SNAKE_GRID - 2);

                    // Train Headlights beam
                    ctx.fillStyle = "rgba(0, 229, 255, 0.15)";
                    ctx.beginPath();
                    if (snakeDx > 0) {
                        ctx.moveTo(part.x + 20, part.y + 10);
                        ctx.lineTo(part.x + 60, part.y - 10);
                        ctx.lineTo(part.x + 60, part.y + 30);
                    } else if (snakeDx < 0) {
                        ctx.moveTo(part.x, part.y + 10);
                        ctx.lineTo(part.x - 40, part.y - 10);
                        ctx.lineTo(part.x - 40, part.y + 30);
                    } else if (snakeDy > 0) {
                        ctx.moveTo(part.x + 10, part.y + 20);
                        ctx.lineTo(part.x - 10, part.y + 60);
                        ctx.lineTo(part.x + 30, part.y + 60);
                    } else if (snakeDy < 0) {
                        ctx.moveTo(part.x + 10, part.y);
                        ctx.lineTo(part.x - 10, part.y - 40);
                        ctx.lineTo(part.x + 30, part.y - 40);
                    }
                    ctx.fill();
                } else {
                    // Coach with lit windows
                    ctx.fillStyle = "#8a1f4b";
                    ctx.fillRect(part.x + 2, part.y + 2, SNAKE_GRID - 4, SNAKE_GRID - 4);
                    ctx.fillStyle = "rgba(255, 230, 0, 0.8)";
                    ctx.fillRect(part.x + 5, part.y + 6, 3, 3);
                    ctx.fillRect(part.x + 12, part.y + 6, 3, 3);
                }
            });
        }


        // ============================================================
        // GAME 2: RICKSHAW FARE SUDOKU IMPLEMENTATION
        // ============================================================
