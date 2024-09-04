const canvas = document.getElementById('mainview');
const context = canvas.getContext('2d');
const c = canvas.getContext('2d');
const scoreplayer = document.getElementById('score_player');
const uiGameOver = document.getElementById('UI_Gameover');
const scoreEndGame = document.getElementById('score_endgame');
const btnRestartGame = document.getElementById('btn_restart_game');
const btnStartGame = document.getElementById('btnStart');









const x = canvas.width / 2
const y = canvas.height / 2

let score = 0;
let isLose = false;
let player = new Player(x, y, 10, 'white')
let projectiles = []
let enemies = []
let particles = []
let animationId;
let backgroundParticles = []
let timeSpawnEnemy = 3000;
function Init() {





    canvas.width = innerWidth;
    canvas.height = innerHeight;

    score = 0;
    isLose = false;
    player = new Player(x, y, 10, 'white')
    projectiles = []
    enemies = []
    particles = []
    scoreplayer.innerHTML = 0;
    animate()
    spawnEnemies()

    backgroundParticles = []

    const spacing = 30
  
    for (let x = 0; x < canvas.width + spacing; x += spacing) {
      for (let y = 0; y < canvas.height + spacing; y += spacing) {
        backgroundParticles.push(
          new BackgroundParticle({
            position: {
              x,
              y
            },
            radius: 3
          })
        )
      }
    }
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
    }, timeSpawnEnemy)
}



function createScoreLable({position , score})
{
    const scoreLable = document.createElement('label');
    scoreLable.innerHTML = score;
    scoreLable.style.color = 'white';
    scoreLable.style.position = 'absolute';
    scoreLable.style.left = position.x + 'px';
    scoreLable.style.top = position.y + 'px';
    scoreLable.style.userSelect = 'none';
    document.body.appendChild(scoreLable);

    gsap.to(scoreLable,{
        opacity:0,
        y : -30,
        duration: 0.75,
        onComplete: () =>
        {
            scoreLable.parentNode.removeChild(scoreLable);
        }
    })
}



function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    })
    backgroundParticles.forEach((backgroundParticle) => {
        backgroundParticle.draw()
    
        const dist = Math.hypot(
          player.x - backgroundParticle.position.x,
          player.y - backgroundParticle.position.y
        )
    
        if (dist < 100) {
          backgroundParticle.alpha = 0
    
          if (dist > 70) {
            backgroundParticle.alpha = 0.5
          }
        } else if (dist > 100 && backgroundParticle.alpha < 0.1) {
          backgroundParticle.alpha += 0.01
        } else if (dist > 100 && backgroundParticle.alpha > 0.1) {
          backgroundParticle.alpha -= 0.01
        }
      })

      backgroundParticles.forEach((backgroundParticle) => {
    backgroundParticle.draw()

    const dist = Math.hypot(
      player.x - backgroundParticle.position.x,
      player.y - backgroundParticle.position.y
    )

    if (dist < 100) {
      backgroundParticle.alpha = 0

      if (dist > 70) {
        backgroundParticle.alpha = 0.5
      }
    } else if (dist > 100 && backgroundParticle.alpha < 0.1) {
      backgroundParticle.alpha += 0.01
    } else if (dist > 100 && backgroundParticle.alpha > 0.1) {
      backgroundParticle.alpha -= 0.01
    }
  })

    player.update()
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
           // const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            const point1 = new Vector2D(projectile.x, projectile.y);
            const point2 = new Vector2D(enemy.x, enemy.y);
            const distance = Vector2D.distance(point1, point2);
            // when projectiles touch enemy
            //dist - enemy.radius - projectile.radius < 1
            if (distance - enemy.radius - projectile.radius < 1) {
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
                    score+=100;
                    scoreplayer.innerHTML = score;
                    createScoreLable({position :{
                        x : projectile.x,
                        y: projectile.y
                    },
                score: 100});
                    

                    projectiles.splice(projectilesIndex, 1)

                } else {

                    enemies.splice(index, 1)
                    projectiles.splice(projectilesIndex, 1)
                    score+=150;
                    scoreplayer.innerHTML = score;
                    createScoreLable({position :{
                        x : projectile.x,
                        y: projectile.y
                    },
                score: 150});
                }
            }
        }

    }

    UpdateTimeSpawmEnemy();
}

addEventListener('click', (event) => {

    if (!isLose) {
        const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
        const velocity = {
          x: Math.cos(angle) * 5,
          y: Math.sin(angle) * 5
        }
        const point1 = new Vector2D(player.x , player.y);
        const point2 = new Vector2D(event.clientX, event.clientY);
        const direction = Vector2D.direction(point1, point2).normalize();
    
        projectiles.push(
            new Projectile(player.x,player.y, 5, 'white', 
               {
                x: direction.x * 5,
                y: direction.y * 5
               }
            )
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



window.addEventListener('keydown', (event)=>
{
    switch (event.key) {
        case 'ArrowRight':
          player.velocity.x += 1
          break
        case 'ArrowUp':
          player.velocity.y += -1
          break
        case 'ArrowLeft':
          player.velocity.x += -1
          break
        case 'ArrowDown':
          player.velocity.y += 1
          break
      }
})



function UpdateTimeSpawmEnemy()
{
    if(score > 1000  && score <2000)
    {
        timeSpawnEnemy -=1000;
    }
    if(score > 2000 && score <3000)
    {
        timeSpawnEnemy -= 1000;
    }
}
