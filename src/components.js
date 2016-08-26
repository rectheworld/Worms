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
    this.requires('Actor, Color, Solid')
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

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Player ,Fourway, Color, Collision')
      .fourway(2)
      .color('rgb(20, 75, 40)')
      .stopOnSolids()
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

  pushObject: function(data){
    this._speed = this._speed/ 10
    object_hit = data[0].obj;
      
      if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;

      if(object_hit.hit('Solid', type = "SAT") == false & object_hit.hit('Pushable', type = "SAT") == false){

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

  },

});