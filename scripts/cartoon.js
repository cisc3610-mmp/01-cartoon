function init()
{
    window.requestAnimationFrame(draw);
}

function draw()
{
    var ctx = document.getElementById('canvas').getContext('2d');

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, 800, 800); // clear canvas

    // Sky
    ctx.fillStyle = 'rgb(135, 206, 235)';
    ctx.fillRect(0, 0, 800, 800);
    ctx.save();

    window.requestAnimationFrame(draw);
}

init();