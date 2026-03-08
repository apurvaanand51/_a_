const ball = document.querySelector(".container");
const dotElem = document.querySelector(".dot");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "white";
ctx.lineWidth = 1;

let positions = [];
let currentPos = { x: 50, y: 50 }; 
let targetPos = { x: 50, y: 50 };
let animationStart = null;
let isAnimating = false;
let hasMoved = false;

function animate(timestamp) {
    if (!animationStart) animationStart = timestamp;
    let progress = (timestamp - animationStart) / 400; 
    if (progress > 1) progress = 1;

    let currentX = currentPos.x + (targetPos.x - currentPos.x) * progress;
    let currentY = currentPos.y + (targetPos.y - currentPos.y) * progress;

    ball.style.top = currentX + "%";
    ball.style.left = currentY + "%";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (positions.length > 0) {
        ctx.beginPath();
        ctx.moveTo(positions[0].x, positions[0].y);
        for (let i = 1; i < positions.length; i++) {
            ctx.lineTo(positions[i].x, positions[i].y);
        }
        let lastPos = positions[positions.length - 1];
        let currentPixelX = window.innerWidth * currentY / 100;
        let currentPixelY = window.innerHeight * currentX / 100;
        ctx.lineTo(currentPixelX, currentPixelY);
        ctx.stroke();
    }

    if (progress < 1) {
        requestAnimationFrame(animate);
    } else {
        positions.push({
            x: window.innerWidth * targetPos.y / 100,
            y: window.innerHeight * targetPos.x / 100
        });
        currentPos = { ...targetPos };
        if (!hasMoved) {
            hasMoved = true;
        } else if (currentPos.x === 50 && currentPos.y === 50) {
            clearInterval(intervalId);
        }
        isAnimating = false;
        animationStart = null;
    }
}

let intervalTime = 800;

let intervalId = setInterval(() => {
    if (!isAnimating) {
        let x = Math.floor(Math.random() * 100);
        let y = Math.floor(Math.random() * 100);
        targetPos = { x, y };
        isAnimating = true;
        requestAnimationFrame(animate);
    }
}, intervalTime);

