// In word document 4th page there is a mistake. It is Math.floor instead of Math.ceil
function GuessTheNumber() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let computerGuess = Math.ceil(Math.random() * 100);
  let guess;

  let recursiveAsyncReadline = function () {
    readline.question(
      'Guess the number (Only integers from 1-100 incl./incl.) : ',
      (number) => {
        guess = Number(number);

        if (guess <= 100 && guess >= 1) {
          if (guess % 1 !== 0) {
            console.log(`Cannot be float number! Try again...`);
            recursiveAsyncReadline();
          } else if (guess === computerGuess) {
            console.log('Congratulations!!! You guessed the number!');
            return readline.close();
          } else if (guess > computerGuess) {
            console.log('Too high!');
            recursiveAsyncReadline();
          } else if (guess < computerGuess) {
            console.log('Too low!');
            recursiveAsyncReadline();
          }
        } else {
          console.log('Invalid input! Try again...');
          recursiveAsyncReadline();
        }
      }
    );
  };
  recursiveAsyncReadline();
}

GuessTheNumber();
