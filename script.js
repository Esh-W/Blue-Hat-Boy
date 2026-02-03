var rs = new Audio("assets/audio/run.mp3"); //rs = run sound
rs.loop = true;
var js = new Audio("assets/audio/jump.mp3"); //js = jump sound
var ds = new Audio("assets/audio/dead.mp3"); //ds = dead sound

var hasStarted = false;
var isGameOver = false;
var isJumping = false;

document.addEventListener("keydown", key);

function key(event){
    if(isGameOver){
        return;
    }

    var code = event.code || event.key || event.which || event.keyCode;
    var isEnter = code === "Enter" || code === 13;
    var isSpace = code === "Space" || code === " " || code === 32;

    if(isEnter){
        startGame();
        startRun();
    }

    if(isSpace){
        startGame();
        startJump();
    }
}

function startGame(){
    if(hasStarted){
        return;
    }

    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("blue").style.visibility = "hidden";
    clearInterval(idlew);

    hasStarted = true;
    fid = fire();
    fw = setInterval(fireMove,20);
    bw = setInterval(backgrnd,20);
    sw = setInterval(score,200);
}

function startRun(){
    if(isJumping || rw !== 0){
        return;
    }

    rw = setInterval(run,50);
    rs.play();
}

function startJump(){
    if(isJumping || jw !== 0){
        return;
    }

    isJumping = true;
    clearInterval(rw);
    rw = 0;
    rs.pause();
    jw = setInterval(jump,70);
    js.play();
}

var fid = 0;
var fw = 0; //fire worker
var u = 1000;
var fireCount = 10;
var fireGap = 700;
var fireSpeed = 5;
var fireRespawnOffset = 120;

function fire(){

    for(var y = 0; y<fireCount; y++){
        var i = document.createElement("img");
        i.src = "assets/images/flame.gif";
        i.className = "fire";
        i.id = "d"+y;
        i.style.marginLeft = u+"px";
        document.getElementById("d").appendChild(i);
        u = u+fireGap;
    }
}

function fireMove(){

    var maxRight = 0;

    for(var y = 0; y<fireCount; y++){
        var z = getComputedStyle(document.getElementById("d"+y));
        var currentLeft = parseInt(z.marginLeft);
        if(currentLeft > maxRight){
            maxRight = currentLeft;
        }
    }

    for(var y = 0; y<fireCount; y++){
        var z = getComputedStyle(document.getElementById("d"+y));
        var w = parseInt(z.marginLeft) - fireSpeed;
        var node = document.getElementById("d"+y);

        if(w < -fireRespawnOffset){
            w = maxRight + fireGap;
            maxRight = w;
        }

        node.style.marginLeft = w+"px";

        if(w >= 60 && w <=160){
            if(mt > 330){
                gameOver();
            }
        }
    }
}

var x = document.getElementById("boy");

var idlew = 0;
var idle = 1;

function idleAnimation(){
    idle = idle + 1;

    if(idle == 16){
        idle = 1;
    }

    x.src = "assets/images/Idle ("+idle+").png";
}

function idleAnimationStart(){
    idlew = setInterval(idleAnimation,100);
}

var rw = 0;
var r = 1;

function run(){

    r = r + 1;

    if(r == 16){
        r = 1;
    }

    x.src = "assets/images/Run ("+r+").png";
}

var jw = 0;
var j = 3;
var mt = 350;

function jump(){

    if(j >= 3 && j <=9){
        mt = mt - 20;
    }

    if(j >=9){
        mt = mt + 20;
    }

    x.style.marginTop = mt + "px";

    j = j + 1;

    if(j ==16){
        j = 3;

        clearInterval(jw);
        jw = 0;
        isJumping = false;
 
        startRun();
        
    }

    x.src = "assets/images/Jump ("+j+").png";
}

var bw = 0;
var b = 0;

function backgrnd(){

    b = b - 5;

    document.getElementById("d").style.backgroundPositionX = b+"px";
}

var sw = 0;
var p =0;

function score(){

    p = p +10;

    document.getElementById("score").innerHTML = p;
}

var dw = 0;
var d =0;

function dead(){

    d = d + 1;

    if(d == 16){
        d = 15;

        x.style.marginTop = "350px";

        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = p;
        document.getElementById("score").style.visibility = "hidden";
    }

    x.src = "assets/images/Dead ("+d+").png";
}

function gameOver(){
    if(isGameOver){
        return;
    }

    isGameOver = true;
    clearInterval(rw);
    rs.pause();
    rw = 0;

    clearInterval(jw);
    jw = 0;
    isJumping = false;

    clearInterval(fw);
    fw = 0;

    clearInterval(bw);
    bw = 0;

    clearInterval(sw);
    sw = 0;

    dw = setInterval(dead,50);
    ds.play();
}

function reload(){
    location.reload();
}