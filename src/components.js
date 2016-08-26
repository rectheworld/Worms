// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// A Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Color, Solid, Collision')
    .color('rgb(51, 0, 0)');
  },
});

// A Bush is just an Actor with a certain sprite
Crafty.c('Shelf', {
  init: function() {
    this.requires('Actor, Color, Solid')
    .color('rgb(20, 185, 40)');
  },
});

Crafty.c('Chair', {
  init: function() {
    this.requires('Actor, Color, Pushable, Collision')
    .color('rgb(120, 0, 0)')
    //.onHit('Solid', this.backup)
  },
});



// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Table', {
  init: function() {
    this.requires('Actor, Color, Solid')
    .color('rgb(170, 125, 40)');
  },


});

Crafty.c('Worm', {
  init: function(){
    this.requires('Actor, Color, Collision, Carriable, Tween')
    .attr({h:8, w:8})
    .color('rgb(0,255,0)')
    .onHit('Solid', this.stopOnSolids)
    .onHit('Pushable', this.stopOnSolids)
    .onHit('Player', this.stopOnSolids)
    .bind('TweenEnd', function(){

    })
    .bind('EnterFrame', function(){

          /// Move a worm 20% of the time 
          if(Math.random() < .01){


              /// pick a neiboring cell
            this_x = Math.round(this.at().x)
            this_y = Math.round(this.at().y)

            this.og_x = this_x
            this.og_y = this_y

            //console.log(this_x, this_y)
            // Not really open yet but will do 

            open_spaces = [
              [this_x -1, this_y -1], //0 
              [this_x  , this_y -1], //1
              [this_x + 1, this_y -1], //2
              [this_x + 1, this_y], //3
              [this_x + 1, this_y + 1], //4
              [this_x , this_y + 1], //5
              [this_x -1, this_y + 1], //6
              [this_x -1, this_y ], //7 
            ]

            this_index = Math.floor((Math.random() * open_spaces.length));
            this.destination_index = this_index 
            this.tween({x: open_spaces[this_index][0] * Game.map_grid.tile.height, y:open_spaces[this_index][1] * Game.map_grid.tile.width}, 1000)
        }

    });
  },

  reverseTweening: false,

  stopOnSolids: function() {

    /// Clever list where the index produces the opeosite direction
    opposites = [
      [this_x + 1, this_y + 1],
      [this_x , this_y + 1],
      [this_x -1, this_y + 1],
      [this_x -1, this_y ],
      [this_x -1, this_y -1],
      [this_x  , this_y -1],
      [this_x + 1, this_y -1],
      [this_x + 1, this_y],

    ]
    this.tween({x:this.og_x * Game.map_grid.tile.height , y:this.og_y * Game.map_grid.tile.width}, 500)
    
    // this.cancelTween('x')
    // this.cancelTween('y')
  },


  fed: false,
  clean: false,
  asleep: false
})

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Player ,Fourway, Color, Collision, Keyboard')
      .fourway(2)
      .color('rgb(20, 75, 40)')
      .stopOnSolids()
      .bind('KeyDown', function(e){
        if(e.key == 67){
          this.c_pressed = true
        }else{
          this.c_pressed = false 
        }

        if(e.key == 86){
          this.dropWorms()
        }
      })
      .onHit('Carriable', this.pickupWorm)
      .onHit('Pushable', this.pushObject)
      // Whenever the PC touches a village, respond to the event
      .bind("Moved", function(){
          if (this.x >= (Game.screen_view.width / 2))
          {
            Crafty.viewport.x = (this.x - (Game.screen_view.width / 2)) * -1;
          }
          if (this.y >= (Game.screen_view.height / 2))
          {
            Crafty.viewport.y = (this.y - (Game.screen_view.height / 2)) * -1;
          }

          document.getElementById('_position').innerHTML = String(this.at().x).concat(" , ",  String(this.at().y))
        });
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
    return this;
  },


  // // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  worms_in_arms: 0,
  worm_in_arms_properties: [],

  pickupWorm: function(data){
    
    if (this.c_pressed == true){
      this_worm = data[0].obj;
      //console.log(this_worm)
      this.worms_in_arms = this.worms_in_arms + 1 

      // Save the properties for later
      this.worm_in_arms_properties.push({
          'fed': this_worm.fed,
          'clean': this_worm.clean,
          'asleep': this_worm.asleep,
      })

      this_worm.destroy()

      document.getElementById('_num_worms').innerHTML = String(this.worms_in_arms)

    }else{
      this.stopMovement()
    }


  }, // end pick up Worm 

  updateWormTracker: function() {
    document.getElementById('_num_worms').innerHTML = String(this.worms_in_arms)

  },

  dropWorms: function(){

    // get list of open spaces 
    this_x = Math.round(this.at().x)
    this_y = Math.round(this.at().y)

    //console.log(this_x, this_y)
    // Not really open yet but will do 

    open_spaces = [
      [this_x -1, this_y -1],
      [this_x  , this_y -1],
      [this_x + 1, this_y -1],
      [this_x + 1, this_y],
      [this_x + 1, this_y + 1],
      [this_x , this_y + 1],
      [this_x -1, this_y + 1],
      [this_x -1, this_y ],
    ]

    for( i = 0; i < this.worms_in_arms; i++){


      // pick a random open pace 
      this_index = Math.floor((Math.random() * open_spaces.length));

      this_worm = Crafty.e("Worm").at(open_spaces[this_index][0], open_spaces[this_index][1])

      while(this_worm.hit('Solid') != false & this_worm.hit('Pushable') != false){

          this_index = Math.floor((Math.random() * open_spaces.length));

          this_worm.at(open_spaces[this_index][0], open_spaces[this_index][1])
      }

      // Populate with the right properties 
      this_worm.fed = this.worm_in_arms_properties[i].fed
      this_worm.clean = this.worm_in_arms_properties[i].clean
      this_worm.asleep = this.worm_in_arms_properties[i].asleep

    }

    // empty these lists 
    this.worms_in_arms = 0
    this.worm_in_arms_properties = []
    this.updateWormTracker()

  }, // end of Drop Worms 

  pushObject: function(data){
    this._speed = this._speed/ 10
    object_hit = data[0].obj;
      
      if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;

      if(object_hit.hit('Solid', type = "SAT") == false & object_hit.hit('Pushable', type = "SAT") == false & object_hit.hit('Carriable', type = "SAT") == false){

        object_hit.x += this._movement.x;
        object_hit.y += this._movement.y;
      
      }else{ // if were hitting something 
        // back up a bit 
        this._speed = 0;
        

        object_hit.x -= (this._movement.x * 3)

        object_hit.y -= (this._movement.y * 3)


        this.x -= this._movement.x * 4;
        this.y -= this._movement.y * 4;
      }
    
    } // End of Movement 

    if(object_hit.hit('Solid', type = "SAT")){
        object_hit.x -= (this._movement.x)

        object_hit.y -= (this._movement.y)

    }

  }, /// end of Psuh Object 

});