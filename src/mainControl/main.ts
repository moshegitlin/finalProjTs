import mainControlClass from "./mainControlClass.js";
const MainControlClass = new mainControlClass();
const divEvent = document.querySelector("#form") as HTMLElement;
let switchState: boolean = false;
const btnEdit = document.getElementById('btnEdit') as HTMLInputElement;
const slider = document.querySelector('.slider') as HTMLElement;
const status = document.querySelector('.status') as HTMLElement;
const btnAdd = document.querySelector('#btnAdd') as HTMLElement;
const notesContainer = document.querySelector('#notes') as HTMLElement;




btnAdd.addEventListener('click', ()=>{MainControlClass.createNote(divEvent,notesContainer)
});

function updateSwitchState(newState: boolean) {
    switchState = newState;
    if (switchState) {
        slider.classList.add('active');
        status.innerText = 'עריכה';
        btnAdd.style.display = 'block';
    } else {
        slider.classList.remove('active');
        status.innerText = 'כבוי';
        btnAdd.style.display = 'none';
    }
}

btnEdit.addEventListener('click', function() {
    updateSwitchState(btnEdit.checked);
});

updateSwitchState(switchState);






    
// taskForm();

    