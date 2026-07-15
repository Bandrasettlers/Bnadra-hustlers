        let audioCtx = null;
        let mainGainNode = null;
        let synthSequencerTimer = null;
        let isSynthPlaying = false;

        function initSynthAudio() {
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                audioCtx = new AudioContextClass();
                mainGainNode = audioCtx.createGain();
                mainGainNode.gain.setValueAtTime(0.25, audioCtx.currentTime); // Louder default volume
                mainGainNode.connect(audioCtx.destination);
            } catch (e) {
                console.warn("Procedural Audio synthesis failed to boot.", e);
            }
        }

        let isIntroAudioPlaying = false;
        let introAudioSequencerTimer = null;
        let introStep = 0;

        function startIntroAudio() {
            if (isIntroAudioPlaying) return;
            const prompt = document.getElementById("audioPrompt");
            if (prompt) prompt.style.opacity = "0"; // hide the prompt!
            playIntroSoundtrack();
        }

        // Realistic local train horn/whistle synthesizer with dual-tone LFO vibrato
        function playTrainWhistle(time, duration = 1.8) {
            if (!audioCtx) return;
            try {
                const freqs = [370, 415, 494, 554]; // Local train chord (minor 3rd/tensions)
                
                freqs.forEach((freq) => {
                    const osc = audioCtx.createOscillator();
                    const filter = audioCtx.createBiquadFilter();
                    const oscGain = audioCtx.createGain();
                    
                    osc.type = "sawtooth";
                    osc.frequency.setValueAtTime(freq, time);
                    
                    // Add micro-frequency LFO modulation (vibrato) for organic blowing wind horn feel
                    const lfo = audioCtx.createOscillator();
                    const lfoGain = audioCtx.createGain();
                    lfo.frequency.setValueAtTime(8, time); // 8Hz vibration
                    lfoGain.gain.setValueAtTime(5, time);  // 5Hz variation
                    
                    lfo.connect(lfoGain);
                    lfoGain.connect(osc.frequency);
                    
                    filter.type = "bandpass";
                    filter.frequency.setValueAtTime(freq * 1.5, time);
                    filter.Q.setValueAtTime(5, time);
                    
                    osc.connect(filter);
                    filter.connect(oscGain);
                    oscGain.connect(mainGainNode);
                    
                    // Envelope: Sharp attack, steady blow, clean release
                    oscGain.gain.setValueAtTime(0, time);
                    oscGain.gain.linearRampToValueAtTime(0.38, time + 0.12);
                    oscGain.gain.linearRampToValueAtTime(0.28, time + duration * 0.75);
                    oscGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
                    
                    lfo.start(time);
                    lfo.stop(time + duration);
                    osc.start(time);
                    osc.stop(time + duration);
                });
            } catch (err) {
                console.warn("Error playing train whistle:", err);
            }
        }

        function playTrainWhoosh(time, duration) {
            if (!audioCtx) return;
            try {
                const bufferSize = audioCtx.sampleRate * duration;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                
                let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    b0 = 0.99886 * b0 + white * 0.0555179;
                    b1 = 0.99332 * b1 + white * 0.0750759;
                    b2 = 0.96900 * b2 + white * 0.1538520;
                    b3 = 0.86650 * b3 + white * 0.3104856;
                    b4 = 0.55000 * b4 + white * 0.5329522;
                    b5 = -0.7616 * b5 - white * 0.0168980;
                    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                    data[i] *= 0.11;
                    b6 = white * 0.115926;
                }
                
                const noise = audioCtx.createBufferSource();
                noise.buffer = buffer;
                
                const filter = audioCtx.createBiquadFilter();
                filter.type = "bandpass";
                filter.Q.setValueAtTime(2.0, time);
                
                filter.frequency.setValueAtTime(90, time);
                filter.frequency.exponentialRampToValueAtTime(800, time + duration * 0.4);
                filter.frequency.exponentialRampToValueAtTime(140, time + duration);
                
                const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
                if (panner) {
                    panner.pan.setValueAtTime(-1, time);
                    panner.pan.linearRampToValueAtTime(1, time + duration);
                }
                
                const gain = audioCtx.createGain();
                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(1.5, time + duration * 0.4); // increased from 1.2
                gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
                
                if (panner) {
                    noise.connect(filter);
                    filter.connect(panner);
                    panner.connect(gain);
                } else {
                    noise.connect(filter);
                    filter.connect(gain);
                }
                gain.connect(mainGainNode);
                
                noise.start(time);
                noise.stop(time + duration);
            } catch (err) {
                console.warn("Error playing train whoosh sound:", err);
            }
        }

        function playTrackClick(time) {
            triggerClickBurst(time);
            triggerClickBurst(time + 0.10);
            triggerClickBurst(time + 0.20);
        }
        
        function triggerClickBurst(time) {
            if (!audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(1200, time);
                
                const filter = audioCtx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.setValueAtTime(2500, time);
                filter.Q.setValueAtTime(4, time);
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(mainGainNode);
                
                gain.gain.setValueAtTime(0.22, time); // increased from 0.08
                gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
                
                osc.start(time);
                osc.stop(time + 0.06);
            } catch (err) {
                console.warn("Error triggering click burst:", err);
            }
        }

        function playMuffledKick(time) {
            if (!audioCtx) return;
            try {
                // Main low bass sweep
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                const filter = audioCtx.createBiquadFilter();
                
                filter.type = "lowpass";
                filter.frequency.setValueAtTime(280, time); // higher frequency cutoff to be audible on laptops
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(mainGainNode);
                
                osc.frequency.setValueAtTime(180, time);
                osc.frequency.exponentialRampToValueAtTime(50, time + 0.22);
                
                gain.gain.setValueAtTime(3.2, time); // significantly heavier gain
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.32);
                
                osc.start(time);
                osc.stop(time + 0.35);

                // Add a mid-frequency tick/click for transient speaker punch
                const clickOsc = audioCtx.createOscillator();
                const clickGain = audioCtx.createGain();
                clickOsc.type = "sine";
                clickOsc.frequency.setValueAtTime(1200, time);
                clickOsc.frequency.exponentialRampToValueAtTime(300, time + 0.03);
                
                clickOsc.connect(clickGain);
                clickGain.connect(mainGainNode);
                
                clickGain.gain.setValueAtTime(0.15, time);
                clickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.03);
                
                clickOsc.start(time);
                clickOsc.stop(time + 0.04);
            } catch (err) {
                console.warn("Error playing muffled kick:", err);
            }
        }

        function playBassNote(time, freq) {
            if (!audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                const filter = audioCtx.createBiquadFilter();
                
                osc.type = "sawtooth";
                filter.type = "lowpass";
                filter.frequency.setValueAtTime(250, time); // higher cut-off lets buzzy texture cut through
                filter.frequency.exponentialRampToValueAtTime(450, time + 0.15);
                filter.frequency.exponentialRampToValueAtTime(150, time + 0.4);
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(mainGainNode);
                
                osc.frequency.setValueAtTime(freq, time);
                
                gain.gain.setValueAtTime(1.4, time); // doubled from 0.7
                gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);
                
                osc.start(time);
                osc.stop(time + 0.5);
            } catch (err) {
                console.warn("Error playing bass note:", err);
            }
        }

        function playIntroTechnoBeat() {
            if (!isIntroActive) return;
            if (!audioCtx) return;
            
            try {
                const stepDuration = 0.25; 
                const time = audioCtx.currentTime;
                
                if (introStep % 4 === 0) {
                    playMuffledKick(time);
                }
                if (introStep % 8 === 2) {
                    playTrackClick(time);
                }
                if (introStep % 2 === 1) {
                    const bassFreqs = [55.00, 55.00, 65.41, 65.41, 48.99, 48.99, 58.27, 58.27];
                    const freq = bassFreqs[Math.floor(introStep / 2) % bassFreqs.length];
                    playBassNote(time, freq);
                }
                
                introStep = (introStep + 1) % 16;
            } catch (err) {
                console.warn("Error in intro techno beat step:", err);
            }
            
            if (isIntroActive) {
                introAudioSequencerTimer = setTimeout(playIntroTechnoBeat, 250);
            }
        }

        let sunsetSynthInterval = null;
        let waveNoiseNode = null;
        let waveGain = null;

        function playBandraSunsetTrack() {
            if (!audioCtx) initSynthAudio();
            if (audioCtx.state === 'suspended') audioCtx.resume();

            // 1. Synthesize relaxing beach waves noise
            try {
                // White noise buffer
                const bufferSize = audioCtx.sampleRate * 4; // 4 seconds buffer
                const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }
                
                const noiseSource = audioCtx.createBufferSource();
                noiseSource.buffer = noiseBuffer;
                noiseSource.loop = true;
                
                const filter = audioCtx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(350, audioCtx.currentTime);
                
                waveGain = audioCtx.createGain();
                waveGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                
                noiseSource.connect(filter);
                filter.connect(waveGain);
                waveGain.connect(mainGainNode);
                
                noiseSource.start();
                waveNoiseNode = noiseSource;
                
                // Modulate sea wave volume for breathing effect (every 4 seconds)
                const waveLFO = audioCtx.createOscillator();
                waveLFO.frequency.setValueAtTime(0.25, audioCtx.currentTime); // 4-second cycle
                const lfoGain = audioCtx.createGain();
                lfoGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
                waveLFO.connect(lfoGain);
                lfoGain.connect(waveGain.gain);
                waveLFO.start();
            } catch (err) {
                console.warn("Sea wave synth error:", err);
            }

            // Play train whistle at the beginning
            playTrainWhistle(audioCtx.currentTime + 0.5, 2.2);

            let step = 0;
            const stepDuration = 0.4; // 150 BPM at eighth notes, very chill lofi tempo

            // Chords: EbMaj7, Cm7, Fm7, Bb7
            const chords = [
                [155.56, 196.00, 233.08, 293.66], // EbMaj7 (Eb3, G3, Bb3, D4)
                [130.81, 155.56, 196.00, 233.08], // Cm7 (C3, Eb3, G3, Bb3)
                [174.61, 207.65, 261.63, 311.13], // Fm7 (F3, Ab3, C4, Eb4)
                [116.54, 146.83, 174.61, 207.65]  // Bb7 (Bb2, D3, F3, Ab3)
            ];

            // Beautiful pentatonic solo melody
            const melody = [
                293.66, 311.13, 349.23, 392.00, 466.16, 523.25, 587.33, 0,
                392.00, 0, 349.23, 311.13, 293.66, 0, 233.08, 0,
                311.13, 349.23, 392.00, 466.16, 523.25, 587.33, 622.25, 0,
                466.16, 0, 392.00, 349.23, 311.13, 0, 293.66, 0
            ];

            function playSunsetSequencer() {
                if (!isIntroActive) return;
                const time = audioCtx.currentTime;

                // 1. Play long lush chord pad on every 8 steps (every 3.2 seconds)
                if (step % 8 === 0) {
                    const chordIndex = Math.floor(step / 8) % chords.length;
                    const chordNotes = chords[chordIndex];
                    chordNotes.forEach(freq => {
                        const osc = audioCtx.createOscillator();
                        const g = audioCtx.createGain();
                        osc.type = 'triangle';
                        osc.frequency.setValueAtTime(freq, time);
                        
                        g.gain.setValueAtTime(0, time);
                        g.gain.linearRampToValueAtTime(0.04, time + 0.8);
                        g.gain.setValueAtTime(0.04, time + 2.4);
                        g.gain.exponentialRampToValueAtTime(0.001, time + 3.2);
                        
                        const lp = audioCtx.createBiquadFilter();
                        lp.type = 'lowpass';
                        lp.frequency.setValueAtTime(600, time);
                        
                        osc.connect(lp);
                        lp.connect(g);
                        g.connect(mainGainNode);
                        
                        osc.start(time);
                        osc.stop(time + 3.2);
                    });
                }

                // 2. Play lofi kick drum on step 0 and 4
                if (step % 4 === 0) {
                    playMuffledKick(time);
                }

                // 3. Play train track click-clacks on step 2 and 6 (light double tick)
                if (step % 4 === 2) {
                    playTrackClick(time);
                    playTrackClick(time + 0.08);
                }

                // 4. Play melodic solo synth notes (every step, if not 0)
                const melodyNote = melody[step % melody.length];
                if (melodyNote > 0 && Math.random() > 0.15) {
                    const osc = audioCtx.createOscillator();
                    const g = audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(melodyNote, time);
                    
                    // Modulate frequency slightly for retro vibrato
                    const vibrato = audioCtx.createOscillator();
                    vibrato.frequency.setValueAtTime(6, time); // 6 Hz vibrato
                    const vibGain = audioCtx.createGain();
                    vibGain.gain.setValueAtTime(3, time); // 3 Hz depth
                    vibrato.connect(vibGain);
                    vibGain.connect(osc.frequency);
                    vibrato.start(time);
                    vibrato.stop(time + 0.6);

                    g.gain.setValueAtTime(0, time);
                    g.gain.linearRampToValueAtTime(0.035, time + 0.08);
                    g.gain.exponentialRampToValueAtTime(0.001, time + 0.45);
                    
                    const filter = audioCtx.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.frequency.setValueAtTime(1000, time);
                    
                    osc.connect(filter);
                    filter.connect(g);
                    g.connect(mainGainNode);
                    
                    osc.start(time);
                    osc.stop(time + 0.5);
                }

                step++;
                sunsetSynthInterval = setTimeout(playSunsetSequencer, stepDuration * 1000);
            }

            playSunsetSequencer();
        }

        function stopBandraSunsetTrack() {
            if (sunsetSynthInterval) {
                clearTimeout(sunsetSynthInterval);
                sunsetSynthInterval = null;
            }
            if (waveNoiseNode) {
                try {
                    waveNoiseNode.stop();
                } catch (e) {}
                waveNoiseNode = null;
            }
            if (waveGain) {
                try {
                    waveGain.disconnect();
                } catch (e) {}
                waveGain = null;
            }
        }

        function playIntroSoundtrack() {
            if (isIntroAudioPlaying) return;
            isIntroAudioPlaying = true;
            
            if (!audioCtx) initSynthAudio();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            
            // Play our majestic Bandra Sunset procedural title track!
            playBandraSunsetTrack();
        }

        // Add event listeners on both intro wrapper and body to enable immediate sound initialization!
        document.addEventListener("click", () => {
            if (isIntroActive && !isIntroAudioPlaying) {
                startIntroAudio();
            }
        });
        document.addEventListener("keydown", () => {
            if (isIntroActive && !isIntroAudioPlaying) {
                startIntroAudio();
            }
        });

        function triggerProceduralLofiStreetBeat() {
            if (!audioCtx) initSynthAudio();
            if (audioCtx.state === 'suspended') audioCtx.resume();

            isSynthPlaying = true;
            const lofiBtn = document.getElementById("m-status");
            if (lofiBtn) lofiBtn.innerText = "🔊 STREET SYNTH: OPERATIONAL";

            let step = 0;
            const bpm = 80;
            const stepDuration = 60 / bpm / 2; // eighth notes

            function kick(time) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(mainGainNode);

                osc.frequency.setValueAtTime(140, time);
                osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.2);
                gain.gain.setValueAtTime(1, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

                osc.start(time);
                osc.stop(time + 0.22);
            }

            function snare(time) {
                const bufferSize = audioCtx.sampleRate * 0.12;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

                const noise = audioCtx.createBufferSource();
                noise.buffer = buffer;

                const filter = audioCtx.createBiquadFilter();
                filter.type = "highpass";
                filter.frequency.setValueAtTime(1200, time);

                const gain = audioCtx.createGain();
                gain.gain.setValueAtTime(0.25, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(mainGainNode);

                noise.start(time);
                noise.stop(time + 0.13);
            }

            function ambientPad(time, frequencies) {
                frequencies.forEach(freq => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, time);

                    const filter = audioCtx.createBiquadFilter();
                    filter.type = "lowpass";
                    filter.frequency.setValueAtTime(380, time);
                    filter.frequency.linearRampToValueAtTime(550, time + 0.8);

                    osc.connect(filter);
                    filter.connect(gain);
                    gain.connect(mainGainNode);

                    gain.gain.setValueAtTime(0, time);
                    gain.gain.linearRampToValueAtTime(0.14, time + 0.18);
                    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.75);

                    osc.start(time);
                    osc.stop(time + 0.8);
                });
            }

            // Hip-Hop chords: Fm7 -> DbMaj7 -> Bbm9 -> C7
            const chords = [
                [174.61, 207.65, 261.63, 311.13], // Fm7
                [138.59, 174.61, 220.00, 261.63], // DbMaj7
                [116.54, 138.59, 185.00, 233.08], // Bbm7
                [130.81, 164.81, 196.00, 246.94]  // C7
            ];

            function audioScheduler() {
                const aheadTime = 0.1;
                while (nextStepTime < audioCtx.currentTime + aheadTime) {
                    const time = nextStepTime;
                    
                    if (step % 8 === 0) kick(time);
                    if (step % 8 === 4) snare(time);
                    if (step % 16 === 10) kick(time + stepDuration / 2);

                    if (step % 16 === 0) {
                        const chordIdx = Math.floor(step / 16) % chords.length;
                        ambientPad(time, chords[chordIdx]);
                    }

                    step = (step + 1) % 64;
                    nextStepTime += stepDuration;
                }
                if (isSynthPlaying) {
                    synthSequencerTimer = setTimeout(audioScheduler, 25);
                }
            }

            let nextStepTime = audioCtx.currentTime;
            audioScheduler();
        }

        function stopProceduralLofiStreetBeat() {
            isSynthPlaying = false;
            if (synthSequencerTimer) clearTimeout(synthSequencerTimer);
            const lofiBtn = document.getElementById("m-status");
            if (lofiBtn) lofiBtn.innerText = "🔇 STREET SYNTH: ASLEEP";
        }

        function toggleMusic() {
            if (isSynthPlaying) {
                stopProceduralLofiStreetBeat();
            } else {
                triggerProceduralLofiStreetBeat();
            }
        }

        // ============================================================
        // RETRO ARCADE PROCEDURAL MUSIC ENGINE
        // ============================================================
        let gameMusicTimer = null;
        let isGameMusicPlaying = false;
        let currentGameMusicType = null;
        let wasAmbientMusicPlayingBeforeGame = false;

        function stopGameMusic() {
            isGameMusicPlaying = false;
            if (gameMusicTimer) {
                clearTimeout(gameMusicTimer);
                gameMusicTimer = null;
            }
            currentGameMusicType = null;

            // Automatically restore the majestic ambient street beat if it was playing before
            if (wasAmbientMusicPlayingBeforeGame) {
                wasAmbientMusicPlayingBeforeGame = false;
                triggerProceduralLofiStreetBeat();
            }
        }

        function playGameMusic(gameType) {
            // Check if ambient music was playing before pausing it
            wasAmbientMusicPlayingBeforeGame = isSynthPlaying;
            
            stopProceduralLofiStreetBeat(); // Silence main theme
            
            // Temporarily clear wasAmbientMusicPlayingBeforeGame from inner stopGameMusic call
            const savedAmbientState = wasAmbientMusicPlayingBeforeGame;
            stopGameMusic(); // Silence existing game theme
            wasAmbientMusicPlayingBeforeGame = savedAmbientState;
            
            if (!audioCtx) initSynthAudio();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            
            isGameMusicPlaying = true;
            currentGameMusicType = gameType;
            
            let step = 0;
            let tempo = 120; // Default tempo
            if (gameType === 'snake') tempo = 135;
            else if (gameType === 'sudoku') tempo = 90;
            else if (gameType === 'chess') tempo = 60;
            else if (gameType === 'pacman') tempo = 130;
            else if (gameType === 'roadrage') tempo = 145;
            else if (gameType === 'ludo') tempo = 110;

            const stepDuration = 60 / tempo / 2; // eighth notes

            function playStep() {
                if (!isGameMusicPlaying || currentGameMusicType !== gameType) return;
                if (!audioCtx || audioCtx.state === 'suspended') return;
                
                const time = audioCtx.currentTime;
                
                if (gameType === 'snake') {
                    // TECH-TRAIN BEAT: fast tick-wheels and driving rhythm
                    if (step % 8 === 0 || step % 8 === 4) {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.connect(gain); gain.connect(mainGainNode);
                        osc.frequency.setValueAtTime(100, time);
                        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.15);
                        gain.gain.setValueAtTime(0.4, time);
                        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
                        osc.start(time); osc.stop(time + 0.16);
                    }
                    if (step % 2 === 0) {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = "triangle";
                        osc.connect(gain); gain.connect(mainGainNode);
                        osc.frequency.setValueAtTime(step % 4 === 0 ? 800 : 600, time);
                        gain.gain.setValueAtTime(0.03, time);
                        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
                        osc.start(time); osc.stop(time + 0.05);
                    }
                    if (step % 8 === 2 || step % 8 === 6) {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = "sawtooth";
                        osc.connect(gain); gain.connect(mainGainNode);
                        osc.frequency.setValueAtTime(step % 8 === 2 ? 110 : 130, time);
                        gain.gain.setValueAtTime(0.08, time);
                        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
                        osc.start(time); osc.stop(time + 0.13);
                    }
                } 
                else if (gameType === 'sudoku') {
                    // AMBIENT JAZZ CHIMES: Relaxing, slow, focus-enhancing
                    if (step % 16 === 0) {
                        const notes = step % 32 === 0 ? [261.63, 329.63, 392.00, 493.88] : [293.66, 349.23, 440.00, 587.33];
                        notes.forEach((freq, idx) => {
                            const osc = audioCtx.createOscillator();
                            const gain = audioCtx.createGain();
                            osc.type = "sine";
                            osc.frequency.setValueAtTime(freq, time + idx * 0.03); // strummed
                            gain.gain.setValueAtTime(0, time);
                            gain.gain.linearRampToValueAtTime(0.06, time + 0.1);
                            gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
                            osc.connect(gain); gain.connect(mainGainNode);
                            osc.start(time); osc.stop(time + 1.3);
                        });
                    }
                    if (Math.random() < 0.15) {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = "triangle";
                        osc.frequency.setValueAtTime(1500 + Math.random() * 1000, time);
                        gain.gain.setValueAtTime(0.008, time);
                        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
                        osc.connect(gain); gain.connect(mainGainNode);
                        osc.start(time); osc.stop(time + 0.03);
                    }
                } 
                else if (gameType === 'chess') {
                    // MAJESTIC CHESS DRONE: slow organ style
                    if (step % 32 === 0) {
                        const chord = step % 64 === 0 ? [110.00, 165.00, 220.00, 329.63] : [146.83, 196.00, 293.66, 392.00];
                        chord.forEach(freq => {
                            const osc = audioCtx.createOscillator();
                            const gain = audioCtx.createGain();
                            osc.type = "triangle";
                            osc.frequency.setValueAtTime(freq, time);
                            gain.gain.setValueAtTime(0, time);
                            gain.gain.linearRampToValueAtTime(0.05, time + 0.4);
                            gain.gain.exponentialRampToValueAtTime(0.001, time + 3.0);
                            osc.connect(gain); gain.connect(mainGainNode);
                            osc.start(time); osc.stop(time + 3.2);
                        });
                    }
                } 
                else if (gameType === 'pacman') {
                    // CHEERFUL RETRO SQUARE MELODY: upbeat, high-tempo arcade
                    const melody = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
                    const notes = [4, 5, 6, 7, 6, 5, 4, 3, 2, 3, 4, 5, 4, 3, 2, 1];
                    const noteIdx = notes[step % notes.length];
                    const freq = melody[noteIdx % melody.length];
                    
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = "square";
                    osc.frequency.setValueAtTime(freq, time);
                    gain.gain.setValueAtTime(0.02, time);
                    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
                    osc.connect(gain); gain.connect(mainGainNode);
                    osc.start(time); osc.stop(time + 0.13);

                    if (step % 8 === 4) {
                        const snareOsc = audioCtx.createOscillator();
                        const snareGain = audioCtx.createGain();
                        snareOsc.type = "triangle";
                        snareOsc.frequency.setValueAtTime(150, time);
                        snareGain.gain.setValueAtTime(0.1, time);
                        snareGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
                        snareOsc.connect(snareGain); snareGain.connect(mainGainNode);
                        snareOsc.start(time); snareOsc.stop(time + 0.09);
                    }
                } 
                else if (gameType === 'roadrage') {
                    // DRIVING TECHNO RACER: fast sawtooth bass and driving rhythm
                    const bassNotes = [55, 55, 65.41, 65.41, 73.42, 73.42, 82.41, 82.41];
                    const freq = bassNotes[Math.floor(step / 2) % bassNotes.length];
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = "sawtooth";
                    osc.frequency.setValueAtTime(freq, time);
                    gain.gain.setValueAtTime(0.06, time);
                    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
                    osc.connect(gain); gain.connect(mainGainNode);
                    osc.start(time); osc.stop(time + 0.16);

                    if (step % 8 === 0 || step % 8 === 4) {
                        const kickOsc = audioCtx.createOscillator();
                        const kickGain = audioCtx.createGain();
                        kickOsc.connect(kickGain); kickGain.connect(mainGainNode);
                        kickOsc.frequency.setValueAtTime(130, time);
                        kickOsc.frequency.exponentialRampToValueAtTime(0.01, time + 0.12);
                        kickGain.gain.setValueAtTime(0.6, time);
                        kickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
                        kickOsc.start(time); kickOsc.stop(time + 0.14);
                    }
                    if (step % 8 === 2 || step % 8 === 6) {
                        const hihat = audioCtx.createOscillator();
                        const hihatGain = audioCtx.createGain();
                        hihat.connect(hihatGain); hihatGain.connect(mainGainNode);
                        hihat.type = "triangle";
                        hihat.frequency.setValueAtTime(1000 + Math.random() * 1500, time);
                        hihatGain.gain.setValueAtTime(0.03, time);
                        hihatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
                        hihat.start(time); hihat.stop(time + 0.06);
                    }
                } 
                else if (gameType === 'ludo') {
                    // BOUNCY STREET CARNIVAL PLUCKS: light pentatonic scale marimba
                    const pentatonic = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
                    const melodyPattern = [0, 2, 4, 3, 5, 4, 6, 7, 5, 3, 4, 2, 1, 0, 2, 1];
                    const noteIdx = melodyPattern[step % melodyPattern.length];
                    const freq = pentatonic[noteIdx % pentatonic.length];

                    if (step % 2 === 0) {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = "triangle";
                        osc.frequency.setValueAtTime(freq, time);
                        gain.gain.setValueAtTime(0, time);
                        gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
                        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
                        osc.connect(gain); gain.connect(mainGainNode);
                        osc.start(time); osc.stop(time + 0.25);
                    }

                    if (step % 4 === 0) {
                        const kickOsc = audioCtx.createOscillator();
                        const kickGain = audioCtx.createGain();
                        kickOsc.connect(kickGain); kickGain.connect(mainGainNode);
                        kickOsc.frequency.setValueAtTime(90, time);
                        kickOsc.frequency.exponentialRampToValueAtTime(0.01, time + 0.15);
                        kickGain.gain.setValueAtTime(0.3, time);
                        kickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
                        kickOsc.start(time); kickOsc.stop(time + 0.16);
                    }
                }

                step = (step + 1) % 64;
                gameMusicTimer = setTimeout(playStep, stepDuration * 1000);
            }

            playStep();
        }

        // Web Audio API beep synthesizer helper defined globally on window to prevent ReferenceErrors
        function playBeepSound(frequency, duration) {
            if (!audioCtx) initSynthAudio();
            if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                if (mainGainNode) {
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
        window.playBeepSound = playBeepSound;
        window.playGameMusic = playGameMusic;
        window.stopGameMusic = stopGameMusic;

