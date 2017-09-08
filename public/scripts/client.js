var winningNumb = 0;
var guessCounter = 0;
var guessLimit = 3;

$(document).ready(onReady);

function onReady() {
    $('#gameArea').hide();
    $('#startButton').on('click', startGame);
    $('#playButton').on('click', compareGuess);
    $('#rageQuit').on('click', rageQuit);
} //end onReady

function startGame(event) {
    event.preventDefault();
    resetGameArea();
    $('#gameArea').show();
    $('#currentGuesses').text(guessCounter);
    $('#guessLimit').text(guessLimit);
    var levelVal = $('#difficultySetting input[name=level]:checked').val();

    $.ajax({
        type: 'POST',
        url: '/maxNumber',
        data: {
            max: levelVal
        },
        success: function (res) {
            console.log(res);
            console.log('checked: ', levelVal);
            winningNumb = res.returnedNumb;
            console.log("winningNumb -->", winningNumb);
        }
    });
}

function compareGuess(event) {
    event.preventDefault();
    guessCounter++;
    console.log(" Guess -->", guessCounter);
    $('#currentGuesses').text(guessCounter);
    if (guessCounter < guessLimit) {
        var guessArray = $('#playerData input[name=guess]');
        console.log('player guesses: ', guessArray);
        for (var i = 0; i < guessArray.length; i++) {
            var $input = $(guessArray[i]);
            var $p = $input.next('p');
            var guess = parseInt($(guessArray[i]).val());
            console.log('guess ' + [i] + ': ' + guess);
            $input.val('');
            if (guess === winningNumb) {
                console.log('You win!');
                $p.text('You guessed ' + guess + '! You win!');
            } else if (guess < winningNumb) {
                console.log('Too low...');
                $p.text('You guessed ' + guess + '. Too low...');
            } else {
                console.log('Too high...');
                $p.text('You guessed ' + guess + '. Too high...');
            }
        }
    }
    else {
        $('#gameArea').hide();
        alert("You all failed. You should find an easier game.");
    }
} // end compareGuess

function resetGameArea() {
    guessCounter = 0;
    $('#currentGuesses').text(guessCounter);
    $('#playerData input[name=guess]').each(function(element) {
        console.log(element);
        $(element).val('');
    });




}

function rageQuit() {
    $('#difficultySetting input[name=level]:checked').each(function(element) {
        $(element).prop('checked','false');
    });

    $('#gameArea').hide();
}