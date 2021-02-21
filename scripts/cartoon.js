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

    // River
    let start = { x: canvas.width / 2, y: canvas.height / 2 }; // base of center mountain
    let cp1 = { x: canvas.width * 0.8, y: canvas.height * 0.65 }; // left bank curve to the right
    let cp2 = { x: -canvas.width * 0.7, y: canvas.height * 0.75 }; // left bank curve to the left
    let leftEnd = { x: canvas.width * 0.5, y: canvas.height }; // bottom of canvas, perpendicular to mountain base
    let cp3 = { x: canvas.width * 0.9, y: canvas.height * 0.65 }; // right bank curve to the right
    let cp4 = { x: -canvas.width * 0.35, y: canvas.height * 0.75 }; // right bank curve to the left

    ctx.beginPath();
    ctx.moveTo(start.x, start.y); // start from base of the mountain
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, leftEnd.x, leftEnd.y); // go along left bank
    ctx.lineTo(canvas.width, canvas.height); // move right to bottom right corner of canvas
    ctx.lineTo(canvas.width, canvas.height * 0.9); // move upward to bottom of right bank
    ctx.bezierCurveTo(cp4.x, cp4.y, cp3.x, cp3.y, start.x, start.y); // go along right bank, back towards the mountain
    ctx.strokeStyle = 'rgb(0,139,139)';
    ctx.stroke();
    ctx.fillStyle = 'rgb(0,139,139)';
    ctx.fill();

    // Mountains
    drawMountain((canvas.width / 2) - 100, canvas.height / 2, 80, 80);
    drawMountain((canvas.width / 2) + 130, canvas.height / 2, 85, 75);
    drawMountain((canvas.width / 2) - 55, canvas.height / 2, 90, 100, true);
    drawMountain((canvas.width / 2) + 60, canvas.height / 2, 110, 115, true);
    drawMountain(canvas.width / 2, canvas.height / 2, 100, 125, true);

    // Trees
    drawTree(canvas.width * 0.05, canvas.height * 0.5);
    drawTree(canvas.width * 0.05, canvas.height * 0.65);
    drawTree(canvas.width * 0.08, canvas.height * 0.55);
    drawTree(canvas.width * 0.12, canvas.height * 0.63);
    drawTree(canvas.width * 0.16, canvas.height * 0.57);
    drawTree(canvas.width * 0.2, canvas.height * 0.64);
    drawTree(canvas.width * 0.22, canvas.height * 0.5);
    drawTree(canvas.width * 0.25, canvas.height * 0.6);
    drawTree(canvas.width * 0.32, canvas.height * 0.56);
    drawTree(canvas.width * 0.43, canvas.height * 0.54);
    drawTree(canvas.width * 0.38, canvas.height * 0.58);

    // House
    drawHouse();

    // Caption
    ctx.fillStyle = 'white';
    ctx.font = '30px serif';
    ctx.fillText('A nice view', (canvas.width / 2) - 60, canvas.height - 50);

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

function drawTree(x, y)
{
    let trunkWidth = 10;
    let trunkHeight = 30;
    let base = 25;

    // Trunk
    ctx.fillStyle = 'rgb(117,59,16)';
    ctx.fillRect(x, y, trunkWidth, trunkHeight);

    // Leaves
    for(let i = 0; i < 3; i++)
    {
        ctx.beginPath();
        ctx.moveTo(x, y - (base * i));
        ctx.lineTo(x + base + (base / 4), y - (base * i));
        ctx.lineTo(x + (base / 4) , y - (base * i) - (base * 1.5));
        ctx.lineTo(x - base, y - (base * i));
        ctx.lineTo(x, y - (base * i));
        ctx.closePath();
        ctx.fillStyle = 'rgb(0,100,0)';
        ctx.fill();
    }
}

function drawHouse()
{
    // Porch
    ctx.beginPath();
    ctx.moveTo((canvas.width / 2) + 50, canvas.height * 0.8);
    ctx.lineTo(canvas.width, canvas.height * 0.85);
    ctx.lineTo(canvas.width, canvas.height * 0.78);
    ctx.lineTo((canvas.width / 2) + 80, canvas.height * 0.74);
    ctx.lineTo((canvas.width / 2) + 50, canvas.height * 0.8);
    ctx.fillStyle = 'rgb(139,69,19)';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgb(105,105,105)';
    ctx.stroke();

    // Front Wall
    ctx.beginPath();
    ctx.moveTo((canvas.width / 2) + 80, canvas.height * 0.74);
    ctx.lineTo((canvas.width / 2) + 80, canvas.height * 0.5);
    ctx.lineTo(canvas.width, canvas.height * 0.525);
    ctx.lineTo(canvas.width, canvas.height * 0.78);
    ctx.fillStyle = 'rgb(199,38,38)';
    ctx.fill();
    ctx.stroke();

    // Door
    ctx.beginPath();
    ctx.moveTo((canvas.width / 2) + 100, canvas.height * 0.743);
    ctx.lineTo((canvas.width / 2) + 100, canvas.height * 0.63);
    ctx.lineTo((canvas.width / 2) + 150, canvas.height * 0.635);
    ctx.lineTo((canvas.width / 2) + 150, canvas.height * 0.749);
    ctx.fillStyle = 'rgb(200,123,17)';
    ctx.fill();
    ctx.stroke();

    // Doorknob
    ctx.beginPath();
    ctx.arc((canvas.width / 2) + 140, canvas.height * 0.7, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb(139,69,19)';
    ctx.fill();

    // Window - first floor
    ctx.beginPath();
    ctx.moveTo((canvas.width / 2) + 190, canvas.height * 0.7);
    ctx.lineTo((canvas.width / 2) + 190, canvas.height * 0.58);
    ctx.lineTo(canvas.width - 100, canvas.height * 0.59);
    ctx.lineTo(canvas.width - 100, canvas.height * 0.715);
    ctx.lineTo((canvas.width / 2) + 190, canvas.height * 0.7);
    ctx.fillStyle = 'rgba(245,245,245,0.65)';
    ctx.fill();
    ctx.stroke();

    // Attic
    ctx.beginPath();
    ctx.moveTo((canvas.width / 2) + 80, canvas.height * 0.5);
    ctx.lineTo(canvas.width - 160, canvas.height * 0.37);
    ctx.lineTo(canvas.width, canvas.height * 0.525);
    ctx.fillStyle = 'rgb(199,38,38)';
    ctx.fill();
    ctx.stroke();

    // Window - attic
    ctx.beginPath();
    ctx.arc(canvas.width - 165, canvas.height * 0.455, 35, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(245,245,245,0.65)';
    ctx.fill();
    ctx.stroke();

    // Roof
    ctx.beginPath();
    ctx.moveTo(canvas.width - 160, canvas.height * 0.37);
    ctx.lineTo(canvas.width, canvas.height * 0.33);
    ctx.lineTo(canvas.width, canvas.height * 0.525);
    ctx.fillStyle = 'rgb(54,54,54)';
    ctx.fill();
    ctx.stroke();
}

init();