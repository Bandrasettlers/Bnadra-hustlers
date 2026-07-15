        let rageX = 180;
        let rageScore = 0;
        let rageLives = 3;
        let rageObstacles = [];
        let rageSpeed = 6;
        let isRageRunning = false;

        function startRickshawRoadRage() {
            isRageRunning = true;
            rageScore = 0;
            rageLives = 3;
            rageSpeed = 6;
            rageX = 180;
            rageObstacles = [];

            document.getElementById("rageScore").innerText = "0 m";
            document.getElementById("rageLives").innerText = rageLives;

            const canvas = document.getElementById("rageCanvas");
            const ctx = canvas.getContext("2d");

            if (arcadeGameInterval) clearInterval(arcadeGameInterval);
            arcadeGameInterval = setInterval(() => {
                stepRoadRage(ctx, canvas);
            }, 30);

            arcadeGameKeysHandler = (e) => {
                const key = e.key;
                if (key === "ArrowLeft" || key === "a") { if (rageX > 60) rageX -= 120; playBeepSound(400, 0.04); }
                if (key === "ArrowRight" || key === "d") { if (rageX < 300) rageX += 120; playBeepSound(400, 0.04); }
            };
            window.addEventListener("keydown", arcadeGameKeysHandler);
        }

        function triggerRageKey(key) {
            arcadeGameKeysHandler({ key });
        }

        function stepRoadRage(ctx, canvas) {
            if (!isRageRunning) return;

            // Generate hurdles
            if (Math.random() < 0.04 && rageObstacles.length < 4) {
                // Determine random lane: 60, 180, 300
                const lanes = [60, 180, 300];
                const type = Math.random() < 0.4 ? 'coin' : (Math.random() < 0.35 ? 'pothole' : 'car');
                rageObstacles.push({
                    x: lanes[Math.floor(Math.random() * lanes.length)],
                    y: -50,
                    type
                });
            }

            rageScore += Math.floor(rageSpeed / 2);
            document.getElementById("rageScore").innerText = `${rageScore} m`;

            // Slowly accelerate
            rageSpeed += 0.001;

            // Move hurdles
            rageObstacles.forEach((obs, index) => {
                obs.y += rageSpeed;

                // Check collision
                const dist = Math.sqrt(Math.pow(obs.x - rageX, 2) + Math.pow(obs.y - 360, 2));
                if (dist < 40) {
                    // Collision action!
                    if (obs.type === 'coin') {
                        rageScore += 100;
                        playBeepSound(659.25, 0.08); // Coin sound
                        rageObstacles.splice(index, 1);
                    } else if (obs.type === 'car' || obs.type === 'pothole') {
                        rageLives--;
                        document.getElementById("rageLives").innerText = rageLives;
                        playBeepSound(150, 0.35); // Crash buzz
                        rageObstacles.splice(index, 1);

                        if (rageLives <= 0) {
                            isRageRunning = false;
                            clearInterval(arcadeGameInterval);
                            ctx.fillStyle = "rgba(5, 3, 12, 0.9)";
                            ctx.fillRect(0,0, canvas.width, canvas.height);
                            ctx.fillStyle = "#ff003c";
                            ctx.font = "bold 26px 'Anton', sans-serif";
                            ctx.textAlign = "center";
                            ctx.fillText("RICKSHAW CRASHED!", canvas.width / 2, 180);
                            ctx.fillStyle = "#fff";
                            ctx.font = "14px 'Inter', sans-serif";
                            ctx.fillText(`TOTAL HIGHWAY DISTANCE: ${rageScore} METERS`, canvas.width / 2, 225);
                            ctx.fillStyle = "#00e5ff";
                            ctx.font = "12px monospace";
                            ctx.fillText("TAP ARROWS LEFT/RIGHT TO DRIFT AGAIN", canvas.width / 2, 265);
                        }
                    }
                }

                // Out of screen
                if (obs.y > canvas.height) {
                    rageObstacles.splice(index, 1);
                }
            });

            // Draw Scene
            ctx.fillStyle = "#1e1b29";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw highway lines
            ctx.fillStyle = "#fff";
            const lineOffset = (rageScore * 3) % 80;
            for (let y = -80 + lineOffset; y < canvas.height; y += 80) {
                ctx.fillRect(120, y, 4, 40);
                ctx.fillRect(240, y, 4, 40);
            }

            // Draw Player Rickshaw (🛺)
            ctx.fillStyle = "#ffe600";
            ctx.font = "32px sans-serif";
            ctx.fillText("🛺", rageX - 16, 385);

            // Draw Obstacles
            rageObstacles.forEach(obs => {
                ctx.font = "32px Arial";
                if (obs.type === 'car') {
                    ctx.fillText("🚗", obs.x - 16, obs.y + 16);
                } else if (obs.type === 'pothole') {
                    ctx.fillText("🕳️", obs.x - 16, obs.y + 16);
                } else if (obs.type === 'coin') {
                    ctx.fillText("🪙", obs.x - 16, obs.y + 16);
                }
            });
        }


        // ============================================================
        // GAME 6: BANDRA JUNCTION LUDO
        // ============================================================
