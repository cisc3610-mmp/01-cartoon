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

    // Mountains
    drawMountain((canvas.width / 2) - 100, canvas.height / 2, 80, 80);
    drawMountain((canvas.width / 2) + 130, canvas.height / 2, 85, 75);
    drawMountain((canvas.width / 2) - 55, canvas.height / 2, 90, 100, true);
    drawMountain((canvas.width / 2) + 60, canvas.height / 2, 110, 115, true);
    drawMountain(canvas.width / 2, canvas.height / 2, 100, 125, true);

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

function drawMountain(x, y, base, height, withSnow = false)
{
    ctx.beginPath();
    ctx.moveTo(x - base, y);
    ctx.lineTo(x, y - height);
    ctx.lineTo(x + base, y);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(50,25,7)';
    ctx.stroke();
    ctx.fillStyle = 'rgb(72,36,10)';
    ctx.fill();

    if(withSnow)
    {
        let snowBase = base / 4;
        let snowHeight = height * 0.75;

        ctx.beginPath();
        ctx.moveTo(x, y - height);
        ctx.lineTo(x - snowBase, y - snowHeight);
        ctx.lineTo(x - snowBase + (snowBase * 0.3), y - snowHeight + (snowHeight * 0.05));
        ctx.lineTo(x - snowBase + (snowBase * 0.8), y - snowHeight - (snowHeight * 0.03));
        ctx.lineTo(x + snowBase - (snowBase * 0.5), y - snowHeight + (snowHeight * 0.08));
        ctx.lineTo(x + snowBase, y - snowHeight);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

init();