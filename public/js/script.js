
'use strict';


const getRGBValue = (floor, ceiling) => Math.floor((Math.random() * (ceiling - floor)) + floor)+1;
/**
 * Handle mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const body = document.querySelector('body');
let headerBtnClicked = false;

document.querySelector('#menu-icon').addEventListener('click', e => {
  !headerBtnClicked ? body.style.transform = 'translateX(300px)' : body.style.transform = 'translateX(0px)';
  return headerBtnClicked = !headerBtnClicked;
});

function changeBackgroundColor(){
  document.querySelector('.sidebar').style.backgroundColor = `rgb(${getRGBValue(0,100)}, ${getRGBValue(0,100)} ,${getRGBValue(0,100)})`;
}
function changeFontColor(){
  document.querySelector('.sidebar').style.color = `rgb(${getRGBValue(130,255)}, ${getRGBValue(130,255)} ,${getRGBValue(130,255)})`;  
}

const totalincrement = 360;
let currentRotation = 0;

function timeImageRotation (startValue) {
  currentRotation = startValue;
  setInterval(rotateUserImage, 20);
}
function rotateUserImage () {
  document.querySelector('.thumbnail').style.borderRadius = "50%";
  if (currentRotation < totalincrement) {
    currentRotation += 20;
    document.querySelector('.thumbnail').style.transform = 'rotate(' + currentRotation + 'deg)';
  }
};

changeBackgroundColor();
changeFontColor();
timeImageRotation (0);