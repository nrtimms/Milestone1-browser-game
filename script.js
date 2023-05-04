// function newNonPlayableCharacter(x, y) {
//     let element = document.getElementById("circle")
//     element.style.zIndex = 1;
//     let direction = null;

//     function moveCharacter() {
//         if (direction === 'west') {
//             x -= 1
//         }
//         if (direction === 'east') {
//             x += 1
//         }
//         element.style.left = x + 'px'
//         element.style.bottom = y + 'px'
//     }

//     setInterval(moveCharacter, 1)

//     async function walkEast(time) {
//         direction = 'east'
//         await sleep(time)
//         stop()
//     }

//     async function walkWest(time) {
//         direction = 'west'
//         await sleep(time)
//         stop()
//     }

//     function stop() {
//         direction = null
//     }

//     function sleep(time){
//         return new Promise(resolve => {
//             setTimeout(resolve, time)
//         })  
//     }


//     return {
//         element: element,
//         walkWest: walkWest,
//         walkEast: walkEast,
//         stop: stop
//     }
// }

// const npc = newNonPlayableCharacter(0, 0)

// have the NPC start walking east immediately
// let i = 0
// async function moveNPC(){
//     while(i<5){
//         await npc.walkWest(1400)
//         await npc.walkEast(1200)
//         i++
//     }
// }

// moveNPC()

// let circle = document.getElementById("circle")
// var x = 9;
// var y = 17;
// circle.style.left = x + "px";
// circle.style.top = y + "px";

// // // // let x = 40;
// // // // let y = 40;
// let goLeft = false;
// // // // function setUp(){
// // // //     createCanvas(400, 400);
// // // // }

// function moveCircle(x){
//         if (goLeft == false){
//             circle.style.left = x + 3 + "px";
//             x = x + 3;
//         }
//         if (goLeft == true){
//             circle.style.left = x - 3 + "px";
//             x = x - 3;
//         }
//         if(x>400){
//             goLeft=true;
//         }
//         if(x<0){
//             goLeft=false;
//         }
//         return x
// }
// // var x = moveCircle(x)
// // console.log(x)

// setInterval(moveCircle(moveCircle()), 10)

//var interval = setInterval(function() {
//     var div = document.getElementById("circle");
//     var goLeft = false;
//     var x = 0;
//     if(goLeft == false){
//         div.style.left = div.offsetLeft + 3 + "px";
//         x = x + 3;
//     }
//     if(goLeft == true){
//         div.style.left = div.offsetLeft - 3 + "px";
//         x = x - 3;
//     }
//     if(x>400){
//         goLeft = true;
//     }
//     if(x<0){
//         goLeft = false;
//     }
// },10);

const circleObject = {
    circle: document.getElementById("circle"),
    x: 9,
    y: 17,
    goLeft: false,
}

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
        if(circleObject.x>380){
            circleObject.goLeft=true;
        }
        if(circleObject.x<10){
            circleObject.goLeft=false;
        }
}

window.setInterval(moveCircle, 10, circleObject)

//console.log(circleObject.x)

