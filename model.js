 'use strict';
function Model() {

    this.wnt = {};
    this.wnt.mobile = false;
    this.wnt.ie = false;
    this.wnt.steps = localStorage.steps;

         //check if mobile browser is supported
         if (navigator.userAgent.match(/Android/i)
             || navigator.userAgent.match(/webOS/i)
             || navigator.userAgent.match(/iPhone/i)
             || navigator.userAgent.match(/iPad/i)
             || navigator.userAgent.match(/iPod/i)
             || navigator.userAgent.match(/BlackBerry/i)
         ) {
             this.wnt.mobile = true;
         }
         if (navigator.userAgent.match(/MSIE/i)) {
             this.wnt.ie = true;
         }
         if (this.wnt.mobile == true) {
             navigator.geolocation.watchPosition(this.getPosition, this.positionError, {
                 'enableHighAccuracy': true,
                 'timeout': 10000,
                 'maximumAge': 20000
             });
         } else{
             alert("geo location is not available on this device!");
         }


    this.getPosition = function(pos){
        //let metersTraveled = pos.coords.speed * 10;   //NOTE: gets speed every 10 seconds, so (pos.coords.speed * 10)  ...meterspersec * sec... = meters traveled    ...   /0.762 = steps
        //!!!!! getting 8x the steps I should ... 2*10=20/0.762=26.2steps in 10 seconds???
        let steps = pos.coords.speed / 0.762;
        this.stepsTaken(steps);

    };
    this.positionError = function(err){
        if(err.code==1){
            alert("User denied geolocation.");
        } else if(err.code==2){
            alert("Position unavailable.");
        } else if(err.code==3){
            alert("Timeout expired.");
        } else {
            alert("ERROR:"+ err.message);
        }
    };

    this.stepsTaken = function(steps){
        this.wnt.steps = this.wnt.steps + steps;
        localStorage.steps = this.wnt.steps;
        //$('#steps').html('<span style="color:#ff0000;">'+Math.round(this.wnt.steps)+'/6000 Steps</span>');
        document.getElementById("steps").innerHTML = (Math.round(this.wnt.steps)).toString();

        console.log($('#steps').val());
        localStorage.setItem('steps',parseInt(localStorage.steps) + parseInt($('#steps').val()));
        console.log(localStorage.getItem('steps'));
    };
}
