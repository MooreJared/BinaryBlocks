// Var
var Array = ["000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000", "000000000000000"];
var ArrayString;
var defaultArray = Array;
var drawOption = $('#drawOption').val();
var mouseDown = false;
var valEmpty = $('#emptyText').val();
var valFull = $('#fullText').val();
var terminalLapse = 0;
var terminalLoop = 0;

// Generate 15x15 Grid
for (var i = 0; i < 225; i++) {
    var boxTemplate = "<div class='box' active='false' id='box" + i + "'></div>";
    $('.draw').prepend(boxTemplate);
}

//Generate Array Display
for (var e = 0; e < 15; e++) {
    var arrayTemplate = "<div class='arrayDisplay' id='arrayDisplay" + e + "'></div>";
    $('.arrayOutput').prepend(arrayTemplate);
}
populateArrayDisplay();

// Button Reset
$('#drawReset').on('click', function () {
    Array = defaultArray;
    populateArrayDisplay();
    $('.box').css('background-color', '#FFF');
    $('.box').attr('active', 'false');
});

// Get Mouse State
$(document).on('mousedown', function () {
    mouseDown = true;
});
$(document).on('mouseup', function () {
    mouseDown = false;
});

// Get Input Data
$('#emptyText').on('change', function () {
    valEmpty = $('#emptyText').val();
});
$('#fullText').on('change', function () {
    valFull = $('#fullText').val();
});

// Draw
$('.box').on('mouseover', function () {
    var ele = $(this);
    drawOption = $('#drawOption').val();
    if (mouseDown) {
        if (drawOption === 'draw') {
            if (ele.attr('active') === 'false') {
                ele.attr('active', 'true');
                ele.css('background-color', '#00ccff');
            }
        } else if (drawOption === 'erase') {
            if (ele.attr('active') === 'true') {
                ele.attr('active', 'false');
                ele.css('background-color', '#FFF');
            }
        }
        generateArray();
        populateArrayDisplay();
    }
});
$('.box').on('mousedown', function () {
    var ele = $(this);
    if (drawOption === 'draw') {
        if (ele.attr('active') === 'false') {
            ele.attr('active', 'true');
            ele.css('background-color', '#00ccff');
        }
    } else if (drawOption === 'erase') {
        if (ele.attr('active') === 'true') {
            ele.attr('active', 'false');
            ele.css('background-color', '#FFF');
        }
    }
    generateArray();
    populateArrayDisplay();
});

function generateArray() {
    var string = "";
    for (var i = 0; i < 225; i++) {
        if ($('#box' + i).attr('active') === 'false') {
            string = string + "0"
        } else {
            string = string + "1"
        }
    }
    ArrayString = string;
    Array = string.match(/.{1,15}/g);
    for (var i = 0; i < 15; i++) {
        Array[i] = Array[i].split("").reverse().join("");
    }

}

function populateArrayDisplay() {
    for (var i = 0; i < 15; i++) {
        $('#arrayDisplay' + i).text(Array[i]);
    }
}
simulateTerminal();
function simulateTerminal() {
    setInterval(function () {
        var terminalTemplate = "<div class='terminalText' id='terminalText" + terminalLapse + "'>" + Array[terminalLoop].replace(/0/ig, valEmpty).replace(/1/ig, valFull) + "</div>";
        $('.terminal').prepend(terminalTemplate);
        terminalLapse++;
        terminalLoop++;
        if (terminalLoop === 15) {
            terminalLoop = 0;
        }
        if (terminalLapse > 50) {
            $("#terminalText" + (terminalLapse - 50)).remove();
        }
    }, 100);
}

function saveData() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var data = 'var loop=14,empty="' + valEmpty + '",full="' + valFull + '",arrayString="' + ArrayString + '";var array = arrayString.match(/.{1,15}/g);setInterval(function(){console.log(array[loop].replace(/0/gi,empty).replace(/1/gi,full)),loop--,0>loop&&(loop=14)},100);';
    var fileName = "BinaryBlocks" + Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    var blob = new Blob([data], {type: "text/javascript"}),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

function stringArray(s){
    var exporter = [];
    for (var i = 0; i< s.length; i++){
        exporter[i] = s[i].toString();
    }
    return(exporter);
}