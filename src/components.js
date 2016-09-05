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

Crafty.c('Carpet', {
  init: function() {
    this.requires('Actor, spr_carpet')
    .attr({z:-1});

  },
});

Crafty.c('Food', {
  init: function() {
    this.requires('Actor, Carriable ,spr_food, Collision ,Food')

  },
});

Crafty.c('CarpetRed', {
  init: function() {
    this.requires('Actor, spr_carpet_red')
    .attr({z:-1});

  },
});


Crafty.c('CarpetRedFring', {
  init: function() {
    this.requires('Actor, spr_carpet_red_fridge')
    .attr({z:-1});

  },
});

// A Tree is just an Actor with a certain sprite
Crafty.c('Wall', {
  init: function() {
    this.requires('Actor, Color, Solid, Collision')
    .color('rgb(96, 83, 42)');
  },
});

Crafty.c('WallMolding', {
  init: function() {
    this.requires('Actor, Solid,Collision, spr_wall_molding')
  },
});

Crafty.c('Door', {
  init: function() {
    this.requires('Actor, Solid, spr_door')
  },
});

Crafty.c('OldLady', {
  init: function() {
    this.requires('Actor, Solid, spr_old_lady')
  },

});

Crafty.c('IntroText_1', {
  init: function() {
    this.requires('Actor, Solid, spr_text1, Keyboard')
    .attr({z:1})
    .bind('KeyDown', function(e){
        Crafty.e('IntroText_2').at(0,17)
        this.destroy()
    })
  },
});

Crafty.c('IntroText_2', {
  init: function() {
    this.requires('Actor, Solid, spr_text1, Keyboard')
    .bind('KeyDown', function(e){
      Crafty.e('IntroText_3').at(0,17)
        this.destroy()
    })
  },
});

Crafty.c('IntroText_3', {
  init: function() {
    this.requires('Actor, Solid, spr_text2, Keyboard')
    .bind('KeyDown', function(e){
        this.destroy()
    })
  },
});

Crafty.c('ReminderText', {
  init: function() {
    this.requires('Actor, Solid, spr_text2, Keyboard')
    .bind('KeyDown', function(e){
        this.destroy()
    })
  },
});


// A Bush is just an Actor with a certain sprite
Crafty.c('ShelfRight', {
  init: function() {
    this.requires('Actor, Solid, spr_bookshelf_right')
    //.color('rgb(20, 185, 40)');
  },
});

Crafty.c('ShelfLeft', {
  init: function() {
    this.requires('Actor, Solid, spr_bookshelf_left')
    //.color('rgb(20, 185, 40)');
  },
});

Crafty.c('WormWasher', {
  init: function(){
    this.requires('Actor, Solid ,Keyboard, Collision, WormWasher, spr_worm_washer, SpriteAnimation')
    .attr({w: Game.map_grid.tile.width, h: Game.map_grid.tile.height})
    .reel('WashCycle', 1000, 0, 8, 8)
    ;
  },

  WashWorms: function(){
    // Create a washZone
    //console.log(this.x - Game.map_grid.tile.width, this.y - Game.map_grid.tile.height)
    this.animate("WashCycle", 8)
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
    this.requires('Actor, Collision, Circle, spr_wash_zone')
    .attr({w: Game.map_grid.tile.width * 3, h:Game.map_grid.tile.height * 3, z: -.8})
    //color('rgb(176,196,222)')
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
    for(i = 0; i <= data.length - 1; i++){
      
    this_worm = data[i].obj
    //console.log(this_worm.x, this_worm.y)

    /// The idea here is that the circle is inscribes inside the hit rect,
    //so since we know the worm is in the hit rect, now test is worm is in the hit circle 
    var hit_cirlce = new Crafty.circle(this.x + 16 , this.y + 16, Game.map_grid.tile.width * 4) // Will be used for colision detetions later 


    if(hit_cirlce.containsPoint(this_worm.x, this_worm.y)){
      this_worm.washWorm()
    }
  }
}

})

