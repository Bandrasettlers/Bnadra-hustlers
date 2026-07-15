        // System Config
        const STORAGE_KEY = "bandra_hustlers_seen_stamp";
        const INTRO_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 Hours

        // DOM elements cache
        const introEl = document.getElementById("intro");
        const cameraEl = document.getElementById("camera");
        const skipBtn = document.getElementById("skipButton");
        const homepageEl = document.getElementById("app-root");
        const replayIntroBtn = document.getElementById("replayIntroBtn");
        const particleCanvas = document.getElementById("particleCanvas");
        const whiteFlash = document.getElementById("whiteFlash");

        const sunDisc = document.querySelector(".sun-disc");
        const skyGradient = document.querySelector(".sky-gradient");
        const cloudBack = document.querySelector(".cloud-back");
        const cloudFront = document.querySelector(".cloud-front");
        const bandraSkyline = document.querySelector(".bandra-skyline");
        const fortSilhouette = document.querySelector(".bandra-fort-silhouette");
        const cityDepth = document.querySelector(".city-depth");
        const seaLayer = document.querySelector(".sea-layer");
        const seaLink = document.querySelector(".sea-link");
        const streetLights = document.querySelector(".street-lights");
        const trainWrapper = document.getElementById("train");

        const logoEl = document.getElementById("logo");
        const smallTitle = document.querySelector(".small-title");
        const subtitle = document.querySelector(".hero-subtitle");
        const actionSequence = document.getElementById("actionSequence");
        const rockstarCard = document.getElementById("rockstarCard");

        // Interactive Particle variables
        const ctx = particleCanvas.getContext("2d");
        let canvasWidth = (particleCanvas.width = window.innerWidth);
        let canvasHeight = (particleCanvas.height = window.innerHeight);
        let activeParticles = [];
        let isIntroActive = true;
        let introAutoTransitionTimeout = null;
        let camShakeIntensity = 0;

        // Global User Wallet: Chai Points
        let chaiPoints = parseInt(localStorage.getItem("bandra_hustlers_chai_points") || "120", 10);
        
        Object.defineProperty(window, 'chaiPoints', {
            get: function() { return chaiPoints; },
            set: function(val) {
                chaiPoints = val;
                localStorage.setItem("bandra_hustlers_chai_points", val.toString());
                if (typeof window.updateChaiPointsUI === "function") {
                    window.updateChaiPointsUI();
                }
            },
            configurable: true
        });

        // Resize Canvas dynamically
        window.addEventListener("resize", () => {
            canvasWidth = particleCanvas.width = window.innerWidth;
            canvasHeight = particleCanvas.height = window.innerHeight;
        });

