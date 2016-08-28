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

Crafty.c('WormWasher', {
  init: function(){
    this.requires('Actor, Color, Solid ,Keyboard, Collision, WormWasher')
    .color('rgb(0,0,50')
    .attr({w: Game.map_grid.tile.width, h: Game.map_grid.tile.height})

    ;
  },

  WashWorms: function(){
    // Create a washZone
    //console.log(this.x - Game.map_grid.tile.width, this.y - Game.map_grid.tile.height)
    Crafty.e('WashZone').at(this.x/ Game.map_grid.tile.width - 1, this.y / Game.map_grid.tile.height -1)
  },


  getPoly: function(){
      polyx =  this.x - (Game.map_grid.tile.width + 5)
      polyy = this.y - (Game.map_grid.tile.height + 5)
      pollydiff = Game.map_grid.tile.width * 3

      //console.log(polyx, polyy, pollydiff)

      //this.poly =  new Crafty.polygon([polyx, polyy, polyx + pollydiff, polyy, polyx + pollydiff, polyy + pollydiff, polyx, polyy + pollydiff])
      
      
      var cpoly = new Crafty.circle(this.x + 16 , this.y + 16, Game.map_grid.tile.width * 3) // Will be used for colision detetions later 
      this.cpoly = cpoly
      //this.collision(this.poly)
      return(this.cpoly)
  }

});


Crafty.c('WashZone', {
  init: function(){
    this.requires('Actor, Color, Collision, Circle')
    .attr({w: Game.map_grid.tile.width * 3, h:Game.map_grid.tile.height * 3, z: -1})
    .color('rgb(176,196,222)')
    .onHit('Carriable', this.cleanWorm)
    .bind('EnterFrame', function(){
      this.timer = this.timer + 1 

      if(this.timer >= 400){
        this.destroy()
      }
    })
  },

  timer: 0, 
  

  cleanWorm: function(data){
    this_worm = data[0].obj

    /// The idea here is that the circle is inscribes inside the hit rect,
    //so since we know the worm is in the hit rect, now test is worm is in the hit circle 
    var hit_cirlce = new Crafty.circle(this.x + 16 , this.y + 16, Game.map_grid.tile.width * 3.5) // Will be used for colision detetions later 


    if(hit_cirlce.containsPoint(this_worm.x, this_worm.y)){
      this_worm.washWorm()
    }
  }

})

Crafty.c('WormFeeder', {
  init: function(){
    this.requires('Actor, Color, Solid, Keyboard, Mouse')
    .color('rgb(200,0,0')
    .attr({w: Game.map_grid.tile.width * 2, h: Game.map_grid.tile.height})
    .bind('Click', function(MouseEvent){
        this.portions = this.portions + 10
        console.log(this.portions)
        })
    .bind('EnterFrame', function(){
      //console.log(this.portions)
      if(this.portions > 0 & this.current_feeder_open == false){
        this.attractWorms()
      }else if(this.portions == 0 & this.current_feeder_open == true){
        this.noFood()
      }
    });
  },

  portions: 0, 
  current_feeder_open: false,

  attractWorms: function(){
    this.current_feeder_open = true
    this.feedzone = Crafty.e('FeedZone')

  },

  noFood: function(){
    this.feedzone.destroy()
  }



});

Crafty.c('FeedZone', {
  init: function(){
    this.requires('Actor, Collision, FeedZone')
    this.attr({x: Game.wormFeeder.x, y:Game.wormFeeder.y, w: Game.map_grid.tile.width * 4, h:Game.map_grid.tile.height * 4})
    //.color('rgb(255,0,0)')
    .attr({Z:-1})
  }

});

