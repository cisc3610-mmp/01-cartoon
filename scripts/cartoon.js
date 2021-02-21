const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function init()
{
    window.requestAnimationFrame(draw);
}

function draw()
{
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    // Sky
    ctx.fillStyle = 'rgb(135, 206, 235)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Sun
    ctx.fillStyle = 'rgb(255, 191, 0)';
    ctx.shadowBlur = 100;
    ctx.shadowColor = 'rgb(255, 191, 0)';
    ctx.beginPath();
    ctx.arc(canvas.width - 100, 100, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // Clouds
    drawCloud(canvas.width / 6, 150, 0.5);
    drawCloud(canvas.width / 3, 200, 0.75);
    drawCloud(canvas.width / 2, 100, 0.4);
    drawCloud(canvas.width / 1.5, 150, 0.6);

    // Ground
    ctx.fillStyle = 'rgb(50, 205, 50)';
    ctx.fillRect(0, canvas.height - (canvas.height / 2), canvas.width, canvas.height / 2);

    window.requestAnimationFrame(draw);
}

function drawCloud(x, y, size)
{
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 60 * size, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(x + (70 * size), y - (60 * size), 70 * size, Math.PI * 1, Math.PI * 1.85);
    ctx.arc(x + (152 * size), y - (45 * size), 50 * size, Math.PI * 1.37, Math.PI * 1.91);
    ctx.arc(x + (200 * size), y, 60 * size, Math.PI * 1.5, Math.PI * 0.5);
    ctx.fill();
}

init();