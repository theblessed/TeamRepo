
// Global Variables.....................................................

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    playDim = {
        cod1: [(canvas.width) / 3, (canvas.height) / 20],
        cod2: [(canvas.width) * 2 / 3, (canvas.height) * 19 / 20],
        cod3: [(canvas.width) / 20, (canvas.height) / 3],
        cod4: [(canvas.width) * 19 / 20, (canvas.height) * 2 / 3],
    },
    boxDim = [playDim.cod1[0] - (3 * playDim.cod3[0]), playDim.cod3[1] - (3 * playDim.cod1[1])],
    boxPnt = {
        pnt1: [playDim.cod3[0] * 18 / 10, playDim.cod1[1] * 18 / 10],
        pnt2: [(playDim.cod3[0] + boxDim[0]) * 17.5 / 10, playDim.cod1[1] * 18 / 10],
        pnt3: [(playDim.cod3[0] + (2 * boxDim[0])) * 17.5 / 10, playDim.cod1[1] * 18 / 10],

        pnt4: [playDim.cod3[0] * 18 / 10, (playDim.cod1[1] + boxDim[1]) * 17.5 / 10],
        pnt5: [(playDim.cod3[0] + boxDim[0]) * 17.5 / 10, (playDim.cod1[1] + boxDim[1]) * 17.5 / 10],
        pnt6: [(playDim.cod3[0] + (2 * boxDim[0])) * 17.5 / 10, (playDim.cod1[1] + boxDim[1]) * 17.5 / 10],

        pnt7: [playDim.cod3[0] * 18 / 10, (playDim.cod1[1] + (2 * boxDim[1])) * 17.5 / 10],
        pnt8: [(playDim.cod3[0] + boxDim[0]) * 17.5 / 10, (playDim.cod1[1] + (2 * boxDim[1])) * 17.5 / 10],
        pnt9: [(playDim.cod3[0] + (2 * boxDim[0])) * 17.5 / 10, (playDim.cod1[1] + (2 * boxDim[1])) * 17.5 / 10]
    },
    crossLines = {
        line1: [boxPnt.pnt1[0], boxPnt.pnt1[1] + (boxDim[1] / 2), boxPnt.pnt3[0] + boxDim[0], boxPnt.pnt3[1] + (boxDim[1] / 2)],
        line2: [boxPnt.pnt1[0], boxPnt.pnt4[1] + (boxDim[1] / 2), boxPnt.pnt3[0] + boxDim[0], boxPnt.pnt6[1] + (boxDim[1] / 2)],
        line3: [boxPnt.pnt1[0], boxPnt.pnt7[1] + (boxDim[1] / 2), boxPnt.pnt3[0] + boxDim[0], boxPnt.pnt9[1] + (boxDim[1] / 2)],

        line4: [boxPnt.pnt1[0] + (boxDim[0] / 2), boxPnt.pnt1[1], boxPnt.pnt1[0] + (boxDim[0] / 2), boxPnt.pnt7[1] + boxDim[1]],
        line5: [boxPnt.pnt2[0] + (boxDim[0] / 2), boxPnt.pnt2[1], boxPnt.pnt2[0] + (boxDim[0] / 2), boxPnt.pnt8[1] + boxDim[1]],
        line6: [boxPnt.pnt3[0] + (boxDim[0] / 2), boxPnt.pnt3[1], boxPnt.pnt3[0] + (boxDim[0] / 2), boxPnt.pnt9[1] + boxDim[1]],

        line7: [boxPnt.pnt1[0], boxPnt.pnt1[1], boxPnt.pnt9[0] + boxDim[0], boxPnt.pnt9[1] + boxDim[1]],
        line8: [boxPnt.pnt3[0] + boxDim[0], boxPnt.pnt3[1], boxPnt.pnt7[0], boxPnt.pnt7[1] + boxDim[1]]

    },
    endPoints = [],
    crossZero = 'X',
    drawColor = 'lightgray',
    drawComplete = 'darkred',
    takenPoints = [],
    takenCrossZero = [],
    existPoint = 0,
    i = 0;

// Prototype Extension................................................

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

// Functions..........................................................

function erase() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function initValues() {
    endPoints = new Array(8);

    for (i = 0; i < endPoints.length; i++) {
        endPoints[i] = new Array(3);
    }

    endPoints[0][0] = 1;
    endPoints[0][1] = 2;
    endPoints[0][2] = 3;

    endPoints[1][0] = 4;
    endPoints[1][1] = 5;
    endPoints[1][2] = 6;

    endPoints[2][0] = 7;
    endPoints[2][1] = 8;
    endPoints[2][2] = 9;

    endPoints[3][0] = 1;
    endPoints[3][1] = 4;
    endPoints[3][2] = 7;

    endPoints[4][0] = 2;
    endPoints[4][1] = 5;
    endPoints[4][2] = 8;

    endPoints[5][0] = 3;
    endPoints[5][1] = 6;
    endPoints[5][2] = 9;

    endPoints[6][0] = 1;
    endPoints[6][1] = 5;
    endPoints[6][2] = 9;

    endPoints[7][0] = 3;
    endPoints[7][1] = 5;
    endPoints[7][2] = 7;
}

