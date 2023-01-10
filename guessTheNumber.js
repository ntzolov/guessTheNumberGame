const { read } = require('fs');

function GuessTheNumber() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let endNumber = 100;
  let computerGuess = Math.ceil(Math.random() * endNumber);
  let guess;
  let answer;
  let level = 0;
  let currTries = 0;
  let globalTries = 0;

  let recursiveAsyncReadline = function () {
    readline.question(
      `Guess the number (Only integers from 1-${endNumber} incl./incl.) : `,
      (number) => {
        guess = Number(number);

        if (guess <= endNumber && guess >= 1) {
          if (guess % 1 !== 0) {
            console.log(`Cannot be float number! Try again...`);
            recursiveAsyncReadline();
          } else if (guess === computerGuess) {
            level++;
            currTries++;
            globalTries += currTries;
            if (level === 3) {
              console.log(
                `Amazing!!! You beat the game with ${globalTries} tries!`
              );
              readline.close();
            } else {
              console.log(
                `Congratulations!!! You guessed the number for level ${level}!`
              );
              console.log(`You succeed with ${currTries} tries!`);
              questionForPlayingNextLevel();
            }
          } else if (guess > computerGuess) {
            currTries++;
            console.log('Too high!');
            recursiveAsyncReadline();
          } else if (guess < computerGuess) {
            currTries++;
            console.log('Too low!');
            recursiveAsyncReadline();
          }
        } else {
          console.log('Invalid input! Try again...');
          recursiveAsyncReadline();
        }
      }
    );

    function questionForPlayingNextLevel() {
      readline.question(
        'Do you want to play the next level? (Y/N) : ',
        (yesOrNo) => {
          answer = String(yesOrNo).toLowerCase();
          if (answer === 'y') {
            endNumber *= 10;
            computerGuess = Math.ceil(Math.random() * endNumber);
            currTries = 0;
            recursiveAsyncReadline();
          } else if (answer === 'n') {
            return readline.close();
          } else {
            console.log('Invalid input! Try again...');
            questionForPlayingNextLevel();
          }
        }
      );
    }
  };
  recursiveAsyncReadline();
}

GuessTheNumber();
