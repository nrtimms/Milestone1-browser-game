const circleObject = {
    circle: document.getElementById("circle"),
    x: 209,
    y: 100,
    goLeft: false,
    count: 5,
    first: true,
    bar: document.getElementById("green-bar"),
    green: 16.67
}

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

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
        if(circleObject.x>590){
            circleObject.goLeft=true;
        }
        if(circleObject.x<220){
            circleObject.goLeft=false;
        }
}
window.setInterval(moveCircle, 10, circleObject)

let donefishing = false
function clickclick(circleObject){
    if(circleObject.x>370 && circleObject.x<425){
        circleObject.count ++
        circleObject.green += 16.67
        gsap.to('#green-bar', {
            width: circleObject.green+'%'
        })
    }
    else {
        circleObject.count --
        circleObject.green -= 16.67
        gsap.to('#green-bar', {
            width: circleObject.green+'%'
        })
    }
    if (circleObject.count == 10){
        score++
        console.log("win")
        alert("You caught a fish");
        donefishing = true;
    }
    if(circleObject.count == 4){
        score = 0
        alert("The fish got away");
        donefishing = true;
    }
    console.log(circleObject.count)
}

// document.getElementById("rect").onclick = function() {clickclick(circleObject)};

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

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
console.log(boundaries)

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
console.log(fishSpots)

const image = new Image()
image.src = 'assets/map.png'

const playerImage = new Image()
playerImage.src = 'assets/boat.png'

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

// const catchFish = new Sprite({
//     position: {
//         x: 0,
//         y: 0
//     },
//     image: catchFishImage
// })

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

function rectangularCollision({thing1, thing2}) {
    return (
        thing1.position.x + thing1.width -20 >= thing2.position.x &&
        thing1.position.x <= thing2.position.x + thing2.width - 20 &&
        thing1.position.y + thing1.height - 50 >= thing2.position.y &&
        thing1.position.y <= thing2.position.y + thing2.height -20
    )
}

const fishing = {
    intiated: false
}

function animate() {
    const animationId = window.requestAnimationFrame(animate)
    //console.log(animationId)
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
      x: e.clientX -200,
      y: e.clientY -60
    };
    console.log(pos)
    //fishSpots.forEach(fish => {
    for (let i=0; i<fishSpots.length; i++){
        const fish = fishSpots[i]
        //console.log(fish)
        if (pos.x >= fish.position.x &&
            pos.x <= fish.position.x + fish.width &&
            pos.y >= fish.position.y &&
            pos.y <= fish.position.y + fish.height) {
            //console.log('fishing spot')
            fishing.intiated = true
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
    } else if(keys.a.pressed) {
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
    } else if(keys.s.pressed) {
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
        }else if(keys.d.pressed) {
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

let animateFishingId
function animateFishing(){
    animateFishingId = window.requestAnimationFrame(animateFishing)
    document.getElementById("button").onclick = function() {clickclick(circleObject)};
    //console.log('animating fishing')
    if (score > highScore) highScore = score;
    c.font = "15px Verdana";
    c.fillStyle = '#eee';
    c.fillText(`Fish caught in a row: ${score}    High Score: ${highScore}`, 700, 40);
    if(donefishing) {
        fishing.intiated = false
        gsap.to('.meter',{
            opacity: 0
        })
        donefishing = false
        circleObject.count = 5
        circleObject.green = 16.67
     
    }
}

animate()
animateFishing()


//animateFishing()

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