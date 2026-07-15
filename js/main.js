        // Cooldown and visitation checks
        function shouldPlayIntro() {
            const seenAt = localStorage.getItem(STORAGE_KEY);
            if (!seenAt) return true;
            return (Date.now() - parseInt(seenAt, 10)) > INTRO_COOLDOWN_MS;
        }

        function persistVisit() {
            localStorage.setItem(STORAGE_KEY, Date.now().toString());
        }

        // ============================================================
        // LO-FI SYNTHESIZED STREET SOUNDS SYSTEM
        // ============================================================


        function populateBandraTraffic() {
            const taxiLane = document.getElementById("taxiLane");
            const rickshawLane = document.getElementById("rickshawLane");

            function spawnCar(lane, emoji, speed, delay, reverse = false) {
                const item = document.createElement("div");
                item.className = "vehicle";
                item.textContent = emoji;
                item.style.animationDelay = `${delay}s`;
                item.style.animationDuration = `${speed}s`;

                if (reverse) {
                    item.style.right = "-80px";
                    item.style.animationName = "driveLeft";
                } else {
                    item.style.left = "-80px";
                    item.style.animationName = "driveRight";
                }
                lane.appendChild(item);
            }

            const frameStyles = document.createElement("style");
            frameStyles.textContent = `
                @keyframes driveRight {
                    0% { left: -80px; }
                    100% { left: 110vw; }
                }
                @keyframes driveLeft {
                    0% { right: -80px; transform: scaleX(-1); }
                    100% { right: 110vw; transform: scaleX(-1); }
                }
            `;
            document.head.appendChild(frameStyles);

            spawnCar(taxiLane, "🚕", 11, 3.2);
            spawnCar(taxiLane, "🚴", 19, 5.2);
            spawnCar(rickshawLane, "🛺", 9, 3.6, true);
        }


        // ============================================================
        // HIGH-FIDELITY GPU-FRIENDLY PARTICLES SYSTEM
        // ============================================================
        class Spark {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3.5 + 1.5;
                this.vX = (Math.random() - 0.5) * 12;
                this.vY = (Math.random() - 0.5) * 12;
                this.color = color;
                this.opacity = 1;
                this.decay = Math.random() * 0.015 + 0.008;
            }
            update() {
                this.x += this.vX;
                this.y += this.vY;
                this.vY += 0.08; // light gravity
                this.opacity -= this.decay;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }



        // ============================================================
        // HOMEPAGE DURABLE PORTALS ENGINE
        // ============================================================
        const DIORAMAS = {
            ludo: [
                // 1. LEFT DIORAMA: Tiny suburban road with running wooden pawn
                `<svg viewBox="0 0 240 240">
                    <defs>
                        <linearGradient id="ludoGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2ecc71"/><stop offset="100%" stop-color="#27ae60"/></linearGradient>
                        <linearGradient id="ludoAsphalt" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#34495e"/><stop offset="100%" stop-color="#2c3e50"/></linearGradient>
                        <radialGradient id="pawnWood" cx="40%" cy="30%" r="70%"><stop offset="0%" stop-color="#f39c12"/><stop offset="100%" stop-color="#d35400"/></radialGradient>
                    </defs>
                    <polygon points="120,40 210,85 120,130 30,85" fill="url(#ludoGrass)" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.5))"/>
                    <polygon points="30,85 120,130 120,150 30,105" fill="#1e7e34"/>
                    <polygon points="120,130 210,85 210,105 120,150" fill="#196f2e"/>
                    <polygon points="60,100 120,70 180,100 120,130" fill="url(#ludoAsphalt)"/>
                    <line x1="120" y1="70" x2="120" y2="130" stroke="#f1c40f" stroke-width="3" stroke-dasharray="6 4"/>
                    <polygon points="160,95 165,80 170,95" fill="#e67e22"/><ellipse cx="165" cy="95" rx="8" ry="3" fill="#d35400"/>
                    <ellipse cx="105" cy="112" rx="16" ry="6" fill="#000" opacity="0.4"/>
                    <path d="M95 105 Q90 108 105 110 Q120 108 115 105 L110 82 Q115 72 105 72 Q95 72 100 82 Z" fill="url(#pawnWood)"/>
                    <circle cx="105" cy="64" r="10" fill="url(#pawnWood)"/>
                </svg>`,
                // 2. TOP-RIGHT DIORAMA: Magical dice shrine sitting on a glowing tile
                `<svg viewBox="0 0 240 240">
                    <defs>
                        <linearGradient id="tileGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9b59b6"/><stop offset="100%" stop-color="#8e44ad"/></linearGradient>
                        <radialGradient id="diceCore" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#00ffff"/><stop offset="60%" stop-color="#2980b9"/><stop offset="100%" stop-color="#2c3e50"/></radialGradient>
                    </defs>
                    <polygon points="120,50 200,90 120,130 40,90" fill="url(#tileGlow)" filter="drop-shadow(0 25px 30px rgba(142,68,173,0.4))"/>
                    <polygon points="40,90 120,130 120,148 40,108" fill="#6d3284"/>
                    <polygon points="120,130 200,90 200,108 120,148" fill="#5b2770"/>
                    <ellipse cx="120" cy="90" rx="55" ry="25" fill="none" stroke="#00ffff" stroke-width="3" opacity="0.7" filter="drop-shadow(0 0 8px #00ffff)"/>
                    <g transform="translate(0, -12)">
                        <rect x="85" y="55" width="70" height="70" rx="18" fill="url(#diceCore)" stroke="#fff" stroke-width="2.5" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.4))"/>
                        <circle cx="102" cy="72" r="7" fill="#fff" filter="drop-shadow(0 0 6px #00ffff)"/>
                        <circle cx="138" cy="72" r="7" fill="#fff" filter="drop-shadow(0 0 6px #00ffff)"/>
                        <circle cx="102" cy="108" r="7" fill="#fff"/>
                        <circle cx="138" cy="108" r="7" fill="#fff"/>
                        <circle cx="120" cy="90" r="10" fill="#e74c3c" stroke="#fff" stroke-width="1.5"/>
                    </g>
                </svg>`,
                // 3. BOTTOM-RIGHT DIORAMA: Miniature finish line platform with golden six burst
                `<svg viewBox="0 0 240 240">
                    <defs>
                        <linearGradient id="goldBase" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f1c40f"/><stop offset="100%" stop-color="#f39c12"/></linearGradient>
                        <linearGradient id="floorPlank" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e67e22"/><stop offset="100%" stop-color="#d35400"/></linearGradient>
                    </defs>
                    <polygon points="120,40 210,85 120,130 30,85" fill="url(#floorPlank)"/>
                    <polygon points="30,85 120,130 120,145 30,100" fill="#b34700"/>
                    <polygon points="120,130 210,85 210,100 120,145" fill="#993d00"/>
                    <g filter="drop-shadow(0 0 15px #f1c40f)">
                        <circle cx="120" cy="75" r="26" fill="url(#goldBase)" stroke="#fff" stroke-width="2"/>
                        <text x="120" y="85" font-family="'Anton', sans-serif" font-size="32" fill="#fff" text-anchor="middle">6</text>
                    </g>
                </svg>`
            ],
            catan: [
                `<svg viewBox="0 0 240 240">
                    <polygon points="120,35 195,75 195,145 120,185 45,145 45,75" fill="#f39c12" stroke="#fff" stroke-width="1.5" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.5))"/>
                    <rect x="108" y="75" width="24" height="50" fill="#d35400" rx="3"/>
                    <polygon points="100,75 120,55 140,75" fill="#c0392b"/>
                    <line x1="90" y1="85" x2="150" y2="85" stroke="#fff" stroke-width="2.5"/>
                    <line x1="120" y1="55" x2="120" y2="115" stroke="#fff" stroke-width="2.5"/>
                </svg>`,
                `<svg viewBox="0 0 240 240">
                    <polygon points="120,35 195,75 195,145 120,185 45,145 45,75" fill="#7f8c8d"/>
                    <polygon points="120,50 170,140 70,140" fill="#95a5a6"/>
                    <polygon points="120,70 140,110 120,135 100,110" fill="#9b59b6" stroke="#fff" stroke-width="1"/>
                </svg>`,
                `<svg viewBox="0 0 240 240">
                    <polygon points="120,35 195,75 195,145 120,185 45,145 45,75" fill="#2980b9"/>
                    <rect x="150" y="70" width="16" height="60" fill="#eceff1"/>
                    <path d="M65,120 L105,120 L115,105 L55,105 Z" fill="#8d6e63"/>
                </svg>`
            ],
            sandbox: [
                `<svg viewBox="0 0 240 240">
                    <rect x="45" y="75" width="150" height="75" fill="#27ae60" rx="8" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.5))"/>
                    <rect x="45" y="110" width="150" height="40" fill="#7d5c42" rx="4"/>
                    <rect x="95" y="45" width="50" height="50" fill="#2ecc71" rx="6"/>
                </svg>`,
                `<svg viewBox="0 0 240 240">
                    <rect x="50" y="50" width="140" height="140" rx="20" fill="#2d3436" stroke="#636e72" stroke-width="4"/>
                    <rect x="80" y="80" width="30" height="30" fill="#00ffcc" filter="drop-shadow(0 0 12px #00ffcc)"/>
                </svg>`,
                `<svg viewBox="0 0 240 240">
                    <rect x="55" y="45" width="130" height="150" rx="12" fill="#1e272e" stroke="#00d2d3" stroke-width="6" filter="drop-shadow(0 0 20px #00d2d3)"/>
                    <circle cx="120" cy="120" r="45" fill="none" stroke="#a55eea" stroke-width="3"/>
                </svg>`
            ],
            guide: [
                `<svg viewBox="0 0 240 240">
                    <polygon points="120,40 210,85 120,130 30,85" fill="#2c3e50" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.6))"/>
                    <rect x="60" y="55" width="120" height="40" fill="#e74c3c" rx="4"/>
                </svg>`,
                `<svg viewBox="0 0 240 240">
                    <rect x="50" y="50" width="140" height="130" rx="22" fill="#f1c40f" stroke="#fff" stroke-width="3" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.7))"/>
                </svg>`,
                `<svg viewBox="0 0 240 240">
                    <ellipse cx="120" cy="160" rx="60" ry="18" fill="#34495e"/>
                    <rect x="85" y="95" width="70" height="44" rx="6" fill="#e74c3c" stroke="#fff" stroke-width="1.5" transform="rotate(-15 120 117)"/>
                </svg>`
            ]
        };

        const DATA = [
            {
                name: "WEBTOON WORLD",
                game: "webtoons",
                title: "READ",
                type: "DIGITAL COMICS UNIVERSE",
                desc: "Dive into trending webtoons, manga, indie comics and original graphic stories. Explore new episodes, discover creators and experience immersive storytelling from around the world.",
                src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
                bg: "#0D4F2C",
                ring1: "#00ff66",
                ring2: "#ffaa00",
                vendor: "TRENDING SERIES",
                deal: "NEW CHAPTERS EVERY WEEK",
                stickKey: "ludo"
            },
            {
                name: "RETRO ARCADE",
                game: "games",
                title: "PLAY",
                type: "CLASSIC GAMES COLLECTION",
                desc: "Relive the golden age of gaming with Snake, Chess, Pac-Man, Sudoku, Road Rage and Ludo. Instant browser gameplay with zero downloads and pure nostalgia.",
                src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
                bg: "#8A251A",
                ring1: "#FF0055",
                ring2: "#00F0FF",
                vendor: "6 PLAYABLE GAMES",
                deal: "NO DOWNLOADS • PLAY INSTANTLY",
                stickKey: "catan"
            },
            {
                name: "BANDRA DEALS",
                game: "deals",
                title: "SAVE",
                type: "LOCAL OFFERS MARKETPLACE",
                desc: "Unlock exclusive food offers, shopping discounts, hidden café specials and premium local deals from businesses across Bandra.",
                src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
                bg: "#581B82",
                ring1: "#FFFF00",
                ring2: "#FF00FF",
                vendor: "LOCAL BUSINESSES",
                deal: "FRESH DEALS UPDATED DAILY",
                stickKey: "sandbox"
            },
            {
                name: "KIDS CODING PLAYGROUND",
                game: "docs",
                title: "CODE",
                type: "LEARN & BUILD MINI-WEBAPPS",
                desc: "Structure neon HTML interfaces, build interactive JS synthesizers, and launch playable cutting-chai clicker games. Preview instantly and publish to our creative showcase collage!",
                src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
                bg: "#06040a",
                ring1: "#00FF66",
                ring2: "#00E5FF",
                vendor: "3 LEARNING TRACKS",
                deal: "INTERACTIVE CODE SANDBOX & COLLAGE GALLERY",
                stickKey: "guide"
            }
        ];

        let activeIndex = 0;
        let isAnimating = false;
        const root = document.getElementById('app-root');
        const stage = document.getElementById('stage');
        const stickerLayer = document.getElementById('sticker-layer');

        function initHomepage() {
            stage.innerHTML = '';
            DATA.forEach((item, idx) => {
                const div = document.createElement('div');
                div.className = 'character-wrapper'; 
                div.id = `char-${idx}`;
                div.innerHTML = `<img src="${item.src}" alt="Hero ${item.name}" draggable="false">`;
                stage.appendChild(div);
            });
            updateHomepageScene();
        }

        function updateHomepageScene() {
            const current = DATA[activeIndex];
            root.style.setProperty('--bg-current', current.bg);
            root.style.setProperty('--ring-1', current.ring1);
            root.style.setProperty('--ring-2', current.ring2);
            document.getElementById('ghost-title').innerText = current.title;
            document.getElementById('char-name').innerText = current.name;
            document.getElementById('char-desc').innerText = current.desc;
            document.getElementById('meta-type').innerText = current.type;
            document.getElementById('deal-vendor').innerText = current.vendor;
            document.getElementById('deal-text').innerText = current.deal;

            DATA.forEach((_, idx) => {
                const node = document.getElementById(`char-${idx}`);
                node.className = 'character-wrapper';
                if (idx === activeIndex) node.classList.add('role-center');
                else if (idx === (activeIndex + DATA.length - 1) % DATA.length) node.classList.add('role-left');
                else if (idx === (activeIndex + 1) % DATA.length) node.classList.add('role-right');
                else node.classList.add('role-back');
            });

            renderAAADioramaPods(current.stickKey);
        }

        function renderAAADioramaPods(key) {
            stickerLayer.innerHTML = '';
            const models = DIORAMAS[key] || DIORAMAS.ludo;
            
            const layouts = [
                { left: 8, top: 22, profile: 'd-orbit-left', depth: -180 },
                { left: 74, top: 14, profile: 'd-orbit-topright', depth: -120 },
                { left: 76, top: 48, profile: 'd-orbit-bottomright', depth: -60 }
            ];

            models.forEach((svgMarkup, i) => {
                if(i >= layouts.length) return;
                const config = layouts[i];
                
                const frame = document.createElement('div');
                frame.className = 'aaa-diorama-card';
                frame.innerHTML = svgMarkup;

                frame.style.left = `${config.left}%`;
                frame.style.top = `${config.top}%`;
                frame.style.transform = `translateZ(${config.depth - 200}px) scale(0.6)`;
                frame.style.opacity = '0';
                frame.style.animation = `${config.profile} ${5 + (i * 1.5)}s infinite alternate ease-in-out`;

                stickerLayer.appendChild(frame);

                setTimeout(() => {
                    frame.style.transform = `translateZ(${config.depth}px) scale(1.15)`;
                    frame.style.opacity = '1';
                }, 60 + (i * 80));
            });
        }

        function navigate(dir) {
            if (isAnimating) return;
            isAnimating = true;
            activeIndex = dir === 'next' ? (activeIndex + 1) % DATA.length : (activeIndex + DATA.length - 1) % DATA.length;
            updateHomepageScene();
            setTimeout(() => { isAnimating = false; }, 900);
        }

        // ============================================================
        // AAA IMMERSIVE CONSOLE MODALS LOGIC
        // ============================================================
        function openSystemModal() {
            const systemModal = document.getElementById("systemModal");
            systemModal.style.display = "flex";
            document.body.style.overflow = "hidden";

            // Map slide indexes to respective modal panels
            let initialPanel = "webtoons";
            if (activeIndex === 1) initialPanel = "games";
            else if (activeIndex === 2) initialPanel = "deals";
            else if (activeIndex === 3) initialPanel = "learning";

            switchModalPanel(initialPanel);
        }

        function closeSystemModal() {
            document.getElementById("systemModal").style.display = "none";
            document.body.style.overflow = "auto";
            
            // Stop any active game loops if open
            if (typeof cleanupActiveArcadeGame === "function") {
                cleanupActiveArcadeGame();
            }
        }

        function setModalBackBtnVisibility(visible, text = "◀ BACK") {
            const backBtn = document.getElementById("modalSectionBackBtn");
            const closeBtn = document.querySelector(".modal-close-btn");
            if (backBtn) {
                backBtn.style.display = visible ? "flex" : "none";
                backBtn.innerHTML = `<span>${text}</span>`;
            }
            if (closeBtn) {
                closeBtn.style.display = visible ? "none" : "flex";
            }
        }
        window.setModalBackBtnVisibility = setModalBackBtnVisibility;

        function switchModalPanel(panelType) {
            // Stop any active game loops if leaving games panel
            if (typeof cleanupActiveArcadeGame === "function") {
                cleanupActiveArcadeGame();
            }

            // Hide all panels first
            document.getElementById("panel-webtoons").style.display = "none";
            document.getElementById("panel-games").style.display = "none";
            document.getElementById("panel-deals").style.display = "none";
            document.getElementById("panel-docs").style.display = "none";

            // Remove active classes from all header tab links
            const tabs = document.querySelectorAll(".modal-nav-tab");
            tabs.forEach(t => t.classList.remove("active"));

            // When switching tabs, we reset back button to false (landing view of tab active)
            setModalBackBtnVisibility(false);

            // Dynamically adjust modal container backdrop theme
            const mainModalContainer = document.getElementById("mainModalContainer");
            if (mainModalContainer) {
                mainModalContainer.classList.remove("theme-webtoons", "theme-games", "theme-deals", "theme-learning");
                mainModalContainer.classList.add("theme-" + panelType);
            }

            const categoryMeta = document.getElementById("modalMetaCategory");
            
            if (panelType === 'webtoons') {
                document.getElementById("panel-webtoons").style.display = "block";
                const tab = document.getElementById("modal-tab-webtoons");
                if (tab) tab.classList.add("active");
                categoryMeta.innerText = "DIGITAL COMICS UNIVERSE";
                if (typeof backToShelf === "function") backToShelf();
            } else if (panelType === 'games') {
                document.getElementById("panel-games").style.display = "block";
                const tab = document.getElementById("modal-tab-games");
                if (tab) tab.classList.add("active");
                categoryMeta.innerText = "RETRO ARCADE CABINET";
                if (typeof initArcadeEcosystem === "function") initArcadeEcosystem();
            } else if (panelType === 'deals') {
                document.getElementById("panel-deals").style.display = "block";
                const tab = document.getElementById("modal-tab-deals");
                if (tab) tab.classList.add("active");
                categoryMeta.innerText = "LOCAL HUSTLE DEALS";
                const claimBox = document.getElementById("voucherClaimBox");
                if (claimBox) claimBox.style.display = "none";
            } else if (panelType === 'learning') {
                document.getElementById("panel-docs").style.display = "block";
                const tab = document.getElementById("modal-tab-learning");
                if (tab) tab.classList.add("active");
                categoryMeta.innerText = "KIDS CODING PLAYGROUND";
                
                // Trigger playground loading logic in learning.js!
                if (typeof initLearningPlayground === "function") {
                    initLearningPlayground();
                }
            }
        }

        function goBackToSectionHome() {
            const webtoonsPanel = document.getElementById("panel-webtoons");
            const gamesPanel = document.getElementById("panel-games");
            const dealsPanel = document.getElementById("panel-deals");
            const docsPanel = document.getElementById("panel-docs");

            if (gamesPanel && gamesPanel.style.display !== "none") {
                if (typeof backToGameSelector === "function") {
                    backToGameSelector();
                }
            } else if (webtoonsPanel && webtoonsPanel.style.display !== "none") {
                if (typeof backToShelf === "function") {
                    backToShelf();
                }
            } else if (dealsPanel && dealsPanel.style.display !== "none") {
                const claimBox = document.getElementById("voucherClaimBox");
                if (claimBox) claimBox.style.display = "none";
            } else if (docsPanel && docsPanel.style.display !== "none") {
                if (typeof initLearningPlayground === "function") {
                    initLearningPlayground();
                }
            }
        }
        window.goBackToSectionHome = goBackToSectionHome;

        function launchGame(e) {
            e.preventDefault();
            openSystemModal();
        }

        // ============================================================
        // BUY ME A COFFEE (CHAI) SUPPORT OVERLAY LOGIC
        // ============================================================
        function openCoffeeModal() {
            const modal = document.getElementById("coffeeSupportModal");
            if (modal) {
                modal.style.display = "flex";
                document.body.style.overflow = "hidden";
            }
            if (typeof playBeepSound === "function") {
                playBeepSound(400, 0.1);
            }
        }

        function closeCoffeeModal() {
            const modal = document.getElementById("coffeeSupportModal");
            if (modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
            if (typeof playBeepSound === "function") {
                playBeepSound(300, 0.08);
            }
        }

        function selectCoffeeTier(amount, cardElement) {
            const cards = document.querySelectorAll(".coffee-tier-card");
            cards.forEach(c => c.classList.remove("active"));
            if (cardElement) {
                cardElement.classList.add("active");
            }
            const upiInput = document.getElementById("coffeeUpiAddress");
            if (upiInput) {
                upiInput.value = `bandrahustlers.pay${amount}@upi`;
            }
            if (typeof playBeepSound === "function") {
                playBeepSound(amount * 2.5 + 500, 0.12);
            }
        }

        function copyUpiAddress() {
            const upiInput = document.getElementById("coffeeUpiAddress");
            if (upiInput) {
                upiInput.select();
                navigator.clipboard.writeText(upiInput.value).then(() => {
                    const btn = document.querySelector(".copy-upi-btn");
                    if (btn) {
                        const originalText = btn.innerText;
                        btn.innerText = "COPIED!";
                        btn.style.background = "var(--neon-glow)";
                        btn.style.color = "#000";
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.background = "";
                            btn.style.color = "";
                        }, 1200);
                    }
                });
            }
        }

        // Expose to window scope for HTML bindings
        window.switchModalPanel = switchModalPanel;
        window.openCoffeeModal = openCoffeeModal;
        window.closeCoffeeModal = closeCoffeeModal;
        window.selectCoffeeTier = selectCoffeeTier;
        window.copyUpiAddress = copyUpiAddress;

        // --- A. Comic System ---


        // ============================================================
        // CHAI TAP WALLET ENGINE & COGNITIVE HUD HANDLERS
        // ============================================================
        function updateChaiPointsUI() {
            const valEl = document.getElementById("chaiPointsVal");
            if (valEl) {
                valEl.innerText = chaiPoints;
            }
            // Increment Level dynamically based on points
            const levelText = document.querySelector(".hud-glitch-text");
            const badgeTag = document.querySelector(".hud-badge-tag");
            if (levelText && badgeTag) {
                let lvl = 4;
                let tag = "STREET REGULAR";
                if (chaiPoints >= 1000) {
                    lvl = 7;
                    tag = "BANDRA SHAH (LEGEND)";
                } else if (chaiPoints >= 500) {
                    lvl = 6;
                    tag = "PALI HILL DUKE";
                } else if (chaiPoints >= 250) {
                    lvl = 5;
                    tag = "LOCAL LEADER";
                }
                levelText.innerText = `HUSTLER LEVEL ${lvl}`;
                badgeTag.innerText = tag;
            }
        }

        function tapChaiCup() {
            // Add points
            chaiPoints += 5;
            localStorage.setItem("bandra_hustlers_chai_points", chaiPoints.toString());
            updateChaiPointsUI();
            
            // Play procedural synth tap sound
            if (typeof playBeepSound === "function") {
                playBeepSound(600 + Math.random() * 400, 0.08);
            }
            
            // Create a gorgeous floating pop "+5 PTS" element
            const container = document.querySelector(".chai-container");
            if (container) {
                const floater = document.createElement("div");
                floater.innerText = "+5";
                floater.style.position = "absolute";
                floater.style.color = "var(--yellow)";
                floater.style.fontWeight = "900";
                floater.style.fontSize = "14px";
                floater.style.fontFamily = "'Inter', sans-serif";
                floater.style.pointerEvents = "none";
                floater.style.textShadow = "0 0 5px var(--yellow)";
                floater.style.zIndex = "2000";
                
                // Position randomly around the clicked cup
                const rect = container.getBoundingClientRect();
                floater.style.right = "10px";
                floater.style.top = "-5px";
                floater.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
                
                container.appendChild(floater);
                
                // Force layout reflow then trigger transition
                setTimeout(() => {
                    floater.style.transform = "translateY(-40px) scale(1.3)";
                    floater.style.opacity = "0";
                }, 10);
                
                // Cleanup after animation
                setTimeout(() => {
                    floater.remove();
                }, 800);
            }
        }
        
        // Expose to window context
        window.tapChaiCup = tapChaiCup;
        window.updateChaiPointsUI = updateChaiPointsUI;

        // ============================================================
        // INITIALIZATION AND REPLAY TRIGGERS
        // ============================================================
        window.addEventListener("DOMContentLoaded", () => {
            initHomepage();
            renderShelfComics(); // Render the 24 gorgeous comic books on start!
            updateChaiPointsUI(); // Render the Chai Points on HUD!

            const skipsHeavyAnimations = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (skipsHeavyAnimations) {
                // If user requested to skip heavy graphics in OS settings
                if (introEl) introEl.remove();
                homepageEl.classList.add("reveal");
                document.body.style.overflow = "auto";
                setTimeout(() => {
                    triggerProceduralLofiStreetBeat();
                }, 300);
            } else {
                // Always run the complete immersive intro on reload/first visit!
                runParticleLoop();
                runCinematicTimeline();
            }
        });

        // Replay Cinematic Intro trigger action
        replayIntroBtn.addEventListener("click", () => {
            // Force reset seen state in memory so it doesn't bypass on load
            localStorage.removeItem(STORAGE_KEY);
            // Refresh screen to cleanly trigger the intro timelines from frame 0
            window.location.reload();
        });
