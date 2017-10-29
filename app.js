window.onload = function () {
    // alert("hello world");
}

var c = document.getElementById("clock");
c.style.backgroundColor = "#000";
var ctx = c.getContext("2d");

var trail = [];
var colours = [];

function clockHand(timeValue, timeType){


        var secHandLength;
        if(timeType === "secs"){
            secHandLength = (c.width / 2);
            ctx.lineWidth = 1;
        }

        if(timeType === "mins"){
            secHandLength = (c.width / 2.2);
            ctx.lineWidth = 5;

        }

        if(timeType === "hours"){
            secHandLength = (c.width / 3);
            ctx.lineWidth = 7;

        }

        var angle = timeType === "secs" || timeType === "mins" ?
            (timeValue - 15) * ((Math.PI * 2)) / 60 :
            (timeValue - 3) * ((Math.PI * 2)) / 12// THE ANGLE TO MARK.

        var x1 = (c.width / 2);
        var y1 = (c.height / 2);
        var x2 = (c.width / 2) + Math.cos(angle) * (secHandLength);
        var y2 = (c.height / 2) + Math.sin(angle) * (secHandLength);

        trail.push({x: x2, y: y2});


                   // HAND WIDTH.
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = '#466B76';
        ctx.stroke();
}




var tick = function(){

    ctx.clearRect(0, 0, c.width, c.height);
    var time = new Date();
    console.log(time.getSeconds());
    drawCircle();
    drawMinTimeMarks();
    drawHourTimeMarks();
    clockHand(time.getSeconds(), "secs");
    clockHand(time.getMinutes(), "mins");
    clockHand(time.getHours(), "hours");

    window.requestAnimationFrame(tick);
};

function drawHourTimeMarks(){
    var mark = c.width / 2;

    for(var i = 0; i < 12; i++){
        var angle = (i - 3) * (Math.PI * 2) / 12;

        ctx.lineWidth = 3;            // HAND WIDTH.
        ctx.beginPath();

        var x1 = (c.width / 2) + Math.cos(angle) * (mark);
        var y1 = (c.height / 2) + Math.sin(angle) * (mark);
        var x2 = (c.width / 2) + Math.cos(angle) * (mark - (mark / 10));
        var y2 = (c.height / 2) + Math.sin(angle) * (mark - (mark / 10));

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = '#466B76';
        ctx.stroke();

    }
}

function drawMinTimeMarks(){

    var mark = c.width / 2;

    for(var i = 0; i < 60; i++){
        var angle = (i - 15) * (Math.PI * 2) / 60;

        ctx.lineWidth = 1;            // HAND WIDTH.
        ctx.beginPath();

        var x1 = (c.width / 2) + Math.cos(angle) * (mark);
        var y1 = (c.height / 2) + Math.sin(angle) * (mark);
        var x2 = (c.width / 2) + Math.cos(angle) * (mark - (mark / 15));
        var y2 = (c.height / 2) + Math.sin(angle) * (mark - (mark / 15));

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = getRandomColor();
        ctx.stroke();

    }
}

function drawCircle(){
    ctx.beginPath();
    ctx.arc(c.width / 2, c.height / 2, 5,0,2*Math.PI);
    //ctx.arc(c.width / 2, c.height / 2, c.width / 2,0,2*Math.PI);
    ctx.stroke();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.requestAnimationFrame(tick);


