var sketchProc = function (processingInstance) { with (processingInstance) {
    size(600, 700);
    frameRate(60);

    
    var boxOBJ = function(x,y){
        this.x = x;
        this.y = y;
    }
    
    boxOBJ.prototype.draw = function(){
        fill(100,100,100);
        rect(this.x, this.y, 20, 20);
        noFill();
    };
    
    var box0 = new boxOBJ(280,680);
    var box1 = new boxOBJ(300,680);
    var box2 = new boxOBJ(280,660);
    var box3 = new boxOBJ(300,660);
    
    var stack = function(){
        this.block = [];
        this.block.push(box0);
        this.block.push(box1);
        this.block.push(box2);
        this.block.push(box3);
    };
    
    stack.prototype.draw = function(){
        for(var i = 0; i < this.block.length; i++){
            this.block[i].draw();
        }
    };
        
    var shapeOBJ = function(Type){
        this.count = 0;
        
        switch(Type){
            case 1:
                this.box0 = new boxOBJ(280,0);
                this.box1 = new boxOBJ(300,0);
                this.box2 = new boxOBJ(280,20);
                this.box3 = new boxOBJ(300,20);
                break;
                
            case 2:
                this.box0 = new boxOBJ(320,0);
                this.box1 = new boxOBJ(300,0);
                this.box2 = new boxOBJ(280,20);
                this.box3 = new boxOBJ(300,20);
                break;
                
            case 3:
                this.box0 = new boxOBJ(280,0);
                this.box1 = new boxOBJ(260,0);
                this.box2 = new boxOBJ(280,20);
                this.box3 = new boxOBJ(300,20);
                break;
                
            case 4:
                this.box0 = new boxOBJ(280,0);
                this.box1 = new boxOBJ(300,0);
                this.box2 = new boxOBJ(280,20);
                this.box3 = new boxOBJ(320,0);
                break;
                
            case 5:
                this.box0 = new boxOBJ(280,0);
                this.box1 = new boxOBJ(300,0);
                this.box2 = new boxOBJ(300,20);
                this.box3 = new boxOBJ(260,0);
                break;
                
            case 6:
                this.box0 = new boxOBJ(280,0);
                this.box1 = new boxOBJ(280,20);
                this.box2 = new boxOBJ(280,40);
                this.box3 = new boxOBJ(280,60);
                break;
        }
        
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
        if((this.count >= 60)&&(this.CollCheckBottom(stackOBJ)==false)){
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

    var shape1 = new shapeOBJ(3);
    

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