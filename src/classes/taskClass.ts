import AbstractNote from "../mainControl/abstracNote.js";
import TaskInterface from "../interfaces/tasksInterface.js";
class Task extends AbstractNote implements TaskInterface{
    lastDataExecution: Date;
    constructor(title: string, text: string, imgUrl: string,lastDataExecution: string) {
        super(title, text, imgUrl);
        this.setLastDataExecution(lastDataExecution);
    }
    public getLastDataExecution(): string {
        let options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        let formattedDate = this.lastDataExecution.toLocaleString('en-IL', options);
        return formattedDate;
    }
    public setLastDataExecution(lastDataExecution: string): void {
        this.lastDataExecution = new Date(lastDataExecution);
    }
    public getwarning(): string {
        return `
        <div>
        <p>Creation Date: ${this.getDateCreatedStr}</p>
        <p>Last Execution Date: ${this.getLastDataExecution}</p>
        </div>
        `;
    }
    public static createForm(): HTMLFormElement {
        let form = document.createElement('form');
        form.id = 'id_form';
    
        // Add title input
        this.addInput(form, 'title','Title', 'text','form-control');
        this.addInput(form, 'text','Text', 'text','form-control');
        this.addInput(form, 'imgUrl','Img', 'text','form-control');
        this.addInput(form, 'last_Date_Execution','last Date Execution', 'date','form-control');
        let button = document.createElement('button');
        button.textContent = 'submit';
        form.appendChild(button);
        return form;
    } 
    private static addInput(form: HTMLFormElement, id: string, labeln:string, type: string,className:string='form-control'): void {
        let label = document.createElement('label');
        label.textContent = labeln;
        label.id = 'id_' + id;
        form.appendChild(label);
    
        let input = document.createElement('input');
        input.id = 'id_' + id;
        input.className = className;
        input.type = type;
        form.appendChild(input);
    }
    public static createFormAndHandleSubmit(event:Element): Promise<any> {
        return new Promise((resolve, reject) => {
            let form = this.createForm();
        
            if (event) {
                event.appendChild(form);
            } else {
                reject(new Error('Container not found'));
                return;
            }
    
            let button = form.querySelector('button');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                let formData = this.handleFormSubmit(form);
                event.removeChild(form)
                resolve(formData);
                });
              
            } else {
                reject(new Error('Button not found in form'));
            }
        });
    }
    
    private static handleFormSubmit(form: HTMLFormElement): any {
        let formData = {};
        for (let i = 0; i < form.elements.length; i++) {
            let element = form.elements[i] as HTMLInputElement;
            if (element.id.startsWith('id_')) {
                formData[element.id.substring(3)] = element.value;
            }
        }
        return formData;
    }
}
export default Task;