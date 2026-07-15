(function() {
    // --- KIDS PLAYGROUND CODING COURSE DATA & WORKSPACE CORE ---
    
    const LEARNING_TEMPLATES = {
        beginner: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background-color: #0b071a;
            color: white;
            font-family: 'Segoe UI', sans-serif;
            text-align: center;
            padding: 30px;
            margin: 0;
        }
        .board {
            border: 3px solid #ff008c;
            border-radius: 16px;
            padding: 30px;
            display: inline-block;
            background: rgba(255, 255, 255, 0.02);
            box-shadow: 0 0 25px rgba(255,0,140,0.4);
            margin-top: 40px;
        }
        h1 {
            font-size: 3rem;
            color: #00ffcc;
            text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc;
            margin: 0 0 10px 0;
            text-transform: uppercase;
            font-family: 'Arial Black', sans-serif;
        }
        p {
            font-size: 1.1rem;
            color: rgba(255,255,255,0.75);
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="board">
        <h1>NEON GRAFFITI</h1>
        <p>Edit this HTML & style properties to make your own custom neon banner!</p>
    </div>
</body>
</html>`,

        intermediate: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background: linear-gradient(135deg, #12092b 0%, #050212 100%);
            color: white;
            font-family: system-ui, sans-serif;
            text-align: center;
            padding: 40px 20px;
            margin: 0;
        }
        button {
            background: linear-gradient(135deg, #ffaa00 0%, #ff5e00 100%);
            border: none;
            color: black;
            font-weight: 900;
            padding: 16px 36px;
            font-size: 1.2rem;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(255,170,0,0.5);
            transition: all 0.2s ease;
            text-transform: uppercase;
        }
        button:hover {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 8px 25px rgba(255,170,0,0.8);
        }
        #sound-label {
            margin-top: 25px;
            font-size: 1rem;
            color: #00ffff;
            text-shadow: 0 0 10px #00ffff;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h2>🔊 MUMBAI SOUNDBOARD</h2>
    <p>JavaScript listens to your click and triggers localized cutting-frequency wave notes!</p>
    <br/>
    <button onclick="playMumbaiBeep()">🔊 SYNTHESIZE FREQUENCY</button>
    <div id="sound-label">Ready to generate synth notes...</div>

    <script>
        function playMumbaiBeep() {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                // Synthesize localized wave frequency (400Hz - 1000Hz range)
                const freq = 400 + Math.random() * 600;
                osc.type = 'sawtooth';
                osc.frequency.value = freq;
                
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
                
                document.getElementById("sound-label").innerText = "BOOM! Active Note: " + Math.floor(freq) + " Hz ⚡";
            } catch(e) {
                document.getElementById("sound-label").innerText = "Web Audio API initialized.";
            }
        }
    </script>
</body>
</html>`,

        pro: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background: #080512;
            color: white;
            font-family: 'Segoe UI', system-ui, sans-serif;
            text-align: center;
            padding: 24px;
            margin: 0;
        }
        .game-card {
            background: rgba(255,255,255,0.03);
            border: 2px solid #00ffcc;
            border-radius: 20px;
            padding: 28px;
            max-width: 320px;
            margin: 0 auto;
            box-shadow: 0 10px 30px rgba(0,255,204,0.25);
        }
        .coin-btn {
            font-size: 4.5rem;
            cursor: pointer;
            background: none;
            border: none;
            outline: none;
            transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            margin-bottom: 12px;
        }
        .coin-btn:active {
            transform: scale(0.82) rotate(-5deg);
        }
        .score-val {
            font-size: 2.5rem;
            font-weight: 900;
            color: #ff008c;
            text-shadow: 0 0 15px rgba(255,0,140,0.6);
            margin: 10px 0;
        }
        .upgrade-btn {
            background: #00ffcc;
            color: #000;
            border: none;
            padding: 12px 20px;
            font-weight: 900;
            font-size: 0.95rem;
            border-radius: 10px;
            cursor: pointer;
            width: 100%;
            text-transform: uppercase;
            box-shadow: 0 4px 10px rgba(0,255,204,0.3);
            transition: all 0.2s;
        }
        .upgrade-btn:hover {
            background: #00e5ff;
            box-shadow: 0 6px 15px rgba(0,229,255,0.5);
        }
    </style>
</head>
<body>
    <div class="game-card">
        <h3>☕ CHAI CLICKER PRO</h3>
        <p style="font-size: 0.8rem; opacity:0.75; margin-top: -5px;">Tap the cup to brew double cutting chais!</p>
        
        <button class="coin-btn" onclick="brewChai()">☕</button>
        
        <div class="score-val" id="score">0</div>
        
        <button class="upgrade-btn" onclick="buyMultiplier()">BUY UPGRADE (Cost: <span id="cost">10</span>)</button>
        <p style="font-size: 0.8rem; color:#ffaa00; margin-top:12px; font-weight:800;">MULTIPLIER: <span id="mult">1</span>x per tap</p>
    </div>

    <script>
        let score = 0;
        let multiplier = 1;
        let upgradeCost = 10;

        function brewChai() {
            score += multiplier;
            document.getElementById("score").innerText = score;
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.frequency.value = 600 + (score * 8) % 400;
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(); osc.stop(ctx.currentTime + 0.05);
            } catch(e){}
        }

        function buyMultiplier() {
            if (score >= upgradeCost) {
                score -= upgradeCost;
                multiplier += 1;
                upgradeCost = Math.floor(upgradeCost * 1.85);
                document.getElementById("score").innerText = score;
                document.getElementById("cost").innerText = upgradeCost;
                document.getElementById("mult").innerText = multiplier;
            } else {
                alert("You need more cutting chais brewed to buy this upgrade!");
            }
        }
    </script>
</body>
</html>`,

        beginner_motion: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background-color: #05030a;
            color: white;
            font-family: sans-serif;
            text-align: center;
            padding: 40px;
            margin: 0;
        }
        .glitch-box {
            position: relative;
            font-size: 3rem;
            font-weight: 900;
            text-transform: uppercase;
            color: #00ff66;
            text-shadow: 0 0 10px rgba(0, 255, 102, 0.5);
            animation: pulse 1.5s infinite alternate;
        }
        @keyframes pulse {
            0% { transform: scale(1); filter: hue-rotate(0deg); }
            100% { transform: scale(1.05); filter: hue-rotate(90deg); }
        }
    </style>
</head>
<body>
    <div class="glitch-box">GLITCH_VIBE</div>
    <p style="color: #888; font-size: 1rem; margin-top: 20px;">Edit the animation timing or color rotation values to customize this motion!</p>
</body>
</html>`,

        intermediate_animator: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background: #110d24;
            color: white;
            font-family: sans-serif;
            text-align: center;
            padding: 20px;
            margin: 0;
        }
        .canvas-area {
            border: 2px dashed #ff008c;
            border-radius: 12px;
            background: rgba(255,255,255,0.02);
            height: 180px;
            margin: 20px auto;
            max-width: 320px;
            position: relative;
            overflow: hidden;
        }
        .skater {
            position: absolute;
            bottom: 20px;
            left: 120px;
            font-size: 3rem;
            transition: all 0.2s;
        }
        button {
            background: #ff008c;
            color: white;
            border: none;
            padding: 10px 20px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            margin: 5px;
        }
    </style>
