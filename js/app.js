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
    let all_x
    let result 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;

    this.checkCollision();

    this.border();

    if ((Math.abs(player.x - this.x) < 40)  && (Math.abs(player.y - this.y) < 20)) {
        player.counter = 0;
        player.x = 200;
        player.y = 375;
    }



};
// Check if enenemies collide with other enemies 
Enemy.prototype.checkCollision = function() {
    for (let enem of allEnemies) {
        for (let enem2 of allEnemies) {
            result = enem.x - enem2.x 
            if (result > 0 && result < 100 && enem.y == enem2.y && enem.x !== enem2.x) {
                if (enem2.speed == 500) {
                    enem2.speed = 300;
                }
                enem.speed = 500;
            }
        }
    }
}
// Check if enemies extend the border 
Enemy.prototype.border = function() {
    if (this.x > 470) {
        this.x = -200;
        this.speed = Math.floor(Math.random() * 300 + 50);
        let randNumber = Math.floor(Math.random() * 3);
        if (randNumber == 0) {
            this.y = 65;    // the top-most row
        }
        else if (randNumber == 1) {
            this.y = 145;
        }
        else {
            this.y = 225;
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};

var Player = function(x, y, counter=0) {
    this.counter = counter;
    this.sprite = 'images/char-boy.png'
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    document.onkeydown = this.handleInput;
    if (this.y < 0) {
        let new_counter = player.counter + 1;
        setTimeout(function() {
        player = new Player(200, 375, new_counter);
        }, 200);
    }
}

Player.prototype.render = function() {
    document.getElementById('counter').innerText = "Score " + player.counter;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.handleInput = function(e) {
    // going up 
    if (e.keyCode == '38' && player.y > -34) {
        player.y = (player.y - 82);   // width of pixels is 82
    }

    // going down 
    else if (e.keyCode == '40' && player.y < 300) {
        player.y = (player.y + 82);
    }

    // going left 
    else if (e.keyCode == '37' && player.x > 0) {
        player.x = (player.x - 101);  // height of pixels is 101 
    }
    else if (e.keyCode == '39' && player.x < 401) {
       player.x = (player.x + 101);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let randNumber
let vertical


// Manually generating enemies to show collision at the second the game starts 

allEnemies.push(new Enemy(-70, 65, 360))
allEnemies.push(new Enemy(100, 65, 220))
allEnemies.push(new Enemy(70, 145, 156))
allEnemies.push(new Enemy(100, 225, 80))
allEnemies.push(new Enemy(200, 225, 200))

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


