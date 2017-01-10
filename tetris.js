var sketchProc = function (processingInstance) { with (processingInstance) {
    size(600, 700);
    frameRate(60);
    
    var shape1OBJ = function(x,y){
        this.x = x;
        this.y = y;
    };
    
    shape1OBJ.prototype.draw = function(){
        fill(100,100,100,100);
        rect(this.x-5, this.y-5, 20, 20);
        noFill();
    };
    
    
    var shape = new shape1OBJ(100,100);
    
    var draw = function () {
        
        background(300,300,300);
        
        shape.draw();
        
        
    };
}};