// Safari-compatible requestAnimationFrame polyfill
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(callback) {
               window.setTimeout(callback, 1000 / 60);
           };
})();

var number = 4,
    radius = 3,
    x = 1,
    y = 100;

function draw(params, ctx) {
    // Safari-specific canvas optimizations
    ctx.save();
    
    for (var i = 0; i < number; i++) {
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(x + 30, y - 85, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.shadowBlur = params.blur;
        ctx.beginPath();
        ctx.arc(x + 30, y - 85, 6 * i, -35 * Math.PI / 180, 35 * Math.PI / 180);
        ctx.strokeStyle = params.color2[i];
        ctx.lineWidth = 0.4 * radius;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x + 30, y - 85, 7 * i, 145 * Math.PI / 180, 215 * Math.PI / 180);
        ctx.strokeStyle = params.color2[i];
        ctx.lineWidth = 0.4 * radius;
        ctx.stroke();
    }
    
    ctx.restore();
}

function animate(params, canvas, ctx) {
    let bool = 0;
    let speed = 1;
    let animationId = null;

    function loop() {
        params.blur = Math.random() * 10 + 10;
        var n = bool % 10;

        if (n == 0 && n != 50) {
            params.color[bool / 10] = "#00E6E6";
            params.color2[bool / 10] = "red";
            bool = bool + speed;
        } else if (bool == 56) {
            for (var k = 1; k < 4; k++) {
                params.color2[k] = "white";
            }
            bool = 0;
        } else {
            bool = bool + speed;
        }

        for (var a = 0; a < 3; a++) {
            if (params.rad[0] < 30)
                params.rad[a] += speed / 1;
            else
                params.rad[a] = 0;
        }

        // Safari-specific canvas clearing optimization
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(params, ctx);

        animationId = requestAnimFrame(loop);
    }

    loop();
    
    // Cleanup function for Safari memory management
    return function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}

// Safari-compatible canvas initialization
document.addEventListener('DOMContentLoaded', function() {
    // Bütün canvaslar için ayrı ayrı işlem yap
    var canvases = document.getElementsByClassName("myCanvas");
    var cleanupFunctions = [];
    
    for (let i = 0; i < canvases.length; i++) {
        let canvas = canvases[i];
        
        // Safari-specific canvas setup
        canvas.style.display = 'block';
        canvas.style.imageRendering = '-webkit-optimize-contrast';
        canvas.style.imageRendering = 'optimize-contrast';
        
        let ctx = canvas.getContext("2d");
        
        // Safari-specific context optimizations
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        let params = {
            blur: Math.random() * 10 + 10,
            color: ["black", "black", "black", "black", "black"],
            color2: ["black", "black", "black", "black", "black"],
            rad: [0, 0, 0, 0, 0]
        };

        draw(params, ctx);
        let cleanup = animate(params, canvas, ctx);
        cleanupFunctions.push(cleanup);
    }
    
    // Safari-specific cleanup on page unload
    window.addEventListener('beforeunload', function() {
        cleanupFunctions.forEach(function(cleanup) {
            if (typeof cleanup === 'function') {
                cleanup();
            }
        });
    });
});