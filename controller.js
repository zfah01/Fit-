'use strict';
/*global Model, View */
//Joins Model and View
// - the "plumbing"
const view = new View();
const model = new Model();



        view.callReadyListener(view.showSteps(), () =>{
            model.checkBrowser();
            localStorage.clear();
            model.wnt.steps = 0;
            model.calcStepsTaken(model.wnt.steps);
        });

