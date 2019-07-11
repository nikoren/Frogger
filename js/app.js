// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png'
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    document.onkeydown = this.handleInput;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e) {
    if (e.keyCode == '38') {
        player.y = player.y - 80;
    }
    else if (e.keyCode == '40') {
        player.y = player.y + 80;
    }
    else if (e.keyCode == '37') {
        player.x = player.x - 100;
    }
    else if (e.keyCode == '39') {
       player.x = player.x + 100;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




let allEnemies = [];

// this code creates an enemy 

// choosing the vertical position 
let randNumber = Math.floor(Math.random() * 3);

if (randNumber == 0) {
    vertical = 65;    // 65 refers to the top-most row
}
else if (randNumber == 1) {
    vertical = 145;
}
else {
vertical = 225;
}
// choosing the speed 
let speed = Math.floor(Math.random() * 300 + 50);


allEnemies.push(new Enemy(-70, vertical, speed));




let player = new Player(200, 375);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
