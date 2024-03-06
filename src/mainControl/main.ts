import mainControlClass from "./mainControlClass.js";
import EventClass from "../classes/eventClass.js";
const MainControlClass = new mainControlClass();
const divForm = document.querySelector("#form") as HTMLElement;
let switchState: boolean = false;
const btnEdit = document.getElementById('btnEdit') as HTMLInputElement;
const slider = document.querySelector('.slider') as HTMLElement;
const status = document.querySelector('.status') as HTMLElement;
const btnAdd = document.querySelector('#btnAdd') as HTMLElement;
const notesContainer = document.querySelector('#notes') as HTMLElement;
const tasks = document.querySelector('.tasks') as HTMLElement;
const textEdit = document.querySelector('#textEdit') as HTMLElement;
let imgUrl = 'https://images.pexels.com/photos/461717/pexels-photo-461717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const event = new EventClass('title', 'text', imgUrl, 'location','2024-03-30', '15:13', 'equipment');
MainControlClass.notes.push(event);
MainControlClass.notes.push(event);

MainControlClass.displayNotes(notesContainer, tasks);
 

btnAdd.addEventListener('click', ()=>{MainControlClass.createNote(divForm,notesContainer, tasks)});


function updateSwitchState(newState: boolean) {
    switchState = newState;
    if (switchState) {
        slider.classList.add('active');
        textEdit.innerText = ""
        status.innerText = 'עריכה';
        btnAdd.style.display = 'block';
        tasks.innerHTML = '';
        tasks.style.display = 'none';
    } else {
        slider.classList.remove('active');
        status.innerText = 'כבוי';
        textEdit.innerText = "אנא הפעל מצב עריכה כדי להמשיך"
        btnAdd.style.display = 'none';
        tasks.style.display = 'block';
    }
}

btnEdit.addEventListener('click', function() {
    updateSwitchState(btnEdit.checked);
});


updateSwitchState(switchState);






    
// taskForm();

    