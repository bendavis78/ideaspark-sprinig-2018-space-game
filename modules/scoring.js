var scoreboard = new Scoreboard();
scoreboard.countdown(300);
scoreboard.score();

var gameOver = false;

scoreboard.onTimeExpired(function() {
   scoreboard.message('Game Over!'); 
});