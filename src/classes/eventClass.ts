import AbstractNote from "../mainControl/abstracNote.js";
import EventInterface from "../interfaces/eventInterface.js";
class EventClass extends AbstractNote implements EventInterface {
    private DataAndTime: Date;
    constructor(title: string, text: string, imgUrl: string, private location: string,date:string, time: string, private equipment: string) {
        super(title, text, imgUrl);
        this.setDataAndTime(time,date);
      
}
public setDataAndTime(time: string,date:string): void {
    this.DataAndTime = new Date(`${date}T${time}`);
}
public setEquipment(equipment: string): void {
    this.equipment = equipment;
}
public setLocation(location: string): void {
    this.location = location;
}
public getEquipment(): string {
    return this.equipment;
}
public getLocation(): string {
    return this.location;
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
public getwarning(): string {
    return `
    <div>
    <p>Creation Date: ${this.getDateCreatedStr()}</p>
    <h2>title: ${this.getTitle()}</h2>
    <p>text: ${this.getText()}</p>
    <p>location: ${this.getLocation()}</p>
    <p>date of event: ${this.getDate()}</p>
    <p>time of event: ${this.getTime()}</p>
    <p>equipment: ${this.getEquipment()}</p>
    </div>
        `;
    }
        public static createForm(): HTMLFormElement {
            let form = document.createElement('form');
            form.id = 'id_form';
        
            // Add title input
            this.addInput(form, 'title','כותרת', 'text','form-control');
            this.addInput(form, 'text','פרטי הערה', 'text','form-control');
            this.addInput(form, 'imgUrl', 'תמונה','form-control');
            this.addInput(form, 'location', 'text','form-control');
            this.addInput(form, 'data', 'date', 'form-control');
            this.addInput(form, 'time', 'time','form-control');
            this.addInput(form, 'equipment', 'text','form-control');
        
            let button = document.createElement('button');
            button.textContent = 'submit';
            form.appendChild(button);
            return form;
        } 
        private static addInput(form: HTMLFormElement, id: string,laben:string, type: string,className:string='form-control'): void {
            let label = document.createElement('label');
            label.textContent = id;
            form.appendChild(label);
        
            let input = document.createElement('input');
            input.id = 'id_' + id;
            input.className = className;
            input.type = type;
            input.required = true;
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
       

export default EventClass;