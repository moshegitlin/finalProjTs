abstract class AbstractNote {
private static currentId: number = 0;
protected id: number;
protected dateCreated: Date;
    constructor(protected title: string, protected text: string, protected imgUrl: string) {
        this.id = AbstractNote.currentId++;
        this.dateCreated = new Date();
    }
    public getId(): number {
        return this.id;
    }
    public getDateCreated(): Date {
        return this.dateCreated;
    }
    public getDateCreatedStr(): string {
        let options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        let formattedDate = this.dateCreated.toLocaleString('en-IL', options);
        return formattedDate;
    }
    public getTitle(): string {
        return this.title;
    }
    public getText(): string {
        return this.text;
    }
    public getImgUrl(): string {
        return this.imgUrl;
}
public setTitle(title: string): void {
    this.title = title;
}
public setText(text: string): void {
    this.text = text;
}
public setImgUrl(imgUrl: string): void {
    this.imgUrl = imgUrl;
}

    public abstract getwarning(): string;

}
export default AbstractNote;