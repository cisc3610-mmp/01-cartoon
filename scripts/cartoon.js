function init()
{
    window.requestAnimationFrame(draw);
}

function draw()
{
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    // Sky
    ctx.fillStyle = 'rgb(135, 206, 235)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Ground
    ctx.fillStyle = 'rgb(50, 205, 50)';
    ctx.fillRect(0, canvas.height - (canvas.height / 2), canvas.width, canvas.height / 2);

    window.requestAnimationFrame(draw);
}

init();