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
    .color('rgb(20, 125, 40)');
  },
});

// A Bush is just an Actor with a certain sprite
Crafty.c('Bush', {
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

  // backup: function(){
    
  //   this._speed = 0
  //   if (this._movement) {
  //     console.log("HERE")
  //     this.x -= this._movement.x * 4;
  //     this.y -= this._movement.y * 4;
  //   }
  // }


});



// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(170, 125, 40)');
  },

  // Process a visitation with this village
  visit: function() {
    this.destroy();
    Crafty.trigger('VillageVisited', this);
  }
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
      .onHit('Village', this.visitVillage)
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
    this._speed = this._speed/4
      if (this._movement) {
      this.x -= this._movement.x / 4;
      this.y -= this._movement.y / 4;


      object_hit = data[0].obj;

      if(object_hit.hit('Solid') == false ){
        object_hit.x += this._movement.x;
        object_hit.y += this._movement.y;
      
      }

      else{
        // back up a bit 
        object_hit.x -= this._movement.x;
        object_hit.y -= this._movement.y;
        this._speed = 0;
        this.x -= this._movement.x * 2;
        this.y -= this._movement.y * 2 ;

      }
      
    }

  },
  // Respond to this player visiting a village
  visitVillage: function(data) {
    villlage = data[0].obj;
    villlage.visit();
  }
});