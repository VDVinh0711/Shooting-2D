const canvas = document.getElementById('mainview');
const context = canvas.getContext('2d');
const c = canvas.getContext('2d');
const scoreplayer = document.getElementById('score_player');
const uiGameOver = document.getElementById('UI_Gameover');
const scoreEndGame = document.getElementById('score_endgame');
const btnRestartGame = document.getElementById('btn_restart_game');
const btnStartGame = document.getElementById('btnStart');

// class Vector2D {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     static distance(v1, v2) {

//         const x = v2.x - v1.x;
//         const y = v2.y - v1.y;

//         return  new Vector2D(x,y).magnitude();
//     }

//     normalize() {
//         const magnitude = this.magnitude();
//         if (magnitude > 0) {
//             return new Vector2D(this.x / magnitude, this.y / magnitude);
//         } else {
//             return new Vector2D(0, 0); 
//         }
//     }

//     static direction(v1, v2) {
//         const dx = v2.x - v1.x;
//         const dy = v2.y - v1.y;
//         const directionVector = new Vector2D(dx, dy);

//         return directionVector.normalize(); 
//     }

//     magnitude() {
//         return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
//     }
// }



// const GameMono = 
// {
//     canvas : canvas,
//     ctx  : context,
//     width : canvas.width,
//     height : canvas.height,
// }

// class Player
// {
//     constructor(x,y,color)
//     {
//         this.x = x,
//          this.y  = y,
//          this.color = color;
//     }

//     drawplayer()
//     {

//         context.fillStyle  = this.color;
//         context.beginPath();
//         context.arc(this.x,this.y,20,Math.PI * 2,false);
//         context.fill();
//     }
// }


// class Bullet
// {
//     constructor(x,y,color,radius,movespeed,direction)
//     {
//         this.x = x,
//         this.y = y,
//         this.color = color,
//         this.radius = radius,
//         this.movespeed = movespeed,
//         this.direction = direction
//     }

//     drawbullet()
//     {
//         context.beginPath();
//         context.fillStyle = this.color,
//         context.arc(this.x, this.y, this.radius, Math.PI * 2 , false);
//         context.fill();
//     }

//     update()
//     {
//         this.drawbullet();
//         this.x = this.x + this.direction.x * this.movespeed;
//         this.y = this.y + this.direction.y * this.movespeed;
//     }
//     getposition() 
//     {
//         return new Vector2D(this.y,this.y);
//     }



// }

// class Enemy
// {
//     constructor(x,y,color,movespeed,radius,direction)
//     {
//         this.x = x,
//         this.y = y,
//         this.color = color,
//         this.direction = direction,
//         this.movespeed = movespeed,
//         this.radius = radius;
//     }

//     drawbullet()
//     {
//         context.beginPath();
//         context.fillStyle = this.color,
//         context.arc(this.x, this.y, this.radius, Math.PI * 2 , false);
//         context.fill();
//     }

//     update()
//     {
//         this.drawbullet();
//         this.x = this.x + this.direction.x * this.movespeed;
//         this.y = this.y + this.direction.y * this.movespeed;
//     }

//     getposition() 
//     {
//         return new Vector2D(this.y,this.y);
//     }


// }



// const x = canvas.width / 2;
// const y = canvas.height / 2;
// const player = new Player(x,y,'red');



// const bullets = [];
// const enemys = [];
// const pointSpawnEmemy = [];

// function SetPointSpawnEnemy()
// {
//     let angel = 0;
//     const cenpoint = new Vector2D(canvas.width/2, canvas.height/2);
//     const dc = Vector2D.distance(cenpoint, new Vector2D(canvas.width,0));
//     while(angel < 360)
//     {
//         const x = cenpoint.x + dc * Math.cos(angel);
//         const y = cenpoint.x + dc * Math.sin(angel);
//         const pointAdd  = new Vector2D(x,y);
//         pointSpawnEmemy.push(pointAdd);
//         angel += 90;
//     }
// }


// function SpawnEnemy()
// {
//      setInterval(()=>
//      {

//         const randomIndex = Math.floor(Math.random() * pointSpawnEmemy.length);
//         const point = pointSpawnEmemy[randomIndex];
//          const target = new Vector2D(canvas.width/2, canvas.height/2);
//          const direction = Vector2D.direction(new Vector2D(point.x, point.y) , target);
//         const enemyadd = new Enemy(point.x,point.y,'green',1,20,direction);
//         enemys.push(enemyadd);

//  },1000);
// }

// SetPointSpawnEnemy();
// SpawnEnemy();



// function CheckOutOfCanvas(x,y)
// {
//     if(x < 0 || x> canvas.width || y < 0 || y> canvas.height)
//     {
//         return true;
//     }
//     return false;
// }

// canvas.addEventListener("click", function(event) {

//     const target = new Vector2D(event.clientX,event.clientY);
//     const originpoint = new Vector2D(canvas.width/2 , canvas.height/2);
//     const direction = Vector2D.direction(originpoint,target);

