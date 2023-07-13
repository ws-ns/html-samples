let lineWidth = 5;
let lineColor = 'rgb( 0, 0, 0 )';


document.addEventListener('DOMContentLoaded', function() {

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let flagDrawing = false;
    let startX = 0;
    let startY = 0;

    canvas.width = 800;
    canvas.height = 600;

    canvas.addEventListener( 'mousedown', canvasMouseStart );
    canvas.addEventListener( 'mousemove', canvasMouseMove );
    canvas.addEventListener( 'mouseup',   canvasMouseEnd );
    canvas.addEventListener( 'touchstart', canvasTouchStart );
    canvas.addEventListener( 'touchmove',  canvasTouchMove );
    canvas.addEventListener( 'touchend',   canvasTouchEnd );

    function canvasMouseStart(e) {
        startX = e.offsetX;
        startY = e.offsetY;
        flagDrawing = true;
    }
    function canvasMouseMove(e) {
        let nowX = e.offsetX;
        let nowY = e.offsetY;
        if ( flagDrawing ) {
            drawLine(nowX, nowY);
        }
    }
    function canvasMouseEnd(e) {
        flagDrawing = false;
    }
    function canvasTouchStart(e) {
        if ( e.touches && e.touches[0] ) {
            e.preventDefault();
            startX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
            startY = e.touches[0].clientY - canvas.getBoundingClientRect().top;
            flagDrawing = true;
        }
    }
    function canvasTouchMove(e) {
        if ( e.touches && e.touches[0] ) {
            e.preventDefault();
            let nowX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
            let nowY = e.touches[0].clientY - canvas.getBoundingClientRect().top;
            if ( flagDrawing ) {
                drawLine(nowX, nowY);
            }
        }
    }
    function canvasTouchEnd(e) {
        flagDrawing = false;
    }
    function drawLine(x, y) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = lineColor;
        ctx.moveTo( startX, startY );
        ctx.lineTo( x, y );
        ctx.closePath();
        ctx.stroke();
        startX = x;
        startY = y;
    }

});


function canvasToData() {
    let canvas = document.getElementById('canvas');
    let memory = document.createElement('canvas');

    memory.width  = canvas.width;
    memory.height = canvas.height;

    let canvas_ctx = canvas.getContext('2d');
    let memory_ctx = memory.getContext('2d');

    memory_ctx.drawImage( canvas, 0, 0, );

    let output = document.getElementById('canvas-data');
    output.src = memory.toDataURL();
}
function setLineWidth(w) {
    lineWidth = w;
}
function setLineColor(c) {
    lineColor = c;
}
