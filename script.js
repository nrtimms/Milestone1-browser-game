//define and draw canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
//get coordinations of canvas
const rect = canvas.getBoundingClientRect()

const audio = {
    Map: new Howl({
      src: 'audio/sailing_away.wav',
      html5: true,
      loop: true,
      volume: 0.3
    })
}

//important variables
const circleObject = {
    circle: document.getElementById("circle"),
    x: rect.left + 9,
    y: rect.top + 18,
    goLeft: false,
    count: 5,
    first: true,
    bar: document.getElementById("green-bar"),
    green: 80,
    ran: 0
}

//position fishing meter
const rectangle = document.getElementById('rect')
const target = document.getElementById('target')
const progressBar = document.getElementById('progress')
const greenBar = document.getElementById('green-bar')
const button = document.getElementById('button')
rectangle.style.left = rect.left + 10 + "px";
rectangle.style.top = rect.top + 10 + "px";
target.style.left = rect.left + 172.5 + "px";
target.style.top = rect.top + 10 + "px";
progressBar.style.left = rect.left + 10 + "px";
progressBar.style.top = rect.top + 70 + "px";
greenBar.style.left = rect.left + 10 + "px";
greenBar.style.top = rect.top + 70 + "px";
button.style.left = rect.left + 10 + "px";
button.style.top = rect.top + 90 + "px";

//set initial score values
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

//move ball on fishing meter
function moveCircle(circleObject){
    circleObject.circle.style.left = circleObject.x + "px";
    circleObject.circle.style.top = circleObject.y + "px";
        if (circleObject.goLeft == false){
            circleObject.circle.style.left = circleObject.x + 3 + "px";
            circleObject.x = circleObject.x + 3;
        }
        if (circleObject.goLeft == true){
            circleObject.circle.style.left = circleObject.x - 3 + "px";
            circleObject.x = circleObject.x - 3;
        }
        if(circleObject.x> rect.left + 380){
            circleObject.goLeft=true;
        }
        if(circleObject.x< rect.left + 10){
            circleObject.goLeft=false;
        }
}
window.setInterval(moveCircle, 10, circleObject)

let fishCaught = false
let donefishing = false
//determine if the ball in clicked in or out of bounds
function clickclick(circleObject){
    if(circleObject.x>rect.left+160 && circleObject.x<rect.left+235){
        circleObject.green += 80
        gsap.to('#green-bar', {
            width: circleObject.green+'px'
        })
        circleObject.count ++
    }
    else {
        circleObject.green -= 80
        gsap.to('#green-bar', {
            width: circleObject.green+'px'
        })
        circleObject.count --
    }
    if (circleObject.count == 9){
        circleObject.ran = Math.floor(Math.random() * 5)
        score++
        fishCaught = true
    }
    if(circleObject.count == 4){
        score = 0
        alert("The fish got away");
        donefishing = true;
    }
}

class Boundary {
    static width = 128
    static height = 128
    constructor({position}) {
        this.position = position
        this.width = 128
        this.height = 128
    }
    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 3)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                }
            })
        )
    })
})

const fishSpots = []

fishiesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1)
        fishSpots.push(
            new Boundary({
                position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                }
            })
        )
    })
})

//change direction of boar
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'a':
            playerImage.src = 'assets/boat.png'
            break
        case 'd':
            playerImage.src = 'assets/boatEast.png'
            break
    }
})

//background and player image
const image = new Image()
image.src = 'assets/map.png'

const playerImage = new Image()
playerImage.src = 'assets/boat.png'

//fish pictures
const bootImage = new Image()
bootImage.src = 'assets/boot.png'

const lanceImage = new Image ()
lanceImage.src = 'assets/lance.png'

const milesImage = new Image ()
milesImage.src = 'assets/miles.png'

const squadImage = new Image ()
squadImage.src = 'assets/squad.png'

const strangeImage = new Image()
strangeImage.src = 'assets/strange.png'

class Sprite {
    constructor({position, image}) {
        this.position = position
        this.image = image
    }
    draw() {
        c.drawImage(
            this.image, 
            this.position.x, 
            this.position.y,
        )
    }
}

