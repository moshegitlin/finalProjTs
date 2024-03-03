import EventClass from "../classes/eventClass.js";
import Task from "../classes/taskClass.js";
const event = new EventClass("event", "event", "event", "event", "2021-10-10", "10:10", "event");
const divEvent = document.querySelector(".container");


const form = event.createForm();
while(true){
    if(form){
        divEvent.appendChild(form);
        break
    }
}


    


    