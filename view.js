'use strict';
//Handles the HTML and CSS - all refs to HTML and CSS here

class View {

    constructor() {
    }


    showSteps(){
        return "steps";
    }

    callReadyListener(id , listener){
        document.getElementById(id).addEventListener("ready", listener);

    }



}
