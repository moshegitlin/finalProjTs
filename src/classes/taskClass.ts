import AbstractNote from "../nainControl/abstracNote.js";
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
            hour: '2-digit',
            minute: '2-digit'
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
}
export default Task;