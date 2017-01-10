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
    
    boxOBJ.prototype.CollCheckBottom = function(stackOBJ){
        if(this.y == 680){
            return true;
        }
        for(var i = 0; i < stackOBJ.block.length; i++){
            if((this.x == stackOBJ.block[i].x) && (this.y+10 == stackOBJ.block[i].y)){
                return true;
            }
        }
    };
    
    var box0 = new boxOBJ(140,680);
    var box1 = new boxOBJ(120,680);
    var box2 = new boxOBJ(140,660);
    var box3 = new boxOBJ(120,660);
    
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
                

        
    };
    
    shapeOBJ.prototype.move = function(){
        this.count++;
        if(this.count >= 60){
            this.count = 0;
            this.y+=20;
        }
        if(this.y>=580){
            this.count = 0;
        }
    };
    
    var pile = new stack();
    
    var draw = function () {
        
        background(300,300,300);
        
        for(var i = 0; i < 600; i+=20){
            for(var j = 0; j < 700; j+=20){
                rect(i,j,20,20);
            }
        }
        
        
                
        pile.draw();
        
    };
}};