</head>
<body>
    <h3>🛹 PIXEL SKATER ANIMATOR</h3>
    <div class="canvas-area">
        <div class="skater" id="avatar">🛹</div>
    </div>
    <button onclick="skate('left')">◀ KICK LEFT</button>
    <button onclick="skate('right')">KICK RIGHT ▶</button>
    <button onclick="skate('jump')">🚀 OLLIE JUMP</button>

    <script>
        let pos = 120;
        function skate(dir) {
            const avatar = document.getElementById("avatar");
            if (dir === 'left') {
                pos = Math.max(10, pos - 30);
                avatar.style.left = pos + 'px';
            } else if (dir === 'right') {
                pos = Math.min(250, pos + 30);
                avatar.style.left = pos + 'px';
            } else if (dir === 'jump') {
                avatar.style.transform = 'translateY(-60px) scale(1.2)';
                setTimeout(() => { avatar.style.transform = 'none'; }, 200);
            }
        }
    </script>
</body>
</html>`,

        pro_canvas: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background: #000;
            color: #00ffcc;
            font-family: monospace;
            text-align: center;
            margin: 0;
            padding: 15px;
        }
        canvas {
            border: 2px solid #00ffcc;
            background: #111;
            display: block;
            margin: 10px auto;
            box-shadow: 0 0 15px rgba(0,255,204,0.3);
        }
        button {
            background: #00ffcc;
            border: none;
            padding: 8px 16px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h4>🛺 RETRO RICKSHAW DRIFT</h4>
    <canvas id="raceCanvas" width="280" height="150"></canvas>
    <button onclick="steer()">DRIFT STEER 🛺</button>

    <script>
        const canvas = document.getElementById("raceCanvas");
        const ctx = canvas.getContext("2d");
        let rickshawX = 120;
        let speed = 2;
        let lineY = 0;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw road lines
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(140, 0); ctx.lineTo(140, canvas.height);
            ctx.stroke();

            // Draw rickshaw
            ctx.fillStyle = "#ffaa00";
            ctx.fillRect(rickshawX, 110, 30, 25);
            ctx.fillStyle = "#000";
            ctx.fillRect(rickshawX + 5, 135, 6, 5);
            ctx.fillRect(rickshawX + 19, 135, 6, 5);

            // Draw obstacle
            ctx.fillStyle = "#ff0055";
            ctx.fillRect(125, lineY, 20, 20);

            lineY = (lineY + speed) % canvas.height;
            requestAnimationFrame(draw);
        }
        function steer() {
            rickshawX = rickshawX === 120 ? 80 : 120;
        }
        draw();
    </script>
</body>
</html>`
    };

    const TUTORIAL_GUIDES = {
        beginner: `
            <p><strong>1. HTML tags:</strong> The <code>&lt;h1&gt;</code> sets a big title, while <code>&lt;p&gt;</code> writes body text.</p>
            <p><strong>2. Paint CSS:</strong> Look inside <code>&lt;style&gt;</code>. Change <code>color: #00ffcc</code> to another hex code (e.g. <code>#ff0055</code> or <code>#00ff66</code>) and press <strong>RUN CODE</strong>!</p>
            <p><strong>3. Edit Text:</strong> Change "NEON GRAFFITI" inside the HTML body to your skater gang name!</p>
        `,
        intermediate: `
            <p><strong>1. DOM Element:</strong> JavaScript uses <code>document.getElementById()</code> to target the label on screen.</p>
            <p><strong>2. Audio Synth:</strong> In the script, find <code>const freq = 400 + Math.random() * 600</code>. Change this to <code>800 + Math.random() * 200</code> for higher pitch chimes!</p>
            <p><strong>3. Customize Button:</strong> Modify the CSS inside <code>button { background: ... }</code> to make it neon magenta!</p>
        `,
        pro: `
            <p><strong>1. App States:</strong> The variable <code>score</code> stores how many cups have been brewed, saved locally.</p>
            <p><strong>2. Upgrades Multiplier:</strong> Change the upgrade logic so that each multiplier purchase gives you <strong>+3</strong> per tap instead of +1!</p>
            <p><strong>3. Retheming:</strong> Change the emoji inside the clicker button from <code>☕</code> (chai) to <code>🛹</code> (skate board) or <code>🛺</code> (rickshaw) for a whole new game!</p>
        `,
        beginner_motion: `
            <p><strong>1. Glitch Animation:</strong> The keyframe animation <code>pulse</code> scales and rotates the hue of the text.</p>
            <p><strong>2. Tweak Text:</strong> Edit the text <code>GLITCH_VIBE</code> to your own code name!</p>
            <p><strong>3. Tweak Pulse Speed:</strong> Change <code>1.5s</code> in the animation parameter to <code>0.5s</code> for an ultra-fast cyberpunk rapid strobe flicker!</p>
        `,
        intermediate_animator: `
            <p><strong>1. CSS Positioning:</strong> The skater is positioned with <code>position: absolute</code> inside a relative container.</p>
            <p><strong>2. Click Events:</strong> The buttons listen to click events and pass arguments to the <code>skate()</code> function.</p>
            <p><strong>3. Speed multi:</strong> Modify <code>pos + 30</code> to <code>pos + 60</code> to make your skater leap twice as far across the screen on each kick!</p>
        `,
        pro_canvas: `
            <p><strong>1. Canvas Context:</strong> Uses 2D context methods like <code>fillRect()</code> and <code>clearRect()</code> to draw game graphics.</p>
            <p><strong>2. Game Loops:</strong> Leverages <code>requestAnimationFrame(draw)</code> to continuously refresh and redraw the frame.</p>
            <p><strong>3. Customize Rickshaw:</strong> Change <code>ctx.fillStyle = "#ffaa00"</code> to <code>"#00ffcc"</code> to paint your auto-rickshaw neon turquoise!</p>
        `
    };

    const DEFAULT_SHOWCASE_PROJECTS = [
        { id: 'remix-1', title: 'SUNSET SKATE DRIFTER', author: 'Aryan_Bandra_SK8', emoji: '🛹', code: `<!DOCTYPE html><html><head><style>body { background: #130225; color: white; font-family: sans-serif; text-align: center; padding: 20px;} h1 { color: #ff00c3; text-shadow: 0 0 10px #ff00c3; } .board { border: 2px solid #00f0ff; border-radius: 12px; padding: 20px; display: inline-block; background: rgba(0,0,0,0.5); }</style></head><body><div class="board"><h1>🛹 RIDE THE BREEZE</h1><p>Designed by Aryan. Old Chapel Road skate drift crew!</p></div></body></html>` },
        { id: 'remix-2', title: 'CHAI SCORE CLICKER', author: 'Kabir_Derby_X', emoji: '☕', code: `<!DOCTYPE html><html><head><style>body { background: #050508; color: white; text-align: center; padding: 40px; font-family: monospace; } button { background: #00ff66; padding: 15px; border-radius: 10px; font-weight: 900; cursor: pointer; }</style></head><body><h2>☕ DOUBLE CUTTING INCREMENTER</h2><div id="val" style="font-size: 3rem; color: #ffea00;">0</div><br/><button onclick="add()">TAP TO BREW</button><script>let score=0; function add() { score++; document.getElementById("val").innerText=score; }</script></body></html>` },
        { id: 'remix-3', title: 'PALI NEON MATRIX', author: 'Sona_Glow_12', emoji: '👾', code: `<!DOCTYPE html><html><head><style>body { background: black; color: #39ff14; font-family: monospace; text-align: center; padding-top: 50px; } .matrix { border: 2px solid #39ff14; padding: 20px; box-shadow: 0 0 20px #39ff14; display: inline-block; }</style></head><body><div class="matrix"><h2>👾 MATRIX GRID SECURE</h2><p>Hacking old Pali Hill database system...</p></div></body></html>` },
        { id: 'remix-4', title: 'CARTER ROAD DJ MIXER', author: 'DJ_Karan_Bandra', emoji: '🎚️', code: `<!DOCTYPE html><html><head><style>body { background: #09021a; color: #ff007f; font-family: sans-serif; text-align: center; padding-top: 30px; } button { background: #ff007f; color: white; border: none; padding: 12px 24px; font-size: 1.1rem; border-radius: 20px; cursor: pointer; box-shadow: 0 0 15px #ff007f; }</style></head><body><h3>🎚️ BEAT WAVE OSCILLATOR</h3><p>Tap below to trigger an ambient electronic sine tone!</p><br/><button onclick="beep()">TRIGGER FREQUENCY</button><script>function beep() { const c=new (window.AudioContext||window.webkitAudioContext)(); const o=c.createOscillator(); o.frequency.value=440; o.connect(c.destination); o.start(); o.stop(c.currentTime+0.2); }</script></body></html>` },
        { id: 'remix-5', title: 'RICKSHAW DRIFT SIM', author: 'Drifty_Arjun', emoji: '🛺', code: `<!DOCTYPE html><html><head><style>body { background: #111; color: #ffcc00; font-family: monospace; text-align: center; padding-top: 30px; } .meter { border: 3px double #ffcc00; display: inline-block; padding: 20px; background: #222; }</style></head><body><div class="meter"><h2>🛺 DRIFT SECTOR ACTIVE</h2><p>Current Speed: <span style="color: #ff3300;">120 KM/H</span></p><p>Multiplier: 2.5x</p></div></body></html>` },
        { id: 'remix-6', title: 'GLITCH PROTOCOL X', author: 'Cyber_Siddharth', emoji: '🔮', code: `<!DOCTYPE html><html><head><style>body { background: #04020d; color: #00ffff; font-family: sans-serif; text-align: center; padding-top: 40px; } .card { border: 1px solid #00ffff; padding: 30px; border-radius: 12px; box-shadow: 0 0 25px rgba(0,255,255,0.4); display: inline-block; }</style></head><body><div class="card"><h2>🔮 MATRIX GLITCH CARD</h2><p>Cybernetic encryption overlay complete.</p></div></body></html>` },
        { id: 'remix-7', title: 'NEON SPRAY STENCIL', author: 'Sneha_Stencil', emoji: '🎨', code: `<!DOCTYPE html><html><head><style>body { background: #0e0514; color: #ffea00; text-align: center; font-family: sans-serif; padding: 20px; } .wall { background: #2c1a3c; border: 4px dashed #ff007f; border-radius: 12px; width: 280px; height: 180px; margin: 20px auto; position: relative; cursor: crosshair; display: flex; align-items: center; justify-content: center; } h3 { text-shadow: 0 0 8px #ffea00; }</style></head><body><h3>🎨 GRAFFITI SPRAY WALL</h3><p>Tap inside the box below to leave neon tags!</p><div class="wall" onclick="tag(event)"><span id="prompt">TAP TO SPRAY</span></div><script>function tag(e){ document.getElementById("prompt").style.display="none"; const dot=document.createElement("div"); dot.style.position="absolute"; dot.style.width="20px"; dot.style.height="20px"; dot.style.borderRadius="50%"; dot.style.background="#00ffcc"; dot.style.boxShadow="0 0 10px #00ffcc"; dot.style.left=(e.offsetX - 10) + "px"; dot.style.top=(e.offsetY - 10) + "px"; e.currentTarget.appendChild(dot); }</script></body></html>` },
        { id: 'remix-8', title: 'HILL ROAD DISCO LIGHTS', author: 'Rohan_Rhythm', emoji: '💃', code: `<!DOCTYPE html><html><head><style>body { background: #04040a; color: white; font-family: monospace; text-align: center; padding: 20px; } .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 150px; margin: 20px auto; } .cell { width: 40px; height: 40px; background: #222; border-radius: 5px; transition: background 0.1s; }</style></head><body><h3>💃 DISCO GRID</h3><button onclick="flash()">FLASH RETRO LIGHTS</button><div class="grid"><div class="cell" id="c1"></div><div class="cell" id="c2"></div><div class="cell" id="c3"></div><div class="cell" id="c4"></div><div class="cell" id="c5"></div><div class="cell" id="c6"></div><div class="cell" id="c7"></div><div class="cell" id="c8"></div><div class="cell" id="c9"></div></div><script>function flash(){ const colors=["#ff00ff","#00ffff","#ffff00","#00ff00","#ff0000"]; for(let i=1; i<=9; i++){ document.getElementById("c"+i).style.background = colors[Math.floor(Math.random()*colors.length)]; } }</script></body></html>` },
        { id: 'remix-9', title: 'CUTTING CHAI PYRAMID', author: 'Ananya_Brews', emoji: '🥞', code: `<!DOCTYPE html><html><head><style>body { background: #08110b; color: #00ff66; text-align: center; font-family: sans-serif; padding: 20px; } .glass { display: inline-block; width: 30px; height: 40px; background: rgba(0, 255, 100, 0.2); border: 2px solid #00ff66; border-radius: 4px; margin: 4px; line-height: 40px; font-weight: bold; }</style></head><body><h3>🥞 TEA GLASS STACK</h3><div id="stack"><div class="glass">1</div><div class="glass">2</div><div class="glass">3</div></div><br/><button onclick="addGlass()">STACK ANOTHER GLASS</button><script>let count=3; function addGlass(){ count++; const g=document.createElement("div"); g.className="glass"; g.innerText=count; document.getElementById("stack").appendChild(g); }</script></body></html>` },
        { id: 'remix-10', title: 'RAILWAY HORN RHYTHM', author: 'Bandra_Horn_Hacker', emoji: '🎺', code: `<!DOCTYPE html><html><head><style>body { background: #0d0d0d; color: #ff5500; font-family: monospace; text-align: center; padding: 30px; } button { background: #ff5500; color: black; border: none; padding: 15px 30px; font-weight: bold; font-size: 1.2rem; cursor: pointer; border-radius: 8px; box-shadow: 0 0 15px rgba(255,85,0,0.4); }</style></head><body><h2>🎺 LOCAL TRAIN HONK</h2><p>Synthesize a high-pitch rail horn beat</p><br/><button onclick="honk()">BLOW HORN</button><script>function honk(){ const c=new (window.AudioContext||window.webkitAudioContext)(); const o1=c.createOscillator(); const o2=c.createOscillator(); o1.frequency.value=480; o2.frequency.value=485; o1.connect(c.destination); o2.connect(c.destination); o1.start(); o2.start(); o1.stop(c.currentTime+0.4); o2.stop(c.currentTime+0.4); }</script></body></html>` },
        { id: 'remix-11', title: 'SKATEPARK OLLIE TIMER', author: 'Ollie_King_88', emoji: '🛹', code: `<!DOCTYPE html><html><head><style>body { background: #1a1a2e; color: #00f0ff; text-align: center; font-family: sans-serif; padding-top: 30px; } .skater { font-size: 4rem; transition: transform 0.2s; display: inline-block; margin: 40px; }</style></head><body><h3>🛹 OLLIE AIRTIME TIME</h3><p>Tap below to launch a perfect jump!</p><div class="skater" id="skater">🛹</div><br/><button onclick="jump()">TRIGGER OLLIE</button><script>function jump(){ const s=document.getElementById("skater"); s.style.transform="translateY(-80px) rotate(-15deg)"; setTimeout(()=>{ s.style.transform="translateY(0) rotate(0)"; }, 300); }</script></body></html>` },
        { id: 'remix-12', title: 'NEON TAPRI CLOCK', author: 'Tushar_Time', emoji: '⏰', code: `<!DOCTYPE html><html><head><style>body { background: #000; color: #00ffff; text-align: center; font-family: monospace; padding-top: 50px; } .clock { font-size: 3rem; text-shadow: 0 0 20px #00ffff; border: 3px solid #ff00ff; border-radius: 12px; padding: 20px; display: inline-block; background: #0a000a; }</style></head><body><h3>⏰ BANDRA TIME CHRONOS</h3><div class="clock" id="time">00:00:00</div><script>setInterval(()=>{ const d=new Date(); document.getElementById("time").innerText = d.toTimeString().split(" ")[0]; }, 1000);</script></body></html>` }
    ];

    let activeLearningTrack = 'beginner';

    function initLearningPlayground() {
        // Load default/localStorage showcase projects
        loadCommunityShowcase();
        
        // Default to showing the landing gallery & courses list first
        const landing = document.getElementById("learning-hub-landing");
        const playground = document.getElementById("learning-hub-playground");
        if (landing) landing.style.display = "block";
        if (playground) playground.style.display = "none";

        // Hide back button because we are on the landing screen
        if (typeof window.setModalBackBtnVisibility === "function") {
            window.setModalBackBtnVisibility(false);
        }
    }

    function loadLearningTrack(trackKey, element) {
        activeLearningTrack = trackKey;
        
        // Manage active track styling in sidebar
        const cards = document.querySelectorAll(".learning-track-card");
        cards.forEach(c => c.classList.remove("active"));
        if (element) {
            element.classList.add("active");
        } else {
            // Find manually based on trackKey
            const index = ['beginner', 'intermediate', 'pro', 'beginner_motion', 'intermediate_animator', 'pro_canvas'].indexOf(trackKey);
            if (cards[index]) cards[index].classList.add("active");
        }
        
        // Load Code Template to Editor
        const editor = document.getElementById("sandboxCodeEditor");
        if (editor) {
            editor.value = LEARNING_TEMPLATES[trackKey];
            syncEditorLines();
        }
        
        // Load tutorial guide steps
        const guideBox = document.getElementById("tutorial-steps-text");
        if (guideBox) {
            guideBox.innerHTML = TUTORIAL_GUIDES[trackKey];
        }
        
        // Switch to playground panel view!
        const landing = document.getElementById("learning-hub-landing");
        const playground = document.getElementById("learning-hub-playground");
        if (landing) landing.style.display = "none";
        if (playground) playground.style.display = "block";

        // Show back button so they can return to the gallery/courses view
        if (typeof window.setModalBackBtnVisibility === "function") {
            window.setModalBackBtnVisibility(true, "◀ BACK");
        }

        // Auto-run/preview the code instantly!
        setTimeout(runSandboxCode, 100);
        
        // Play beep sound
        if (typeof playBeepSound === "function") {
            playBeepSound(493.88, 0.05); // B4
        }
    }

    function resetLearningEditor() {
        const confirmReset = confirm("Are you sure you want to discard your edits and restore the template project?");
        if (confirmReset) {
            const editor = document.getElementById("sandboxCodeEditor");
            if (editor) {
                editor.value = LEARNING_TEMPLATES[activeLearningTrack];
                syncEditorLines();
                runSandboxCode();
            }
        }
    }

    function runSandboxCode() {
        const editor = document.getElementById("sandboxCodeEditor");
        const iframe = document.getElementById("learningSandboxPreview");
        if (!editor || !iframe) return;
        
        const code = editor.value;
        
        // Inject code safely into the sandboxed iframe
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframe.src = url;
        
        // Trigger visual glow effect on previewer panel
        const frame = document.querySelector(".previewer-outer-frame");
        if (frame) {
            frame.classList.add("preview-reloaded-glow");
            setTimeout(() => frame.classList.remove("preview-reloaded-glow"), 500);
        }
        
        // Play a high technical chime
        if (typeof playBeepSound === "function") {
            playBeepSound(880, 0.04);
        }
    }

    function syncEditorLines() {
        const editor = document.getElementById("sandboxCodeEditor");
        const numbersContainer = document.querySelector(".editor-line-numbers");
        if (!editor || !numbersContainer) return;
        
        const lineCount = editor.value.split("\\n").length;
        const targetCount = Math.max(lineCount, 22); // Fill height
        
        let spans = "";
        for (let i = 1; i <= targetCount; i++) {
            spans += `<span>${i}</span>`;
        }
        numbersContainer.innerHTML = spans;
    }

    // --- COMMUNITY SHOWCASE COLLAGE CONTROLLER ---
    
    function loadCommunityShowcase() {
        const grid = document.getElementById("collageMasonryGrid");
        if (!grid) return;
        
        grid.innerHTML = "";
        
        // Fetch custom submissions from localStorage
        let customSubmissions = [];
        try {
            const stored = localStorage.getItem("bandra_hustlers_collage_works");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    customSubmissions = parsed;
                }
            }
        } catch(e) {
            console.warn("Could not read local showcase database:", e);
        }
        
        // Combine default with custom
        const allShowcases = [...customSubmissions, ...DEFAULT_SHOWCASE_PROJECTS];
        
        allShowcases.forEach(proj => {
            const card = document.createElement("div");
            card.className = "collage-item-card";
            card.onclick = () => loadShowcaseToEditor(proj.id, proj.title, proj.code);
            
            card.innerHTML = `
                <div class="collage-item-emoji-shield">${proj.emoji || '🚀'}</div>
                <div class="collage-item-details">
                    <h4 class="collage-item-title">${proj.title}</h4>
                    <span class="collage-item-author">@${proj.author}</span>
                </div>
                <button class="collage-item-inspect-btn">REMIX & RUN</button>
            `;
            grid.appendChild(card);
        });
    }

    function loadShowcaseToEditor(projId, title, code) {
        const editor = document.getElementById("sandboxCodeEditor");
        if (!editor) return;
        
        // Prompt for remix
        const confirmRemix = confirm(`Load "${title}" directly into your workspace editor to inspect and remix their code? This will replace your current workspace.`);
        if (confirmRemix) {
            editor.value = code;
            syncEditorLines();
            runSandboxCode();
            
            // Focus editor
            editor.focus();
            
            // Switch to playground panel view!
            const landing = document.getElementById("learning-hub-landing");
            const playground = document.getElementById("learning-hub-playground");
            if (landing) landing.style.display = "none";
            if (playground) playground.style.display = "block";

            // Show back button so they can return to the gallery/courses view
            if (typeof window.setModalBackBtnVisibility === "function") {
                window.setModalBackBtnVisibility(true, "◀ BACK");
            }

            // Add custom notification steps text to denote a remix project is loaded
            const stepsBox = document.getElementById("tutorial-steps-text");
            if (stepsBox) {
                stepsBox.innerHTML = `
                    <p class="neon-text-blink" style="color: var(--cyan);">🎮 REMIX MODE ENABLED!</p>
                    <p>You have loaded <strong>${title}</strong>. Tweak its styling properties, change headings, rewrite the script formulas, and hit <strong>RUN CODE</strong> to customize it!</p>
                `;
            }
        }
    }

    // --- UPLOAD / PUBLISH MODAL FORM FOR GALLERY ---
    
    function openShowcaseSubmitModal() {
        const modal = document.getElementById("showcaseSubmitModal");
        if (modal) {
            modal.style.display = "flex";
            
            // Pre-populate app title from current selected track if possible
            const appTitleInput = document.getElementById("submitAppTitle");
            if (appTitleInput) {
                if (activeLearningTrack === 'beginner') appTitleInput.value = "Custom Neon Graff";
                else if (activeLearningTrack === 'beginner_motion') appTitleInput.value = "Glitch Motion Web";
                else if (activeLearningTrack === 'intermediate') appTitleInput.value = "My Mumbai Synth";
                else if (activeLearningTrack === 'intermediate_animator') appTitleInput.value = "Pixel Skater Pro";
                else if (activeLearningTrack === 'pro_canvas') appTitleInput.value = "Rickshaw drift game";
                else appTitleInput.value = "Chai Clicker Remix";
            }
        }
    }

    function closeShowcaseSubmitModal() {
        const modal = document.getElementById("showcaseSubmitModal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    function confirmShowcaseSubmit() {
        const titleInput = document.getElementById("submitAppTitle");
        const authorInput = document.getElementById("submitAppAuthor");
        const emojiInput = document.getElementById("submitAppEmoji");
        const editor = document.getElementById("sandboxCodeEditor");
        
        if (!titleInput || !authorInput || !emojiInput || !editor) return;
        
        const title = titleInput.value.trim().toUpperCase();
        const author = authorInput.value.trim().replace(/\\s+/g, '_');
        const emoji = emojiInput.value.trim();
        const code = editor.value;
        
        if (!title || !author) {
            alert("Please fill in both the Project Title and Creator Handle to publish your work!");
            return;
        }
        
        // Add to localStorage collection
        let customSubmissions = [];
        try {
            const stored = localStorage.getItem("bandra_hustlers_collage_works");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    customSubmissions = parsed;
                }
            }
        } catch(e) {}
        
        const newProj = {
            id: 'custom-' + Date.now(),
            title: title,
            author: author,
            emoji: emoji || '🚀',
            code: code
        };
        
        customSubmissions.unshift(newProj); // Add to beginning of local array
        localStorage.setItem("bandra_hustlers_collage_works", JSON.stringify(customSubmissions));
        
        // Reward user with 50 Chai Points for graduating & publishing!
        if (typeof window.chaiPoints !== 'undefined') {
            window.chaiPoints += 50;
            localStorage.setItem("bandra_hustlers_chai_points", window.chaiPoints.toString());
            if (window.updateChaiPointsUI) window.updateChaiPointsUI();
            alert(`🎉 CONGRATULATIONS!\nYour creation has been published to the Bandra Creative Gallery!\nWe have awarded you +50 CHAI POINTS!`);
        } else {
            alert(`🎉 CONGRATULATIONS!\nYour creation has been successfully published to the Bandra Creative Gallery!`);
        }
        
        closeShowcaseSubmitModal();
        loadCommunityShowcase();
        
        // Play epic success chime
        if (typeof playBeepSound === "function") {
            playBeepSound(523.25, 0.15);
            setTimeout(() => playBeepSound(659.25, 0.15), 100);
            setTimeout(() => playBeepSound(783.99, 0.15), 200);
            setTimeout(() => playBeepSound(1046.50, 0.3), 300);
        }
    }

    // --- INTERACTIVE CLASSROOM SYLLABUS COURSES LIBRARY ---

    const COURSE_DETAILS_DATA = {
        beginner: {
            icon: "🎨",
            track: "Beginner Web Design (101)",
            title: "Cyber-Graffiti Neon Header",
            desc: "Learn core HTML tag structures and leverage modern CSS to construct blinding neon text glow reflections! Best starting point for junior hackers.",
            prof: "Prof. Sona (Pali Hill)",
            syllabus: [
                "📝 <strong>Lecture 1:</strong> Anatomy of Document Tags (HTML5, body, containers)",
                "🎨 <strong>Lecture 2:</strong> Typography Styling & Class Bindings",
                "🌟 <strong>Lecture 3:</strong> neon drop-shadow & text glow properties"
            ]
        },
        intermediate: {
            icon: "🔊",
            track: "Creative Audio Synth (202)",
            title: "Mumbai Synth Soundboard",
            desc: "Construct an interactive sound synthesis panel from scratch using the Web Audio API and trigger frequency oscillator waves via modern JavaScript events.",
            prof: "Prof. Kabir (Hill Road)",
            syllabus: [
                "🔊 <strong>Lecture 1:</strong> Web Audio Context & Oscillators",
                "🔌 <strong>Lecture 2:</strong> Gain Node & exponential decays (making click bleeps)",
                "🎹 <strong>Lecture 3:</strong> Audio connection streams to hardware destination",
                "⚡ <strong>Lecture 4:</strong> Randomizing wave frequencies dynamically"
            ]
        },
        pro: {
            icon: "🚀",
            track: "Full-App Architecture (303)",
            title: "Bandra Cutting Chai Clicker",
            desc: "Code a fully persistent clicker incremental simulator game! Build responsive tap controls, incremental upgrade shops, variable math multipliers, and save states securely to localStorage.",
            prof: "Prof. Aryan (Carter Road)",
            syllabus: [
                "🍪 <strong>Lecture 1:</strong> State Stores & dynamic variable updates",
                "🛒 <strong>Lecture 2:</strong> Multipliers & shop inventory logic systems",
                "💾 <strong>Lecture 3:</strong> localStorage state serialization & read/write",
                "🔔 <strong>Lecture 4:</strong> Clicker multiplier formulas & custom game loops"
            ]
        },
        beginner_motion: {
            icon: "⚡",
            track: "Beginner Motion (102)",
            title: "Cyberpunk Glitch & Motion",
            desc: "Understand CSS transitions and CSS infinite keyframe animations. Design a responsive text badge that pulses, scales, and shifts colors smoothly on a loop.",
            prof: "Prof. Sona (Pali Hill)",
            syllabus: [
                "🎬 <strong>Lecture 1:</strong> CSS Keyframe Animation anatomy & states",
                "🎨 <strong>Lecture 2:</strong> Hardware-accelerated transformations & scale",
                "🌈 <strong>Lecture 3:</strong> Hue-rotation filters & visual glitch effects"
            ]
        },
        intermediate_animator: {
            icon: "🛹",
            track: "Intermediate Animation (203)",
            title: "Pixel Skater Animator",
            desc: "Master CSS absolute positioning inside relative frames. Use JavaScript arguments to manipulate layout properties in real time, adding interactive kick and jump buttons.",
            prof: "Prof. Kabir (Hill Road)",
            syllabus: [
                "📐 <strong>Lecture 1:</strong> Relative vs Absolute DOM layouts",
                "🎯 <strong>Lecture 2:</strong> Dynamic state manipulation & boundary guards",
                "🎭 <strong>Lecture 3:</strong> CSS transitions & trigger-based jump timing loops"
            ]
        },
        pro_canvas: {
            icon: "🛺",
            track: "Pro Canvas Game (404)",
            title: "Retro Canvas Rickshaw Race",
            desc: "Dive deep into the HTML5 Canvas element. Program standard 2D vector drawing pipelines, implement a simple horizontal drift mechanic, and control a repeating frame loop.",
            prof: "Prof. Aryan (Carter Road)",
            syllabus: [
                "🎨 <strong>Lecture 1:</strong> The 2D rendering context & drawing vectors",
                "🔄 <strong>Lecture 2:</strong> Infinite animation loop via requestAnimationFrame",
                "🚨 <strong>Lecture 3:</strong> Simple collision boundaries & interactive drift triggers"
            ]
        }
    };

    function openCourseDetails(trackKey) {
        const data = COURSE_DETAILS_DATA[trackKey];
        if (!data) return;
        
        const modalIcon = document.getElementById("courseModalIcon");
        const modalTrack = document.getElementById("courseModalTrack");
        const modalTitle = document.getElementById("courseModalTitle");
        const modalDesc = document.getElementById("courseModalDesc");
        const modalProf = document.getElementById("courseModalProf");
        const syllabusList = document.getElementById("courseModalSyllabus");
        
        if (modalIcon) modalIcon.innerText = data.icon;
        if (modalTrack) modalTrack.innerText = data.track.toUpperCase();
        if (modalTitle) modalTitle.innerText = data.title;
        if (modalDesc) modalDesc.innerText = data.desc;
        if (modalProf) modalProf.innerText = data.prof;
        
        if (syllabusList) {
            syllabusList.innerHTML = "";
            data.syllabus.forEach(item => {
                const row = document.createElement("div");
                row.style.cssText = "font-size: 0.76rem; color: rgba(255,255,255,0.85); display: flex; align-items: start; gap: 8px; line-height: 1.3;";
                row.innerHTML = item;
                syllabusList.appendChild(row);
            });
        }
        
        const btn = document.getElementById("courseModalBtn");
        if (btn) {
            btn.onclick = () => {
                // Find matching card button to click or activate
                const cards = document.querySelectorAll(".learning-track-card");
                const index = ['beginner', 'intermediate', 'pro', 'beginner_motion', 'intermediate_animator', 'pro_canvas'].indexOf(trackKey);
                if (cards[index]) {
                    loadLearningTrack(trackKey, cards[index]);
                } else {
                    loadLearningTrack(trackKey, null);
                }
                closeCourseDetails();
            };
        }
        
        const modal = document.getElementById("courseDetailModal");
        if (modal) modal.style.display = "flex";
        
        // Play click beep
        if (typeof playBeepSound === "function") {
            playBeepSound(587.33, 0.08); // D5
        }
    }

    function closeCourseDetails() {
        const modal = document.getElementById("courseDetailModal");
        if (modal) modal.style.display = "none";
        // Play select close beep
        if (typeof playBeepSound === "function") {
            playBeepSound(440, 0.05); // A4
        }
    }

    // Expose to window scope for easy routing
    window.initLearningPlayground = initLearningPlayground;
    window.loadLearningTrack = loadLearningTrack;
    window.resetLearningEditor = resetLearningEditor;
    window.runSandboxCode = runSandboxCode;
    window.syncEditorLines = syncEditorLines;
    window.openShowcaseSubmitModal = openShowcaseSubmitModal;
    window.closeShowcaseSubmitModal = closeShowcaseSubmitModal;
    window.confirmShowcaseSubmit = confirmShowcaseSubmit;
    window.openCourseDetails = openCourseDetails;
    window.closeCourseDetails = closeCourseDetails;

})();
