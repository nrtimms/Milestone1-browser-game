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

const image = new Image()
image.src = '/assets/map.png'

image.onload = () => {
    c.drawImage(image, 0, 0)
}