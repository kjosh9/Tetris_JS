var sketchProc = function (processingInstance) { with (processingInstance) {
    size(600, 700);
    frameRate(60);

    
    var boxOBJ = function(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    
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
    
    var box0 = new boxOBJ(280,680);
    var box1 = new boxOBJ(300,680);
    var box2 = new boxOBJ(280,660);
    var box3 = new boxOBJ(300,660);
    
    var stack = function(){
        this.block = [];
    };
    
    stack.prototype.draw = function(){
        for(var i = 0; i < this.block.length; i++){
            this.block[i].draw();
        }
    };
        
    var shapeOBJ = function(Type){
        this.count = 0;
        this.Type = Type;
        this.reshape();
    };
    
    shapeOBJ.prototype.reshape = function(){
        
        switch(this.Type){
            case 1:
                this.box0 = new boxOBJ(280,0,1);
                this.box1 = new boxOBJ(300,0,1);
                this.box2 = new boxOBJ(280,20,1);
                this.box3 = new boxOBJ(300,20,1);
                break;
                
            case 2:
                this.box0 = new boxOBJ(320,0,2);
                this.box1 = new boxOBJ(300,0,2);
                this.box2 = new boxOBJ(280,20,2);
                this.box3 = new boxOBJ(300,20,2);
                break;
                
            case 3:
                this.box0 = new boxOBJ(280,0,3);
                this.box1 = new boxOBJ(260,0,3);
                this.box2 = new boxOBJ(280,20,3);
                this.box3 = new boxOBJ(300,20,3);
                break;
                
            case 4:
                this.box0 = new boxOBJ(280,0,4);
                this.box1 = new boxOBJ(300,0,4);
                this.box2 = new boxOBJ(280,20,4);
                this.box3 = new boxOBJ(320,0,4);
                break;
                
            case 5:
                this.box0 = new boxOBJ(280,0,5);
                this.box1 = new boxOBJ(300,0,5);
                this.box2 = new boxOBJ(300,20,5);
                this.box3 = new boxOBJ(260,0,5);
                break;
                
            case 6:
                this.box0 = new boxOBJ(280,0,6);
                this.box1 = new boxOBJ(280,20,6);
                this.box2 = new boxOBJ(280,40,6);
                this.box3 = new boxOBJ(280,60,6);
                break;
        }
        this.Type = (this.Type+1)%6;
    };
    
    shapeOBJ.prototype.CollCheckBottom = function(stackOBJ){
        if(this.box0.y >= 680){
            return true;
            
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            if((this.box0.x == stackOBJ.block[i].x) && (this.box0.y+20 == stackOBJ.block[i].y)){
                return true;
            }
        }
        
        if(this.box1.y >= 680){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            if((this.box1.x == stackOBJ.block[i].x) && (this.box1.y+20 == stackOBJ.block[i].y)){
                return true;
            }
        }
            
        if(this.box2.y >= 680){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            if((this.box2.x == stackOBJ.block[i].x) && (this.box2.y+20 == stackOBJ.block[i].y)){
                return true;
            }
        }

        if(this.box3.y >= 680){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            if((this.box3.x == stackOBJ.block[i].x) && (this.box3.y+20 == stackOBJ.block[i].y)){
                return true;
            }
        }
        return false;
    };
    
    shapeOBJ.prototype.move = function(stackOBJ){
        this.count++;
        
        if(this.CollCheckBottom(stackOBJ)==true){
            var newbox0 = this.box0;
            stackOBJ.block.push(newbox0);
            var newbox1 = this.box1;
            stackOBJ.block.push(newbox1);
            var newbox2 = this.box2;
            stackOBJ.block.push(newbox2);
            var newbox3 = this.box3;
            stackOBJ.block.push(newbox3);
            
            delete this.block0;
            delete this.block1;
            delete this.block2;
            delete this.block3;
            
            this.reshape();            
        }        
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

    var shape1 = new shapeOBJ(4);

    var pile = new stack();
    
    var draw = function () {
        
        background(300,300,300);
        
        for(var i = 0; i < 600; i+=20){
            for(var j = 0; j < 700; j+=20){
                rect(i,j,20,20);
            }
        }
        
        shape1.draw();   
        shape1.move(pile);
                
        pile.draw();
        
    };
}};