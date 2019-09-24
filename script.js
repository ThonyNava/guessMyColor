var colors;
var headerBox = document.getElementById("header");
var squares = document.querySelectorAll(".square");
var squareBox = document.getElementById("squareBox");
var rgbDisplay = document.getElementById("rgbColorDisplay");
var messageDisplay = document.getElementById("message");
var restartButton = document.getElementById("restartBtn");
var easyButton = document.getElementById("easyBtn");
var hardButton = document.getElementById("hardBtn");
var hardSquares = document.querySelectorAll(".hard");
var pickedColor;
var easy = true;
var num = 3;

start();

function start(){

    colors = colorMixer(num);
    pickedColor = colors[colorPicker()];
    messageDisplay.textContent = ""
    rgbDisplay.textContent = pickedColor;
    headerBox.style.backgroundColor = "#232323";

    for(var i = 0; i < num; i++){
        //add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grap color of clicked squares
            var clickedBox = this.style.backgroundColor;
            //compare color to pickedColor
            if(pickedColor == clickedBox){
                messageDisplay.textContent = "Awesome. That's correct!"
                changeColors(pickedColor);
                restartButton.classList.add("btn_hover");
            } else {
                this.classList.add("wrongBoxClicked");
                messageDisplay.textContent = "Ups! Try again";
            }
        });
    }
};

function colorMixer(num){
    //make an array
    var arr = [];
    //repeat num times
    for(var i = 0; i < num; i++){
        //get the random color and push it into the array
        arr.push(randomColorGenerator());
    };
    //return the array
    return arr;
};

function randomColorGenerator(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
};

function colorPicker(){
    return Math.floor(Math.random() * colors.length)
};

function changeColors(color){
    for (var i = 0; i < squares.length; i++){
        squares[i].classList.remove("wrongBoxClicked");
        squares[i].style.backgroundColor = color;
    }
    headerBox.style.backgroundColor = color;
}

restartButton.addEventListener("click", function(){
    start();
    restartButton.classList.remove("btn_hover");
    for(var i = 0; i < squares.length; i++){
        squares[i].classList.remove("wrongBoxClicked");
    };
});

easyButton.addEventListener("click", function(){
    if(easy == false){
        easy = true;
        num = 3;
        this.classList.add("activated");
        hardButton.classList.remove("activated");
        squareBox.classList.add("easyPadding");
        squareBox.classList.remove("hardPadding");
        for(var i = 0; i < hardSquares.length; i++){
            start();
            hardSquares[i].classList.add("opacity-0");
        }
    };
});

hardButton.addEventListener("click", function(){
    if(easy == true){
        easy = false;
        num = 6;
        this.classList.add("activated");
        easyButton.classList.remove("activated");
        squareBox.classList.remove("easyPadding");
        squareBox.classList.add("hardPadding");
        setTimeout(function() {
            //your code to be executed after 0.6 seconds
            for(var i = 0; i < squares.length; i++){
                squares[i].classList.remove("opacity-0");
                start();
            };
          }, 600);
    };
});