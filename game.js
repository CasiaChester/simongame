userClickedPattern = []
gamePattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
var started = false
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.round(Math.random() * 3)
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success!");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        startOver()
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    }

}


$(".btn").on("click", function(event) {
    userChosenColour = event.target.id;
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name) {
    switch (name) {
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;

        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play();   
            break;

        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;

        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;
        case "wrong":
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
            break;        
    }
}

function animatePress(currentColour) {
    var animateButton = $("."+ currentColour);
    animateButton.addClass("pressed");

    setTimeout(function() {
        animateButton.removeClass("pressed");}, 100);
}

$(document).on("keypress", function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    };
});

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}