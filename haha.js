/* =========================================================
   DIYA BIRTHDAY WEBSITE
   haha.js
========================================================= */


/* =========================================================
   BASIC SCENE SYSTEM
========================================================= */

const scenes = document.querySelectorAll(".scene");


function goToScene(sceneId) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const target = document.getElementById(sceneId);

    if (target) {
        target.classList.add("active");
    }

    createAmbientHeart();
}


/* =========================================================
   GLOBAL BUTTON NAVIGATION
========================================================= */

document.querySelectorAll("[data-next]").forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.next;

        goToScene(target);

    });

});


/* =========================================================
   AMBIENT FLOATING HEARTS
========================================================= */

const floatingHearts = document.getElementById("floatingHearts");

function createAmbientHeart() {

    if (!floatingHearts) return;

    const heart = document.createElement("span");

    heart.className = "ambient-heart";

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💓",
        "✨",
        "🦋"
    ];

    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.bottom =
        Math.random() * 10 + "%";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}


setInterval(createAmbientHeart, 1000);


/* =========================================================
   SCENE 1 — PASSCODE
========================================================= */

const correctPasscode = "1019";

let enteredCode = "";

const keys = document.querySelectorAll(".key[data-key]");
const passwordDots =
    document.querySelectorAll("#passwordDisplay span");

const clearKey =
    document.getElementById("clearKey");

const backKey =
    document.getElementById("backKey");

const wrongMessage =
    document.getElementById("wrongMessage");

const passHint =
    document.getElementById("passHint");


function updatePasswordDisplay() {

    passwordDots.forEach((dot, index) => {

        if (index < enteredCode.length) {
            dot.textContent = "●";
            dot.classList.add("filled");
        } else {
            dot.textContent = "○";
            dot.classList.remove("filled");
        }

    });
}


function resetPassword() {

    enteredCode = "";

    updatePasswordDisplay();

    wrongMessage.textContent = "";

    passHint.textContent =
        "only my special girl knows it 💗";
}


function checkPassword() {

    if (enteredCode.length !== 4) {
        return;
    }

    if (enteredCode === correctPasscode) {

        wrongMessage.textContent =
            "Correct... I knew you knew it 🥺❤️";

        passHint.textContent =
            "Welcome, my love ❤️";

        createBigHeartBurst();

        setTimeout(() => {

            goToScene("scene-game");

            resetPassword();

        }, 900);

    } else {

        wrongMessage.textContent =
            "Hmmmm... wrong code baby 😭💕";

        passHint.textContent =
            "Try again, my love.";

        document
            .getElementById("passwordDisplay")
            .animate(
                [
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(5px)" },
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 300
                }
            );

        setTimeout(resetPassword, 700);
    }
}


keys.forEach(key => {

    key.addEventListener("click", () => {

        if (enteredCode.length >= 4) return;

        enteredCode += key.dataset.key;

        updatePasswordDisplay();

        if (enteredCode.length === 4) {
            setTimeout(checkPassword, 200);
        }

    });

});


clearKey.addEventListener("click", resetPassword);


backKey.addEventListener("click", () => {

    enteredCode =
        enteredCode.slice(0, -1);

    updatePasswordDisplay();

});


/* =========================================================
   HEART BURST
========================================================= */

