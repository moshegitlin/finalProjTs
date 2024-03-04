import EventClass from "../classes/eventClass.js";
import MeetingClass from "../classes/meetingClass.js";
import Task from "../classes/taskClass.js";
import AbstractNote from "../mainControl/abstracNote.js";
const event = new EventClass("event", "event", "event", "event", "2021-10-10", "10:10", "event");
const divEvent = document.querySelector("#form") as HTMLElement;
let switchState: boolean = false;
const btnEdit = document.getElementById('btnEdit') as HTMLInputElement;
const slider = document.querySelector('.slider') as HTMLElement;
const status = document.querySelector('.status') as HTMLElement;

const  notes: AbstractNote[] = [];
const eventForm = async () => {
    try {
        const form = await EventClass.createFormAndHandleSubmit(divEvent);
        console.log(form);
        notes.push(new EventClass(form.title,form.text,form.img_url,form.location,form.data,form.time,form.equipment));
    } catch (error) {
        console.error(error);
    }
}
 
const meetingtForm = async () => {
    try {
        const form = await MeetingClass.createFormAndHandleSubmit(divEvent);
        console.log(form);
        notes.push(new MeetingClass(form.title,form.text,form.img_url,form.location,form.date,form.time));
    } catch (error) {
        console.error(error);
    }
}
const taskForm = async () => {
    try {
        const select = await createSelectAndListen(divEvent);
        const form = await Task.createFormAndHandleSubmit(divEvent);
        console.log(select);
        console.log(form);
        notes.push(new Task(form.title,form.text,form.img_url,form.last_Date_Execution));
    } catch (error) {
        console.error(error);
    }
}
//קריאה לפונקציה
taskForm();
// eventForm();
// meetingtForm();
 
const createSelectAndListen = (event: Element): Promise<any> => {
    return new Promise((resolve, reject) => {
        let select = document.createElement('select');
        select.id = 'id_add_note';
        select.className = 'form-select';
 
        let option1 = document.createElement('option');
        option1.value = 'event';
        option1.textContent = 'event';
        select.appendChild(option1);
 
        let option2 = document.createElement('option');
        option2.value = 'task';
        option2.textContent = 'task';
        select.appendChild(option2);
 
        let option3 = document.createElement('option');
        option3.value = 'meeting';
        option3.textContent = 'meeting';
        select.appendChild(option3);
 
        let button = document.createElement('button');
        button.textContent = 'Add';
        event.appendChild(button);
 
        if (event) {
            event.appendChild(select);
        } else {
            reject(new Error('Container not found'));
            return;
        }
 
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let selectedOption = select.value;
            event.removeChild(select);
            event.removeChild(button);
            resolve(selectedOption);
        });
    });
}


function updateSwitchState(newState: boolean) {
    switchState = newState;
    if (switchState) {
        slider.classList.add('active');
        status.innerText = 'עריכה';
    } else {
        slider.classList.remove('active');
        status.innerText = 'כבוי';
    }
}

btnEdit.addEventListener('click', function() {
    updateSwitchState(btnEdit.checked);
});

updateSwitchState(switchState);






    


    