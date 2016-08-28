// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] = true;

  // Place a tree at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y);
        this.occupied[x][y] = true;
      } 
    }
  }


  /// Generate Bookshelves
  Crafty.e('Shelf').at(9,9)
  Crafty.e('Shelf').at(9,10)
  Crafty.e('Shelf').at(9,11)
  Crafty.e('Shelf').at(9,12)
  Crafty.e('Shelf').at(9,13)
  Crafty.e('Shelf').at(9,14)
  Crafty.e('Shelf').at(9,15)
  Crafty.e('Shelf').at(9,16)

  Crafty.e('Shelf').at(9,20)
  Crafty.e('Shelf').at(9,21)
  Crafty.e('Shelf').at(9,22)
  Crafty.e('Shelf').at(9,23)
  Crafty.e('Shelf').at(9,24)
  Crafty.e('Shelf').at(9,25)
  Crafty.e('Shelf').at(9,26)
  Crafty.e('Shelf').at(9,27)

  Crafty.e('Shelf').at(13,20)
  Crafty.e('Shelf').at(13,21)
  Crafty.e('Shelf').at(13,22)
  Crafty.e('Shelf').at(13,23)
  Crafty.e('Shelf').at(13,24)
  Crafty.e('Shelf').at(13,25)
  Crafty.e('Shelf').at(13,26)
  Crafty.e('Shelf').at(13,27)

  Crafty.e('Shelf').at(17,20)
  Crafty.e('Shelf').at(17,21)
  Crafty.e('Shelf').at(17,22)
  Crafty.e('Shelf').at(17,23)
  Crafty.e('Shelf').at(17,24)
  Crafty.e('Shelf').at(17,25)
  Crafty.e('Shelf').at(17,26)
  Crafty.e('Shelf').at(17,27)

  Crafty.e('Shelf').at(21,20)
  Crafty.e('Shelf').at(21,21)
  Crafty.e('Shelf').at(21,22)
  Crafty.e('Shelf').at(21,23)
  Crafty.e('Shelf').at(21,24)
  Crafty.e('Shelf').at(21,25)
  Crafty.e('Shelf').at(21,26)
  Crafty.e('Shelf').at(21,27)

  Crafty.e('Shelf').at(25,20)
  Crafty.e('Shelf').at(25,21)
  Crafty.e('Shelf').at(25,22)
  Crafty.e('Shelf').at(25,23)
  Crafty.e('Shelf').at(25,24)
  Crafty.e('Shelf').at(25,25)
  Crafty.e('Shelf').at(25,26)
  Crafty.e('Shelf').at(25,27)

  Crafty.e('Shelf').at(29,20)
  Crafty.e('Shelf').at(29,21)
  Crafty.e('Shelf').at(29,22)
  Crafty.e('Shelf').at(29,23)
  Crafty.e('Shelf').at(29,24)
  Crafty.e('Shelf').at(29,25)
  Crafty.e('Shelf').at(29,26)
  Crafty.e('Shelf').at(29,27)

  Crafty.e('Shelf').at(33,20)
  Crafty.e('Shelf').at(33,21)
  Crafty.e('Shelf').at(33,22)
  Crafty.e('Shelf').at(33,23)
  Crafty.e('Shelf').at(33,24)
  Crafty.e('Shelf').at(33,25)
  Crafty.e('Shelf').at(33,26)
  Crafty.e('Shelf').at(33,27)



  // Generate up to tables
  Crafty.e('Table').at(23, 9);
  Crafty.e('Table').at(24, 9);
  Crafty.e('Table').at(23, 10);
  Crafty.e('Table').at(24, 10);
  Crafty.e('Table').at(28, 9);
  Crafty.e('Table').at(29, 9);
  Crafty.e('Table').at(28, 10);
  Crafty.e('Table').at(29, 10);
  Crafty.e('Table').at(33, 9);
  Crafty.e('Table').at(34, 9);
  Crafty.e('Table').at(33, 10);
  Crafty.e('Table').at(34, 10);
  Crafty.e('Table').at(23, 14);
  Crafty.e('Table').at(24, 14);
  Crafty.e('Table').at(23, 15);
  Crafty.e('Table').at(24, 15);
  Crafty.e('Table').at(28, 14);
  Crafty.e('Table').at(29, 14);
  Crafty.e('Table').at(28, 15);
  Crafty.e('Table').at(29, 15);
  Crafty.e('Table').at(33, 14);
  Crafty.e('Table').at(34, 14);
  Crafty.e('Table').at(33, 15);
  Crafty.e('Table').at(34, 15);



  // Create some Charis 

  Game.chair_list = []

  chair1 = Crafty.e('Chair').at(24,5);
  Game.chair_list.push(chair1)

  chair2 = Crafty.e('Chair').at(27, 5);
  Game.chair_list.push(chair2)

  chair3 = Crafty.e('Chair').at(30, 4);
  Game.chair_list.push(chair3)

  chair4 = Crafty.e('Chair').at(30, 6);
  Game.chair_list.push(chair4)

  chair5 = Crafty.e('Chair').at(27, 8);
  Game.chair_list.push(chair5)

  chair6 = Crafty.e('Chair').at(34,8);
  Game.chair_list.push(chair6)

  chair7 = Crafty.e('Chair').at(22, 9);
  Game.chair_list.push(chair7)

  chair8 = Crafty.e('Chair').at(26, 4);
  Game.chair_list.push(chair8)

  chair9 = Crafty.e('Chair').at(32, 5);
  Game.chair_list.push(chair9)

  chair10 = Crafty.e('Chair').at(22, 14);
  Game.chair_list.push(chair10)

  chair11 = Crafty.e('Chair').at(23, 13);
  Game.chair_list.push(chair11)

  chair12 = Crafty.e('Chair').at(25, 14);
  Game.chair_list.push(chair12)

  chair13 = Crafty.e('Chair').at(27, 14);
  Game.chair_list.push(chair13)

  chair14 = Crafty.e('Chair').at(28, 13);
  Game.chair_list.push(chair14)

  chair15 = Crafty.e('Chair').at(30, 15);
  Game.chair_list.push(chair15)

  chair16 = Crafty.e('Chair').at(32, 14);
  Game.chair_list.push(chair16)

  chair17 = Crafty.e('Chair').at(33, 13);
  Game.chair_list.push(chair17)

  chair18 = Crafty.e('Chair').at(35, 14);
  Game.chair_list.push(chair18)


  // The worm washer 
  Game.wormWasher = Crafty.e('WormWasher').at(16,10)

  // wormFeeder
  Game.wormFeeder = Crafty.e('WormFeeder').at(10,10)

  // Worms

  Game.worm_list = []
  worm_num = 50
  /// Create some worms 
  for(i = 1; i <= worm_num; i++){

    

    this_x = Math.floor((Math.random() * Game.map_grid.width));
    this_y = Math.floor((Math.random() * Game.map_grid.height));


    this_worm = Crafty.e("Worm").at(this_x, this_y)

    //console.log(this_worm.hit('Solid'),this_worm.hit('Pushable')) 
    while(this_worm.hit('Solid') != false || this_worm.hit('Pushable') != false){
      //console.log("In While")

      this_x = Math.floor((Math.random() * Game.map_grid.width));
      this_y = Math.floor((Math.random() * Game.map_grid.height));

      this_worm.at(this_x, this_y)

      //console.log(this_worm.hit('Solid'), this_worm.hit('Pushable')) 
    }

    // add this worm to the worm list 
    Game.worm_list.push(this_worm)
  }


///Crafty.e("Worm").at(15, 15)

  // Show the victory screen once all villages are visisted
  this.show_victory = this.bind('VillageVisited', function() {
    if (!Crafty('Village').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('VillageVisited', this.show_victory);
});


// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
  // Display some text in celebration of the victory
  Crafty.e('2D, DOM, Text')
    .attr({ x: 0, y: 0 })
    .text('Victory!');

  // Watch for the player to press a key, then restart the game
  //  when a key is pressed
  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Game');
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css)

	Crafty.scene('Game');
});

//   // Load our sprite map image
//   Crafty.load(['assets/16x16_forest_1.gif'], function(){
//     // Once the image is loaded...

//     // Define the individual sprites in the image
//     // Each one (spr_tree, etc.) becomes a component
//     // These components' names are prefixed with "spr_"
//     //  to remind us that they simply cause the entity
//     //  to be drawn with a certain sprite
//     Crafty.sprite(16, 'assets/16x16_forest_1.gif', {
//       spr_tree:    [0, 0],
//       spr_bush:    [1, 0],
//       spr_village: [0, 1],
//       spr_player:  [1, 1]
//     });

//     // Now that our sprites are ready to draw, start the game
//     Crafty.scene('Game');
//   })
// });