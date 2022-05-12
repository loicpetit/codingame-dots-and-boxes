/**
 * Own more boxes than your opponent!
 **/

 const boardSize = parseInt(readline()); // The size of the board.
 const playerId = readline(); // The ID of the player. 'A'=first player, 'B'=second player.
 
 // game loop
 while (true) {
     var inputs = readline().split(' ');
     const playerScore = parseInt(inputs[0]); // The player's score.
     const opponentScore = parseInt(inputs[1]); // The opponent's score.
     const numBoxes = parseInt(readline()); // The number of playable boxes.
     for (let i = 0; i < numBoxes; i++) {
         var inputs = readline().split(' ');
         const box = inputs[0]; // The ID of the playable box.
         const sides = inputs[1]; // Playable sides of the box.
     }
 
     // Write an action using console.log()
     // To debug: console.error('Debug messages...');
 
     console.log('A1 B MSG bla bla bla...');     // <box> <side> [MSG Optional message]
 
 }
 