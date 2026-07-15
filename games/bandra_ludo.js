        let ludoPlayerPos = 0;
        let ludoAIPos = 0;
        let ludoIsPlayerTurn = true;

        // Tracks positions (simple 2D grid path loop of 20 squares)
        const ludoPath = [
            { r: 4, c: 0 }, { r: 3, c: 0 }, { r: 2, c: 0 }, { r: 1, c: 0 }, { r: 0, c: 0 },
            { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 }, { r: 0, c: 5 }, { r: 0, c: 6 },
            { r: 1, c: 6 }, { r: 2, c: 6 }, { r: 3, c: 6 }, { r: 4, c: 6 },
            { r: 4, c: 5 }, { r: 4, c: 4 }, { r: 4, c: 3 }, { r: 4, c: 2 }, { r: 4, c: 1 },
            { r: 2, c: 3 } // HOME (Central Square)
        ];

        function startBandraJunctionLudo() {
            ludoPlayerPos = 0;
            ludoAIPos = 0;
            ludoIsPlayerTurn = true;

            document.getElementById("playerPos").innerText = "0 / 20";
            document.getElementById("aiPos").innerText = "0 / 20";
            document.getElementById("diceResult").innerText = "1";
            document.getElementById("ludoLog").innerText = "Ludo junction board initialized. Red token starts!";

            renderLudoBoard();
        }

        function renderLudoBoard() {
            const board = document.getElementById("ludoVisualBoard");
            board.innerHTML = "";

            // Create a 5x7 grid layout
            for (let r = 0; r < 5; r++) {
                for (let c = 0; c < 7; c++) {
                    const idxOnPath = ludoPath.findIndex(p => p.r === r && p.c === c);

                    const cell = document.createElement("div");
                    if (idxOnPath === -1) {
                        cell.className = "ludo-track-cell ludo-cell-inactive";
                    } else {
                        cell.className = "ludo-track-cell";
                        cell.innerText = idxOnPath === 20 ? "HOME" : idxOnPath;

                        if (idxOnPath === 0) { cell.classList.add("ludo-cell-start-red"); }
                        else if (idxOnPath === 10) { cell.classList.add("ludo-cell-start-green"); }
                        else if (idxOnPath === 20) { cell.classList.add("ludo-cell-home"); }

                        // Append Red/Green Tokens dynamically on top of the squares
                        if (ludoPlayerPos === idxOnPath) {
                            const tok = document.createElement("div");
                            tok.className = "ludo-token ludo-token-player";
                            tok.innerText = "🔴";
                            cell.appendChild(tok);
                        }
                        if (ludoAIPos === idxOnPath) {
                            const tok = document.createElement("div");
                            tok.className = "ludo-token ludo-token-ai";
                            tok.style.bottom = "2px";
                            tok.innerText = "🟢";
                            cell.appendChild(tok);
                        }
                    }
                    board.appendChild(cell);
                }
            }
        }

        function rollLudoDice() {
            if (!ludoIsPlayerTurn) return;
            ludoIsPlayerTurn = false;

            const btn = document.getElementById("diceBtn");
            btn.disabled = true;

            // Animate rolling result
            let count = 0;
            const rollInterval = setInterval(() => {
                const tempRoll = Math.floor(Math.random() * 6) + 1;
                document.getElementById("diceResult").innerText = tempRoll;
                playBeepSound(400, 0.04);
                count++;
                if (count > 8) {
                    clearInterval(rollInterval);
                    const finalRoll = Math.floor(Math.random() * 6) + 1;
                    document.getElementById("diceResult").innerText = finalRoll;

                    // Advance player token
                    let targetPos = ludoPlayerPos + finalRoll;
                    if (targetPos > 20) targetPos = 20; // Exact home or clamp

                    ludoPlayerPos = targetPos;
                    document.getElementById("playerPos").innerText = `${ludoPlayerPos} / 20`;
                    document.getElementById("ludoLog").innerText = `You rolled a ${finalRoll} and advanced to station ${ludoPlayerPos}!`;

                    playBeepSound(523, 0.1);

                    // Check knockback
                    if (ludoPlayerPos === ludoAIPos && ludoPlayerPos !== 20 && ludoPlayerPos !== 0) {
                        ludoAIPos = 0;
                        document.getElementById("aiPos").innerText = "0 / 20";
                        document.getElementById("ludoLog").innerText += ` ⚔️ KNOCKED AI BACK TO THE DEPOT!`;
                        playBeepSound(130, 0.35); // buzz knockback
                    }

                    renderLudoBoard();

                    if (ludoPlayerPos === 20) {
                        document.getElementById("ludoLog").innerText = "🏆 RED TOKEN ARRIVED AT THE STATION! YOU WON!";
                        playBeepSound(880, 0.4);
                        return;
                    }

                    // Schedule AI Turn
                    setTimeout(makeLudoAITurn, 1000);
                }
            }, 80);
        }

        function makeLudoAITurn() {
            document.getElementById("ludoLog").innerText = "Green AI rolls the dice...";
            const aiRoll = Math.floor(Math.random() * 6) + 1;
            document.getElementById("diceResult").innerText = aiRoll;
            playBeepSound(220, 0.08);

            setTimeout(() => {
                let targetPos = ludoAIPos + aiRoll;
                if (targetPos > 20) targetPos = 20;

                ludoAIPos = targetPos;
                document.getElementById("aiPos").innerText = `${ludoAIPos} / 20`;
                document.getElementById("ludoLog").innerText = `AI rolled a ${aiRoll} and advanced to station ${ludoAIPos}!`;

                // Check knockback
                if (ludoAIPos === ludoPlayerPos && ludoAIPos !== 20 && ludoAIPos !== 0) {
                    ludoPlayerPos = 0;
                    document.getElementById("playerPos").innerText = "0 / 20";
                    document.getElementById("ludoLog").innerText += ` ⚔️ AI KNOCKED YOU BACK TO THE DEPOT!`;
                    playBeepSound(130, 0.35);
                }

                renderLudoBoard();

                if (ludoAIPos === 20) {
                    document.getElementById("ludoLog").innerText = "💀 GREEN TOKEN ARRIVED HOME! COMPUTER WON!";
                    playBeepSound(110, 0.5);
                    return;
                }

                // Return control
                ludoIsPlayerTurn = true;
                const btn = document.getElementById("diceBtn");
                btn.disabled = false;
                document.getElementById("ludoLog").innerText += " Your turn!";
            }, 800);
        }

        // Web Audio API beep synthesizer helper
        function playBeepSound(frequency, duration) {
            if (typeof audioCtx === "undefined" || !audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                if (typeof mainGainNode !== "undefined" && mainGainNode) {
                    gain.connect(mainGainNode);
                } else {
                    gain.connect(audioCtx.destination);
                }
                
                osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
                
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            } catch(e) {}
        }

        // --- C. Deals & Vouchers System ---
