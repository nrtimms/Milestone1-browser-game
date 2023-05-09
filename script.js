// const circleObject = {
//     circle: document.getElementById("circle"),
//     x: 9,
//     y: 17,
//     goLeft: false,
//     count: 5,
// }

// function moveCircle(circleObject){
//     circleObject.circle.style.left = circleObject.x + "px";
//     circleObject.circle.style.top = circleObject.y + "px";
//         if (circleObject.goLeft == false){
//             circleObject.circle.style.left = circleObject.x + 3 + "px";
//             circleObject.x = circleObject.x + 3;
//         }
//         if (circleObject.goLeft == true){
//             circleObject.circle.style.left = circleObject.x - 3 + "px";
//             circleObject.x = circleObject.x - 3;
//         }
//         if(circleObject.x>380){
//             circleObject.goLeft=true;
//         }
//         if(circleObject.x<10){
//             circleObject.goLeft=false;
//         }
// }
// window.setInterval(moveCircle, 10, circleObject)

// function clickclick(circleObject){
//     if(circleObject.x>150 && circleObject.x<250){
//         circleObject.count ++
//     }
//     if(circleObject.x<150 || circleObject.x>250){
//         circleObject.count --
//     }
//     if(circleObject.count == 10){
//         console.log("win")
//     }
//     if(circleObject.count == 4){
//         console.log("loss")
//     }
// }

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
        c.fillStyle = 'rgba(255, 0, 0, 0.2)'
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

const fish = []

fishiesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1)
        fish.push(
            new Boundary({
                position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                }
            })
        )
    })
})

const image = new Image()
image.src = '/assets/map.png'

const playerImage = new Image()
playerImage.src = '/assets/boat.png'

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
    image: image,
})

const boat = new Player({
    position: {
        x: 400,
        y: 200
    },
    image: playerImage,
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

const movables = [background, ...boundaries, ...fish]

function rectangularCollision({thing1, thing2}) {
    return (
        thing1.position.x + thing1.width -20 >= thing2.position.x &&
        thing1.position.x <= thing2.position.x + thing2.width - 20 &&
        thing1.position.y + thing1.height - 50 >= thing2.position.y &&
        thing1.position.y <= thing2.position.y + thing2.height -20
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boat.draw()
    
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    fish.forEach(fish => {
        fish.draw()
    })

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
                            y: boundary.position.y + 3
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
                movable.position.y += 3
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
                            x: boundary.position.x + 3,
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
                movable.position.x += 3
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
                                y: boundary.position.y - 3
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
                    movable.position.y -= 3
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
                                x: boundary.position.x - 10,
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
                    movable.position.x -= 3
                })
        }
}
animate()

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