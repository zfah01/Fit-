'use strict';
/*globals $:false */


let wnt = {};
wnt.mobile = false;
wnt.ie = false;
wnt.steps = localStorage.steps;


//check if device is mobile
if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)
) {
    wnt.mobile = true;
}

//using geolocation to automatically update user location
if (wnt.mobile === true) {
    navigator.geolocation.watchPosition(getPosition, positionError,
        {'enableHighAccuracy': true, 'timeout': 10000, 'maximumAge': 20000});
} else {
    alert("Geo location is not available on this device");
}


//load the steps on screen
$(function () {
    $('#steps').ready(function () {
        wnt.steps = 0;
        calcStepsTaken(wnt.steps);
        saveSteps();
        // setStepsTo0();
    });
});

//save steps between page loads and refreshes
function saveSteps() {
    let steps = document.getElementById("steps").value;
    localStorage.setItem("steps", steps);
    console.log(localStorage.getItem("steps"));
    return false;
}

window.onload = function () {
    document.getElementById("steps").value = localStorage.getItem("steps");
};


//set steps to 0 at midnight
function setStepsTo0() {
    let d = new Date();
    d.setHours(0,0,0,0);  // you need to store the date when steps was last updated, and reset if that date is in the past

    if (d) {
        localStorage.clear();
        wnt.steps = 0;
    }

}
//get user position
function getPosition(pos) {
    let steps = pos.coords.speed / 0.762;
    calcStepsTaken(steps);
}

//if error occurs alert user
function positionError(err) {
    if (err.code === 1) {
        alert("User denied geolocation.");
    } else if (err.code === 2) {
        alert("Position unavailable.");
    } else if (err.code === 3) {
        alert("Timeout expired.");
    } else {
        alert("ERROR:" + err.message);
    }
}

//calculate steps detected
function calcStepsTaken(steps) {
    wnt.steps = wnt.steps + steps;
    localStorage.steps = wnt.steps;
    $('#steps').html('<span>' + Math.round(wnt.steps) + '/6000 Steps</span>');
}

//calculate calories remaining
function populateCaloriesRemaining(){
    let food = document.getElementById("food");//300
    let exercise = document.getElementById("exercise");//350
    let remaining = document.getElementById("remaining");//400

    food.innerHTML = localStorage.getItem("calories")
    exercise.innerHTML = localStorage.getItem("exercise")
    remaining.innerHTML = localStorage.getItem("remainingKcal")


}
populateCaloriesRemaining();