Crafty.c('Chair', {
  init: function() {
    this.requires('Actor, Color, Pushable, Collision')
    .color('rgb(120, 0, 0)')
    //.onHit('Pushable', this.backup)
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
    this.requires('Actor, Color, Collision, Carriable, Tween, Mouse')
    .attr({h:Game.map_grid.tile.width / 2, w: Game.map_grid.tile.height /2})
    //.color('rgb(0,255,0)')
    .colorWorm()
    .onHit('Solid', this.stopOnSolids)
    .onHit('Pushable', this.stopOnSolids)
    .onHit('Player', function(){
      if(this.feeding != true){
        this.stopOnSolids
    }
    })
    .onHit('FeedZone', this.feedWorm)
    //.checkHits('Solid')
    .bind('Click', function(MouseEvent){
      if(this.tracking == false){

        this.tracking = true
      }else if (this.tracking == true){
        this.tracking = false
      }
      //console.log(this._log)
    })
    .bind('EnterFrame', function(){

          // if(this.tracking){
          //   console.log(this.reverseTweening)
          // }

          if(this.feeding == true){
            this.feed_counter = this.feed_counter + 1 
          }

          if (this.feed_counter == 50){
            this.feeding = false
            this.feed_counter = 0
            this.fed = true
            this.colorWorm()
            this.tween({x:this.og_x, y:this.og_y}, 1000)
          }

          if(this.tracking){
                console.log('Colliding: ', this.hit('Solid', type = "SAT", overlap = 1), this.hit('Pushable', type = "SAT", overlap = 1), this.hit('Player', type = "SAT", overlap = 1))
                console.log("x",this.at().x)
              }

          /// Move a worm 20% of the time 
          if(Math.random() < .01){


          if(this.tracking){
            console.log("Tweening")
          }

            this.cancelTween('x')
            this.cancelTween('y')

              /// pick a neiboring cell
            this_x = Math.round(this.at().x)
            this_y = Math.round(this.at().y)

            // if(this.tracking){
            //     console.log('Colliding: ', this.hit('Solid', type = "SAT", overlap = 1) == false & this.hit('Pushable', type = "SAT", overlap = 1) == false & this.hit('Player', type = "SAT", overlap = 1) == false)
            //   }

            if(this.hit('Solid', type = "SAT", overlap = 1) == false & this.hit('Pushable', type = "SAT", overlap = 1) == false & this.hit('Player', type = "SAT", overlap = 1) == false){
              this.og_x = this_x
              this.og_y = this_y
              if(this.tracking){
                console.log('rewriting og')
              }
          }

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
        
            //this._log.push( "Tween to ".concat(String(open_spaces[this_index][0]), " ",String(open_spaces[this_index][1]), "From ", String(this.og_x), " ", String(this.og_y)) )
        }
    });
  },

  reverseTweening: false,
  tracking: false,
  feeding: false,
  feed_counter:0,
  _log: [], 


  stopOnSolids: function() {
    if(this.tracking){
    console.log('Backtracking')
    console.log(this.og_x, this.og_y)
    }
    // Cancel current tween
    // this.cancelTween('x')
    // this.cancelTween('y')

    this.reverseTweening = true 
    
    /// Clever list where the index produces the opeosite direction

    // opposites = [
    //   [this_x + 1, this_y + 1],
    //   [this_x , this_y + 1],
    //   [this_x -1, this_y + 1],
    //   [this_x -1, this_y ],
    //   [this_x -1, this_y -1],
    //   [this_x  , this_y -1],
    //   [this_x + 1, this_y -1],
    //   [this_x + 1, this_y],
    // ]

    //this._log.push( "Backtrack to ".concat(String(this.og_x), " ", String(this.og_y )) )


    this.tween({x:this.og_x * Game.map_grid.tile.height , y:this.og_y * Game.map_grid.tile.width}, 500)
    
  },


  fed: false,
  clean: false,
  asleep: false,

  colorWorm: function(){

      if(this.clean == true & this.fed == true){
        this.color('rgb(139,0,139)')
      }else if (this.fed == true){
        this.color('rgb(220,20,60)')
      }else if(this.clean == true){
          this.color('rgb(0,0,255)')
      }
      else{
        this.color('rgb(0,255,0)')
      }

      return(this)
},

  washWorm: function(){
    this.clean = true
    this.colorWorm()
  },

  feedWorm: function(){

    // onmy exicute if we are not already feeding 
    if(this.feeding == false & this.fed == false){
        // save the postion befor feeding
        this.og_x = this.x
        this.og_y = this.y

        // pick a point in fron of the feeder     
        feeder_y = Game.wormFeeder.y + Game.map_grid.tile.height + 3
        // pick a random x
        feed_x = Game.wormFeeder.x + Math.floor((Math.random() * Game.map_grid.tile.width * 2))
        //console.log(feed_x)

        this.tween({x: feed_x, y: feeder_y}, 500)

        // Reduce Portions 
        Game.wormFeeder.portions = Game.wormFeeder.portions - 1 

        this.feeding = true
  }

  }
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
            

            poly = Game.wormWasher.getPoly()

            if(poly.containsPoint(this.x, this.y)!= false){

              Game.wormWasher.WashWorms()
            }
      }
         
      })// End of Keydown Bind 
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
    
    if (this.c_pressed == true & this.worms_in_arms < 5){

        this_worm = data[0].obj;

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

      while(this_worm.hit('Solid') != false || this_worm.hit('Pushable') != false || this_worm.hit('Player') != false){

          console.log('placeing worms')
              

          // Repeating these in case we are mooving 
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

          this_index = Math.floor((Math.random() * open_spaces.length));

          this_worm.at(open_spaces[this_index][0], open_spaces[this_index][1])
      }

      // Populate with the right properties 
      this_worm.fed = this.worm_in_arms_properties[i].fed
      this_worm.clean = this.worm_in_arms_properties[i].clean
      this_worm.asleep = this.worm_in_arms_properties[i].asleep

      this_worm.colorWorm()



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


      if (object_hit.hit('Carriable', type = "SAT", overlap = 1) != false){
          object_hit.x = object_hit.x
          object_hit.y = object_hit.y

      }else if(object_hit.hit('Solid', type = "SAT", overlap = 1) == false & object_hit.hit('Pushable', type = "SAT", overlap = 1) == false){

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

    if(object_hit.hit('Solid', type = "SAT", overlap = 1) != false || object_hit.hit('Pushable', type = "SAT", overlap = 1) != false || object_hit.hit('Carriable', type = "SAT", overlap = 1) != false){
        object_hit.x -= (this._movement.x)

        object_hit.y -= (this._movement.y)

    }

  }, /// end of Psuh Object 

});