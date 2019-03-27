          
(function(){
    //Canvas initialization
    function init() {
    starsFont = document.getElementById("stars-font");
    ctx = starsFont.getContext("2d");
    
    starsUnder = document.getElementById("stars-under");
    ctx2 = starsUnder.getContext("2d");
      
    drawAll();
    }
    
    //Rendering of canvas
    /***************/
    function drawAll() {
    draw1();
    draw2();
    }
    
    function draw1(){
    ctx.clearRect(0, 0, 5000,300);
    for(var i=0;i<1000;i++){
    ctx.beginPath();
    ctx.arc(Math.random()*3000,10+Math.random()*1000,3*Math.random()*3,0,Math.PI*2,true);
    ctx.closePath()
    ctx.shadowBlur = 10; 
    ctx.shadowColor = 'white';
    ctx.fillStyle = 'white';
    ctx.fill();
    }
    }
    
    function draw2(){
    ctx2.clearRect(0, 0, 5000,300);
    for(var i=0;i<1000;i++){
    ctx2.beginPath();
    ctx2.arc(Math.random()*3000,10+Math.random()*1000,3*Math.random()*3,0,Math.PI*2,true);
    ctx2.closePath()
    ctx2.shadowBlur = 10; 
    ctx2.shadowColor = 'white';
    ctx2.fillStyle = '#ECE9E9';
    ctx2.fill();
    }
    }
    init();
    /******************/
    
    //Mouse event listener
        var currentPositionX_;
            $('body').mousemove(function(e){
            setTimeout(function(){return currentPositionX_=e.pageX;},1);
            var currentPositionX=e.pageX;
            if(currentPositionX_>currentPositionX){
                $('#stars-font').css("margin-left","+="+3+"px 0");
          $('#stars-under').css("margin-left","+="+2+"px 0");
                $('.canvas-area').css("background-position","+="+1+"px 0");
            }else{
                $('#stars-font').css("margin-left","+="+-3+"px 0");
          $('#stars-under').css("margin-left","+="+-2+"px 0");
                $('.canvas-area').css("background-position","+="+-1+"px 0");
            }			
            });
    })();            
     
        