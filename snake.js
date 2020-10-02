/*
step 1 :set the snakes
        a)set the features of snake
        b)create the snake
        c)draw the snake using img src
        d)update the snake box using the direction of the input
step 2 :draw the snake.drawSnake();
step 3 :update the snake.updateSnake();
add event listeners:
add food.random funtion();

*/
function init()
{
	canvas = document.getElementById('mycanvas');//get the background done
	W = canvas.width = 1300;//set the canvas size parameters
    H =canvas.height =700;// set the canvas size parameters
	pen = canvas.getContext('2d');
	cs = 66;
	game_over = false;
    score=5;
    hello_img="hello programmers";
    
    //create a image object for food
    food_img=new Image();
    food_img.src="assets/apple.png";
    
	food = getRandomFood();
    
    eater_img=new Image();
    eater_img.src="assets/eater.png"

    
    trophy=new Image();
    trophy.src="assets/trophy.png"
	

	snake = {                //start of the snake object
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",


		  createSnake:function()
        {
			for(var i=this.init_len;i>0;i--)
            {
				this.cells.push({x:i,y:0});
			}
		},
		  drawSnake:function(){

			for(var i=0;i<this.cells.length;i++)
            {
				pen.fillStyle=this.color;
				pen.drawImage(eater_img,this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);       //drawing the image of the eater head
			}
		},
          updateSnake:function()
        {
                                                                    //console.log("updating snake according to the direction property");
                                                                    //check if the snake has eaten food,increase the length of the snake and 
                                                                    //generate new food object
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if(headX==food.x && headY==food.y)
                {
                    console.log("food eaten");
                    food=getRandomFood();
                    score++;
                }
            else{
                this.cells.pop(); 
            }
            var nextX,nextY;
            if(this.direction=="right")
                {
                    nextX=headX+1;
                    nextY=headY;
                }
            else if(this.direction=="left")
                {
                    nextX=headX-1;
                    nextY=headY;
                }
            
            else if(this.direction=="down")
                {
                    nextX=headX;
                    nextY=headY+1;
                }
            else
                {
                    nextX=headX;
                    nextY=headY-1;
                }
            
            this.cells.unshift({x:nextX,y:nextY});
                                                       //a logic that prevent snake from going out of the grid
            
            var last_x=Math.round(W/cs);
            var last_y=Math.round(H/cs);
            if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>last_x||this.cells[0].y>last_y)      //setting the parameters for the snake to restrict 
                {
                    game_over=true;
                }
    
        }//end of update function
		

	};//end of the snake object

	snake.createSnake();
    
                                                   //add a event listener on document object
    
    
                                                    //event listener of keypressed
    function keyPressed(e)
    {
       if(e.key=='ArrowRight')
           {
               snake.direction="right";
           }
        
        else if(e.key=='ArrowLeft')
            {
                snake.direction="left";
            }
        else if(e.key=='ArrowDown')
            {
                snake.direction='down';
            }
        else
        {
            snake.direction="up";
        }
        
        console.log(snake.direction);
    }
    
    document.addEventListener('keydown',keyPressed);
    

}
                                                        //end of the event listeners of the keypressed


function draw(){                                                        //draw the snake,clear the boxes,fill the food
	//console.log("In Draw");

	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
    pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    
    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle="blue";
    pen.font="20 px Roboto";
	pen.fillText(score,50,50);
    pen.fillStyle="red";
    pen.font="500 px Roboto";
    pen.fillText(hello_img,401,69);
	
	
	
}

function update()                                     //update the snake
{
	//console.log("In Update");
	  snake.updateSnake();
}

function getRandomFood()
{
    var foodX=Math.round(Math.random()*(W-cs)/cs);//generate food object in random position inside the canvas for X
    var foodY=Math.round(Math.random()*(H-cs)/cs);//generate food object in random position inside the canvas for Y
    
    var food={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;// return food object from this function
}

function gameloop(){                                    //gameloop sets the draw and update funtion in a loop
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

init();

var f = setInterval(gameloop,100);