class Player {
    static width = 192
    static height = 192
    constructor({position, image}) {
        this.position = position
        this.image = image
        this.width = 192
        this.height = 192
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: image
})

const bootFish = new Sprite({
    position: {
        x: 162,
        y: 88
    },
    image: bootImage
})

const lanceFish = new Sprite({
    position: {
        x: 162,
        y: 88
    },
    image: lanceImage
})

const milesFish = new Sprite({
    position: {
        x: 162,
        y: 88
    },
    image: milesImage
})

const squadFish = new Sprite({
    position: {
        x: 162,
        y: 88
    },
    image: squadImage
})

const strangeFish = new Sprite({
    position: {
        x: 162,
        y: 88
    },
    image: strangeImage
})

const catchables = [bootFish, lanceFish, milesFish, squadFish, strangeFish]

const boat = new Player({
    position: {
        x: 400,
        y: 200
    },
    image: playerImage
})

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    }
}

const movables = [background, ...boundaries, ...fishSpots]

//detecting collisions
function rectangularCollision({thing1, thing2}) {
    return (
        thing1.position.x + thing1.width -50 >= thing2.position.x &&
        thing1.position.x <= thing2.position.x + thing2.width - 50 &&
        thing1.position.y + thing1.height - 50 >= thing2.position.y &&
        thing1.position.y <= thing2.position.y + thing2.height -50
    )
}

const fishing = {
    intiated: false
}

//main game loop
function animate() {
    window.requestAnimationFrame(animate)

    background.draw()
    boat.draw()
    
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    fishSpots.forEach(fish => {
        fish.draw()
    })
    
    if(fishing.intiated) return

//click on bubbles https://lavrton.com/hit-region-detection-for-html5-canvas-and-how-to-listen-to-click-events-on-canvas-shapes-815034d7e9f8/
  canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    console.log(pos)
    for (let i=0; i<fishSpots.length; i++){
        const fish = fishSpots[i]
        if (pos.x >= fish.position.x &&
            pos.x <= fish.position.x + fish.width &&
            pos.y >= fish.position.y &&
            pos.y <= fish.position.y + fish.height) {
            fishing.intiated = true
            document.querySelector('#button').disabled = false;
            gsap.to('#green-bar', {
                width: '80px'
            })
            gsap.to('.meter',{
                opacity: 1
            })
            break
        }
    };
  });

    let moving = true
    if(keys.w.pressed) {
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    thing1: boat,
                    thing2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 5
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 5
            })
    } if(keys.a.pressed) {
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    thing1: boat,
                    thing2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 5,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 5
            })
    } if(keys.s.pressed) {
            for (let i=0; i<boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                    rectangularCollision({
                        thing1: boat,
                        thing2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 5
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y -= 5
                })
        }if(keys.d.pressed) {
            for (let i=0; i<boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                    rectangularCollision({
                        thing1: boat,
                        thing2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x - 5,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.x -= 5
                })
        }
}


function animateFishing(){
    window.requestAnimationFrame(animateFishing)
    document.getElementById("button").onclick = function() {clickclick(circleObject)};
    if (score > highScore) highScore = score;
    localStorage.setItem('highScore', highScore);
    c.font = "15px Verdana";
    c.fillStyle = '#eee';
    c.fillText(`Fish caught in a row: ${score}    High Score: ${highScore}`, 700, 40);
    if (fishCaught) {
        gsap.to('.meter',{
            opacity: 0
        })
        catchables[circleObject.ran].draw()
    
        canvas.addEventListener('click', (e) => {
            fishing.intiated = false
            fishCaught = false
            circleObject.count = 5 
            circleObject.green = 80
            document.querySelector('#button').disabled = true;
        });
    }

    if(donefishing) {
        fishing.intiated = false
        gsap.to('.meter',{
            opacity: 0
        })
        donefishing = false
        circleObject.count = 5 
        circleObject.green = 80
        document.querySelector('#button').disabled = true;
        console.log(fishCaught)
        console.log(donefishing)
    }
}

animate()
animateFishing()

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

let clicked = false
addEventListener('keydown', () => {
  if (!clicked) {
    audio.Map.play()
    clicked = true
  }
})