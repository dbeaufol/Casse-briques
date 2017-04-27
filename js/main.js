var	game = new Phaser.Game(575, 500, Phaser.AUTO, 'gameDiv');
var conteur = 0;
var score = 0;
var pseudo;
var flag = false;
//Exemple de JSON
var version = '{"version":[' +
'{"numero":"1.0" },' +
'{"numero":"2.0" },' +
'{"numero":"3.0" }]}';
obj = JSON.parse(version);
//document.getElementById("demo").innerHTML = obj.version[0].numero;

var main = {
  //Chargement des images
	preload: function() {
    game.load.image('paddle', '/images/paddle.png');
    game.load.image('ball', '/images/ball.png');
    game.load.image('brik', '/images/brick.png');
    game.load.image('brik2', '/images/brick2.png');
    },

  create: function() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursor = game.input.keyboard.createCursorKeys()
    //Raquette
    this.paddle = game.add.sprite(287.5, 450, 'paddle');
		game.physics.arcade.enable(this.paddle);
		this.paddle.body.collideWorldBounds = true;
		this.paddle.body.immovable = true;
    //Balle
    this.ball = game.add.sprite(287.5, 300, 'ball');
    game.physics.arcade.enable(this.ball);
    game.physics.arcade.checkCollision.down = false;
    this.ball.body.collideWorldBounds = true;
    this.ball.body.velocity.x = (Math.random()*401)-200; this.ball.body.velocity.y = 200;
    this.ball.body.bounce.x = 1.01; this.ball.body.bounce.y = 1.01;
    //Brique type 1
    this.bricks = game.add.group();
    this.bricks.enableBody = true;
    for (var i = 0; i < 8; i++)
      for (var j = 0; j < 5; j++)
        game.add.sprite(55+i*60, 55+j*35, 'brik', 0, this.bricks);
    this.bricks.setAll('body.immovable', true);
    //Brique type 2
    this.bricks2 = game.add.group();
    this.bricks2.enableBody = true;
    for (var i = 0; i < 8; i++)
      for (var j = 0; j < 1; j++)
        game.add.sprite(55+i*60, 225+j*35, 'brik2', 0, this.bricks2);
    this.bricks2.setAll('body.immovable', true);
  },

  update: function() {
    //Gestion des collisions
    game.physics.arcade.collide(this.paddle, this.ball, this.hitPaddle, null, this);
    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
    game.physics.arcade.collide(this.ball, this.bricks2, this.hit2, null, this);
    //Déplacement de la raquette
    if (this.cursor.right.isDown)
      this.paddle.body.velocity.x = 600;
    else if (this.cursor.left.isDown)
      this.paddle.body.velocity.x = -600;
    else
      this.paddle.body.velocity.x = 0;
    //Fin du jeu
    if (this.ball.y>450 && flag==false)
      {
				document.getElementById('start').onclick = restart;
				document.getElementById('start').innerHTML = "Try again";
				document.getElementById('sousTitre').innerHTML = "Press restart or space for try again ";
				document.getElementById('score').innerHTML = "Score: "+score;
				TrierScore();
        introText = game.add.text(200, 2, 'Game Over!', {
           font: "40px Arial", fill: "#ffffff"
         });
       };
    },
		//collision balle brique1
    hit: function(ball, brik) {
    if ((this.bricks.length == 0 && this.bricks2.length == 1)||(this.bricks.length == 1 && this.bricks2.length == 0)&& flag == false)
    {
			document.getElementById('start').onclick = restart;
			document.getElementById('start').innerHTML = "Play again";
			document.getElementById('sousTitre').innerHTML = "Press restart or space for play again";
			document.getElementById('score').innerHTML = "Score: "+score;
			TrierScore();
      introText = game.add.text(200, 2, 'You Win!', {
         font: "40px Arial", fill: "#ffffff"
       });
       this.ball.body.velocity.x = 0; this.ball.body.velocity.y = 0;
       this.ball.body.bounce.x = 0; this.ball.body.bounce.y = 0;
    	}else{
			 	score ++;
		   	brik.destroy();
    	}
		},
		//collision balle brique2
    hit2: function(ball, brik) {
    if ((this.bricks.length == 0 && this.bricks2.length == 1)||(this.bricks.length == 1 && this.bricks2.length == 0)&& flag == false)
    {
			document.getElementById('start').onclick = restart;
			document.getElementById('start').innerHTML = "Play again";
			document.getElementById('sousTitre').innerHTML = "Press restart or space for play again";
			document.getElementById('score').innerHTML = "Score: "+score;
			TrierScore();
      introText = game.add.text(200, 2, 'You Win!', {
         font: "40px Arial", fill: "#ffffff"
       });
       this.ball.body.velocity.x = 0; this.ball.body.velocity.y = 0;
       this.ball.body.bounce.x = 0; this.ball.body.bounce.y = 0;
  	}else{
		 score ++;
     conteur ++;
     	if(conteur == 2){
       	brik.destroy();
       	conteur = 0;
	     	}
  		}
		},
		//collision balle raquette
		hitPaddle: function(ball, paddle) {
			var posBallPad = paddle.world.x-ball.world.x;
			score --;
			//console.log(posBallPad);
			if(posBallPad >-15 && posBallPad <5)
			{
				this.ball.body.velocity.x = this.ball.body.velocity.y;

			}else if(posBallPad >45 && posBallPad <65)
			{
				this.ball.body.velocity.x -= this.ball.body.velocity.y;
			}

		},
};
//Bouton Start
function start(){
	game.state.add('main', main);
	game.state.start('main');
	play_pause = true;
	document.getElementById('start').onclick = stop;
	document.getElementById('start').innerHTML = "Pause";
	document.getElementById('sousTitre').innerHTML = "Press pause or space for stop";
}
//Bouton Pause
function stop(){
	game.paused = true;
	play_pause = false;
	document.getElementById('start').onclick = play;
	document.getElementById('start').innerHTML = "Play";
	document.getElementById('sousTitre').innerHTML = "Press start or space for play";
}
//Bouton Play
function play(){
	game.paused = false;
	play_pause = true;
	document.getElementById('start').onclick = stop;
	document.getElementById('start').innerHTML = "Pause";
	document.getElementById('sousTitre').innerHTML = "Press pause or space for stop";
}
//Bouton Reload
function restart(){
	window.location.reload();
}
//Tri a bulle pour le score stockage dans el localStorage et insertion dans le tableau html
function TrierScore(){
	flag = true;
	pseudo = document.getElementById("pseudo");
	var Tabhtml = document.getElementById('topScore');
	var scorefinal=[];
	var pseudofinal=[];

	localStorage.setItem(pseudo.value,score);

	for(var i =0; i < localStorage.length; i++){

		scorefinal.push(localStorage.getItem(localStorage.key(i)));
		pseudofinal.push(localStorage.key(i));
		console.log(scorefinal[i]);
		console.log(pseudofinal[i]);
		var ligne = Tabhtml.insertRow(-1);
		var colonne1 = ligne.insertCell(0);
		colonne1.innerHTML += pseudofinal[i];
		var colonne2 = ligne.insertCell(1);
		colonne2.innerHTML += scorefinal[i];

		/*var Tableau = new Array(scorefinal);
		for (var ind01 = 0; ind01 < Tableau.length;ind01++)
		{
			var ind02 = ind01 + 1;
			while (Tableau[ind01] > Tableau[ind02])
			{
				temp = Tableau[ind01];
				Tableau[ind01] = Tableau[ind02];
				Tableau[ind02] = temp;
				ind02++;
			}
		}
		for (var ind01 = Tableau.length-1; ind01 >= 0;ind01--)
		{
			console.log("test "+Tableau[ind01]);
		}*/
	}
}
