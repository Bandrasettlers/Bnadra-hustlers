        let activeArcadeGameType = null;
        let arcadeGameInterval = null;
        let arcadeGameKeysHandler = null;

        // Shared or high scores
        let arcadeHighScores = {
            snake: 3,
            sudoku: 0,
            chess: 0,
            pacman: 0,
            roadrage: 0,
            ludo: 0
        };

        function initArcadeEcosystem() {
            // By default, make sure we show the Netflix Selector panel
            backToGameSelector();
        }

        function cleanupActiveArcadeGame() {
            if (arcadeGameInterval) {
                clearInterval(arcadeGameInterval);
                arcadeGameInterval = null;
            }
            if (arcadeGameKeysHandler) {
                window.removeEventListener("keydown", arcadeGameKeysHandler);
                arcadeGameKeysHandler = null;
            }
            activeArcadeGameType = null;
            if (typeof window.stopGameMusic === "function") {
                window.stopGameMusic();
            }
        }

        function backToGameSelector() {
            cleanupActiveArcadeGame();
            document.getElementById("active-game-stage").style.display = "none";
            document.getElementById("game-selection-panel").style.display = "block";
            if (typeof window.setModalBackBtnVisibility === "function") {
                window.setModalBackBtnVisibility(false);
            }
        }

        function launchArcadeGame(gameType) {
            cleanupActiveArcadeGame();
            activeArcadeGameType = gameType;

            document.getElementById("game-selection-panel").style.display = "none";
            document.getElementById("active-game-stage").style.display = "flex";

            if (typeof window.setModalBackBtnVisibility === "function") {
                window.setModalBackBtnVisibility(true, "◀ BACK");
            }

            if (typeof window.playGameMusic === "function") {
                window.playGameMusic(gameType);
            }

            const titleHeader = document.getElementById("active-game-title-header");
            const bodyContainer = document.getElementById("active-game-body");
            bodyContainer.innerHTML = "";

            if (gameType === 'snake') {
                titleHeader.innerText = "LOCAL TRAIN SNAKE // WESTERN RAIL CRAWLER";
                bodyContainer.innerHTML = `
                    <div class="arcade-classic-layout">
                        <div class="game-info-sidebar">
                            <h3>MUMBAI RAIL CRAWLER</h3>
                            <p class="game-instructions-text">Pilot the iconic Mumbai local train. Collect passenger commuters to attach coaches to your train! Do not crash into the concrete walls or your own coaches.</p>
                            <div class="arcade-score-panel">
                                <div class="arcade-score-item"><span>COACHES:</span> <strong id="snakeScore">3</strong></div>
                                <div class="arcade-score-item"><span>HIGH SCORE:</span> <strong id="snakeHighScore">${arcadeHighScores.snake}</strong></div>
                            </div>
                            <div class="retro-wasd-keys">
                                <button onclick="triggerSnakeKey('ArrowUp')">▲</button>
                                <div>
                                    <button onclick="triggerSnakeKey('ArrowLeft')">◀</button>
                                    <button onclick="triggerSnakeKey('ArrowDown')">▼</button>
                                    <button onclick="triggerSnakeKey('ArrowRight')">▶</button>
                                </div>
                            </div>
                        </div>
                        <div class="canvas-wrapper-cinematic">
                            <canvas id="snakeCanvas" width="420" height="420"></canvas>
                        </div>
                    </div>
                `;
                startLocalTrainSnake();
            } else if (gameType === 'sudoku') {
                titleHeader.innerText = "RICKSHAW FARE SUDOKU // METER PUZZLE";
                bodyContainer.innerHTML = `
                    <div class="sudoku-layout">
                        <div class="sudoku-panel">
                            <h3>RICKSHAW FARE SUDOKU</h3>
                            <p class="game-instructions-text">Verify local taxi-meter tariffs! Tap/Click any empty square to rotate through rates **1 to 9** until valid. Every 3x3 box, row, and column must contain unique digits.</p>
                            <div class="sudoku-controls">
                                <button class="arcade-btn-action" onclick="resetSudokuGame()">NEW FARE GRID</button>
                                <button class="arcade-btn-action" onclick="checkSudokuSolve()">VERIFY SOLUTION</button>
                            </div>
                            <div id="sudokuMessage" class="sudoku-msg"></div>
                        </div>
                        <div class="sudoku-grid-wrapper">
                            <div id="sudokuGrid" class="sudoku-grid"></div>
                        </div>
                    </div>
                `;
                startRickshawSudoku();
            } else if (gameType === 'chess') {
                titleHeader.innerText = "CARTER ROAD CHESS // VS CHAMPION AI";
                bodyContainer.innerHTML = `
                    <div class="chess-layout">
                        <div class="chess-panel">
                            <h3>CARTER BEACH CHESS</h3>
                            <p class="game-instructions-text">Challenge Bandra's seaside beach chess master. You play White. Click on a white piece, then click any highlighted cyan dot to move. Black AI responds instantly!</p>
                            <div class="chess-meta">
                                <div class="chess-turn-indicator" id="chessTurn">YOUR TURN (WHITE)</div>
                                <button class="arcade-btn-action" onclick="resetChessGame()">RESTART MATCH</button>
                            </div>
                            <div id="chessLog" class="chess-log">Match started. Good luck!</div>
                        </div>
                        <div class="chess-board-wrapper">
                            <div id="chessBoard" class="chess-board"></div>
                        </div>
                    </div>
                `;
                startCarterRoadChess();
            } else if (gameType === 'pacman') {
                titleHeader.innerText = "MOUNT MARY PAC-MAN // TAXI ESCAPE";
                bodyContainer.innerHTML = `
                    <div class="arcade-classic-layout">
                        <div class="game-info-sidebar">
                            <h3>MOUNT MARY PAC-MAN</h3>
                            <p class="game-instructions-text">Navigate your yellow auto-rickshaw (🛺) through Bandra's lanes! Eat gold coins (🟡). Grab the hot cutting chais (☕) to scare the traffic police (🚔) and capture them!</p>
                            <div class="arcade-score-panel">
                                <div class="arcade-score-item"><span>POINTS:</span> <strong id="pacmanScore">0</strong></div>
                                <div class="arcade-score-item"><span>LIVES:</span> <strong id="pacmanLives">3</strong></div>
                            </div>
                            <div class="retro-wasd-keys">
                                <button onclick="triggerPacmanKey('ArrowUp')">▲</button>
                                <div>
                                    <button onclick="triggerPacmanKey('ArrowLeft')">◀</button>
                                    <button onclick="triggerPacmanKey('ArrowDown')">▼</button>
                                    <button onclick="triggerPacmanKey('ArrowRight')">▶</button>
                                </div>
                            </div>
                        </div>
                        <div class="canvas-wrapper-cinematic">
                            <canvas id="pacmanCanvas" width="420" height="420"></canvas>
                        </div>
                    </div>
                `;
                startMountMaryPacman();
            } else if (gameType === 'roadrage') {
                titleHeader.innerText = "RICKSHAW ROAD RAGE // SEA LINK RACER";
                bodyContainer.innerHTML = `
                    <div class="arcade-classic-layout">
                        <div class="game-info-sidebar">
                            <h3>RICKSHAW ROAD RAGE</h3>
                            <p class="game-instructions-text">Steer your rickshaw Left & Right down the Bandra-Worli Sea Link! Dodge oncoming traffic (🚗, 🚕) and potholes (🕳️). Grab gold coins (🪙) and fuel (⛽)!</p>
                            <div class="arcade-score-panel">
                                <div class="arcade-score-item"><span>METERS:</span> <strong id="rageScore">0 m</strong></div>
                                <div class="arcade-score-item"><span>LIVES:</span> <strong id="rageLives">3</strong></div>
                            </div>
                            <div class="retro-wasd-keys" style="grid-template-columns: 1fr;">
                                <div style="display: flex; gap: 12px; justify-content: center;">
                                    <button onclick="triggerRageKey('ArrowLeft')" style="width: 80px; height: 44px; font-size: 16px;">◀ LEFT</button>
                                    <button onclick="triggerRageKey('ArrowRight')" style="width: 80px; height: 44px; font-size: 16px;">RIGHT ▶</button>
                                </div>
                            </div>
                        </div>
                        <div class="canvas-wrapper-cinematic">
                            <canvas id="rageCanvas" width="400" height="420"></canvas>
                        </div>
                    </div>
                `;
                startRickshawRoadRage();
            } else if (gameType === 'ludo') {
                titleHeader.innerText = "BANDRA JUNCTION LUDO // BOARD CLASSIC";
                bodyContainer.innerHTML = `
                    <div class="ludo-layout">
                        <div class="ludo-panel">
                            <h3>JUNCTION LUDO</h3>
                            <p class="game-instructions-text">Race your Red Token (🔴) around the Bandra track into the center Junction Terminal! Green (🟢) is the AI opponent. Land on the AI token to knock them back to start!</p>
                            <div class="ludo-board-controls">
                                <button class="dice-roll-btn" id="diceBtn" onclick="rollLudoDice()">🎲 ROLL DICE</button>
                                <div class="dice-result" id="diceResult">1</div>
                            </div>
                            <div class="ludo-status-panel">
                                <div class="arcade-score-item"><span>YOUR STEP:</span> <strong id="playerPos">0 / 20</strong></div>
                                <div class="arcade-score-item"><span>AI STEP:</span> <strong id="aiPos">0 / 20</strong></div>
                            </div>
                            <div id="ludoLog" class="ludo-log">Your turn! Click roll dice!</div>
                        </div>
                        <div class="ludo-board-wrapper">
                            <div class="ludo-visual-board" id="ludoVisualBoard"></div>
                        </div>
                    </div>
                `;
                startBandraJunctionLudo();
            }
        }

        // ============================================================
        // MULTIPLAYER LOBBY NETWORK & LIVE MICROPHONE COMMS ENGINE
        // ============================================================
        let micAudioContext = null;
        let micAnalyser = null;
        let micStream = null;
        let micAnimationId = null;
        let isMicConnected = false;

        async function toggleMultiplayerVoiceMic() {
            const micBtn = document.getElementById("voiceMicBtn");
            const statusLabel = document.getElementById("micStatusLabel");
            const bars = document.querySelectorAll("#lobbyVisualizer .visualizer-bar");

            if (!micBtn || !statusLabel) return;

            if (isMicConnected) {
                // Disconnect mic
                isMicConnected = false;
                if (micStream) {
                    micStream.getTracks().forEach(track => track.stop());
                    micStream = null;
                }
                if (micAudioContext) {
                    micAudioContext.close();
                    micAudioContext = null;
                }
                if (micAnimationId) {
                    cancelAnimationFrame(micAnimationId);
                    micAnimationId = null;
                }
                
                micBtn.classList.remove("connected");
                micBtn.innerHTML = "🎤 CONNECT MICROPHONE";
                statusLabel.innerText = "MIC OFF";
                
                // Reset bar heights
                bars.forEach(b => {
                    b.style.height = "10%";
                    b.style.background = "var(--cyan)";
                });
                return;
            }

            try {
                // Request real browser microphone stream
                micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                // Initialize Web Audio API
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                micAudioContext = new AudioContextClass();
                micAnalyser = micAudioContext.createAnalyser();
                micAnalyser.fftSize = 32; // small size for 12 bars representation
                
                const source = micAudioContext.createMediaStreamSource(micStream);
                source.connect(micAnalyser);
                
                isMicConnected = true;
                micBtn.classList.add("connected");
                micBtn.innerHTML = "🔴 MIC LIVE // VOICE CONNECTED";
                statusLabel.innerText = "LIVE VOICE";

                // Play a micro confirmation chirp sound!
                if (typeof playBeepSound === "function") {
                    playBeepSound(600, 0.05);
                    setTimeout(() => playBeepSound(900, 0.08), 60);
                }

                // Render dynamic audio analyzer waveform
                const bufferLength = micAnalyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                function drawMicWaveform() {
                    if (!isMicConnected) return;
                    micAnimationId = requestAnimationFrame(drawMicWaveform);
                    
                    micAnalyser.getByteFrequencyData(dataArray);
                    
                    bars.forEach((bar, index) => {
                        // Map frequency magnitude (0-255) to a clean percentage (10% to 100%)
                        const val = dataArray[index % bufferLength];
                        const heightPercent = Math.min(100, Math.max(10, (val / 255) * 140));
                        bar.style.height = `${heightPercent}%`;
                        
                        // Shift color representation based on frequency intensity
                        if (heightPercent > 75) {
                            bar.style.background = "var(--pink)";
                        } else if (heightPercent > 45) {
                            bar.style.background = "var(--yellow)";
                        } else {
                            bar.style.background = "var(--cyan)";
                        }
                    });
                }
                drawMicWaveform();
                
            } catch (err) {
                console.warn("Microphone access declined or unavailable. Falling back to active mock animation.", err);
                // Fallback: active simulated noise oscillation
                isMicConnected = true;
                micBtn.classList.add("connected");
                micBtn.innerHTML = "🔴 MOCK MIC // COMM ACTIVE";
                statusLabel.innerText = "SIMULATED COMM";

                if (typeof playBeepSound === "function") {
                    playBeepSound(400, 0.1);
                }

                let time = 0;
                function drawMockWave() {
                    if (!isMicConnected) return;
                    micAnimationId = requestAnimationFrame(drawMockWave);
                    time += 0.2;
                    bars.forEach((bar, index) => {
                        const wave = Math.sin(time + index * 0.5) * 40 + 50;
                        bar.style.height = `${wave}%`;
                        bar.style.background = wave > 75 ? "var(--pink)" : (wave > 45 ? "var(--yellow)" : "var(--cyan)");
                    });
                }
                drawMockWave();
            }
        }

        function sendLobbyChatMessage() {
            const input = document.getElementById("lobbyChatInput");
            if (!input) return;
            const text = input.value.trim();
            if (text === "") return;

            const chatFeed = document.getElementById("lobbyChatFeed");
            if (!chatFeed) return;

            // Append User Chat Line
            const userLine = document.createElement("div");
            userLine.className = "chat-line";
            userLine.innerHTML = `<span class="chat-user" style="color: var(--pink);">You (BandraHustler):</span> <span class="chat-text">${escapeHtml(text)}</span>`;
            chatFeed.appendChild(userLine);

            // Clear & scroll
            input.value = "";
            chatFeed.scrollTop = chatFeed.scrollHeight;

            if (typeof playBeepSound === "function") {
                playBeepSound(800, 0.05);
            }

            // Interactive Bot responses based on keywords or random fun
            setTimeout(() => {
                simulateLobbyResponse(text);
            }, 1200);
        }

        function handleLobbyChatKey(event) {
            if (event.key === "Enter") {
                sendLobbyChatMessage();
            }
        }

        const simReplies = [
            { user: "Rhea_Chapel", color: "var(--cyan)", msg: "Ayy, that's what I'm talking about! 🍕 Let's race next!" },
            { user: "Kabir_Skatz", color: "var(--yellow)", msg: "Legit! Let me load up Carter Chess first, I'm gonna beat that bot." },
            { user: "Rhea_Chapel", color: "var(--cyan)", msg: "Who's up for some Ludo at the Terminal? I bet 5 Chai points!" },
            { user: "Kabir_Skatz", color: "var(--yellow)", msg: "Nice! Let's conquer the Sea Link track!" }
        ];

        function simulateLobbyResponse(userMsg) {
            const chatFeed = document.getElementById("lobbyChatFeed");
            if (!chatFeed) return;

            const normalized = userMsg.toLowerCase();
            let chosen = simReplies[Math.floor(Math.random() * simReplies.length)];

            if (normalized.includes("chess") || normalized.includes("play")) {
                chosen = { user: "Rhea_Chapel", color: "var(--cyan)", msg: "Chess is amazing! Let's see if you can outplay the AI!" };
            } else if (normalized.includes("snake") || normalized.includes("score")) {
                chosen = { user: "Kabir_Skatz", color: "var(--yellow)", msg: "Train Snake highscore is 12. Try to top it! 🚂" };
            } else if (normalized.includes("hello") || normalized.includes("hey") || normalized.includes("hi")) {
                chosen = { user: "Rhea_Chapel", color: "var(--cyan)", msg: "Yo! Welcome to the hub! What are we playing today?" };
            }

            // Pulse the mic indicator of the talking friend
            const friendId = chosen.user === "Kabir_Skatz" ? "friend-mic-1" : "friend-mic-2";
            const indicator = document.getElementById(friendId);
            if (indicator) {
                indicator.classList.add("talking");
                setTimeout(() => {
                    indicator.classList.remove("talking");
                }, 1800);
            }

            const responseLine = document.createElement("div");
            responseLine.className = "chat-line";
            responseLine.innerHTML = `<span class="chat-user" style="color: ${chosen.color};">${chosen.user}:</span> <span class="chat-text">${chosen.msg}</span>`;
            chatFeed.appendChild(responseLine);
            chatFeed.scrollTop = chatFeed.scrollHeight;

            if (typeof playBeepSound === "function") {
                playBeepSound(450, 0.05);
            }
        }

        // Periodic simulated background chatter
        setInterval(() => {
            const chatFeed = document.getElementById("lobbyChatFeed");
            // Only chat if games panel is active and visible
            const gamesPanel = document.getElementById("panel-games");
            if (!gamesPanel || gamesPanel.style.display === "none") return;

            const chatInput = document.getElementById("lobbyChatInput");
            if (!chatInput) return; // Verify elements exist

            const chatter = [
                { user: "Kabir_Skatz", color: "var(--yellow)", micId: "friend-mic-1", msg: "Bandra junction is packed. Good time to hack on webtoons!" },
                { user: "Rhea_Chapel", color: "var(--cyan)", micId: "friend-mic-2", msg: "Just checked out the Kids Coding Playground. It's sick! ⚡" },
                { user: "Kabir_Skatz", color: "var(--yellow)", micId: "friend-mic-1", msg: "I got a 20% discount coupon from Bandstand Tapri! Sipping hot cutting chai right now." }
            ];

            const chosen = chatter[Math.floor(Math.random() * chatter.length)];
            
            const indicator = document.getElementById(chosen.micId);
            if (indicator) {
                indicator.classList.add("talking");
                setTimeout(() => {
                    indicator.classList.remove("talking");
                }, 2000);
            }

            const line = document.createElement("div");
            line.className = "chat-line";
            line.innerHTML = `<span class="chat-user" style="color: ${chosen.color};">${chosen.user}:</span> <span class="chat-text">${chosen.msg}</span>`;
            chatFeed.appendChild(line);
            chatFeed.scrollTop = chatFeed.scrollHeight;
        }, 15000);

        function escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }

        // Wire window variables
        window.toggleMultiplayerVoiceMic = toggleMultiplayerVoiceMic;
        window.sendLobbyChatMessage = sendLobbyChatMessage;
        window.handleLobbyChatKey = handleLobbyChatKey;

        // ============================================================
        // GAME 1: LOCAL TRAIN SNAKE IMPLEMENTATION
        // ============================================================
