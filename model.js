'use strict';


class Model{

    constructor() {
        this.wnt = {};
        this.wnt.mobile = false;
        this.ie = false;
        this.steps = localStorage.steps;
    }

    checkBrowser() {


//check if mobile browser is supported
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)
        ) {
            this.wnt.mobile = true;
        }
        if (navigator.userAgent.match(/MSIE/i)) {
            this.wnt.ie = true;
        }
        if (this.wnt.mobile === true) {
            navigator.geolocation.watchPosition(this.getPosition, this.positionError,
                {'enableHighAccuracy': true, 'timeout': 10000, 'maximumAge': 20000});
        } else {
            alert("Geo location is not available on this device");
        }
    }

    /******** ONLOAD
    $(function () {
        $('#steps').ready(function () {
            localStorage.clear();
            wnt.steps = 0;
            calcStepsTaken(wnt.steps);
        });
    });********/

    getPosition(pos) {

        //let metersTraveled = pos.coords.speed * 10;   //NOTE: gets speed every 10 seconds, so (pos.coords.speed * 10)  ...meterspersec * sec... = meters traveled    ...   /0.762 = steps
        //!!!!! getting 8x the steps I should ... 2*10=20/0.762=26.2steps in 10 seconds???
        let steps = pos.coords.speed / 0.762;
        this.calcStepsTaken(steps);
    }

    positionError(err) {
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

    calcStepsTaken(steps) {
        this.wnt.steps = this.wnt.steps + steps;
        localStorage.steps = this.wnt.steps;
        this.stepVal = (Math.round(this.wnt.steps)).toString();
        document.getElementById("steps").innerHTML = this.stepVal;
        //$('#steps').html('<span>' + Math.round(wnt.steps) + '/6000 Steps</span>');
    }


}