function draw(color) {
    context.strokeStyle = color;
    context.lineWidth = (canvas.width + canvas.height) / 40;

    context.beginPath();
    context.moveTo(playDim.cod1[0], playDim.cod1[1]);
    context.lineTo(playDim.cod1[0], playDim.cod2[1]);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(playDim.cod2[0], playDim.cod1[1]);
    context.lineTo(playDim.cod2[0], playDim.cod2[1]);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(playDim.cod3[0], playDim.cod3[1]);
    context.lineTo(playDim.cod4[0], playDim.cod3[1]);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(playDim.cod3[0], playDim.cod4[1]);
    context.lineTo(playDim.cod4[0], playDim.cod4[1]);
    context.closePath();
    context.stroke();
}

function plotPoints(pos, color, point) {
    context.strokeStyle = color;
    context.lineWidth = (canvas.width + canvas.height) / 40;

    switch (pos) {
        case 1:
            drawPoints(boxPnt.pnt1[0], boxPnt.pnt1[1], boxDim[0], boxDim[1], point);
            break;
        case 2:
            drawPoints(boxPnt.pnt2[0], boxPnt.pnt2[1], boxDim[0], boxDim[1], point);
            break;
        case 3:
            drawPoints(boxPnt.pnt3[0], boxPnt.pnt3[1], boxDim[0], boxDim[1], point);
            break;
        case 4:
            drawPoints(boxPnt.pnt4[0], boxPnt.pnt4[1], boxDim[0], boxDim[1], point);
            break;
        case 5:
            drawPoints(boxPnt.pnt5[0], boxPnt.pnt5[1], boxDim[0], boxDim[1], point);
            break;
        case 6:
            drawPoints(boxPnt.pnt6[0], boxPnt.pnt6[1], boxDim[0], boxDim[1], point);
            break;
        case 7:
            drawPoints(boxPnt.pnt7[0], boxPnt.pnt7[1], boxDim[0], boxDim[1], point);
            break;
        case 8:
            drawPoints(boxPnt.pnt8[0], boxPnt.pnt8[1], boxDim[0], boxDim[1], point);
            break;
        case 9:
            drawPoints(boxPnt.pnt9[0], boxPnt.pnt9[1], boxDim[0], boxDim[1], point);
            break;
    }
}

function gameOver(mouseX, mouseY) {
    var pointsDetail = '',
        zeroPoint = [],
        crossPoint = [],
        maxLength = 0;
    if (takenPoints.length == 9) {
        alert("Game Over, a Draw!!!");
        erase();
        draw(drawColor);
        crossZero = 'X',
        takenPoints = [],
        takenCrossZero = [],
        existPoint = 0,
        i = 0;
    }
    else {
        if (takenPoints.length >= 3) {
            for (i = 0; i < takenPoints.length; i++) {
                if (takenCrossZero[i] == 'X')
                    crossPoint.push(takenPoints[i]);
                else
                    zeroPoint.push(takenPoints[i]);
                pointsDetail += '\n pos - [' + takenPoints[i] + '] : ' + takenCrossZero[i] + '.';
            }

            zeroPoint.sort();
            crossPoint.sort();

            if (zeroPoint.length >= 3 || crossPoint.length >= 3) {
                debugger;
                for (i = 0; i < endPoints.length; i++) {
                    if (zeroPoint.contains(endPoints[i][0])) {
                        if (zeroPoint.contains(endPoints[i][1])) {
                            if (zeroPoint.contains(endPoints[i][2])) {
                                drawGameOver((i + 1), endPoints[i][0], endPoints[i][1], endPoints[i][2], '0');
                                return 0;
                            }
                        }
                    }
                    if (crossPoint.contains(endPoints[i][0])) {
                        if (crossPoint.contains(endPoints[i][1])) {
                            if (crossPoint.contains(endPoints[i][2])) {
                                drawGameOver((i + 1), endPoints[i][0], endPoints[i][1], endPoints[i][2], 'X');
                                return 0;
                            }
                        }
                    }
                }
            }
        }
    }
}

function drawGameOver(pos, pnt1, pnt2, pnt3, pointTic) {
    gameComplete(pos, drawComplete);
    plotPoints(pnt1, drawComplete, pointTic);
    plotPoints(pnt2, drawComplete, pointTic);
    plotPoints(pnt3, drawComplete, pointTic);
    if (pointTic == 'X')
        alert("Game Over, Player 1 Wins!!!");
    else
        alert("Game Over, Player 2 Wins!!!");

    erase();
    draw(drawColor);
    crossZero = 'X',
    takenPoints = [],
    takenCrossZero = [],
    existPoint = 0,
    i = 0;
}

