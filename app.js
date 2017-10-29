window.onload = function () {
    // alert("hello world");
}

var c = document.getElementById("clock");
c.style.backgroundColor = "#000";
var ctx = c.getContext("2d");

var trail = [];
var colours = [];

function clockHand(hour){

        var secHandLength = (c.width / 3);

        var angle = (hour - 15) * ((Math.PI * 2)) / 60;       // THE ANGLE TO MARK.


        var x1 = (c.width / 2);
        var y1 = (c.height / 2);
        var x2 = (c.width / 2) + Math.cos(angle) * (secHandLength);
        var y2 = (c.height / 2) + Math.sin(angle) * (secHandLength);

        trail.push({x: x2, y: y2});

        ctx.lineWidth = 1;            // HAND WIDTH.
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = '#466B76';
        ctx.stroke();
}


var i = 0;


var tick = function(){

    ctx.clearRect(0, 0, c.width, c.height);
    var time = new Date();
    console.log(time.getSeconds());
    clockHand(i);
    i++;
    if(i >= 120)
        i = 0;
    if(trail.length > 25){
        trail.shift();
    }

    trail.forEach(function(ele, i){
        ctx.lineWidth = i;            // HAND WIDTH.
        ctx.beginPath();
        // ctx.moveTo(ele.x, ele.y);
        // ctx.lineTo(Math.random() + ele.x, Math.random() + ele.y);

        ctx.strokeRect(ele.x, ele.y ,Math.random() + ele.x, Math.random() + ele.y);

        ctx.strokeStyle = getRandomColor();
        ctx.stroke();
    });
    window.requestAnimationFrame(tick);
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.requestAnimationFrame(tick);


