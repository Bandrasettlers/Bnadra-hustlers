        const SHELF_COMICS_DATA = [
            { id: 'pali_hill', title: 'PALI HILL RIVALS', author: 'By Kabir & Rhea', genre: 'action', rating: 4.9, emoji: '🛹', gradient: 'linear-gradient(135deg, #ff008c, #7f3dff)', desc: 'Bandra skaters duel in the steep lanes of Pali Hill for street territory.', status: 'CHAPTER 4' },
            { id: 'carter_road', title: 'CARTER ROAD DRIFTERS', author: 'By Aryan Patel', genre: 'action', rating: 4.8, emoji: '🛺', gradient: 'linear-gradient(135deg, #00e5ff, #050508)', desc: 'Two rickshaws side-by-side in a race along the ocean-front Bandra promenade.', status: 'CHAPTER 3' },
            { id: 'mumbai_hustle', title: 'MUMBAI LOCAL HEROES', author: 'By Dev Sen', genre: 'action', rating: 4.7, emoji: '🚄', gradient: 'linear-gradient(135deg, #ff8c00, #ff0055)', desc: 'Commuters with cybernetic enhancements race to catch the 8:15 fast local.', status: 'CHAPTER 5' },
            { id: 'bandra_bites', title: 'BANDRA BITES', author: 'By Chef Sanjana', genre: 'romance', rating: 4.6, emoji: '🍔', gradient: 'linear-gradient(135deg, #ffcc00, #ff0055)', desc: 'A street food romantic culinary battle between buttered bun-maska and spicy vada pav.', status: 'COMPLETED' },
            { id: 'chapel_tags', title: 'CHAPEL ROAD GRAFFITI', author: 'By GraffitiGuru', genre: 'action', rating: 4.9, emoji: '🎨', gradient: 'linear-gradient(135deg, #7f3dff, #00e5ff)', desc: 'An underground tagger paints the city walls, triggering a cat-and-mouse chase with cyber-police.', status: 'CHAPTER 2' },
            { id: 'carter_coffee', title: 'CARTER CAFE CHRONICLES', author: 'By Alisha M.', genre: 'romance', rating: 4.5, emoji: '☕', gradient: 'linear-gradient(135deg, #d4af37, #8b5a2b)', desc: 'Lofi conversations and stolen glances at Bandra’s trendiest open-air espresso joints.', status: 'NEW' },
            { id: 'byculla_detective', title: 'THE BANDRA DETECTIVE', author: 'By Vikram Roy', genre: 'thriller', rating: 4.8, emoji: '🕵️', gradient: 'linear-gradient(135deg, #3a3a3a, #1a1a1a)', desc: 'A vintage investigator tracks high-tech cyber-criminals using ancient street clues.', status: 'CHAPTER 6' },
            { id: 'monsoon_melody', title: 'MONSOON MEETS', author: 'By Shruti Kapoor', genre: 'romance', rating: 4.7, emoji: '☔', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', desc: 'Two strangers share a broken umbrella on the steps of Mt. Mary Church during a storm.', status: 'COMPLETED' },
            { id: 'bandstand_sunset', title: 'BANDSTAND SERENADE', author: 'By Rohan Roy', genre: 'romance', rating: 4.8, emoji: '🎸', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', desc: 'A struggling busker plays neon riffs as the sunset reflects over the Arabian sea.', status: 'CHAPTER 8' },
            { id: 'cyber_rickshaw', title: 'CYBER RICKSHAW 2099', author: 'By Jatin Shah', genre: 'action', rating: 4.9, emoji: '👾', gradient: 'linear-gradient(135deg, #00ff87, #60efff)', desc: 'Red-lining a nuclear-powered three-wheeler on the Sea Link bridge flyover.', status: 'HOT' },
            { id: 'pali_bakery', title: 'PALI HILL BAKERY CLUB', author: 'By Meera Sen', genre: 'romance', rating: 4.6, emoji: '🥯', gradient: 'linear-gradient(135deg, #ffe066, #f25c54)', desc: 'Baking sourdough loaves of rebellion under the cover of night in old Pali bakery.', status: 'COMPLETED' },
            { id: 'hill_road_thrifts', title: 'HILL ROAD HAULS', author: 'By Fashionista', genre: 'romance', rating: 4.4, emoji: '👗', gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)', desc: 'Finding hidden gems and rival shoppers in Bandra’s ultimate thrift paradise.', status: 'NEW' },
            { id: 'neon_chaia', title: 'NEON CHAI APOCALYPSE', author: 'By Vivek Goel', genre: 'thriller', rating: 4.9, emoji: '🍵', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)', desc: 'Bandra runaways discover a secret chemical recipe that makes cutting chai bio-luminescent.', status: 'CHAPTER 1' },
            { id: 'skate_crew', title: 'CHAPEL STREET SKATERS', author: 'By Tony Hawkings', genre: 'action', rating: 4.8, emoji: '👟', gradient: 'linear-gradient(135deg, #f857a6, #ff5858)', desc: 'A documentary style manga following the daily grind and air flips of Bandstand skater gangs.', status: 'CHAPTER 4' },
            { id: 'mount_mary_secrets', title: 'MOUNT MARY SECRETS', author: 'By Karen D\'Souza', genre: 'thriller', rating: 4.7, emoji: '🏰', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)', desc: 'Deciphering historical scrolls hidden in the foundations of Mount Mary Basilica.', status: 'COMPLETED' },
            { id: 'sea_link_hustle', title: 'SEA LINK HUSTLE', author: 'By Rohit K.', genre: 'action', rating: 4.9, emoji: '🌉', gradient: 'linear-gradient(135deg, #130cb7, #52e5e7)', desc: 'Sprinting through speed cameras and tolls in a neon-lit cyber supercar.', status: 'CHAPTER 9' },
            { id: 'vada_pav_wars', title: 'VADA PAV TYCOON', author: 'By Sid Malhotra', genre: 'action', rating: 4.6, emoji: '🌶️', gradient: 'linear-gradient(135deg, #f9d423, #ff4e50)', desc: 'Bandra’s local street cart builds a giant franchise empire using classified hot spices.', status: 'CHAPTER 3' },
            { id: 'gigi_vibe', title: 'GIGI CAFE ROMANCE', author: 'By Tanya S.', genre: 'romance', rating: 4.5, emoji: '🥑', gradient: 'linear-gradient(135deg, #d4fc79, #96e6a1)', desc: 'Matching profiles and sharing artisan avocado sourdoughs at chic hipster spots.', status: 'NEW' },
            { id: 'cyber_cats', title: 'BANDRA ALLEY CATS', author: 'By NekoSensei', genre: 'thriller', rating: 4.8, emoji: '🐱', gradient: 'linear-gradient(135deg, #fa709a, #fee140)', desc: 'Bandra stray cats with neural links monitor the underground hackers of Chimbai village.', status: 'CHAPTER 2' },
            { id: 'retro_arcade', title: 'CABINET ESCAPE', author: 'By PixelLover', genre: 'thriller', rating: 4.9, emoji: '🕹️', gradient: 'linear-gradient(135deg, #30cfd0, #330867)', desc: 'Getting sucked into a neon retro arcade cabinet in a dusty Bandra basement shop.', status: 'HOT' },
            { id: 'byculla_biker', title: 'CARTER SPEEDSTERS', author: 'By Kabir Oberoi', genre: 'action', rating: 4.7, emoji: '🏍️', gradient: 'linear-gradient(135deg, #0f2027, #2c5364)', desc: 'Superbike midnight clubs racing along the Carter Road beach turns.', status: 'CHAPTER 7' },
            { id: 'basement_beats', title: 'BASEMENT SYNTH SESSIONS', author: 'By DJ Sonic', genre: 'action', rating: 4.8, emoji: '🎧', gradient: 'linear-gradient(135deg, #fc00ff, #00dbde)', desc: 'Synthesizer battles and lofi dreamscapes in hidden warehouse music lounges.', status: 'NEW' },
            { id: 'linking_road_mystery', title: 'LINKING ROAD RUNAWAYS', author: 'By Sona Roy', genre: 'thriller', rating: 4.6, emoji: '🎒', gradient: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', desc: 'Two kids unravel a mystery after finding an ancient coded notebook in a bag vendor\'s shop.', status: 'CHAPTER 2' },
            { id: 'bandra_breeze', title: 'BANDRA MONSOON BREEZE', author: 'By Kabir Sen', genre: 'romance', rating: 4.8, emoji: '🍹', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)', desc: 'A heartwarming story of finding peace and local street friendships along the stormy sea walls.', status: 'COMPLETED' }
        ];

        const COMIC_STORYBOARDS = {
            pali_hill: [
                {
                    narrator: "PALI HILL - SUNSET HOUR",
                    emoji: "🛹",
                    leftBubble: "Those Pali Hill skaters think they own this turf...",
                    rightBubble: "We'll see about that at the street derby tonight!"
                },
                {
                    narrator: "CHAPEL ROAD BACK STREETS",
                    emoji: "🎨",
                    leftBubble: "I've sprayed our crew's tag over their mural.",
                    rightBubble: "Bold move! Here comes their leader on a custom deck!"
                },
                {
                    narrator: "THE DUEL",
                    emoji: "⚡",
                    leftBubble: "Sourdough vs Vada Pav! Winner takes the Carter Road park!",
                    rightBubble: "Get ready to drift!"
                },
                {
                    narrator: "TO BE CONTINUED...",
                    emoji: "🔥",
                    leftBubble: "Chapter 2 launches in next weekly drop!",
                    rightBubble: "Stay tuned, Bandra Hustler!"
                }
            ],
            carter_road: [
                {
                    narrator: "CARTER ROAD CORNICHE",
                    emoji: "🛺",
                    leftBubble: "Midnight is when the real drift legends wake up.",
                    rightBubble: "Two rickshaws side-by-side. The engine revving is insane!"
                },
                {
                    narrator: "BANDSTAND BENDS",
                    emoji: "☕",
                    leftBubble: "Quick stop for a hot double cutting chai first!",
                    rightBubble: "Fuel for the high speed curves!"
                },
                {
                    narrator: "THE OVERTAKE",
                    emoji: "🏎️",
                    leftBubble: "Drifting around the Carter Road promenade curves!",
                    rightBubble: "Whoa, that three-wheeler is flying!"
                },
                {
                    narrator: "VICTORY LAP",
                    emoji: "🏆",
                    leftBubble: "First place takes the trophy and free chai for a month!",
                    rightBubble: "Hustle paid off!"
                }
            ]
        };

        let currentShelfGenre = 'all';

        function renderShelfComics() {
            const grid = document.getElementById("shelfBooksGrid");
            if (!grid) return;

            grid.innerHTML = "";
            const searchVal = (document.getElementById("shelfSearch")?.value || "").toLowerCase().trim();

            const filtered = SHELF_COMICS_DATA.filter(comic => {
                const matchesGenre = currentShelfGenre === 'all' || comic.genre === currentShelfGenre;
                const matchesSearch = !searchVal || 
                    comic.title.toLowerCase().includes(searchVal) || 
                    comic.author.toLowerCase().includes(searchVal) || 
                    comic.desc.toLowerCase().includes(searchVal) ||
                    comic.genre.toLowerCase().includes(searchVal);
                return matchesGenre && matchesSearch;
            });

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 48px; color: #6b7280; font-family: 'Inter', sans-serif;">
                        <p style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">No stories found</p>
                        <p style="font-size: 14px;">Try searching for a different keyword or category.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(comic => {
                const card = document.createElement("div");
                card.className = "book-shelf-card";
                card.id = `book-card-${comic.id}`;
                card.onclick = () => openComicReader(comic.id);

                card.innerHTML = `
                    <div class="book-cover-container" style="background: ${comic.gradient}">
                        <div class="book-cover-sticker">${comic.status}</div>
                        <div class="book-cover-emoji">${comic.emoji}</div>
                        <h3 class="book-cover-title">${comic.title}</h3>
                    </div>
                    <div class="book-shelf-details">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <h4 class="book-shelf-title">${comic.title}</h4>
                            <span class="book-shelf-rating">★ ${comic.rating}</span>
                        </div>
                        <p class="book-shelf-author">${comic.author}</p>
                        <p class="book-shelf-desc">${comic.desc}</p>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        function filterShelfGenre(genre, element) {
            currentShelfGenre = genre;
            const pills = document.querySelectorAll("#webtoons-shelf-view .filter-pill");
            pills.forEach(p => p.classList.remove("active"));
            element.classList.add("active");
            renderShelfComics();
        }

        function filterShelfComics() {
            renderShelfComics();
        }

        function openComicReader(comicId) {
            const comic = SHELF_COMICS_DATA.find(c => c.id === comicId) || SHELF_COMICS_DATA[0];
            
            // Restore comic reading progress from browser localStorage!
            const savedEpStr = localStorage.getItem(`bandra_hustlers_comic_progress_${comicId}`);
            const savedEpIdx = savedEpStr ? parseInt(savedEpStr, 10) : 0;
            const initialTitle = savedEpIdx === 0 ? "Episode 1: The Initiation" : `Episode ${savedEpIdx + 1}: Continuing the Hustle`;
            
            // Set reader titles
            document.getElementById("reader-active-title").innerText = comic.title;
            document.getElementById("reader-episode-name").innerText = initialTitle;

            // Transition panels
            document.getElementById("webtoons-shelf-view").style.display = "none";
            document.getElementById("webtoons-reader-view").style.display = "block";
            if (typeof window.setModalBackBtnVisibility === "function") {
                window.setModalBackBtnVisibility(true, "◀ BACK");
            }

            // Render Episodes List in Sidebar
            const episodeList = document.getElementById("comicEpisodeList");
            if (episodeList) {
                episodeList.innerHTML = "";
                const episodes = [
                    { title: "Episode 1: The Initiation", date: "COMPLETED" },
                    { title: "Episode 2: Continuing the Hustle", date: "COMPLETED" },
                    { title: "Episode 3: Neon Redline", date: "LOCKED" },
                    { title: "Episode 4: Carter Sunset", date: "LOCKED" }
                ];

                episodes.forEach((ep, i) => {
                    const epCard = document.createElement("div");
                    epCard.className = `comic-card ${i === savedEpIdx ? 'active' : ''}`;
                    if (ep.date === 'LOCKED') {
                        epCard.style.opacity = "0.5";
                        epCard.style.cursor = "not-allowed";
                    } else {
                        epCard.onclick = () => {
                            const activeCards = episodeList.querySelectorAll(".comic-card");
                            activeCards.forEach(c => c.classList.remove("active"));
                            epCard.classList.add("active");
                            document.getElementById("reader-episode-name").innerText = ep.title;
                            loadComic(comicId, i);
                        };
                    }

                    epCard.innerHTML = `
                        <div class="comic-number">EP ${i + 1}</div>
                        <div class="comic-meta">
                            <h4 class="comic-title">${ep.title}</h4>
                            <span class="comic-status-tag" style="font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: 700; ${ep.date === 'LOCKED' ? 'background: rgba(255,255,255,0.1); color: #9ca3af;' : 'background: #ffd166; color:#000;'}">${ep.date}</span>
                        </div>
                    `;
                    episodeList.appendChild(epCard);
                });
            }

            // Load actual comic pages/panels
            loadComic(comicId, savedEpIdx);
        }

        function backToShelf() {
            document.getElementById("webtoons-reader-view").style.display = "none";
            document.getElementById("webtoons-shelf-view").style.display = "block";
            renderShelfComics();
            if (typeof window.setModalBackBtnVisibility === "function") {
                window.setModalBackBtnVisibility(false);
            }
        }

        function loadComic(comicId, episodeIndex = 0) {
            // Save comic progress dynamically in browser storage
            localStorage.setItem(`bandra_hustlers_comic_progress_${comicId}`, episodeIndex.toString());
            
            const reader = document.getElementById("webtoonsReader");
            if (!reader) return;
            reader.innerHTML = "";

            let frames = [];
            // If they click episode 2 or we have custom storyboard, fetch/generate appropriately
            if (COMIC_STORYBOARDS[comicId] && episodeIndex === 0) {
                frames = COMIC_STORYBOARDS[comicId];
            } else {
                const comic = SHELF_COMICS_DATA.find(c => c.id === comicId) || SHELF_COMICS_DATA[0];
                const epNum = episodeIndex + 1;
                frames = [
                    {
                        narrator: `${comic.title.toUpperCase()} - EPISODE ${epNum}: CHRONICLE`,
                        emoji: comic.emoji,
                        leftBubble: `Bandra holds the keys to the ultimate hustle. Let's start EP ${epNum}!`,
                        rightBubble: `Agreed! Keep your eyes on the road and trust your teammates!`
                    },
                    {
                        narrator: `THE MIDDLE GAME`,
                        emoji: "⚡",
                        leftBubble: `Our drift speed is maxing out. The Neon lights are blurring!`,
                        rightBubble: `Watch out for that sharp turn at Bandstand curves!`
                    },
                    {
                        narrator: `EPISODE CLIMAX`,
                        emoji: "🏆",
                        leftBubble: `We made it! That was a legendary hustle.`,
                        rightBubble: `To be continued in the next weekly digital drop!`
                    }
                ];
            }

            frames.forEach((frame, i) => {
                const el = document.createElement("div");
                el.className = "comic-frame";
                const angle = i % 2 === 0 ? "1.2deg" : "-1.2deg";
                el.style.setProperty("--rot", angle);
                el.style.marginBottom = "24px";

                el.innerHTML = `
                    <div class="comic-narrator">${frame.narrator}</div>
                    <div class="comic-frame-img-box">
                        <div class="comic-grid-bg"></div>
                        <span class="comic-frame-content">${frame.emoji}</span>
                        <div class="comic-bubble bubble-left">${frame.leftBubble}</div>
                        <div class="comic-bubble bubble-right">${frame.rightBubble}</div>
                    </div>
                `;
                reader.appendChild(el);
            });

            reader.scrollTop = 0;
        }

        // --- B. Arcade Game System ---