function createBigHeartBurst() {

    for (let i = 0; i < 20; i++) {

        const heart =
            document.createElement("div");

        heart.textContent = "❤️";

        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.zIndex = "9999";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.pointerEvents = "none";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 250;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: 0.2
                },
                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.6)`,
                    opacity: 0
                }
            ],
            {
                duration: 900 + Math.random() * 600,
                easing: "ease-out"
            }
        );

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1600);
    }
}


/* =========================================================
   SCENE 2 — CATCH THE HEART GAME
========================================================= */

const gameArea =
    document.getElementById("heartGameArea");

const heartScore =
    document.getElementById("heartScore");

const gameMessage =
    document.getElementById("gameMessage");

const gameNextBtn =
    document.getElementById("gameNextBtn");

let score = 0;

let gameRunning = false;

let heartSpawner = null;


function createGameHeart() {

    if (!gameRunning) return;

    const heart =
        document.createElement("div");

    heart.className = "catch-heart";

    const heartTypes = [
        "❤️",
        "💗",
        "💕",
        "💖"
    ];

    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() * heartTypes.length
            )
        ];

    const maxX =
        Math.max(
            20,
            gameArea.clientWidth - 45
        );

    const maxY =
        Math.max(
            30,
            gameArea.clientHeight - 55
        );

    heart.style.left =
        Math.random() * maxX + "px";

    heart.style.top =
        Math.random() * maxY + "px";

    heart.addEventListener("pointerdown", () => {

        if (!gameRunning) return;

        score++;

        heartScore.textContent = score;

        heart.animate(
            [
                {
                    transform: "scale(1)",
                    opacity: 1
                },
                {
                    transform: "scale(1.8)",
                    opacity: 0
                }
            ],
            {
                duration: 250
            }
        );

        setTimeout(() => heart.remove(), 250);

        if (score >= 5) {
            finishHeartGame();
        }

    });

    gameArea.appendChild(heart);

    setTimeout(() => {

        if (heart.isConnected) {
            heart.remove();
        }

    }, 1600);
}


function startHeartGame() {

    score = 0;

    heartScore.textContent = "0";

    gameRunning = true;

    gameNextBtn.classList.add("hidden");

    gameMessage.textContent =
        "Catch them, birthday girl! 💕";

    if (heartSpawner) {
        clearInterval(heartSpawner);
    }

    heartSpawner =
        setInterval(
            createGameHeart,
            650
        );

    for (let i = 0; i < 3; i++) {
        setTimeout(
            createGameHeart,
            i * 200
        );
    }
}


function finishHeartGame() {

    gameRunning = false;

    clearInterval(heartSpawner);

    gameMessage.textContent =
        "You caught them all! You win my next surprise 🥺❤️";

    gameNextBtn.classList.remove("hidden");

    createBigHeartBurst();
}


gameNextBtn.addEventListener(
    "click",
    () => goToScene("scene-bouquet")
);


/* Start game when scene becomes available */
setTimeout(startHeartGame, 1000);


/* =========================================================
   SCENE 3 — BOUQUET GIFT
========================================================= */

const bouquetGift =
    document.getElementById("bouquetGift");

const bouquetReveal =
    document.getElementById("bouquetReveal");

const bouquetTapText =
    document.getElementById("bouquetTapText");

const flowerPlayBtn =
    document.getElementById("flowerPlayBtn");

const flowerRain =
    document.getElementById("flowerRain");

const flowerNextBtn =
    document.getElementById("flowerNextBtn");


bouquetGift.addEventListener("click", openBouquet);


function openBouquet() {

    if (bouquetGift.classList.contains("open")) {
        return;
    }

    bouquetGift.classList.add("open");

    bouquetTapText.textContent =
        "Wait... 🌷";

    setTimeout(() => {

        bouquetReveal.classList.add("show");

        bouquetTapText.style.opacity = "0";

    }, 500);

}


flowerPlayBtn.addEventListener(
    "click",
    startFlowerRain
);


function startFlowerRain() {

    flowerPlayBtn.disabled = true;

    flowerPlayBtn.textContent =
        "Flowers everywhere 🌷";

    const flowerImages = [

        "https://cdn.avasflowers.net/img/prod_img/avasflowers-spring-tulips-20-stems-16531.png",

        "https://storage.googleapis.com/regalflowers-cdn/products/imgregal-red-roses-and-million-stars-30roses-po044edsyh0cev86l9rjz9.jpg"

    ];

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {

            const flower =
                document.createElement("img");

            flower.className =
                "falling-flower";

            flower.src =
                flowerImages[
                    Math.floor(
                        Math.random() *
                        flowerImages.length
                    )
                ];

            flower.style.left =
                Math.random() * 100 + "%";

            const size =
                25 + Math.random() * 45;

            flower.style.width =
                size + "px";

            flower.style.height =
                size + "px";

            flower.style.animationDuration =
                (2.5 + Math.random() * 3) + "s";

            flower.style.animationDelay =
                Math.random() * 0.8 + "s";

            flower.style.opacity =
                0.55 + Math.random() * 0.45;

            flowerRain.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, 6000);

        }, i * 100);

    }

    setTimeout(() => {

        flowerNextBtn.classList.remove("hidden");

    }, 3200);

}


flowerNextBtn.addEventListener(
    "click",
    () => goToScene("scene-cake")
);


/* =========================================================
   SCENE 4 — CAKE
========================================================= */

const cakeGift =
    document.getElementById("cakeGift");

const cakeTapText =
    document.getElementById("cakeTapText");

const cakeArea =
    document.getElementById("cakeArea");

const cakeCountdown =
    document.getElementById("cakeCountdown");

const blowText =
    document.getElementById("blowText");

const cutCakeBtn =
    document.getElementById("cutCakeBtn");

const waitingBtn =
    document.getElementById("waitingBtn");

const cakeConfetti =
    document.getElementById("cakeConfetti");


let cakeOpened = false;


cakeGift.addEventListener("click", openCake);


function openCake() {

    if (cakeOpened) return;

    cakeOpened = true;

    cakeGift.classList.add("open");

    cakeTapText.textContent =
        "Look what was hiding inside... 🎂";

    createConfetti(45);

    setTimeout(() => {

        cakeArea.classList.add("show");

        startCakeCountdown();

    }, 700);

}


function startCakeCountdown() {

    let count = 5;

    cakeCountdown.textContent = count;

    const interval =
        setInterval(() => {

            count--;

            cakeCountdown.textContent =
                count;

            if (count <= 0) {

                clearInterval(interval);

                finishCountdown();

            }

        }, 1000);

}


function finishCountdown() {

    const cake =
        document.querySelector(".cake");

    cake.classList.add("blown");

    cakeCountdown.textContent =
        "💨";

    blowText.textContent =
        "Perfect! Candles are gone 🥺❤️";

    cutCakeBtn.classList.remove("hidden");

    createConfetti(60);
}


cutCakeBtn.addEventListener(
    "click",
    () => {

        const cake =
            document.querySelector(".cake");

        cake.classList.add("cake-cut");

        cutCakeBtn.textContent =
            "Cake cut! 🎂❤️";

        createConfetti(100);

        setTimeout(() => {

            cutCakeBtn.classList.add("hidden");

            waitingBtn.classList.remove("hidden");

        }, 1200);

    }
);


function createConfetti(amount) {

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            randomConfettiColor();

        piece.style.animationDelay =
            Math.random() * 0.5 + "s";

        piece.style.animationDuration =
            (1.5 + Math.random() * 2) + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        cakeConfetti.appendChild(piece);

        setTimeout(
            () => piece.remove(),
            4000
        );

    }
}


function randomConfettiColor() {

    const colors = [
        "#ff6bbd",
        "#ffb3df",
        "#a866ff",
        "#fff",
        "#ffd45e",
        "#ff709d"
    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];
}


waitingBtn.addEventListener(
    "click",
    () => {

        goToScene("scene-video");

        playBirthdayVideo();

    }
);


/* =========================================================
   SCENE 5 — VIDEO
========================================================= */

const birthdayVideo =
    document.getElementById("birthdayVideo");

const videoNextBtn =
    document.getElementById("videoNextBtn");

const videoHint =
    document.getElementById("videoHint");


function playBirthdayVideo() {

    if (!birthdayVideo) return;

    birthdayVideo.currentTime = 0;

    const playPromise =
        birthdayVideo.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            videoHint.textContent =
                "Tap ▶ on the video to start ❤️";

        });

    }

}


birthdayVideo.addEventListener(
    "ended",
    () => {

        videoHint.textContent =
            "That was for you, my love ❤️";

        videoNextBtn.classList.remove("hidden");

        createBigHeartBurst();

    }
);


videoNextBtn.addEventListener(
    "click",
    () => {

        goToScene("scene-promises");

    }
);


/* =========================================================
   SCENE 6 — PROMISE CARDS
========================================================= */

const promiseCards =
    document.querySelectorAll(".promise-card");

const loveEnding =
    document.getElementById("loveEnding");

const promiseNextBtn =
    document.getElementById("promiseNextBtn");

let openedCards = 0;


promiseCards.forEach(card => {

    card.addEventListener("click", () => {

        if (card.classList.contains("flipped")) {
            return;
        }

        card.classList.add("flipped");

        openedCards++;

        if (openedCards === 7) {

            setTimeout(
                completePromises,
                1100
            );

        }

    });

});


function completePromises() {

    promiseCards.forEach((card, index) => {

        const angle =
            (index % 2 === 0 ? -1 : 1);

        card.style.setProperty(
            "--fly-x",
            `${angle * (100 + Math.random() * 200)}px`
        );

        card.style.setProperty(
            "--fly-y",
            `${-100 - Math.random() * 250}px`
        );

        card.classList.add("fly-away");

    });

    setTimeout(() => {

        loveEnding.classList.add("show");

        createBigHeartBurst();

    }, 800);

}


promiseNextBtn.addEventListener(
    "click",
    () => {

        loveEnding.classList.remove("show");

        setTimeout(() => {
            goToScene("scene-rose");
        }, 400);

    }
);


/* =========================================================
   SCENE 10 — LETTER
========================================================= */

const letterWrapper =
    document.getElementById("letterWrapper");

const finalMessage =
    document.getElementById("finalMessage");


let letterOpened = false;


letterWrapper.addEventListener(
    "click",
    () => {

        if (letterOpened) return;

        letterOpened = true;

        letterWrapper.classList.add("open");

  setTimeout(() => {
    finalMessage.classList.add("show");
    createBigHeartBurst();

    // Open the final hug page after the letter surprise.
    setTimeout(startFinalHugSurprise, 3500);
}, 2800);

    }
);


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key >= "0" &&
            event.key <= "9"
        ) {

            if (
                document
                    .getElementById("scene-passcode")
                    .classList.contains("active")
            ) {

                if (enteredCode.length < 4) {

                    enteredCode += event.key;

                    updatePasswordDisplay();

                    if (enteredCode.length === 4) {
                        setTimeout(checkPassword, 200);
                    }

                }

            }

        }

        if (
            event.key === "Backspace" &&
            document
                .getElementById("scene-passcode")
                .classList.contains("active")
        ) {

            enteredCode =
                enteredCode.slice(0, -1);

            updatePasswordDisplay();

        }

        if (
            event.key === "Escape" &&
            document
                .getElementById("scene-passcode")
                .classList.contains("active")
        ) {

            resetPassword();

        }

    }
);


/* =========================================================
   PRELOAD IMPORTANT IMAGES
========================================================= */

const preloadImages = [

    "https://hi52toys.com/cdn/shop/files/crayon-shin-chan-minime-series-lazy-chill-series.webp?v=1786116166",

    "https://i.pinimg.com/564x/6a/42/69/6a4269b6b161235329382215c7a6c829.jpg",

    "https://cdn.avasflowers.net/img/prod_img/avasflowers-spring-tulips-20-stems-16531.png",

    "https://storage.googleapis.com/regalflowers-cdn/products/imgregal-red-roses-and-million-stars-30roses-po044edsyh0cev86l9rjz9.jpg",

    "https://www.surprose.com/media/catalog/product/cache/a003019ba7fcb54fff9e7f7465db6631/s/i/single-red-rose-in-a-matching-bouquet-8720174082382-bb.jpg"

];


preloadImages.forEach(src => {

    const img =
        new Image();

    img.src = src;

});


/* =========================================================
   STARTUP
========================================================= */

updatePasswordDisplay();

console.log(
    "Diya's birthday website loaded ❤️"
);


// ================================================
// DIYA'S CUTE DECORATION PACK 💗🐱
// ADD THIS AT THE BOTTOM OF haha.js
// Keep all your original JavaScript above it.
// ================================================

(() => {
    if (window.__diyaDecorationsAdded) return;
    window.__diyaDecorationsAdded = true;

    const pictures = {
        passcode: [
            "https://media.tenor.com/-txg_rKqGF0AAAAM/cute-mochi-mochi-peach-cat.gif",
            "https://media.tenor.com/3TNNdGvibb8AAAAM/cat-pookie.gif",
            "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=2481549152031401447"
        ],

        game: [
            "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=122271805646027178",
            "https://wallpaperaccess.com/full/7773141.jpg",
            "https://images.teepublic.com/derived/production/designs/5147845_0/1561369984/i_m%3Apid_1918%2Cc_s_auto%2Cbc_ffffff%2Cs_630%2Cq_90.jpg"
        ],

        bouquet: [
            "https://i.pinimg.com/736x/e7/c1/1e/e7c11e7ce65894aa648b784ddb4d5fc7.jpg",
            "https://i.pinimg.com/236x/19/56/42/19564236d6cbe102ddf3ebf5767bb98a.jpg",
            "https://media.tenor.com/C-ZraRpWG2sAAAAm/cat-flowers.webp",
            "https://www.tiktok.com/api/img/?itemId=7667126219061660951&location=0&aid=1988"
        ],

        rose: [
            "https://w0.peakpx.com/wallpaper/271/174/HD-wallpaper-shinchan-with-rose-in-mouth-standing-in-white-background-shinchan.jpg",
            "https://i.pinimg.com/736x/5f/e8/81/5fe8816482d78cf24a3bbf99d16414e4.jpg"
        ],

        chocolate: [
            "https://flowerstonepal.com/cdn/shop/files/cadbury-dairy-milk-silk-chocolate-55g-1833127.jpg?v=1772303648",
            "https://cdn11.bigcommerce.com/s-tgrcca6nho/images/stencil/1280w/products/33397/169718/8901058903164__59221.1785729316.jpg"
        ],

        cake: [
            "https://i.pinimg.com/736x/3d/1e/aa/3d1eaaa997a3b2bbad870f31f04725f8.jpg",
            "https://www.tiktok.com/api/img/?itemId=7615198891599875358&location=0&aid=1988",
            "https://media.istockphoto.com/id/1480887486/vector/cute-adorable-playful-kitten-cat-sit-on-present-box-meowy-birthday-cheerful-pet-animal.jpg?s=612x612&w=0&k=20&c=qUVglUReiqM0Yx6bxkPfaAX7_tBhPsaAlPzcqpkeHuA=",
            "https://thumbs.dreamstime.com/b/cute-cat-birthday-cupcake-series-kawaii-animals-kitten-isolated-white-background-cute-cat-birthday-cupcake-series-kawaii-274955138.jpg"
        ],

        video: [
            "https://m.media-amazon.com/images/S/pv-target-images/d7b8e6c2bf144475ce6135bb0355d2637b9809d11857fbd255a0fc058d6509eb.jpg",
            "https://static.wikia.nocookie.net/motu-patlu/images/a/a2/Duplicatepatlu.png/revision/latest?cb=20180109141805",
            "https://mystickermania.com/cdn/stickers/cartoons/oggy-cockroaches-oggy.svg",
            "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3846860355205684976",
            "https://i.pinimg.com/736x/20/1d/69/201d69704485ba8a61afac86722a6099.jpg",
            "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100068254253414"
        ]
    };

    // Support the scene IDs in the original haha.js
    // and common page IDs, without editing the HTML.
    const pageIds = {
        passcode: ["scene-passcode", "page-lock"],
        game: ["scene-game", "page-game", "page-birthday"],
        bouquet: ["scene-bouquet", "page-bouquet"],
        rose: ["scene-rose", "page-rose"],
        chocolate: ["scene-chocolate", "page-chocolate"],
        cake: ["scene-cake", "page-cake"],
        video: ["scene-video", "page-video"]
    };

    function findPage(key) {
        for (const id of pageIds[key]) {
            const page = document.getElementById(id);
            if (page) return page;
        }
        return null;
    }

    function activePage(page) {
        return !!page &&
            (page.classList.contains("active") ||
             getComputedStyle(page).visibility === "visible");
    }

    function makeBubbleLayer(page, key) {
        if (!page || page.querySelector(".diya-deco-layer")) return;

        const layer = document.createElement("div");
        layer.className = "diya-deco-layer";
        layer.setAttribute("aria-hidden", "true");

        const imageList = pictures[key];
        const usedPositions = [
            [4, 12], [76, 18], [5, 66], [77, 70],
            [38, 8], [42, 79], [82, 43], [10, 39]
        ];

        imageList.forEach((url, index) => {
            const bubble = document.createElement("div");
            bubble.className = "diya-photo-bubble";

            if (index % 3 === 0) bubble.classList.add("diya-round");
            if (index % 4 === 1) bubble.classList.add("diya-small");
            if (index % 4 === 2) bubble.classList.add("diya-large");

            const [left, top] = usedPositions[index % usedPositions.length];
            bubble.style.left = left + "%";
            bubble.style.top = top + "%";
            bubble.style.setProperty("--drift", (7 + index % 5) + "s");
            bubble.style.animationDelay = (-index * 0.65) + "s";

            const img = document.createElement("img");
            img.src = url;
            img.alt = "";
            img.loading = "lazy";
            img.decoding = "async";
            img.referrerPolicy = "no-referrer";

            img.onerror = () => {
                bubble.remove();
            };

            bubble.appendChild(img);
            layer.appendChild(bubble);
        });

        // Decorative layer sits behind the interactive page content.
        page.appendChild(layer);
    }

    function makeGlow(page) {
        if (!page || page.querySelector(".diya-deco-glow")) return;

        const glowA = document.createElement("div");
        glowA.className = "diya-deco-glow";
        glowA.style.top = "15%";
        glowA.style.left = "-60px";

        const glowB = document.createElement("div");
        glowB.className = "diya-deco-glow";
        glowB.style.right = "-65px";
        glowB.style.bottom = "12%";
        glowB.style.animationDelay = "-3s";

        page.append(glowA, glowB);
    }

    // Add gentle floating bubbles to each scene.
    ["passcode", "game", "rose", "cake", "video"].forEach(key => {
        const page = findPage(key);
        if (page) {
            makeBubbleLayer(page, key);
            makeGlow(page);
        }
    });

    // Bouquet decoration is hidden until the gift is revealed.
    const bouquetPage = findPage("bouquet");

    if (bouquetPage) {
        const bouquetLayer = document.createElement("div");
        bouquetLayer.className = "diya-deco-layer diya-bouquet-layer";
        bouquetLayer.setAttribute("aria-hidden", "true");
        bouquetLayer.style.display = "none";

        pictures.bouquet.forEach((url, index) => {
            const bubble = document.createElement("div");
            bubble.className = "diya-photo-bubble";
            bubble.classList.add(index % 2 ? "diya-round" : "diya-large");

            bubble.style.left = [ "3%", "75%", "8%", "70%" ][index];
            bubble.style.top = [ "15%", "22%", "68%", "72%" ][index];
            bubble.style.setProperty("--drift", (8 + index) + "s");
            bubble.style.animationDelay = (-index * 0.8) + "s";

            const img = document.createElement("img");
            img.src = url;
            img.alt = "";
            img.loading = "lazy";
            img.referrerPolicy = "no-referrer";
            img.onerror = () => bubble.remove();

            bubble.appendChild(img);
            bouquetLayer.appendChild(bubble);
        });

        bouquetPage.appendChild(bouquetLayer);

        function updateBouquetDecor() {
            const reveal = document.getElementById("bouquetReveal");
            const gift = document.getElementById("bouquetGift");
            const visible =
                (reveal && reveal.classList.contains("show")) ||
                (gift && gift.classList.contains("open"));

            bouquetLayer.style.display = visible ? "block" : "none";
        }

        updateBouquetDecor();

        const bouquetObserver = new MutationObserver(updateBouquetDecor);

        [document.getElementById("bouquetReveal"),
         document.getElementById("bouquetGift")].forEach(element => {
            if (element) {
                bouquetObserver.observe(element, {
                    attributes: true,
                    attributeFilter: ["class", "style"]
                });
            }
        });
    }

    // Chocolate rain: only runs while the chocolate page is active.
    const chocolatePage = findPage("chocolate");
    let chocolateTimer = null;

    function dropChocolate() {
        if (!chocolatePage || !activePage(chocolatePage)) return;

        const img = document.createElement("img");
        img.className = "diya-chocolate-drop";
        img.src = pictures.chocolate[
            Math.floor(Math.random() * pictures.chocolate.length)
        ];
        img.alt = "";
        img.style.left = (Math.random() * 88 + 2) + "%";
        img.style.setProperty("--fall-time", (4 + Math.random() * 3) + "s");
        img.style.setProperty("--sway", (Math.random() * 100 - 50) + "px");
        img.referrerPolicy = "no-referrer";

        img.onerror = () => img.remove();
        chocolatePage.appendChild(img);

        setTimeout(() => img.remove(), 8000);
    }

    function updateChocolateRain() {
        if (!chocolatePage) return;

        if (activePage(chocolatePage) && !chocolateTimer) {
            chocolateTimer = setInterval(dropChocolate, 450);
        } else if (!activePage(chocolatePage) && chocolateTimer) {
            clearInterval(chocolateTimer);
            chocolateTimer = null;
        }
    }

    const pageObserver = new MutationObserver(updateChocolateRain);
    document.querySelectorAll(".scene, .page").forEach(page => {
        pageObserver.observe(page, {
            attributes: true,
            attributeFilter: ["class", "style"]
        });
    });

    updateChocolateRain();

    // Optional: wrong-passcode surprise for the original scene-based keypad.
    // The existing password function is preserved and called as before.
    if (
        typeof window.checkPassword === "function" &&
        typeof window.correctPasscode !== "undefined"
    ) {
        const originalCheckPassword = window.checkPassword;
        let wrongAttempts = 0;
        let showingWrongOverlay = false;

        window.checkPassword = function () {
            if (showingWrongOverlay) return;

            if (window.enteredCode === window.correctPasscode) {
                wrongAttempts = 0;
                return originalCheckPassword.apply(this, arguments);
            }

            if (!window.enteredCode || window.enteredCode.length !== 4) {
                return originalCheckPassword.apply(this, arguments);
            }

            wrongAttempts++;
            showingWrongOverlay = true;

            // Preserve the original password check and message behaviour.
            originalCheckPassword.apply(this, arguments);

            const overlay = document.createElement("div");
            overlay.className = "diya-wrong-overlay";

            const card = document.createElement("div");
            card.className = "diya-wrong-card";

            const cat = document.createElement("img");
            cat.src = "https://i.pinimg.com/474x/5d/86/e5/5d86e54c12415553710b449d29074aea.jpg";
            cat.alt = "Sad pookie cat";
            cat.referrerPolicy = "no-referrer";
            cat.onerror = () => { cat.style.display = "none"; };

            const title = document.createElement("h2");
            title.textContent = wrongAttempts >= 3
                ? "Ask to your husband 🥹💗"
                : "Oopsie, pookie! 😿";

            const message = document.createElement("p");
            message.textContent = wrongAttempts >= 3
                ? "Your husband is waiting for you, my love 💗"
                : "Wrong passcode, my love. Try once more! 💕";

            const button = document.createElement("button");
            button.className = "diya-try-again";
            button.textContent = "TRY AGAIN ❤️";

            button.addEventListener("click", () => {
                overlay.remove();
                showingWrongOverlay = false;

                if (typeof window.resetPassword === "function") {
                    window.resetPassword();
                }
            });

            card.append(cat, title, message, button);
            overlay.appendChild(card);
            document.body.appendChild(overlay);
        };
    }

})();

// Wrong-passcode cute surprise — original function preserved
if (
    typeof checkPassword === "function" &&
    typeof correctPasscode !== "undefined"
) {
    const originalCheckPassword = checkPassword;
    let diyaWrongAttempts = 0;
    let diyaOverlayOpen = false;

    checkPassword = function () {
        if (diyaOverlayOpen) return;

        if (enteredCode.length !== 4) {
            return originalCheckPassword.apply(this, arguments);
        }

        if (enteredCode === correctPasscode) {
            diyaWrongAttempts = 0;
            return originalCheckPassword.apply(this, arguments);
        }

        diyaWrongAttempts++;
        diyaOverlayOpen = true;

        originalCheckPassword.apply(this, arguments);

        const overlay = document.createElement("div");
        overlay.className = "diya-wrong-overlay";

        const card = document.createElement("div");
        card.className = "diya-wrong-card";

        const cat = document.createElement("img");
        cat.src = "https://i.pinimg.com/474x/5d/86/e5/5d86e54c12415553710b449d29074aea.jpg";
        cat.alt = "Sad pookie cat";
        cat.onerror = () => cat.style.display = "none";

        const heading = document.createElement("h2");
        heading.textContent = diyaWrongAttempts >= 3
            ? "ASK TO YOUR HUSBAND 🥹💗"
            : "Oopsie, pookie! 😿";

        const message = document.createElement("p");
        message.textContent = diyaWrongAttempts >= 3
            ? "Your husband is waiting for you, my love 💗"
            : "Wrong passcode, baby! Try again 💕";

        const button = document.createElement("button");
        button.className = "diya-try-again";
        button.textContent = "TRY AGAIN ❤️";

        button.addEventListener("click", () => {
            overlay.remove();
            diyaOverlayOpen = false;
            resetPassword();
        });

        card.append(cat, heading, message, button);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
    };
}
  
/* FINAL SURPRISE: HUG MY GHARWALI */

function startFinalHugSurprise() {
    const finalScene = document.getElementById("scene-final-hug");
    const countdown = document.getElementById("hug-countdown");
    const countdownText = document.getElementById("hug-countdown-text");
    const videoWrap = document.getElementById("cat-hug-video-wrap");
    const catVideo = document.getElementById("catHugVideo");

    if (!finalScene || !countdown || !countdownText ||
        !videoWrap || !catVideo) {
        return;
    }

    goToScene("scene-final-hug");

    videoWrap.classList.remove("show");
    catVideo.pause();
    catVideo.currentTime = 0;

    let number = 5;
    countdown.textContent = number;
    countdown.style.display = "block";
    countdownText.style.display = "block";
    countdownText.textContent = "Get ready for your hug, baby... 🥹💗";

    const timer = setInterval(() => {
        number--;
        countdown.textContent = number;

        // Replay the number's pop animation
        countdown.style.animation = "none";
        void countdown.offsetWidth;
        countdown.style.animation = "";

        if (number <= 0) {
            clearInterval(timer);

            countdownText.textContent = "HUGGGG TIME!!! 🫂❤️";

            setTimeout(() => {
                countdown.style.display = "none";
                countdownText.style.display = "none";
                videoWrap.classList.add("show");

                // Muted autoplay is more likely to work in browsers.
                catVideo.muted = true;
                catVideo.play().catch(() => {
                    countdownText.style.display = "block";
                    countdownText.textContent =
                        "Tap ▶ to play your surprise hug, baby 💗";
                });
            }, 700);
        }
    }, 1000);
}
/* ADD THIS AT THE VERY BOTTOM OF haha.js */
/* FINAL LETTER BUTTON + HUG PAGE + RESTART */

(() => {
    const lastGiftBtn = document.getElementById("lastGiftBtn");
    const startAgainBtn = document.getElementById("startAgainBtn");
    const letterWrapper = document.getElementById("letterWrapper");
    const finalMessage = document.getElementById("finalMessage");

    if (!lastGiftBtn || !startAgainBtn) return;

    const originalHugSurprise = startFinalHugSurprise;

    lastGiftBtn.classList.add("hidden");

    startFinalHugSurprise = function () {
        lastGiftBtn.classList.remove("hidden");
        lastGiftBtn.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    };

    lastGiftBtn.addEventListener("click", () => {
        lastGiftBtn.disabled = true;
        lastGiftBtn.textContent = "Your hug is coming... 🫂💗";

        originalHugSurprise();

        setTimeout(() => {
            startAgainBtn.style.display = "block";
            startAgainBtn.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }, 6500);
    });

    startAgainBtn.addEventListener("click", () => {
        window.location.reload();
    });

    startAgainBtn.style.display = "none";

    if (letterWrapper && finalMessage) {
        const observer = new MutationObserver(() => {
            if (finalMessage.classList.contains("show")) {
                lastGiftBtn.classList.remove("hidden");
                lastGiftBtn.style.display = "block";
            }
        });

        observer.observe(finalMessage, {
            attributes: true,
            attributeFilter: ["class"]
        });
    }
})();
