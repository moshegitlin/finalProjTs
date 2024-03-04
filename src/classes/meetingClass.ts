import AbstractNote from "../mainControl/abstracNote.js";
import MeetingInterface from "../interfaces/meetingsInterface.js";
class MeetingClass extends AbstractNote implements MeetingInterface {
    public DataAndTime: Date;
    constructor(title: string, text: string, imgUrl: string, public location: string,date:string, time: string) {
        super(title, text, imgUrl);
        this.setDataAndTime(time,date);
}

public setDataAndTime(time: string,date:string): void {
    this.DataAndTime = new Date(`${date}T${time}`);
}
public getDataAndTime():string {
    let options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    let formattedDate = this.DataAndTime.toLocaleString('en-IL', options);
    return formattedDate;
}
public getTime(): string {
    let options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit'
    };
    let formattedDate = this.DataAndTime.toLocaleString('en-IL', options);
    return formattedDate;
}
public getDate(): string {
    let options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let formattedDate = this.DataAndTime.toLocaleString('en-IL', options);
    return formattedDate;
}
public getwarning(): string {
    return `
    <div>
    <p>date of meeting: ${this.getDate}</p>
    <h2>title: ${this.getTitle}</h2>
    <p>text: ${this.getText}</p>
    <p>location: ${this.location}</p>
    <p>time of meeting: ${this.getTime}</p>
    </div>
        `;
    }
    public static createForm(): HTMLFormElement {
        let form = document.createElement('form');
        form.id = 'id_form';
    
        // Add title input
        this.addInput(form, 'title', 'text','form-control');
        this.addInput(form, 'text', 'text','form-control');
        this.addInput(form, 'imgUrl', 'text','form-control');
        this.addInput(form, 'location', 'text','form-control');
        this.addInput(form, 'date', 'date', 'form-control');
        this.addInput(form, 'time', 'time','form-control');
    
        let button = document.createElement('button');
        button.textContent = 'submit';
        form.appendChild(button);
        return form;
    } 
    private static addInput(form: HTMLFormElement, id: string, type: string,className:string='form-control'): void {
        let label = document.createElement('label');
        label.textContent = id;
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
export default MeetingClass;
