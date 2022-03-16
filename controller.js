'use strict';
/*global Model, View */
//Joins Model and View
// - the "plumbing"
let view = new View();
let model = new Model();
let controller = null;

function Controller(){
    this.loadSteps = function(){
        view.showSteps().addEventListener("load", () =>{
            localStorage.clear();
            model.wnt.steps = 0;
            model.stepsTaken(model.wnt.steps);
        });
    };
    controller = new Controller();
    window.addEventListener("load", controller.loadSteps);
}