Crafty.c('WormFeeder', {
  init: function(){
    this.requires('Actor, Solid, Keyboard, SpriteAnimation, spr_feeder')
    //.color('rgb(200,0,0')
    .attr({w: Game.map_grid.tile.width * 2, h: Game.map_grid.tile.height})
    .reel('Full', 1000, 0, 1, 1)
    .reel('Empty', 1000, 1, 1, 1)
    .bind('EnterFrame', function(){
      //console.log(this.portions)
      if(this.portions > 0 & this.current_feeder_open == false){
        this.animate('Full', 1)
        this.attractWorms()
      }else if(this.portions == 0 & this.current_feeder_open == true){
        this.animate('Empty', 1)
        this.noFood()
      }
    });
  },

  portions: 0, 
  current_feeder_open: false,

  addFood: function(){
    this.portions = this.portions + 10
  },

  attractWorms: function(){
    this.current_feeder_open = true
    this.feedzone = Crafty.e('FeedZone')

  },

  noFood: function(){
    this.current_feeder_open = false
    this.feedzone.destroy()
  },


  getPoly: function(){

    var cpoly = new Crafty.circle(this.x + 32 , this.y + 32, Game.map_grid.tile.width * 3) // Will be used for colision detetions later 
    this.cpoly = cpoly
    //this.collision(this.poly)
    return(this.cpoly)
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

Crafty.c('ChairRight', {
  init: function() {
    this.requires('Actor, Pushable, Collision, spr_chair_right')
    //.color('rgb(120, 0, 0)')
    //.onHit('Pushable', this.backup)
  },
});


Crafty.c('ChairLeft', {
  init: function() {
    this.requires('Actor, Pushable, Collision, spr_chair_left')
    //.color('rgb(120, 0, 0)')
    //.onHit('Pushable', this.backup)
  },
});

Crafty.c('ChairForward', {
  init: function() {
    this.requires('Actor, Pushable, Collision, spr_chair_front')
    //.color('rgb(120, 0, 0)')
    //.onHit('Pushable', this.backup)
  },
});





// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Table', {
  init: function() {
    this.requires('Actor, Solid, spr_table')
    //.color('rgb(170, 125, 40)');
  },


});

Crafty.c('Worm', {
  init: function(){
    this.requires('Actor, Collision, Carriable, Tween, Mouse, SpriteAnimation, Worm ,spr_worm')
    .attr({h:Game.map_grid.tile.width / 2, w: Game.map_grid.tile.height /2})
    //.color('rgb(0,255,0)')
    .colorWorm()
    .onHit('Solid', this.stopOnSolids)
    .onHit('Pushable', this.stopOnSolids)
    .onHit('Player', this.stopOnSolids)
    .onHit('FeedZone', this.feedWorm)
    // Um like animation
    // .reel('SquiggleLeft', 1000, 0, 8, 2)
    // .reel('SquiggleRight', 1000, 0, 9, 2)
    .animate('SquiggleLeft', -1)

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
            this.tween({x:this.feed_og_x, y:this.feed_og_y}, 1000)
          }

          if(this.fed == true & this.clean == true){
            this.sleepy_counter = this.sleepy_counter + 1
          }

          if(this.sleepy_counter == 1000){
            this.sleeping = true
            this.colorWorm()

          }

          if(this.tracking){
                console.log('Colliding: ', this.hit('Solid', type = "SAT", overlap = 1), this.hit('Pushable', type = "SAT", overlap = 1), this.hit('Player', type = "SAT", overlap = 1))
                console.log("x",this.at().x)
              }

          /// Move a worm 20% of the time 
          if(Math.random() < .01 & this.sleeping == false){


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
              [this_x + 1, this_y -1], //2  // Right
              [this_x + 1, this_y], //3  // Right 
              [this_x + 1, this_y + 1], //4 /// Right 
              [this_x , this_y + 1], //5 
              [this_x -1, this_y + 1], //6
              [this_x -1, this_y ], //7 
            ]

            this_index = Math.floor((Math.random() * open_spaces.length));
            this.destination_index = this_index 
            if(this_index == 2 || this_index == 3 || this_index == 4){
              this.animate('SquiggleRight', -1)
            }else{
              this.animate('SquiggleLeft')
            }

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
  sleepy_counter: 0, 
  sleeping: false,


  stopOnSolids: function() {

    if(this.tracking){
    console.log('Backtracking')
    console.log(this.og_x, this.og_y)
    }

    if(this.feeding == false){
      this.reverseTweening = true 
    
      this.tween({x:this.og_x * Game.map_grid.tile.height , y:this.og_y * Game.map_grid.tile.width}, 500)
    }
  },


  fed: false,
  clean: false,
  asleep: false,

  colorWorm: function(){

      if(this.clean == true & this.fed == true){
        //this.color('rgb(139,0,139)')
        if(this.sleeping == true){
          this.reel('sleep', 5000, 10, 15, 2)
        }else{
          this.reel('SquiggleLeft', 1000, 0, 14, 2)
          this.reel('SquiggleRight', 1000, 0, 15, 2)
        }
      }else if (this.fed == true){
        //this.color('rgb(220,20,60)')
        this.reel('SquiggleLeft', 1000, 0, 12, 2)
        this.reel('SquiggleRight', 1000, 0, 13, 2)
      }else if(this.clean == true){
          //this.color('rgb(0,0,255)')
        this.reel('SquiggleLeft', 1000, 0, 10, 2)
        this.reel('SquiggleRight', 1000, 0, 11, 2)
      }
      else{
        ///this.color('rgb(0,255,0)')
        this.reel('SquiggleLeft', 1000, 0, 8, 2)
        this.reel('SquiggleRight', 1000, 0, 9, 2)
      }

      if(this.sleeping == false){
        this.animate('SquiggleRight', -1)
      }else{
        this.animate('sleep', -1)
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
        this.feed_og_x = this.x
        this.feed_og_y = this.y

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
    this.requires('Actor, Player ,Fourway, Collision, Keyboard, spr_player, SpriteAnimation')
      .fourway(2)
      .attr({z:1})
      //.color('rgb(20, 75, 40)')

      .stopOnSolids()
      .reel('StandRight', 1000, 1, 4, 1)
      .reel('StandLeft', 1000, 1, 5, 1)
      .reel('StandDown', 1000, 1, 6, 1)
      .reel('StandUp', 1000, 1, 7, 1)
      .reel('WalkRight', 300, 2,4, 4)
      .reel('WalkLeft', 300, 2,5, 4)
      .reel("WalkDown", 300, 1, 6, 4)
      .reel("WalkUp", 300, 1, 7, 4)
      .bind('KeyDown', function(e){
        if(e.key == 67){
          this.c_pressed = true
          if(this.x / 32.0 <= 11 & this.x/ 32.0 >= 10){
            if(this.y /32.0  >= 15 & this.y/ 32.0 >=16){
              Crafty.e('ReminderText').at(0,17)
            }
          }
        }else{
          this.c_pressed = false 
        }

        if(e.key == 86){
          this.dropWorms()
          
            

            ww_poly = Game.wormWasher.getPoly()

            if(ww_poly.containsPoint(this.x, this.y)!= false){

              Game.wormWasher.WashWorms()
            }

            wf_poly = Game.wormFeeder.getPoly()
            if(wf_poly.containsPoint(this.x, this.y)!= false){
              
              if(this.carryingFood == true){
                Game.wormFeeder.addFood()
                this.carryingFood = false
                this.dropFood(destroy = true)
              }
            }else{
                this.dropFood()
            }
      }


      if(this.isPlaying()){
        this.pauseAnimation()
      }

      if(e.key == 39|| e.key == 68){ /// Right 

        this.animate('WalkRight', -1)
        this.right_press = true
      }

      if(e.key == 40){  
        this.animate('WalkDown', -1) /// Down
        this.down_press = true
      }

      if(e.key == 37|| e.key == 65 ){

        this.animate('WalkLeft', -1) // LEft
        this.left_press = true 
      }

      if(e.key == 38){
        this.animate('WalkUp', -1) /// Up 
        this.up_press = true
      }

      })

      .bind('KeyUp', function(e){

      if(e.key == 39|| e.key == 68){ /// Right 

        this.right_press = false
      }

      if(e.key == 40){  
        this.down_press = false
      }

      if(e.key == 37|| e.key == 65 ){
        this.left_press = false 
      }

      if(e.key == 38){

        this.up_press = false
      }

        
        if(this.down_press != true & this.right_press != true  & this.up_press != true  & this.left_press != true ){
          //this.pauseAnimation()
          if(this.isPlaying('WalkUp')){
            this.animate('StandUp')
          }if(this.isPlaying('WalkDown')){
            this.animate('StandDown')
          }if(this.isPlaying('WalkLeft')){
            this.animate('StandLeft')
          }if(this.isPlaying('WalkRight')){
            this.animate('StandRight')
          }
        }

      })// End of Keydown Bind 

      .onHit('Worm', this.pickupWorm)
      .onHit('Food', this.pickupFood)
      .onHit('Pushable', this.pushObject)
      // Whenever the PC touches a village, respond to the event
      .bind("Moved", function(oldPos){

          // console.log('oldPos', oldPos.x, oldPos.y)
          // console.log('current pos', this.x, this.y)



          
          /// Set Viewpoint 

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
  carryingFood: false,

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

  pickupFood: function(data) {
    if (this.c_pressed == true & this.carryingFood == false){
      this_food = data[0].obj
      this.carryingFood = true
      this_food.destroy()
    }else{
      this.stopMovement()
    }
    
  },

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

          ///console.log('placeing worms')
              

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

  dropFood: function(destroy = false){
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

    if(this.carryingFood == true){


      // pick a random open pace 
      this_index = Math.floor((Math.random() * open_spaces.length));

      this_food = Crafty.e("Food").at(open_spaces[this_index][0], open_spaces[this_index][1])

      while(this_food.hit('Solid') != false || this_food.hit('Pushable') != false || this_food.hit('Player') != false){  

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

          this_food.at(open_spaces[this_index][0], open_spaces[this_index][1])
      }

    }

    // empty these lists 
    this.carryingFood = false

    if(destroy == true){
      this_food.destroy()
    }

  },

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