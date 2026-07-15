        let activeClaimTimerInterval = null;
        let currentDealsCategory = 'all';

        function filterDealsCategory(category, element) {
            currentDealsCategory = category;
            
            // Toggle active styling on pills
            const pills = document.querySelectorAll("#panel-deals .filter-pill");
            pills.forEach(p => p.classList.remove("active"));
            if (element) {
                element.classList.add("active");
            }
            
            const gridContainer = document.querySelector(".shelf-scroll-container");
            const adMarketplace = document.getElementById("adMarketplaceContainer");
            
            if (category === 'ads') {
                if (gridContainer) gridContainer.style.display = "none";
                if (adMarketplace) adMarketplace.style.display = "block";
            } else {
                if (gridContainer) gridContainer.style.display = "block";
                if (adMarketplace) adMarketplace.style.display = "none";
                filterDeals();
            }
        }

        function filterDeals() {
            const searchVal = (document.getElementById("dealsSearchInput")?.value || "").toLowerCase().trim();
            const cards = document.querySelectorAll("#dealsGrid .deal-coupon-card");
            
            let visibleCount = 0;

            cards.forEach(card => {
                const categories = (card.getAttribute("data-category") || "").split(" ");
                const searchText = (card.getAttribute("data-search") || "").toLowerCase();
                
                const matchesCategory = currentDealsCategory === 'all' || categories.includes(currentDealsCategory);
                const matchesSearch = !searchVal || searchText.includes(searchVal);
                
                if (matchesCategory && matchesSearch) {
                    card.style.display = "block";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            // Handle empty results display if needed
            const grid = document.getElementById("dealsGrid");
            let emptyMsg = document.getElementById("dealsEmptyMsg");
            
            if (visibleCount === 0) {
                if (!emptyMsg) {
                    emptyMsg = document.createElement("div");
                    emptyMsg.id = "dealsEmptyMsg";
                    emptyMsg.style.cssText = "grid-column: 1/-1; text-align: center; padding: 48px; color: #6b7280; font-family: 'Inter', sans-serif;";
                    emptyMsg.innerHTML = `
                        <p style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: rgba(255,255,255,0.7);">No deals found</p>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.4);">Try searching for another snack, apparel, or hot offer.</p>
                    `;
                    grid.appendChild(emptyMsg);
                } else {
                    emptyMsg.style.display = "block";
                }
            } else if (emptyMsg) {
                emptyMsg.style.display = "none";
            }
        }

        function redeemVoucher(vendor, requiredPoints) {
            if (requiredPoints > 0) {
                if (chaiPoints < requiredPoints) {
                    alert(`🚨 NOT ENOUGH CHAI POINTS!\n\nThis exclusive deal requires ${requiredPoints} Chai Points.\n\nTap the Cutting Chai cup in the sidebar to earn more!`);
                    return;
                }
                
                // Deduct points
                chaiPoints -= requiredPoints;
                localStorage.setItem("bandra_hustlers_chai_points", chaiPoints.toString());
                if (window.updateChaiPointsUI) window.updateChaiPointsUI();
                
                // Play successful chime sound
                playBeepSound(587.33, 0.1); // D5
                setTimeout(() => playBeepSound(880, 0.18), 100); // A5
            } else {
                // Play clean pickup sound
                playBeepSound(659.25, 0.15); // E5
            }

            // Generate claim badge
            document.getElementById("claimVendor").innerText = vendor.toUpperCase();
            
            // Random code generation
            const codes = ["HUSTLE99", "BANDRACAFE", "DRIFTCHAI", "SOHOHUSTLE", "PALI77", "LINKING100"];
            const randomCode = codes[Math.floor(Math.random() * codes.length)] + Math.floor(Math.random() * 900 + 100);
            document.getElementById("claimCode").innerText = randomCode;

            // Display claim box
            const claimBox = document.getElementById("voucherClaimBox");
            claimBox.style.display = "grid";
            claimBox.scrollIntoView({ behavior: 'smooth' });

            // Start countdown
            let minutes = 5;
            let seconds = 0;
            const timerText = document.getElementById("claimTimer");
            timerText.innerText = "05:00";

            if (activeClaimTimerInterval) clearInterval(activeClaimTimerInterval);
            
            activeClaimTimerInterval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(activeClaimTimerInterval);
                        timerText.innerText = "EXPIRED";
                        return;
                    }
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                const formattedSec = seconds < 10 ? "0" + seconds : seconds;
                const formattedMin = minutes < 10 ? "0" + minutes : minutes;
                timerText.innerText = `${formattedMin}:${formattedSec}`;
            }, 1000);

            // SAVE TO LOCAL WALLET
            let cardTitle = "Special Voucher Offer";
            let discount = "Promo Deal";
            const cardEl = Array.from(document.querySelectorAll(".deal-coupon-card")).find(c => {
                const vendEl = c.querySelector(".coupon-vendor");
                return vendEl && vendEl.textContent.trim().toLowerCase() === vendor.trim().toLowerCase();
            });
            if (cardEl) {
                const titleEl = cardEl.querySelector("h3");
                if (titleEl) cardTitle = titleEl.textContent;
                const ribEl = cardEl.querySelector(".deal-discount-ribbon");
                if (ribEl) discount = ribEl.textContent;
            }

            let wallet = [];
            try {
                wallet = JSON.parse(localStorage.getItem("bandra_hustlers_wallet") || "[]");
            } catch(e) { wallet = []; }
            
            const newVoucher = {
                id: 'voucher_' + Date.now(),
                vendor: vendor,
                title: cardTitle,
                discount: discount,
                code: randomCode,
                points: requiredPoints,
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + " " + new Date().toLocaleDateString([], {month: 'short', day: 'numeric'})
            };
            
            wallet.unshift(newVoucher);
            localStorage.setItem("bandra_hustlers_wallet", JSON.stringify(wallet));
            
            renderWallet();
        }

        // Book and Buy Spotlight Ad Space with Chai Points
        function buyAdSpace(event) {
            if (event) event.preventDefault();
            const businessName = document.getElementById("adBizName").value.trim();
            const slogan = document.getElementById("adBizSlogan").value.trim();
            
            if (!businessName || !slogan) {
                alert("🚨 Please fill in both fields to launch your campaign!");
                return;
            }
            
            if (chaiPoints < 50) {
                alert(`🚨 NOT ENOUGH CHAI POINTS!\n\nRenting the Top Sponsored Banner requires 50 Chai Points.\n\nTap the Cutting Chai cup in the sidebar to earn more points!`);
                return;
            }
            
            // Deduct points
            chaiPoints -= 50;
            localStorage.setItem("bandra_hustlers_chai_points", chaiPoints.toString());
            if (window.updateChaiPointsUI) window.updateChaiPointsUI();
            
            // Play successful level-up or checkout sound
            if (typeof playBeepSound === "function") {
                playBeepSound(440, 0.1); // A4
                setTimeout(() => playBeepSound(659.25, 0.1), 120); // E5
                setTimeout(() => playBeepSound(880, 0.25), 240); // A5
            }
            
            // Update the live ad banner elements!
            const bannerTitle = document.getElementById("adBannerTitle");
            const bannerDesc = document.getElementById("adBannerDesc");
            if (bannerTitle) bannerTitle.innerText = `📣 ${businessName.toUpperCase()}`;
            if (bannerDesc) bannerDesc.innerText = slogan;
            
            // Persist the custom ad banner so it stays upon refresh!
            localStorage.setItem("bandra_custom_ad_title", businessName);
            localStorage.setItem("bandra_custom_ad_desc", slogan);
            
            alert(`🎉 CONGRATULATIONS!\n\nYour sponsored banner for "${businessName.toUpperCase()}" is now LIVE at the top of Bandra Deals!`);
            
            // Clear fields
            document.getElementById("adBizName").value = "";
            document.getElementById("adBizSlogan").value = "";
            
            // Switch back to "all" category tab automatically to show off the banner!
            const allPill = document.querySelector("#panel-deals .filter-pill");
            if (allPill) {
                filterDealsCategory('all', allPill);
            }
        }
        window.buyAdSpace = buyAdSpace;

        // Auto-Rotation of Pre-loaded Sponsorship Ads
        const preloadedAds = [
            { title: "☕ SPOTLIGHT YOUR CAFE HERE!", desc: "Feature your local joint for 50 Chai Points. Promote your food/merch!" },
            { title: "🛹 SKATEPARK SESSIONS AT THE GHAT", desc: "Sponsored by Carter Road Skate Crew. Free entry with HUSTLE99 voucher!" },
            { title: "👗 VINTAGE POP-UP ON HILL ROAD", desc: "Over 500+ curated tees and kicks arriving this Saturday. Spotlighted by Streetwear India." }
        ];
        let currentAdIdx = 0;
        let adRotationInterval = null;

        function startAdRotation() {
            if (localStorage.getItem("bandra_custom_ad_title")) return; // Stop if custom ad is active
            
            if (adRotationInterval) clearInterval(adRotationInterval);
            adRotationInterval = setInterval(() => {
                if (localStorage.getItem("bandra_custom_ad_title")) {
                    clearInterval(adRotationInterval);
                    return;
                }
                currentAdIdx = (currentAdIdx + 1) % preloadedAds.length;
                const bannerTitle = document.getElementById("adBannerTitle");
                const bannerDesc = document.getElementById("adBannerDesc");
                if (bannerTitle && bannerDesc) {
                    bannerTitle.style.opacity = "0";
                    bannerDesc.style.opacity = "0";
                    setTimeout(() => {
                        bannerTitle.innerText = preloadedAds[currentAdIdx].title;
                        bannerDesc.innerText = preloadedAds[currentAdIdx].desc;
                        bannerTitle.style.opacity = "1";
                        bannerDesc.style.opacity = "1";
                    }, 300);
                }
            }, 7000); // rotate every 7 seconds
        }

        // On document ready, load custom sponsor banner if exists, otherwise start auto-rotation
        function initializeBandraAds() {
            const savedAdTitle = localStorage.getItem("bandra_custom_ad_title");
            const savedAdDesc = localStorage.getItem("bandra_custom_ad_desc");
            const bannerTitle = document.getElementById("adBannerTitle");
            const bannerDesc = document.getElementById("adBannerDesc");
            if (savedAdTitle && savedAdDesc) {
                if (bannerTitle) bannerTitle.innerText = `📣 ${savedAdTitle.toUpperCase()}`;
                if (bannerDesc) bannerDesc.innerText = savedAdDesc;
            } else {
                startAdRotation();
            }
        }

        // --- HUSTLERS WALLET ENGINE & COPIER ---
        function copyToClipboard(text, btn) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    handleCopySuccess(btn);
                }).catch(() => {
                    fallbackCopyToClipboard(text, btn);
                });
            } else {
                fallbackCopyToClipboard(text, btn);
            }
        }

        function fallbackCopyToClipboard(text, btn) {
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            handleCopySuccess(btn);
        }

        function handleCopySuccess(btn) {
            const originalText = btn.innerText;
            btn.innerText = "COPIED!";
            btn.style.background = "rgba(0, 255, 100, 0.18)";
            btn.style.borderColor = "rgba(0, 255, 100, 0.4)";
            btn.style.color = "#00ff66";
            btn.style.boxShadow = "0 0 10px rgba(0, 255, 100, 0.2)";
            
            // Play sweet high-pitched tick double chime
            if (typeof playBeepSound === "function") {
                playBeepSound(880, 0.05); // A5
                setTimeout(() => playBeepSound(1174.66, 0.08), 50); // D6
            }
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.borderColor = "";
                btn.style.color = "";
                btn.style.boxShadow = "";
            }, 1500);
        }

        function renderWallet() {
            const walletGrid = document.getElementById("walletGrid");
            const emptyState = document.getElementById("walletEmptyState");
            const badge = document.getElementById("walletCountBadge");
            if (!walletGrid || !emptyState) return;

            let wallet = [];
            try {
                wallet = JSON.parse(localStorage.getItem("bandra_hustlers_wallet") || "[]");
            } catch(e) { wallet = []; }

            if (badge) badge.innerText = wallet.length;

            if (wallet.length === 0) {
                emptyState.style.display = "block";
                walletGrid.style.display = "none";
                return;
            }

            emptyState.style.display = "none";
            walletGrid.style.display = "grid";
            walletGrid.innerHTML = "";

            wallet.forEach(voucher => {
                const card = document.createElement("div");
                card.className = "wallet-voucher-card";
                card.style.cssText = `
                    background: linear-gradient(135deg, rgba(255, 0, 140, 0.08) 0%, rgba(10, 8, 20, 0.95) 100%);
                    border: 1.5px solid rgba(255, 0, 140, 0.25);
                    border-radius: 12px;
                    padding: 14px 16px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    transition: all 0.3s ease;
                `;
                
                card.addEventListener("mouseenter", () => {
                    card.style.borderColor = "var(--pink)";
                    card.style.boxShadow = "0 8px 20px rgba(255, 0, 140, 0.15)";
                    card.style.transform = "translateY(-2px)";
                });
                card.addEventListener("mouseleave", () => {
                    card.style.borderColor = "rgba(255, 0, 140, 0.25)";
                    card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
                    card.style.transform = "translateY(0)";
                });

                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <span style="font-size: 0.58rem; background: rgba(255, 0, 140, 0.15); border: 1px solid rgba(255, 0, 140, 0.3); color: var(--pink); padding: 2px 6px; border-radius: 4px; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px;">${voucher.discount}</span>
                        <span style="font-size: 0.58rem; color: rgba(255,255,255,0.35); font-family: monospace;">${voucher.timestamp}</span>
                    </div>
                    <h4 style="color: #fff; font-size: 0.82rem; font-weight: 800; margin: 4px 0 0 0; letter-spacing: 0.3px; font-family: 'Inter', sans-serif;">${voucher.title}</h4>
                    <p style="color: var(--yellow); font-size: 0.68rem; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; font-family: monospace;">🏬 ${voucher.vendor}</p>
                    
                    <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.4); border-radius: 8px; padding: 6px 10px; border: 1px solid rgba(255,255,255,0.06);">
                        <code style="color: var(--cyan); font-family: monospace; font-size: 0.85rem; font-weight: 800; letter-spacing: 1.5px; text-shadow: 0 0 5px rgba(0, 229, 255, 0.3);">${voucher.code}</code>
                        <button class="wallet-copy-btn" style="background: rgba(0, 229, 255, 0.08); border: 1px solid rgba(0, 229, 255, 0.25); color: var(--cyan); border-radius: 6px; font-size: 0.62rem; font-weight: 800; padding: 5px 10px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.5px;">COPY</button>
                    </div>
                `;

                const copyBtn = card.querySelector(".wallet-copy-btn");
                copyBtn.addEventListener("click", () => {
                    copyToClipboard(voucher.code, copyBtn);
                });

                walletGrid.appendChild(card);
            });
        }

        function clearVoucherWallet() {
            if (confirm("🚨 CLEAR ALL VOUCHERS?\n\nAre you sure you want to remove all saved codes from your wallet?")) {
                localStorage.removeItem("bandra_hustlers_wallet");
                if (typeof playBeepSound === "function") {
                    playBeepSound(330, 0.15); // E4 low tone
                }
                renderWallet();
            }
        }

        function copyActiveClaimCode() {
            const code = document.getElementById("claimCode").innerText;
            const btn = document.getElementById("activeClaimCopyBtn");
            if (code && btn) {
                copyToClipboard(code, btn);
            }
        }

        // --- DYNAMIC COUNTDOWN TICKER DAEMON ---
        function startDealsCountdownTickers() {
            // Keep track of the main hero timer seconds in localStorage or default to 9858s
            let heroSeconds = parseInt(localStorage.getItem("bandra_hustlers_hero_seconds") || "9858", 10);
            
            setInterval(() => {
                // 1. Ticker for the main hero countdown
                if (heroSeconds > 0) {
                    heroSeconds--;
                    localStorage.setItem("bandra_hustlers_hero_seconds", heroSeconds.toString());
                } else {
                    heroSeconds = 10000; // Reset to keep things lively
                }
                
                const hH = Math.floor(heroSeconds / 3600);
                const hM = Math.floor((heroSeconds % 3600) / 60);
                const hS = heroSeconds % 60;
                const formattedHero = `${hH.toString().padStart(2, '0')}:${hM.toString().padStart(2, '0')}:${hS.toString().padStart(2, '0')}`;
                const heroTimerEl = document.getElementById("heroCountdownTimer");
                if (heroTimerEl) {
                    heroTimerEl.innerText = formattedHero;
                }

                // 2. Ticker for individual coupon cards
                const cardTimers = document.querySelectorAll(".card-countdown");
                cardTimers.forEach(el => {
                    let t = parseInt(el.getAttribute("data-time") || "0", 10);
                    if (t > 0) {
                        t--;
                        el.setAttribute("data-time", t.toString());
                        
                        const h = Math.floor(t / 3600);
                        const m = Math.floor((t % 3600) / 60);
                        const s = t % 60;
                        el.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                    } else {
                        el.innerText = "EXPIRED";
                    }
                });
            }, 1000);
        }

        // Expose functions globally for dynamic HTML handlers
        window.redeemVoucher = redeemVoucher;
        window.filterDealsCategory = filterDealsCategory;
        window.filterDeals = filterDeals;
        window.buyAdSpace = buyAdSpace;
        window.copyToClipboard = copyToClipboard;
        window.renderWallet = renderWallet;
        window.clearVoucherWallet = clearVoucherWallet;
        window.copyActiveClaimCode = copyActiveClaimCode;
        window.initializeBandraAds = initializeBandraAds;
        window.startDealsCountdownTickers = startDealsCountdownTickers;

        document.addEventListener("DOMContentLoaded", () => {
            initializeBandraAds();
            renderWallet();
            startDealsCountdownTickers();
        });

        // Execute immediately in case DOMContentLoaded already fired
        initializeBandraAds();
        renderWallet();
        startDealsCountdownTickers();


