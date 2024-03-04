import EventClass from "../classes/eventClass.js";
import MeetingClass from "../classes/meetingClass.js";
import Task from "../classes/taskClass.js";
import AbstractNote from "./abstracNote.js";
class mainControlClass {
    notes: AbstractNote[];
    constructor() {
        this.notes = [];
    }
    createNote = async (eventForm:Element,eventNotes:Element) => {
        try {
            const selectedOption = await this.createSelectAndListen(eventForm);
            console.log(selectedOption);
            switch (selectedOption) {
                case 'event':
                    this.eventForm(eventForm,eventNotes);
                    break;
                case 'meeting':
                    this.meetingtForm(eventForm,eventNotes);
                    break;
                case 'task':
                    this.taskForm(eventForm,eventNotes);
                    break;
                    default:
                        break;
                    }
                } catch (error) {
                    console.error(error);
                }
   
    }
   
    deleteNote(index: number, event:Element) {
        this.notes.splice(index, 1);
        this.displayNotes(event);
    }
    displayNotes(event:Element) {
        event.innerHTML = ''; // Clear the container
        this.notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'noteDiv';
            event.appendChild(noteElement);
            // עיבוד כל זוג מפתח-ערך באובייקט
            for (let key in note) {
                if (key ==='imgUrl'){
            noteElement.style.backgroundImage = `url(${note[key]})`;
            continue;
        }
        if(key=='id') continue;
        let label = document.createElement('label');
        label.className = 'noteLabel';
        label.textContent = key + ': ';
        noteElement.appendChild(label);
 
        let valueElement = document.createElement('div');
        valueElement.textContent = note[key];
        valueElement.className = 'noteValue';
        noteElement.appendChild(valueElement);
    }
    const btnEdit = document.getElementById('btnEdit') as HTMLInputElement;
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () =>{ 
                console.log(btnEdit.checked);
                this.deleteNote(index,event)});
 
            noteElement.appendChild(deleteButton);
            event.appendChild(noteElement);
        });
    }
 
    eventForm = async (eventForm:Element,eventNotes:Element) => {
        try {
            const form = await EventClass.createFormAndHandleSubmit(eventForm);
            console.log(form);
            this.notes.push(new EventClass(form.title,form.text,form.imgUrl,form.location,form.data,form.time,form.equipment));
            this.displayNotes(eventNotes);
        } catch (error) {
            console.error(error);
        }
    }
    meetingtForm = async (eventForm:Element,eventNotes:Element) => {
        try {
            const form = await MeetingClass.createFormAndHandleSubmit(eventForm);
            console.log(form);
            this.notes.push(new MeetingClass(form.title,form.text,form.imgUrl,form.location,form.date,form.time));
            this.displayNotes(eventNotes);
        } catch (error) {
            console.error(error);
        }
    }
    taskForm = async (eventForm:Element,eventNotes:Element) => {
        try {
            const form = await Task.createFormAndHandleSubmit(eventForm);
            console.log(form);
            this.notes.push(new Task(form.title,form.text,form.imgUrl,form.last_Date_Execution));
            this.displayNotes(eventNotes);
        } catch (error) {
            console.error(error);
        }
    }
    createSelectAndListen = (event: Element): Promise<any> => {
        return new Promise((resolve, reject) => {
            let div = document.createElement('div');
            div.className ="selectDiv"
            let select = document.createElement('select');
            div.appendChild(select);
            select.id = 'id_add_note';
            select.className = 'form-select';
     
            let option1 = document.createElement('option');
            option1.value = 'event';
            option1.textContent = 'אירוע';
            select.appendChild(option1);
     
            let option2 = document.createElement('option');
            option2.value = 'task';
            option2.textContent = 'משימה';
            select.appendChild(option2);
     
            let option3 = document.createElement('option');
            option3.value = 'meeting';
            option3.textContent = 'פגישה';
            select.appendChild(option3);
     
            let button = document.createElement('button');
            button.textContent = 'הוסף פתק חדש';
            div.appendChild(button);
     
            if (event) {
                event.innerHTML = '';
                event.appendChild(div);
            } else {
                reject(new Error('Container not found'));
                return;
            }
     
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let selectedOption = select.value;
                div.removeChild(select);
                div.removeChild(button);
                event.removeChild(div);
                resolve(selectedOption);
            });
        });
    }
 
}
export default mainControlClass;