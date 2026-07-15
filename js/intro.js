        function generateSparkExplosion() {
            const colors = ["#ff008c", "#00e5ff", "#ffe600", "#ff7a00", "#ffffff"];
            for (let i = 0; i < 150; i++) {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                activeParticles.push(new Spark(canvasWidth / 2, canvasHeight * 0.4, randomColor));
            }
        }

        function runParticleLoop() {
            if (!isIntroActive) return;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Camera shake implementation - shakes foreground elements keeping the outer viewport boundaries completely firm
            if (camShakeIntensity > 0) {
                const currentShakeX = (Math.random() - 0.5) * camShakeIntensity;
                const currentShakeY = (Math.random() - 0.5) * camShakeIntensity;
                
                const shakeTargets = [
                    logoEl, 
                    rockstarCard, 
                    document.getElementById("marathiLogo"), 
                    document.getElementById("bollywoodSticker"), 
                    document.getElementById("stickerWorld"),
                    document.getElementById("train"),
                    document.getElementById("train2")
                ];
                shakeTargets.forEach(el => {
                    if (el) {
                        el.style.transform = `translate(${currentShakeX}px, ${currentShakeY}px)`;
                    }
                });
                
                camShakeIntensity *= 0.94; // fade off quickly
            } else {
                // Reset custom transforms to original state when shake completes
                const shakeTargets = [
                    logoEl, 
                    rockstarCard, 
                    document.getElementById("marathiLogo"), 
                    document.getElementById("bollywoodSticker"), 
                    document.getElementById("stickerWorld"),
                    document.getElementById("train"),
                    document.getElementById("train2")
                ];
                shakeTargets.forEach(el => {
                    if (el && el.style.transform && el.style.transform.includes("translate")) {
                        el.style.transform = "";
                    }
                });
            }

            activeParticles.forEach((p, idx) => {
                p.update();
                p.draw();
                if (p.opacity <= 0) {
                    activeParticles.splice(idx, 1);
                }
            });

            requestAnimationFrame(runParticleLoop);
        }


        // ============================================================
        // PARALLAX & PERSPECTIVE CAMERA CONTROL
        // ============================================================
        document.addEventListener("mousemove", (e) => {
            if (!isIntroActive) return;
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 25;
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 25;

            // Apply parallax vectors to specific spatial depth layers
            const sunsetSun = document.querySelector(".sun-disc");
            const skyLinkBridge = document.getElementById("seaLink");

            if (sunsetSun) sunsetSun.style.transform = `translate(calc(-50% + ${xOffset * 0.25}px), calc(-18vh + ${yOffset * 0.25}px)) scale(1)`;
            if (skyLinkBridge) skyLinkBridge.style.transform = `translate(${xOffset * 0.5}px, ${yOffset * 0.5}px)`;
            if (bandraSkyline) bandraSkyline.style.transform = `translate(${xOffset * 0.4}px, ${yOffset * 0.4}px)`;
            if (fortSilhouette) fortSilhouette.style.transform = `translate(${xOffset * 0.6}px, ${yOffset * 0.6}px)`;
            if (logoEl) logoEl.style.transform = `translate(${xOffset * 0.8}px, ${yOffset * 0.8}px)`;
        });


        // ============================================================
        // CINEMATIC TIMELINE SEQUENCE
        // ============================================================
        function runCinematicTimeline() {
            // Main page remains perfectly firm, so no camera-breath on cameraEl.

            // 0.4s Sky Lights Up
            setTimeout(() => {
                skyGradient.classList.add("sky-sunset");
                sunDisc.classList.add("sun-up");
                if (Math.random() < 0.7) {
                    const rays = document.querySelector(".light-rays");
                    if (rays) rays.style.opacity = "0.75";
                }
            }, 400);

            // 0.8s Skyline, Fort Silhouette and Sea Link Fade in
            setTimeout(() => {
                if (bandraSkyline) bandraSkyline.style.opacity = "0.95";
                if (fortSilhouette) fortSilhouette.style.opacity = "0.95";
                if (seaLink) seaLink.style.opacity = "0.9";
                if (seaLayer) seaLayer.style.opacity = "1";
                if (cloudBack) cloudBack.style.opacity = "0.5";
                if (cloudFront) cloudFront.style.opacity = "0.6";
            }, 800);

            // 1.4s Windows flicker & streetlights turn on
            setTimeout(() => {
                if (cityDepth) cityDepth.style.opacity = "0.6";
                if (streetLights) streetLights.style.opacity = "0.85";
            }, 1400);

            // 1.8s Mumbai Local Train crawls across frame (Slowed down further to 12.0s for a very smooth slow crawl)
            setTimeout(() => {
                cameraEl.classList.add("train-shake");
                
                // Play a loud train passing whoosh and a loud whistle as the train passes!
                if (isIntroAudioPlaying) {
                    playTrainWhoosh(audioCtx.currentTime, 7.0);
                    playTrainWhistle(audioCtx.currentTime + 0.2, 3.0); // Majestic whistle!
                }

                trainWrapper.animate([
                    { left: "-100%" },
                    { left: "120%" }
                ], {
                    duration: 12000,
                    easing: "linear",
                    fill: "forwards"
                });

                // Clear heavy train shaking state after pass completes
                setTimeout(() => {
                    cameraEl.classList.remove("train-shake");
                }, 12000);
            }, 1800);

            // 3.0s Second local train crawls in from the opposite side (Right-to-Left, slowed down to 13.0s)
            setTimeout(() => {
                const trainWrapper2 = document.getElementById("train2");
                if (trainWrapper2) {
                    if (isIntroAudioPlaying) {
                        playTrainWhoosh(audioCtx.currentTime, 6.0);
                    }
                    trainWrapper2.animate([
                        { right: "-100%" },
                        { right: "120%" }
                    ], {
                        duration: 13000,
                        easing: "linear",
                        fill: "forwards"
                    });
                }
            }, 3000);

            // 2.3s Comic Pop art elements pop in
            setTimeout(() => {
                const comicIds = ["comicPow", "comicBoom", "comicBam", "comicLetsGo", "comicWow"];
                comicIds.forEach((id, i) => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.style.animation = `bounceInSticker 0.6s ${i * 0.12}s cubic-bezier(0.175, 0.885, 0.32, 1.25) forwards`;
                    }
                });
            }, 2300);

            // 2.8s Street name boards slide up one by one (Station board omitted as requested to avoid blocking background)
            setTimeout(() => {
                for (let i = 1; i <= 6; i++) {
                    const sign = document.getElementById(`sign${i}`);
                    if (sign) {
                        setTimeout(() => {
                            sign.style.opacity = "1";
                            sign.style.transform = "translateY(0)";
                        }, i * 150);
                    }
                }
            }, 2800);

            // 3.2s Traffic starts cruising across the sea front
            setTimeout(() => {
                populateBandraTraffic();
            }, 3200);

            // 3.8s Massive Title Reveal
            setTimeout(() => {
                if (logoEl) {
                    logoEl.style.opacity = "1";
                    logoEl.style.transform = "scale(1)";
                    logoEl.classList.add("logo-glitch");
                }
                if (smallTitle) {
                    smallTitle.style.opacity = "1";
                    smallTitle.style.transform = "translateY(0)";
                }
                if (subtitle) {
                    subtitle.style.opacity = "1";
                    subtitle.style.transform = "translateY(0)";
                }
                const flare = document.querySelector(".lens-flare");
                if (flare) flare.style.opacity = "1";
            }, 3800);

            // 4.2s Pop-Art Cultural Landmarks Reveal: Marathi Logo, Bollywood Star, Fisherman boat, Mount Mary
            setTimeout(() => {
                const mLogo = document.getElementById("marathiLogo");
                if (mLogo) {
                    mLogo.style.opacity = "1";
                    mLogo.style.transform = "scale(1.1) rotate(-8deg)";
                }
                const bSticker = document.getElementById("bollywoodSticker");
                if (bSticker) {
                    bSticker.style.opacity = "1";
                    bSticker.style.transform = "scale(1.1) rotate(12deg)";
                }
                const fBoat = document.getElementById("fishermanBoat");
                if (fBoat) fBoat.style.opacity = "0.95";
                
                const cSilhouette = document.getElementById("churchSilhouette");
                if (cSilhouette) cSilhouette.style.opacity = "0.95";
            }, 4200);

            // 4.9s Action words pills reveal
            setTimeout(() => {
                const spans = document.querySelectorAll(".action-sequence span");
                spans.forEach((span, i) => {
                    setTimeout(() => {
                        span.style.opacity = "1";
                        span.style.transform = "scale(1)";
                    }, i * 100);
                });
            }, 4900);

            // 5.6s Golden ID rotating card rotates into view
            setTimeout(() => {
                if (rockstarCard) {
                    rockstarCard.style.opacity = "1";
                    rockstarCard.style.transform = "translateX(-50%) rotateX(15deg) rotateY(-10deg) scale(1)";
                }
            }, 5600);

            // 6.5s Climax: Freeze frame, push zoom, sparks and camera shake (No white screen flash!)
            setTimeout(() => {
                // Shake camera
                camShakeIntensity = 10;

                // Push forward: zoom the logo specifically rather than the whole viewport/page container to remain firm
                if (logoEl) {
                    logoEl.style.transition = "transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)";
                    logoEl.style.transform = "scale(1.25) rotate(-1deg)";
                }

                // Generate spark explosion (No white screen flash to avoid delays)
                setTimeout(() => {
                    generateSparkExplosion();
                }, 600);
            }, 6500);

            // 24.0s Auto-Transition: Automatically transition to the interactive homepage when the long Title Track finishes
            introAutoTransitionTimeout = setTimeout(() => {
                dissolveIntroAndTransitionToHomepage();
            }, 24000); // 24 seconds long play!
        }

        // Dissolve Intro & Transition instantly via Pop-Art Stripe Curtain Wipe
        function dissolveIntroAndTransitionToHomepage() {
            if (!isIntroActive) return;
            isIntroActive = false;

            // Clear the auto-transition timer
            if (introAutoTransitionTimeout) {
                clearTimeout(introAutoTransitionTimeout);
                introAutoTransitionTimeout = null;
            }

            // Stop the intro audio sequencer and title track
            if (introAudioSequencerTimer) clearTimeout(introAudioSequencerTimer);
            stopBandraSunsetTrack();

            // Record state in local storage
            persistVisit();

            // 1. Activate pop art stripes
            const transitionEl = document.getElementById("popArtTransition");
            const popText = document.getElementById("popArtText");
            if (transitionEl) {
                transitionEl.style.display = "flex";
                // Trigger layout reflow
                transitionEl.offsetHeight;
                
                const stripes = transitionEl.querySelectorAll(".stripe");
                stripes.forEach(stripe => {
                    stripe.style.transform = "translateX(0)";
                });
                if (popText) {
                    popText.style.transform = "translate(-50%, -50%) scale(1) rotate(-8deg)";
                }
            }

            // 2. Cover transition: after stripes cover the view (~350ms)
            setTimeout(() => {
                // Instantly hide intro and show homepage
                if (introEl) introEl.style.display = "none";
                homepageEl.classList.add("reveal");
                document.body.style.overflow = "auto";
                
                // Kick off the homepage music synthesis
                triggerProceduralLofiStreetBeat();

                // 3. Reveal stage: slide stripes out to the right
                setTimeout(() => {
                    if (transitionEl) {
                        const stripes = transitionEl.querySelectorAll(".stripe");
                        stripes.forEach(stripe => {
                            stripe.style.transform = "translateX(100%)";
                        });
                        if (popText) {
                            popText.style.transform = "translate(-50%, -50%) scale(0) rotate(15deg)";
                        }
                    }
                    
                    // Clean up after entire slide completes
                    setTimeout(() => {
                        if (transitionEl) transitionEl.remove();
                        if (introEl) introEl.remove();
                    }, 400); // Faster cleanup (400ms)
                }, 200); // Faster slideout trigger (200ms)

            }, 350); // Faster cover trigger (350ms)
        }

        // Setup Skip Button
        skipBtn.addEventListener("click", () => {
            dissolveIntroAndTransitionToHomepage();
        });


