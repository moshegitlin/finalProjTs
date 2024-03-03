import AbstractNote from "../nainControl/abstracNote.js";
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
}
export default MeetingClass;
