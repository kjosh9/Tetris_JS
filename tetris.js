var sketchProc = function (processingInstance) { with (processingInstance) {
    size(600, 700);
    frameRate(30);

    angleMode = "radians";
    
    var keyArray = [];
    
    var keyPressed = function(){
        keyArray[keyCode] = 1;
    };
    
    var keyReleased = function(){
        keyArray[keyCode] = 0;
    };
    
    var boxOBJ = function(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
    };
    
    boxOBJ.prototype.draw = function(){
        
        switch(this.color){
            case 1: fill(0,0,200);
                break;
            case 2: fill(0,200,0);
                break;
            case 3: fill(200,0,200);
                break;
            case 4: fill(200,0,0);
                break;
            case 5: fill(200,200,0);
                break;
            case 6: fill(0,200,200);
                break;                
        }
        rect(this.x, this.y, 20, 20);
        noFill();
    };
    
    boxOBJ.prototype.reset = function(x,y,color){
        this.color = color;
        this.x = x;
        this.y = y;
    }
    
    var stack = function(){
        
        this.block = [];
        for(var i = 0; i < 35; i++){
            this.block.push([null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]);
        }
    };
    
    stack.prototype.draw = function(){
        
        for(var i = 0; i < this.block.length; i++){
            for(var j = 0; j < this.block[i].length; j++){
                if(this.block[i][j] !== null){
                    this.block[i][j].draw();
                }
            }
        }
    };
    
    stack.prototype.checkRows = function(){
        
        var deleteRow = false; 
        
        for(var i = 0; i < this.block.length; i++){
            
            deleteRow = true;
            
            for(var j = 0; j < this.block[i].length; j++){
                if(this.block[i][j] === null){
                    deleteRow = false;
                }
            }
            
            if(deleteRow === true){      
                for(var z = i; z > 0; z--){
                    this.block[z] = this.block[z-1]
                    for(var p = 0; p < this.block[z].length; p++){
                        if(this.block[z][p] !== null){
                            this.block[z][p].y+=20;
                        }
                    }
                }   
            }
        }    
    };
    
    var shapeOBJ = function(Type){
        
        this.count = 0;
        this.HCount = 0;
        this.UCount = 5;
        this.Type = Type;
        this.nextType;
        this.reshape();
        this.orientation = 0;
    };
    
    shapeOBJ.prototype.reshape = function(){
        
        switch(this.Type){
            case 1:
                this.box0 = new boxOBJ(280-160,0,1);
                this.box1 = new boxOBJ(300-160,0,1);
                this.box2 = new boxOBJ(280-160,20,1);
                this.box3 = new boxOBJ(300-160,20,1);
                break;
                
            case 2:
                this.box0 = new boxOBJ(320-160,0,2);
                this.box1 = new boxOBJ(300-160,0,2);
                this.box2 = new boxOBJ(280-160,20,2);
                this.box3 = new boxOBJ(300-160,20,2);
                break;
                
            case 3:
                this.box0 = new boxOBJ(280-160,0,3);
                this.box1 = new boxOBJ(260-160,0,3);
                this.box2 = new boxOBJ(280-160,20,3);
                this.box3 = new boxOBJ(300-160,20,3);
                break;
                
            case 4:
                this.box0 = new boxOBJ(280-160,0,4);
                this.box1 = new boxOBJ(300-160,0,4);
                this.box2 = new boxOBJ(280-160,20,4);
                this.box3 = new boxOBJ(320-160,0,4);
                break;
                
            case 5:
                this.box0 = new boxOBJ(280-160,0,5);
                this.box1 = new boxOBJ(300-160,0,5);
                this.box2 = new boxOBJ(300-160,20,5);
                this.box3 = new boxOBJ(260-160,0,5);
                break;
                
            case 6:
                this.box0 = new boxOBJ(280-160,0,6);
                this.box1 = new boxOBJ(280-160,20,6);
                this.box2 = new boxOBJ(280-160,40,6);
                this.box3 = new boxOBJ(280-160,60,6);
                break;
        }
        this.nextType = (this.Type+1)%7;
        this.orientation = 0;
    };
    
    shapeOBJ.prototype.rotate = function(stackOBJ){
        
        switch(this.Type){
            case 1:
                break;
                
            case 2:
                if(this.orientation == 0){
                    
                    this.box0.y += 20;
                    this.box0.x -= 20;

                    this.box2.y -= 40;
                    
                    this.box3.y -= 20;
                    this.box3.x -= 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 1;
                    }
                    else{
                        this.box0.y -= 20;
                        this.box0.x += 20;

                        this.box2.y += 40;

                        this.box3.y += 20;
                        this.box3.x += 20;
                    }
                }
                else if(this.orientation == 1){
                    this.box0.y -= 20;
                    this.box0.x -= 20;

                    this.box2.x += 40;
                    
                    this.box3.y -= 20;
                    this.box3.x += 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 2;
                    }
                    else{
                        this.box0.y += 20;
                        this.box0.x += 20;

                        this.box2.x -= 40;

                        this.box3.y += 20;
                        this.box3.x -= 20;
                    }
                }
                else if(this.orientation == 2){
                    this.box0.y -= 20;
                    this.box0.x += 20;
                    
                    this.box2.y += 40;
                    
                    this.box3.y += 20;
                    this.box3.x += 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 3;
                    }
                    else{
                        this.box0.y += 20;
                        this.box0.x -= 20;

                        this.box2.y -= 40;

                        this.box3.y -= 20;
                        this.box3.x -= 20;
                    }
                }
                else if(this.orientation == 3){
                    this.box0.y += 20;
                    this.box0.x += 20;
                    
                    this.box2.x -= 40;
                    
                    this.box3.y += 20;
                    this.box3.x -= 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 0;
                    }
                    else{
                        this.box0.y -= 20;
                        this.box0.x -= 20;

                        this.box2.x += 40;

                        this.box3.y -= 20;
                        this.box3.x += 20;
                    }
                }
                break;
                
            case 3:
                
                if(this.orientation == 0){
                    
                    this.box1.y -= 20;
                    this.box1.x += 20;
                    
                    this.box3.x -= 40;
                    
                    this.box2.y -= 20;
                    this.box2.x -= 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 1;
                    }
                    else{
                        this.box1.y += 20;
                        this.box1.x -= 20;

                        this.box3.x += 40;

                        this.box2.y += 20;
                        this.box2.x += 20;
                    }
                }
                else if(this.orientation == 1){
                    this.box1.y += 20;
                    this.box1.x += 20;

                    this.box3.y -= 40;
                    
                    this.box2.y -= 20;
                    this.box2.x += 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 2;
                    }
                    else{
                        this.box1.y -= 20;
                        this.box1.x -= 20;

                        this.box3.y += 40;

                        this.box2.y += 20;
                        this.box2.x -= 20;
                    }
                }
                else if(this.orientation == 2){
                    this.box1.y += 20;
                    this.box1.x -= 20;
                    
                    this.box3.x += 40;
                    
                    this.box2.y += 20;
                    this.box2.x += 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 3;
                    }
                    else{
                        this.box1.y -= 20;
                        this.box1.x += 20;

                        this.box3.x -= 40;

                        this.box2.y -= 20;
                        this.box2.x -= 20;
                    }
                }
                else if(this.orientation == 3){
                    this.box1.y -= 20;
                    this.box1.x -= 20;
                    
                    this.box3.y += 40;
                    
                    this.box2.y += 20;
                    this.box2.x -= 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 0;
                    }
                    else{
                        this.box1.y += 20;
                        this.box1.x += 20;

                        this.box3.y -= 40;

                        this.box2.y -= 20;
                        this.box2.x += 20;
                    }
                }
                
                break;
                
            case 4:
                
                if(this.orientation == 0){
                    
                    this.box3.y += 20;
                    this.box3.x -= 20;
                    
                    this.box2.y -= 40;
                    
                    this.box0.y -= 20;
                    this.box0.x += 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 1;
                    }
                    else{
                        this.box3.y -= 20;
                        this.box3.x += 20;

                        this.box2.y += 40;

                        this.box0.y += 20;
                        this.box0.x -= 20;
                    }
                }
                else if(this.orientation == 1){
                    this.box3.y -= 20;
                    this.box3.x -= 20;

                    this.box2.x += 40;
                    
                    this.box0.y += 20;
                    this.box0.x += 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 2;
                    }
                    else{
                        this.box3.y += 20;
                        this.box3.x += 20;

                        this.box2.x -= 40;

                        this.box0.y -= 20;
                        this.box0.x -= 20;
                    }
                }
                else if(this.orientation == 2){
                    this.box3.y -= 20;
                    this.box3.x += 20;
                    
                    this.box2.y += 40;
                    
                    this.box0.y += 20;
                    this.box0.x -= 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 3;
                    }
                    else{
                        this.box3.y += 20;
                        this.box3.x -= 20;

                        this.box2.y -= 40;

                        this.box0.y -= 20;
                        this.box0.x += 20;
                    }
                }
                else if(this.orientation == 3){
                    this.box3.y += 20;
                    this.box3.x += 20;
                    
                    this.box2.x -= 40;
                    
                    this.box0.y -= 20;
                    this.box0.x -= 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 0;
                    }
                    else{
                        this.box3.y -= 20;
                        this.box3.x -= 20;

                        this.box2.x += 40;

                        this.box0.y += 20;
                        this.box0.x += 20;
                    }
                }
                
                break;
                
            case 5:
                
                if(this.orientation == 0){
                    
                    this.box1.y += 20;
                    this.box1.x -= 20;
                    
                    this.box2.x -= 40;
                    
                    this.box3.y -= 20;
                    this.box3.x += 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 1;
                    }
                    else{
                        this.box1.y -= 20;
                        this.box1.x += 20;

                        this.box2.x += 40;

                        this.box3.y += 20;
                        this.box3.x -= 20;
                    }
                }
                else if(this.orientation == 1){
                    this.box1.y -= 20;
                    this.box1.x -= 20;

                    this.box2.y -= 40;
                    
                    this.box3.y += 20;
                    this.box3.x += 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 2;
                    }
                    else{
                        this.box1.y += 20;
                        this.box1.x += 20;

                        this.box2.y += 40;

                        this.box3.y -= 20;
                        this.box3.x -= 20;
                    }
                }
                else if(this.orientation == 2){
                    this.box1.y -= 20;
                    this.box1.x += 20;
                    
                    this.box2.x += 40;
                    
                    this.box3.y += 20;
                    this.box3.x -= 20;
                    
                    //check if there is collision 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 3;
                    }
                    else{
                        this.box1.y += 20;
                        this.box1.x -= 20;

                        this.box2.x -= 40;

                        this.box3.y -= 20;
                        this.box3.x += 20;
                    }
                }
                else if(this.orientation == 3){
                    this.box1.y += 20;
                    this.box1.x += 20;
                    
                    this.box2.y += 40;
                    
                    this.box3.y -= 20;
                    this.box3.x -= 20;
                    
                    //check if there is any interference 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 0;
                    }
                    else{
                        this.box1.y -= 20;
                        this.box1.x -= 20;

                        this.box2.y -= 40;

                        this.box3.y += 20;
                        this.box3.x += 20;
                    }
                }
                
                break;
                
            case 6:
                
                if(this.orientation == 0){
                    
                    this.box0.y += 20;
                    this.box0.x += 40;
                    
                    this.box1.y += 0;
                    this.box1.x += 20;
                    
                    this.box2.x -= 0;
                    this.box2.y -= 20;
                    
                    this.box3.y -= 40;
                    this.box3.x -= 20;
                                      
                    //check for collision
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 1;
                    }
                    else{
                        this.box0.y -= 20;
                        this.box0.x -= 40;

                        this.box1.y -= 0;
                        this.box1.x -= 20;

                        this.box2.x += 0;
                        this.box2.y += 20;

                        this.box3.y += 40;
                        this.box3.x += 20;
                    }
                }
                else if(this.orientation == 1){
                    
                    this.box0.y -= 20;
                    this.box0.x -= 40;
                    
                    this.box1.y += 0;
                    this.box1.x -= 20;
                    
                    this.box2.x -= 0;
                    this.box2.y += 20;
                    
                    this.box3.y += 40;
                    this.box3.x += 20;
                    
                    //check for interference
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 2;
                    }
                    else{
                        this.box0.y += 20;
                        this.box0.x += 40;

                        this.box1.y -= 0;
                        this.box1.x += 20;

                        this.box2.x += 0;
                        this.box2.y -= 20;

                        this.box3.y -= 40;
                        this.box3.x -= 20;
                    }
                }   
                else if(this.orientation == 2){
                    this.box0.y += 20;
                    this.box0.x += 40;
                    
                    this.box1.y += 0;
                    this.box1.x += 20;
                    
                    this.box2.x -= 0;
                    this.box2.y -= 20;
                    
                    this.box3.y -= 40;
                    this.box3.x -= 20;
                    
                    //check for collision
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 3;
                    }
                    else{
                        this.box0.y -= 20;
                        this.box0.x -= 40;

                        this.box1.y -= 0;
                        this.box1.x -= 20;

                        this.box2.x += 0;
                        this.box2.y += 20;

                        this.box3.y += 40;
                        this.box3.x += 20;
                    }
                }
                else if(this.orientation == 3){
                    this.box0.y -= 20;
                    this.box0.x -= 40;
                    
                    this.box1.y += 0;
                    this.box1.x -= 20;
                    
                    this.box2.x -= 0;
                    this.box2.y += 20;
                    
                    this.box3.y += 40;
                    this.box3.x += 20;

                    //check if there is any interference 
                    if((this.CollCheckBottom(stackOBJ) == false) && (this.CollCheckLeft(stackOBJ) == false) && (this.CollCheckRight(stackOBJ) == false)){
                        this.orientation = 0;
                    }
                    else{
                        this.box0.y += 20;
                        this.box0.x += 40;

                        this.box1.y -= 0;
                        this.box1.x += 20;

                        this.box2.x += 0;
                        this.box2.y -= 20;

                        this.box3.y -= 40;
                        this.box3.x -= 20;
                    }
                }
                            
                break;
        }
    };
    
    shapeOBJ.prototype.CollCheckBottom = function(stackOBJ){      
        
        if(this.box0.y >= 680){
            return true;
            
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box0.x == stackOBJ.block[i][j].x) && (this.box0.y+20 == stackOBJ.block[i][j].y)){
                        return true;
                    }
                }
            }
        }
        
        if(this.box1.y >= 680){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box1.x == stackOBJ.block[i][j].x) && (this.box1.y+20 == stackOBJ.block[i][j].y)){
                        return true;
                    }
                }
            }
        }
            
        if(this.box2.y >= 680){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){    
                    if((this.box2.x == stackOBJ.block[i][j].x) && (this.box2.y+20 == stackOBJ.block[i][j].y)){
                        return true;
                    }
                }
            }
        }

        if(this.box3.y >= 680){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box3.x == stackOBJ.block[i][j].x) && (this.box3.y+20 == stackOBJ.block[i][j].y)){
                        return true;
                    }
                }
            }
        }
        return false;
    };
    
    shapeOBJ.prototype.CollCheckRight = function(stackOBJ){
        
        if(this.box0.x >= 280){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box0.y == stackOBJ.block[i][j].y) && (this.box0.x+20 == stackOBJ.block[i][j].x)){
                        return true;
                    }
                }
            }
        }
        
        if(this.box1.x >= 280){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box1.y == stackOBJ.block[i][j].y) && (this.box1.x+20 == stackOBJ.block[i][j].x)){
                        return true;
                    }
                }
            }
        }
            
        if(this.box2.x >= 280){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box2.y == stackOBJ.block[i][j].y) && (this.box2.x+20 == stackOBJ.block[i][j].x)){
                        return true;
                    }
                }
            }
        }

        if(this.box3.x >= 280){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box3.y == stackOBJ.block[i][j].y) && (this.box3.x+20 == stackOBJ.block[i][j].x)){
                        return true;
                    }
                }
            }
        }
        return false;
    };
    
    shapeOBJ.prototype.CollCheckLeft = function(stackOBJ){
        
        if(this.box0.x <= 0){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box0.y == stackOBJ.block[i][j].y) && (this.box0.x-20 == stackOBJ.block[i][j].x)){
                        return true;
                    }
                }
            }
        }
        
        if(this.box1.x <= 0){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box1.y == stackOBJ.block[i][j].y) && (this.box1.x-20 == stackOBJ.block[i][j].x)){
                        return true;
                    }
                }
            }
        }
            
        if(this.box2.x <= 0){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box1.y == stackOBJ.block[i][j].y) && (this.box1.x-20 == stackOBJ.block[i][j].x)){
                        return true;
                    }
                }
            }
        }

        if(this.box3.x <= 0){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            for(var j = 0; j < stackOBJ.block[i].length; j++){
                if(pile.block[i][j] !== null){
                    if((this.box1.y == stackOBJ.block[i][j].y) && (this.box1.x-20 == stackOBJ.block[i][j].x)){
                        return true;
                    }
                }
            }
        }
        return false;
    };
    
    shapeOBJ.prototype.move = function(stackOBJ){
        
        this.count+=3;
        
        //controlling for directional inputs 
        if(keyArray[RIGHT] === 1 && keyArray[LEFT] !== 1){
            this.HCount++;
            if((this.HCount == 5 )&&(this.CollCheckRight(stackOBJ) == false)){
                this.box0.x+=20;
                this.box1.x+=20;
                this.box2.x+=20;
                this.box3.x+=20;
                this.HCount = 0;
            }
        }
        if(keyArray[LEFT] === 1 && keyArray[RIGHT] !== 1){
            this.HCount++;
            if((this.HCount == 5) &&(this.CollCheckLeft(stackOBJ) == false)){
                this.box0.x-=20;
                this.box1.x-=20;
                this.box2.x-=20;
                this.box3.x-=20;
                this.HCount = 0;
            }
        }
        
        if(keyArray[UP] === 1 && this.UCount >= 5){
            this.rotate(stackOBJ); 
            this.UCount = 0;
        }
        else if(keyArray[UP] === 0){
            this.UCount++;
        }
        
        if(keyArray[DOWN] === 1){
            this.count+=6;
        }
        
        if(keyArray[LEFT] === 0 && keyArray[RIGHT] === 0){
            this.HCount = 0;
        }
        
        //check if there is a collision with the bottom side of the block
        //push the blocks into the pile object if it collides with the stack
        if(this.CollCheckBottom(stackOBJ)==true){
            var newbox0 = this.box0;
            stackOBJ.block[newbox0.y/20][newbox0.x/20] = newbox0;
            var newbox1 = this.box1;
            stackOBJ.block[newbox1.y/20][newbox1.x/20] = newbox1;
            var newbox2 = this.box2;
            stackOBJ.block[newbox2.y/20][newbox2.x/20] = newbox2;
            var newbox3 = this.box3;
            stackOBJ.block[newbox3.y/20][newbox3.x/20] = newbox3;
            
            delete this.block0;
            delete this.block1;
            delete this.block2;
            delete this.block3;
        
            this.Type = this.nextType;
            this.reshape();            
        } 
        //move downwards if no collision
        else if((this.count >= 30)){
            this.count = 0;
            this.box0.y+=20;
            this.box1.y+=20;
            this.box2.y+=20;
            this.box3.y+=20;
        }
    };
          
    shapeOBJ.prototype.draw = function(){
        
        this.box0.draw();
        this.box1.draw();
        this.box2.draw();
        this.box3.draw();
            
    };
    
    var displayBox = function(){
        
        this.Type = 0;
        this.Vshift = 160;
        this.Hshift = 150;
        
        this.box0 = new boxOBJ(280+this.Hshift,0+this.Vshift,1);
        this.box1 = new boxOBJ(300+this.Hshift,0+this.Vshift,1);
        this.box2 = new boxOBJ(280+this.Hshift,20+this.Vshift,1);
        this.box3 = new boxOBJ(300+this.Hshift,20+this.Vshift,1);

    };
    
    displayBox.prototype.draw = function(Type){
        
        rect(325, 10, 250, 250);
        
        textSize(30);
        fill(0,0,0);
        text("Next Shape", 370, 80);
        noFill();
        
        switch(Type){
            case 0:
                this.box0.reset(280+this.Hshift,0+this.Vshift,1);
                this.box1.reset(300+this.Hshift,0+this.Vshift,1);
                this.box2.reset(280+this.Hshift,20+this.Vshift,1);
                this.box3.reset(300+this.Hshift,20+this.Vshift,1);
                break;
                
            case 2:
                this.box0.reset(320+this.Hshift,0+this.Vshift,2);
                this.box1.reset(300+this.Hshift,0+this.Vshift,2);
                this.box2.reset(280+this.Hshift,20+this.Vshift,2);
                this.box3.reset(300+this.Hshift,20+this.Vshift,2);
                break;
                
            case 3:
                this.box0.reset(280+this.Hshift,0+this.Vshift,3);
                this.box1.reset(260+this.Hshift,0+this.Vshift,3);
                this.box2.reset(280+this.Hshift,20+this.Vshift,3);
                this.box3.reset(300+this.Hshift,20+this.Vshift,3);
                break;
                
            case 4:
                this.box0.reset(280+this.Hshift,0+this.Vshift,4);
                this.box1.reset(300+this.Hshift,0+this.Vshift,4);
                this.box2.reset(280+this.Hshift,20+this.Vshift,4);
                this.box3.reset(320+this.Hshift,0+this.Vshift,4);
                break;
                
            case 5:
                this.box0.reset(280+this.Hshift,0+this.Vshift,5);
                this.box1.reset(300+this.Hshift,0+this.Vshift,5);
                this.box2.reset(300+this.Hshift,20+this.Vshift,5);
                this.box3.reset(260+this.Hshift,0+this.Vshift,5);
                break;
                
            case 6:
                this.box0.reset(280+this.Hshift,0+this.Vshift,6);
                this.box1.reset(280+this.Hshift,20+this.Vshift,6);
                this.box2.reset(280+this.Hshift,40+this.Vshift,6);
                this.box3.reset(280+this.Hshift,60+this.Vshift,6);
                break;
        }
        
        this.box0.draw();
        this.box1.draw();
        this.box2.draw();
        this.box3.draw();    
    } 
    
    //main shape that falls
    var shape1 = new shapeOBJ(2);

    //the stack that is at the bottom
    var pile = new stack();
    
    var NextBox = new displayBox();
    
    //game control state
    var state = "play";
    
    var draw = function () {
        
        switch(state){   
                
            case "start":
                fill(100,100,100);
                rect(300,300,50,50);
                noFill();
                
                if(keyArray[UP] === 1){
                    state = "play";
                }
                break;

            case "play":
                                
                background(300,300,300);

                for(var i = 0; i < 300; i+=20){
                    for(var j = 0; j < 700; j+=20){
                        rect(i,j,20,20);
                    }
                }

                shape1.draw();   
                shape1.move(pile);
                
                pile.checkRows();
                pile.draw();
                
                NextBox.draw(shape1.nextType);
                
                for(var i = 0; i < pile.block.length; i++){
                    for(var j = 0; j < pile.block[i].length; j++){
                        if(pile.block[i][j] !== null){
                            if(pile.block[i][j].y <= 40){
                                state = "game over";
                                break;
                            }
                        }
                    }
                }

                break;
                
            case "game over":
                
                
                break;
        }
    };
}};