//     const bullet = new Bullet(canvas.width/2,canvas.height/2,'blue',10,4, direction);
//     bullets.push(bullet);

// });


// let idAnimationFrame;
// function animate()
// {
//     context.fillStyle = 'rgba(0,0,0,0.1)'
//     context.fillRect(0,0,canvas.width,canvas.height);
//     idAnimationFrame =  requestAnimationFrame(animate);
//     player.drawplayer();
//     bullets.forEach((bullet, bulletIndex) =>
//     {
//         bullet.update();
//         setTimeout(()=>
//         {
//             if(CheckOutOfCanvas(bullet.x, bullet.y))
//             {
//                 bullets.splice(bulletIndex,1);
//             }
//         },0);
//     }
//     );
//     enemys.forEach((enemy,index) =>
//         {
//            enemy.update();
//            if(Vector2D.distance(enemy.getposition() , new Vector2D(player.x,player.y)) < 1)
//            {
//                // cancelAnimationFrame(idAnimationFrame);
//            }




//            bullets.forEach((bullet, bulletIndex) =>
//             {

//                 if(Vector2D.distance(enemy.getposition(), bullet.getposition())  < 1)
//                 {
//                     setTimeout(() => {
//                         enemys.splice(index,1);
//                     bullets.splice(bulletIndex,1);
//                     }, 0); 
//                 }
//             }
//             )
//         }
//         )

// }
// animate();





class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(v1, v2) {
        return this.direction(v1, v2).magnitude();
    }

    normalize() {
        const magnitude = this.magnitude();
        if (magnitude > 0) {
            return new Vector2D(this.x / magnitude, this.y / magnitude);
        } else {
            return new Vector2D(0, 0);
        }
    }

    static direction(v1, v2) {
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        const directionVector = new Vector2D(dx, dy);
        return directionVector.normalize();
    }

    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}




canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const friction = 0.99
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
}

const x = canvas.width / 2
const y = canvas.height / 2
let score = 0;
let isLose = false;
let player = new Player(x, y, 10, 'white')
let projectiles = []
let enemies = []
let particles = []
let animationId;

function Init() {
    score = 0;
    isLose = false;
    player = new Player(x, y, 10, 'white')
    projectiles = []
    enemies = []
    particles = []
    scoreplayer.innerHTML = 0;
    animate()
    spawnEnemies()
}
function spawnEnemies() {
    setInterval(() => {
        if (isLose) {
            clearInterval();
        }
        else {
            const radius = Math.random() * (30 - 4) + 4

            let x
            let y

            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
                y = Math.random() * canvas.height
            } else {
                x = Math.random() * canvas.width
                y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
            }

            const color = `hsl(${Math.random() * 360}, 50%, 50%)`

            const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }

            enemies.push(new Enemy(x, y, radius, color, velocity))
        }
    }, 1000)
}


function animate() {
    animationId = requestAnimationFrame(animate)

    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    })


    for (let index = projectiles.length - 1; index >= 0; index--) {
        const projectile = projectiles[index];
        projectile.update()

        // remove from edges of screen
        if (
            projectile.x - projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
        ) {

            projectiles.splice(index, 1)

        }
    }




    for (let index = enemies.length - 1; index >= 0; index--) {
        const enemy = enemies[index];
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        //end game
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            isLose = true;
            uiGameOver.style.display = 'flex';
            scoreEndGame.innerHTML = score;
          
        }



        for (let projectilesIndex = projectiles.length - 1; projectilesIndex >= 0; projectilesIndex--) {
            const projectile = projectiles[projectilesIndex];
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            // when projectiles touch enemy
            if (dist - enemy.radius - projectile.radius < 1) {
                // create explosions
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(
                        new Particle(
                            projectile.x,
                            projectile.y,
                            Math.random() * 2,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * 6),
                                y: (Math.random() - 0.5) * (Math.random() * 6)
                            }
                        )
                    )
                }
                if (enemy.radius - 10 > 5) {
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })

                    projectiles.splice(projectilesIndex, 1)

                } else {

                    enemies.splice(index, 1)
                    projectiles.splice(projectilesIndex, 1)
                    score++;
                    scoreplayer.innerHTML = score;

                }
            }
        }

    }

}

addEventListener('click', (event) => {

    if (!isLose) {
        const angle = Math.atan2(
            event.clientY - canvas.height / 2,
            event.clientX - canvas.width / 2
        )
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }

        projectiles.push(
            new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity)
        )
    }

})

btnRestartGame.addEventListener('click', (event) => {


    uiGameOver.style.display = 'none';
    Init();
    
});
btnStartGame.addEventListener('click',(event) =>
{
    Init();
   gsap.to('#btnStart',
    {
        opacity:0,
        scale:0.8,
        duration:0.3,
        ease :'expo.in',
        onComplete: () =>
        {
            btnStartGame.style.display = 'none';
        }
    }
   )
})

