var sketchProc = function (processingInstance) { with (processingInstance) {
    size(600, 700);
    frameRate(60);
        
    var shapeLOBJ = function(x,y){
        this.x = x;
        this.y = y;
        this.count = 0;
    };
    
    var squareOBJ = function(x,y){
        this.x = x;
        this.y = y;
        this.count = 0;
    };
    
    shapeLOBJ.prototype.draw = function(){
        fill(100,100,100);
        rect(this.x-10, this.y-10, 20, 20);
        rect(this.x-10, this.y-30, 20, 20);
        rect(this.x-10, this.y-50, 20, 20);
        rect(this.x+10, this.y-50, 20,+ 20);
        
        noStroke();
        fill(300,00,00);
        ellipse(this.x,this.y,2,2);
        stroke(0,0,0);
        noFill();
    };
    
    squareOBJ.prototype.draw = function(){
        fill(100,100,100);
        rect(this.x-20, this.y-20, 20, 20);
        rect(this.x-20, this.y, 20, 20);
        rect(this.x, this.y-20, 20, 20);
        rect(this.x, this.y, 20, 20);
        
        noStroke();
        fill(300,00,00);
        ellipse(this.x,this.y,2,2);
        stroke(0,0,0);
        noFill();
    };
    
    shapeLOBJ.prototype.move = function(){
        this.count++;
        if(this.count >= 60){
            this.count = 0;
            this.y+=20;
        }
        if(this.y>=580){
            this.count = 0;
        }
    };
    
    squareOBJ.prototype.move = function(){
        this.count++;
        if(this.count >= 60){
            this.count = 0;
            this.y+=20;
        }
        if(this.y>=580){
            this.count = 0;
        }
    };

    var shape = new shapeLOBJ(100,100);
    var shape2 = new squareOBJ(200,100);
    
    var draw = function () {
        
        background(300,300,300);
        
        rect(0, 680, 600, 20);
        
        shape.draw();
        shape.move();
        
        shape2.draw();
        shape2.move();
        
    };
}};