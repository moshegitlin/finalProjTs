import EventClass from "../classes/eventClass.js";
import MeetingClass from "../classes/meetingClass.js";
import Task from "../classes/taskClass.js";
const event = new EventClass("event", "event", "event", "event", "2021-10-10", "10:10", "event");
const divEvent = document.querySelector(".container");


async function main() {
    try {
        const form = await Task.createFormAndHandleSubmit(divEvent);
        console.log(form);
    } catch (error) {
        console.error(error);
    }
}

main();



    


    