function drawTic(mouseX, mouseY) {

    if (mouseX >= boxPnt.pnt1[0] && mouseX <= (boxPnt.pnt1[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt1[1] && mouseY <= (boxPnt.pnt1[1] + boxDim[1]))
            existPoint = 1;

    if (mouseX >= boxPnt.pnt2[0] && mouseX <= (boxPnt.pnt2[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt2[1] && mouseY <= (boxPnt.pnt2[1] + boxDim[1]))
            existPoint = 2;

    if (mouseX >= boxPnt.pnt3[0] && mouseX <= (boxPnt.pnt3[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt3[1] && mouseY <= (boxPnt.pnt3[1] + boxDim[1]))
            existPoint = 3;

    if (mouseX >= boxPnt.pnt4[0] && mouseX <= (boxPnt.pnt4[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt4[1] && mouseY <= (boxPnt.pnt4[1] + boxDim[1]))
            existPoint = 4;

    if (mouseX >= boxPnt.pnt5[0] && mouseX <= (boxPnt.pnt5[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt5[1] && mouseY <= (boxPnt.pnt5[1] + boxDim[1]))
            existPoint = 5;

    if (mouseX >= boxPnt.pnt6[0] && mouseX <= (boxPnt.pnt6[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt6[1] && mouseY <= (boxPnt.pnt6[1] + boxDim[1]))
            existPoint = 6;

    if (mouseX >= boxPnt.pnt7[0] && mouseX <= (boxPnt.pnt7[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt7[1] && mouseY <= (boxPnt.pnt7[1] + boxDim[1]))
            existPoint = 7;

    if (mouseX >= boxPnt.pnt8[0] && mouseX <= (boxPnt.pnt8[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt8[1] && mouseY <= (boxPnt.pnt8[1] + boxDim[1]))
            existPoint = 8;

    if (mouseX >= boxPnt.pnt9[0] && mouseX <= (boxPnt.pnt9[0] + boxDim[0]))
        if (mouseY >= boxPnt.pnt9[1] && mouseY <= (boxPnt.pnt9[1] + boxDim[1]))
            existPoint = 9;

    for (i = 0; i < takenPoints.length; i++) {
        if (takenPoints[i] == existPoint)
            return;
    }

    plotPoints(existPoint, drawColor, crossZero);
    takenPoints.push(existPoint);
    takenCrossZero.push(crossZero);

    if (crossZero == 'X')
        crossZero = '0'
    else
        crossZero = 'X'
}

function gameComplete(pos, color) {
    context.strokeStyle = color;
    context.lineWidth = (canvas.width + canvas.height) / 40;
    debugger;
    switch (pos) {
        case 1:
            gameCompleteLine(crossLines.line1[0], crossLines.line1[1], crossLines.line1[2], crossLines.line1[3]);
            break;
        case 2:
            gameCompleteLine(crossLines.line2[0], crossLines.line2[1], crossLines.line2[2], crossLines.line2[3]);
            break;
        case 3:
            gameCompleteLine(crossLines.line3[0], crossLines.line3[1], crossLines.line3[2], crossLines.line3[3]);
            break;
        case 4:
            gameCompleteLine(crossLines.line4[0], crossLines.line4[1], crossLines.line4[2], crossLines.line4[3]);
            break;
        case 5:
            gameCompleteLine(crossLines.line5[0], crossLines.line5[1], crossLines.line5[2], crossLines.line5[3]);
            break;
        case 6:
            gameCompleteLine(crossLines.line6[0], crossLines.line6[1], crossLines.line6[2], crossLines.line6[3]);
            break;
        case 7:
            gameCompleteLine(crossLines.line7[0], crossLines.line7[1], crossLines.line7[2], crossLines.line7[3]);
            break;
        case 8:
            gameCompleteLine(crossLines.line8[0], crossLines.line8[1], crossLines.line8[2], crossLines.line8[3]);
            break;
    }

}

function gameCompleteLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
}

function drawPoints(x, y, w, h, point) {
    context.beginPath();

    if (point == 'X') {

        context.moveTo(x, y);
        context.lineTo(x + w, y + h);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.moveTo(x + w, y);
        context.lineTo(x, y + h);

    }
    else if (point == '0') {
        context.arc(x + (w / 2), y + (h / 2), (w + h) / 4, 0, 2 * Math.PI, false);
    }
    context.closePath();
    context.stroke();
}

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

// Event handlers.....................................................

canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    drawTic(loc.x, loc.y);
};

canvas.onmouseup = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    gameOver(loc.x, loc.y);
};



// Initialization.....................................................
erase();
initValues();
draw(drawColor);