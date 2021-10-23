const canvas = document.getElementById("game");
const ctx=canvas.getContext("2d");
const buttons = document.getElementsByClassName("button");


let speed=8;

let count=20;

let x=3;
let y=3;

let xv=0;
let yv=0;

let parts=[];
let tail=2;

let xfood=5;
let yfood=5;

let score=0;


class snakePart
{
    constructor(xx,yy)
    {
        this.x=xx;
        this.y=yy;
    }
}


function gameloop()
{
    change_snake_position()
    let x = game_over();

    if(x == true)
    {
        return;
    }

    clearscreen();
    spawn_snake();
    spawn_food();
    collision_detection();
    display_score();
    setTimeout(gameloop,1000/speed);

    if(score > 5 )
    {
        speed=10;
    }
}



function game_over()
{
    var test=false;

    if(xv == 0 && yv == 0)
    {
        return false;
    }


    if(x < 0)
    {
        test=true;
    }
    else if(x == count || x == 15)
    {
        test=true;
    }
    else if(y < 0)
    {
        test=true;
    }
    else if(y == count || y == 8)
    {
        test=true;
    }

    for(let i=0;i<parts.length;i++)
    {
        let part = parts[i];
        if(part.x == x && part.y ==y)
        {
            test=true;
            break;
        }
    }


    if(test == true)
    {
        ctx.fillStyle="black";
        ctx.font="50px verdana"
        ctx.fillText("game over !",canvas.width/3 -85 , canvas.height/2 + 15);
    }
    return test;
}



function spawn_snake()
{
    ctx.fillStyle="red";
    ctx.fillRect(x*count , y*count , count-1 , count-1);

    ctx.fillStyle="darkgreen";

    for(let i=0;i<parts.length;i++)
    {
        let part=parts[i];
        ctx.fillRect(part.x*count , part.y*count , count-1 , count-1);
    }

    parts.push(new snakePart(x,y));

    while(parts.length > tail)
    {
        parts.shift();
    }

}






function clearscreen()
{
    ctx.fillStyle="#959D24";
    ctx.fillRect(0 , 0 , canvas.width , canvas.height);
}




document.body.addEventListener("keydown",key_pressed);





function change_snake_position()
{
    x+=xv;
    y+=yv;
}







function spawn_food()
{
    ctx.fillStyle="black";
    ctx.fillRect(xfood*count , yfood*count , count-1 , count-1 )
}






function collision_detection()
{
    if(x === xfood && y === yfood)
    {
        xfood=Math.floor(Math.random() * (count/2 -3));
        yfood=Math.floor(Math.random() * (count/2 -3));
        score++;
        tail++;
    }
}






function display_score()
{
    ctx.fillStyle="black";
    ctx.font="15px verdana";
    ctx.fillText("score = "+score ,canvas.width-90,15);
}





function key_pressed(event)
{
    if(event.keyCode == 37)
    {
        if(xv == 1)
            return; 
        setTimeout(fuck1,250);

        buttons[3].style.backgroundColor = "orange";
        
        function fuck1()
        {
            buttons[3].style.backgroundColor = "#9A938C";
        }

        xv=-1;
        yv=0;
    }

    if(event.keyCode == 38)
    {   
        if(yv == 1)
            return;

            setTimeout(fuck2,250);

            buttons[1].style.backgroundColor = "orange";
            
            function fuck2()
            {
                buttons[1].style.backgroundColor = "#9A938C";
            }

        xv=0;
        yv=-1;
    }

    if(event.keyCode == 39)
    {
        if(xv == -1)
            return;

            setTimeout(fuck3,250);

            buttons[5].style.backgroundColor = "orange";
            
            function fuck3()
            {
                buttons[5].style.backgroundColor = "#9A938C";
            }
        xv=1;
        yv=0;
    }

    if(event.keyCode == 40)
    {
        if(yv == -1)
            return;

            setTimeout(fuck4,250);

            buttons[7].style.backgroundColor = "orange";
            
            function fuck4()
            {
                buttons[7].style.backgroundColor = "#9A938C";
            }
        yv=1;
        xv=0;
    }
}

gameloop();