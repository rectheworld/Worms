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




for (var x = 11; x < 20; x++) {
    for (var y = 10; y < 16; y++) {
        // Place some carpet here 
        
        if(y == 15){
          Crafty.e('CarpetRedFring').at(x,y);
        }    

        if(y == 10){
          this_carpet = Crafty.e('CarpetRedFring').at(x,y);
          this_carpet.origin('center')
          this_carpet.rotation = 180
        }

        else{  
        Crafty.e('CarpetRed').at(x, y);
      }
    }
  }

  for (var x = 35; x < 40; x++) {
    for (var y = 28; y < 32; y++) {
        // Place some carpet here 
        
        if(y == 31){
          Crafty.e('CarpetRedFring').at(x,y);
        }    

        if(y == 28){
          this_carpet = Crafty.e('CarpetRedFring').at(x,y);
          this_carpet.origin('center')
          this_carpet.rotation = 180
        }

        else{  
        Crafty.e('CarpetRed').at(x, y);
      }
    }
  }


  /// draw carpet all over the floor 
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
        // Place some carpet here 
        Crafty.e('Carpet').at(x, y);
    }
  }





  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(11, 16);
  Crafty.viewport.x = (this.player.x - (Game.screen_view.width / 2)) * -1;
  Crafty.viewport.y = (this.player.y - (Game.screen_view.height / 2)) * -1;
  this.occupied[this.player.at().x][this.player.at().y] = true;


    /// Final lets create some intor text 
  Crafty.e('IntroText_1').at(0,17)

  // Place a tree at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        if(y == 0){
        if(x >= 1 & x < Game.map_grid.width - 1)
            {
              this_wall = Crafty.e('WallMolding').at(x, y);
              this_wall.origin('center')
              this_wall.rotation = 90
              this.occupied[x][y] = true;
            }
            else{
              Crafty.e('Wall').at(x, y);
              this.occupied[x][y] = true;
            }
        }
        else{
        Crafty.e('Wall').at(x, y);
        this.occupied[x][y] = true;
      }

      } /// End at edge 
    }
  }

  Crafty.e('WallMolding').at(1, 14);
  // Crafty.e('WallMolding').at(1, 15);
  // Crafty.e('WallMolding').at(1, 16);
  Crafty.e('WallMolding').at(1, 17);

  Crafty.e('WallMolding').at(1, 6);
  Crafty.e('WallMolding').at(1, 7);


  Crafty.e('WallMolding').at(1, 24);
  Crafty.e('WallMolding').at(1, 25);
  Crafty.e('WallMolding').at(1, 32);


  Crafty.e('Door').at(0,15)

  /// Old lady 
  Crafty.e('OldLady').at(10,16)  


  this_wall = Crafty.e('WallMolding').at(40, 6).origin('center')
  this_wall.rotation = 180

  this_wall = Crafty.e('WallMolding').at(40, 7).origin('center')
  this_wall.rotation = 180

  this_wall = Crafty.e('WallMolding').at(40, 8).origin('center')
  this_wall.rotation = 180

  this_wall = Crafty.e('WallMolding').at(40, 15).origin('center')
  this_wall.rotation = 180

  this_wall = Crafty.e('WallMolding').at(40, 16).origin('center')
  this_wall.rotation = 180

  this_wall = Crafty.e('WallMolding').at(40, 17).origin('center')
  this_wall.rotation = 180

  this_wall = Crafty.e('WallMolding').at(40, 24).origin('center')
  this_wall.rotation = 180

  this_wall = Crafty.e('WallMolding').at(40, 25).origin('center')
  this_wall.rotation = 180

  this_wall = Crafty.e('WallMolding').at(40, 32).origin('center')
  this_wall.rotation = 180

  

  /// Generate Bookshelves
  Crafty.e('ShelfRight').at(9, 9)
  // Crafty.e('Shelf').at(9,9)
  // Crafty.e('Shelf').at(9,10)
  // Crafty.e('Shelf').at(9,11)
  // Crafty.e('Shelf').at(9,12)
  // Crafty.e('Shelf').at(9,13)
  // Crafty.e('Shelf').at(9,14)
  // Crafty.e('Shelf').at(9,15)
  // Crafty.e('Shelf').at(9,16)

  Crafty.e('ShelfRight').at(9,20)
  // Crafty.e('Shelf').at(9,21)
  // Crafty.e('Shelf').at(9,22)
  // Crafty.e('Shelf').at(9,23)
  // Crafty.e('Shelf').at(9,24)
  // Crafty.e('Shelf').at(9,25)
  // Crafty.e('Shelf').at(9,26)
  // Crafty.e('Shelf').at(9,27)

  Crafty.e('ShelfRight').at(13,20)
  // Crafty.e('Shelf').at(13,21)
  // Crafty.e('Shelf').at(13,22)
  // Crafty.e('Shelf').at(13,23)
  // Crafty.e('Shelf').at(13,24)
  // Crafty.e('Shelf').at(13,25)
  // Crafty.e('Shelf').at(13,26)
  // Crafty.e('Shelf').at(13,27)

  Crafty.e('ShelfRight').at(17,20)
  // Crafty.e('Shelf').at(17,21)
  // Crafty.e('Shelf').at(17,22)
  // Crafty.e('Shelf').at(17,23)
  // Crafty.e('Shelf').at(17,24)
  // Crafty.e('Shelf').at(17,25)
  // Crafty.e('Shelf').at(17,26)
  // Crafty.e('Shelf').at(17,27)

  Crafty.e('ShelfRight').at(21,20)
  // Crafty.e('Shelf').at(21,21)
  // Crafty.e('Shelf').at(21,22)
  // Crafty.e('Shelf').at(21,23)
  // Crafty.e('Shelf').at(21,24)
  // Crafty.e('Shelf').at(21,25)
  // Crafty.e('Shelf').at(21,26)
  // Crafty.e('Shelf').at(21,27)

  Crafty.e('ShelfLeft').at(25,20)
  // Crafty.e('Shelf').at(25,21)
  // Crafty.e('Shelf').at(25,22)
  // Crafty.e('Shelf').at(25,23)
  // Crafty.e('Shelf').at(25,24)
  // Crafty.e('Shelf').at(25,25)
  // Crafty.e('Shelf').at(25,26)
  // Crafty.e('Shelf').at(25,27)

  Crafty.e('ShelfLeft').at(29,20)
  // Crafty.e('Shelf').at(29,21)
  // Crafty.e('Shelf').at(29,22)
  // Crafty.e('Shelf').at(29,23)
  // Crafty.e('Shelf').at(29,24)
  // Crafty.e('Shelf').at(29,25)
  // Crafty.e('Shelf').at(29,26)
  // Crafty.e('Shelf').at(29,27)

  Crafty.e('ShelfLeft').at(33,20)
  // Crafty.e('Shelf').at(33,21)
  // Crafty.e('Shelf').at(33,22)
  // Crafty.e('Shelf').at(33,23)
  // Crafty.e('Shelf').at(33,24)
  // Crafty.e('Shelf').at(33,25)
  // Crafty.e('Shelf').at(33,26)
  // Crafty.e('Shelf').at(33,27)


  // On the Wall 
  Crafty.e('ShelfRight').at(1,26)
  Crafty.e('ShelfRight').at(1,18)
  Crafty.e('ShelfRight').at(1,8)
  Crafty.e('ShelfRight').at(1,0)

  Crafty.e('ShelfLeft').at(40,0)
  Crafty.e('ShelfLeft').at(40,9)
  Crafty.e('ShelfLeft').at(40,18)
  Crafty.e('ShelfLeft').at(40,26)




  // Generate up to tables
  Crafty.e('Table').at(23, 9);
  // Crafty.e('Table').at(24, 9);
  // Crafty.e('Table').at(23, 10);
  // Crafty.e('Table').at(24, 10);
  Crafty.e('Table').at(28, 9);
  // Crafty.e('Table').at(29, 9);
  // Crafty.e('Table').at(28, 10);
  // Crafty.e('Table').at(29, 10);
  Crafty.e('Table').at(33, 9);
  // Crafty.e('Table').at(34, 9);
  // Crafty.e('Table').at(33, 10);
  // Crafty.e('Table').at(34, 10);
  Crafty.e('Table').at(23, 14);
  // Crafty.e('Table').at(24, 14);
  // Crafty.e('Table').at(23, 15);
  // Crafty.e('Table').at(24, 15);
  Crafty.e('Table').at(28, 14);
  // Crafty.e('Table').at(29, 14);
  // Crafty.e('Table').at(28, 15);
  // Crafty.e('Table').at(29, 15);
  Crafty.e('Table').at(33, 14);
  // Crafty.e('Table').at(34, 14);
  // Crafty.e('Table').at(33, 15);
  // Crafty.e('Table').at(34, 15);



  // Create some Charis 

  Game.chair_list = []

  chair1 = Crafty.e('ChairLeft').at(24,5);
  Game.chair_list.push(chair1)

  chair2 = Crafty.e('ChairRight').at(27, 5);
  Game.chair_list.push(chair2)

  chair3 = Crafty.e('ChairLeft').at(30, 4);
  Game.chair_list.push(chair3)

  chair4 = Crafty.e('ChairLeft').at(30, 6);
  Game.chair_list.push(chair4)

  chair5 = Crafty.e('ChairRight').at(27, 8);
  Game.chair_list.push(chair5)

  chair6 = Crafty.e('ChairRight').at(34,8);
  Game.chair_list.push(chair6)

  chair7 = Crafty.e('ChairLeft').at(22, 9);
  Game.chair_list.push(chair7)

  chair8 = Crafty.e('ChairForward').at(26, 4);
  Game.chair_list.push(chair8)

  chair9 = Crafty.e('ChairRight').at(32, 5);
  Game.chair_list.push(chair9)

  chair10 = Crafty.e('ChairLeft').at(22, 14);
  Game.chair_list.push(chair10)

  chair11 = Crafty.e('ChairForward').at(23, 13);
  Game.chair_list.push(chair11)

  chair12 = Crafty.e('ChairRight').at(25, 14);
  Game.chair_list.push(chair12)

  chair13 = Crafty.e('ChairLeft').at(27, 14);
  Game.chair_list.push(chair13)

  chair14 = Crafty.e('ChairForward').at(28, 13);
  Game.chair_list.push(chair14)

  chair15 = Crafty.e('ChairRight').at(30, 15);
  Game.chair_list.push(chair15)

  chair16 = Crafty.e('ChairLeft').at(32, 14);
  Game.chair_list.push(chair16)

  chair17 = Crafty.e('ChairForward').at(33, 13);
  Game.chair_list.push(chair17)

  chair18 = Crafty.e('ChairRight').at(35, 14);
  Game.chair_list.push(chair18)

  /// Reading corner
  chair19 = Crafty.e('ChairLeft').at(36, 29);
  Game.chair_list.push(chair19)
  chair20 = Crafty.e('ChairRight').at(38, 29);
  Game.chair_list.push(chair20)


  // The worm washer 
  Game.wormWasher = Crafty.e('WormWasher').at(16,10)

  // wormFeeder
  Game.wormFeeder = Crafty.e('WormFeeder').at(10,10)

  // Food
  Crafty.e('Food').at(2,1)
  Crafty.e('Food').at(8,26)
  Crafty.e('Food').at(24,22)
  Crafty.e('Food').at(37,28)
  Crafty.e('Food').at(35,9)

  // Worms

  Game.sleeping_worm_num = 0
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
  this.restart_game = this.bind('KeyDown', function(e) {
    if(e.key == 13){
        Crafty.scene('Game');
        }
  });
}, function(e) {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  if(e.key == 13){
    this.unbind('KeyDown', this.restart_game);
    }
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


      // Load our sprite map image
  Crafty.load(['assets/spritesheet1.png'], function(){
    // Once the image is loaded...

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    Crafty.sprite(32, 'assets/spritesheet1.png', {
      spr_carpet:    [0, 0],
      spr_chair_right:[1, 0],
      spr_chair_left: [2, 0],
      spr_chair_front: [3, 0],
      spr_worm_washer: [0, 8],
      spr_player: [1,5],
      spr_carpet_red: [2,2],
      spr_carpet_red_fridge: [3,2],
      spr_wall_molding:[3,3],
      spr_food:[4,1],
      spr_old_lady: [4,2]
    })

    Crafty.sprite(64, 'assets/spritesheet1.png', {
      spr_table:    [0, 1],

    })

    Crafty.sprite(32, 224, 'assets/spritesheet1.png', {
      spr_bookshelf_right:    [10, 0],
      spr_bookshelf_left:    [11, 0],

    })

    Crafty.sprite(64, 32, 'assets/spritesheet1.png', {
      spr_feeder:    [1, 1],

    })


    Crafty.sprite(16, 16, 'assets/spritesheet1.png', {
      spr_worm: [0, 8],

    })

    Crafty.sprite(64, 96, 'assets/spritesheet1.png', {
      spr_door: [0, 3],

    })


    Crafty.sprite(96, 'assets/spritesheet1.png', {
      spr_wash_zone:    [2, 0],

    });

    Crafty.load(['assets/texts.png'], function(){
    // Once the image is loaded...

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    Crafty.sprite(672, 160, 'assets/texts.png', {
      spr_text1: [0,0],
      spr_text2: [0,1],
      spr_text_complete: [0,2]

    })
    }); // end of text thing 

    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  })
});

